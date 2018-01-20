Mixin = {
  cache: {},
  plugin: function(o, path, new_val) {
    if (path && path.length > 0) {
      var fn = Function('new_val', 'with(this) {this' + path + '=new_val; return this;}').bind(o);
      return fn(new_val)
    } else {
      Object.keys(new_val).forEach(function(k) {
        o[k] = new_val[k]
      })
      return o;
    }
  },
  remote: function(root) {
    return new Promise(function(success, error) {
      // MIXIN
      var selection = ST.select(root, function(key, val) {
        return key === '@' && !/^[ ]*\$document/.test(val)
      });
      var paths = selection.paths()
      var values = selection.values()

      if (values.length > 0) {
        var subpaths = [];
        values.forEach(function(value, index) {
          if (/@/.test(value)) {
            var tokens = value.split("@")
            subpaths.push(tokens[0])
            values[index] = tokens[1]
          } else {
            subpaths.push("");
          }
        })

        var promises = values.map(function(url, index) {
          return new Promise(function(success, error) {
            if (Mixin.cache[url]) {
              var res = Mixin.cache[url];
              success(JSON.parse(JSON.stringify(res)));
            } else {
              fetch(url).then(function(res) { return res.json() })
              .then(function(res) {
                Mixin.cache[url] = res;
                success(JSON.parse(JSON.stringify(res)));
              })
            }
          })
        })
        var resolved_root = root;
        var self = this;
        Promise.all(promises).then(function(objects) {
          paths.forEach(function(path, index) {
            var plugin = objects[index];
            if (subpaths[index] != "") {
              var fn = Function('with(this) { return this.' + subpaths[index] + ';}').bind(plugin);
              plugin = fn() 
            }
            resolved_root = Mixin.plugin(resolved_root, path, plugin)
          })
          Mixin.loaded = Mixin.loaded.concat(values)
          success(resolved_root)
        })
      } else {
        success(root);
      }
    })
  },
  local: function(root) {
    return new Promise(function(success, error) {
      var selection = ST.select(root, function(key, val) {
        return key === '@' && /\$document\./.test(val)
      });
      var paths = selection.paths()
      var values = selection.values()

      paths.forEach(function(path, index) {
        /***
          Example

          local_ref := "$document.db"
        }
        *****/
        var local_ref =  values[index];
        // local_resolver finds the value at $document.db
        var local_resolver = Function('with(this) { return ' + local_ref + ';}').bind({$document: root});
        var resolved = local_resolver()
        if (resolved instanceof Object && resolved.constructor === Object) {
          var func = Function('with(this) {return this' + path + ';}').bind(root);
          Object.keys(resolved).forEach(function(key) {
            var branch = func(path);
            branch[key] = resolved[key];
          })
        } else {
          var func = Function('new_val', 'with(this) {this' + path + '=new_val; return this;}').bind(root);
          root = func(resolved);
        }
      })
      success(root)
    })
  },
  parse: function(root) {
    // MIXIN
    var selection = ST.select(root, function(key, val) {
      return key === '@' && !/\$document\./.test(val) && Mixin.loaded.indexOf(val) === -1;
    });
    if (selection.values().length > 0) {
      // remote
      return Mixin.remote(root).then(Mixin.parse)
    } else {
      // try local
      return Mixin.local(root)
    }
  }
}
