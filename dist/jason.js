var Jason = function(options, jason) {
  var node = {
    $type: "div",
    class: "jason",
    _body: null,
    _styles: null,
    $init: function() {
      if (jason) {
        this._update(jason);
      } else {
        this.classList.add("hidden");
      }
      this.style.minHeight = window.innerHeight;
    },
    $update: function() {
      // Style
      var b = this._body;
      if (b.background) {
        if (typeof b.background === 'string') {
          if (/http/.test(b.background)) {
            this.style.backgroundImage = "url(" + b.background + ")";
            this.style.backgroundSize = "cover";
          } else {
            this.style.backgroundColor = b.background;
          }
        } else {
          // advanced background
          if (b.background.type === 'html') {
            this.querySelector(".webcontainer")._update(b.background);
          }
        }
      } else if (b.style && b.style.background) {
        if (typeof b.style.background === 'string') {
          if (/http/.test(b.style.background)) {
            this.style.backgroundImage = "url(" + b.style.background + ")";
            this.style.backgroundSize = "cover";
          } else {
            this.style.backgroundColor = b.style.background;
          }
        } else {
          // advanced type (object type)
          if (b.style.background.type === 'html') {
            this.querySelector(".webcontainer")._update(b.style.background);
          }
        }
      }
      if (this._styles) {
        this.querySelector("style")._update(this._styles);
      }
    },
    _draw: function(body) {
      this._body = body;
      this.querySelector(".sections")._update(this._body);
      this.querySelector(".layers")._update(this._body);
      this.querySelector(".header")._update(this._body);
      this.querySelector(".footer")._update(this._body);
    },
    _update: function(root){

      var self = this;

      // Declare mixins with '$jason.head.type = "mixin"'
      if (root && root.$jason && root.$jason.head && root.$jason.head.type === "mixin") {
        self.classList.add("hidden");
        return;
      }

      Mixin.loaded = [];
      Mixin.parse(root)
      .then(function(root) {
        var head = root.$jason.head;
        var body = root.$jason.body;
        if (body) {
          self.classList.remove("hidden");
          self._draw(body);
        } else {
          self.classList.add("hidden");
        }
        if (head) {
          if (head.templates && head.templates.body && head.data) {
            var parsed = ST.transform(head.templates.body, head.data); 
            if (parsed) {
              self.classList.remove("hidden");
              self._draw(parsed);
            } else {
              self.classList.add("hidden");
            }
          }
          if (head.styles) {
            self._styles = head.styles;
          }
        }
      })
      .catch(function(err) {
        console.log("Error", err);
        self.classList.add("hidden");
      })
    },
    $components: [
      Css,
      Header,
      Sections,
      Layers,
      Footer,
      WebContainer
    ]
  }
  if (options) {
    Object.keys(options).forEach(function(key) {
      if (key === 'class') {
        node.class = "jason " + options[key];
      } else {
        node[key] = options[key];
      }
    })
  }
  return node;
}

Components = {
  slider: function(o) {
    var style = undefined;
    if (o.style) {
      style = {
        width: o.style.width ? o.style.width + 'px' : undefined,
        height: o.style.height ? o.style.height + 'px' : undefined
      }    
    }
    return Utils.clean({
      $type: "input",
      type: "range",
      value: o.value,
      class: o.className,
      style: Utils.clean(style)
    })
  },
  textfield: function(o) {
    var style = undefined;
    if (o.style) {
      style = {
        background: o.style.background,
        width: o.style.width ? o.style.width + 'px' : undefined,
        height: o.style.height ? o.style.height + 'px' : undefined,
        padding: o.style.padding ? o.style.padding + 'px' : undefined,
        paddingLeft: o.style.padding_left ? o.style.padding_left + 'px' : undefined,
        paddingRight: o.style.padding_right ? o.style.padding_right + 'px' : undefined,
        paddingTop: o.style.padding_top ? o.style.padding_top + 'px' : undefined,
        paddingBottom: o.style.padding_bottom ? o.style.padding_bottom + 'px' : undefined,
        color: o.style.color,
        fontFamily: o.style.font,
        fontSize: o.style.size ? o.style.size + 'px' : undefined,
        textAlign: o.style.align
      }
    }
    return Utils.clean({
      $type: "input",
      type: o.type,
      value: o.value,
      class: o.className,
      style: Utils.clean(style),
      placeholder: o.placeholder
    })
  },
  textarea: function(o) {
    var style = undefined;
    if (o.style) {
      style = {
        background: o.style.background,
        width: o.style.width ? o.style.width + 'px' : undefined,
        height: o.style.height ? o.style.height + 'px' : undefined,
        padding: o.style.padding ? o.style.padding + 'px' : undefined,
        paddingLeft: o.style.padding_left ? o.style.padding_left + 'px' : undefined,
        paddingRight: o.style.padding_right ? o.style.padding_right + 'px' : undefined,
        paddingTop: o.style.padding_top ? o.style.padding_top + 'px' : undefined,
        paddingBottom: o.style.padding_bottom ? o.style.padding_bottom + 'px' : undefined,
        color: o.style.color,
        fontFamily: o.style.font,
        fontSize: o.style.size ? o.style.size + 'px' : undefined,
        textAlign: o.style.align
      }
    }
    return Utils.clean({
      $type: "textarea",
      value: o.value,
      class: o.className,
      style: Utils.clean(style),
      placeholder: o.placeholder
    })
  },
  button: function(o) {
    var style = undefined;
    if (o.style) {
      style = {
        background: o.style.background,
        width: o.style.width ? o.style.width + 'px' : undefined,
        height: o.style.height ? o.style.height + 'px' : undefined,
        padding: o.style.padding ? o.style.padding + 'px' : undefined,
        paddingLeft: o.style.padding_left ? o.style.padding_left + 'px' : undefined,
        paddingRight: o.style.padding_right ? o.style.padding_right + 'px' : undefined,
        paddingTop: o.style.padding_top ? o.style.padding_top + 'px' : undefined,
        paddingBottom: o.style.padding_bottom ? o.style.padding_bottom + 'px' : undefined,
        borderRadius: o.style.corner_radius ? o.style.corner_radius + 'px' : undefined,
        fontFamily: o.style.font,
        fontSize: o.style.size ? o.style.size + 'px' : undefined,
        textAlign: o.style.align,
        lineHeight: o.style.height ? o.style.height + 'px' : undefined,
        color: o.style.color
      }
    }
    if (o.url) {
      // image button
      return Utils.clean({
        $type: "span",
        $components: [{
          $type: "img",
          src: o.url,
          class: o.className,
          style: Utils.clean(style)
        }]
      });
    } else {
      return Utils.clean({
        $type: "span",
        $components: [{
          $type: "button",
          $text: o.text,
          class: o.className,
          style: Utils.clean(style)
        }]
      })
    }
  },
  image: function(o) {
    var style = undefined;
    if (o.style) {
      style = {
        background: o.style.background,
        width: o.style.width ? o.style.width + 'px' : undefined,
        height: o.style.height ? o.style.height + 'px' : undefined,
        padding: o.style.padding ? o.style.padding + 'px' : undefined,
        paddingLeft: o.style.padding_left ? o.style.padding_left + 'px' : undefined,
        paddingRight: o.style.padding_right ? o.style.padding_right + 'px' : undefined,
        paddingTop: o.style.padding_top ? o.style.padding_top + 'px' : undefined,
        paddingBottom: o.style.padding_bottom ? o.style.padding_bottom + 'px' : undefined,
        borderRadius: o.style.corner_radius ? o.style.corner_radius + 'px' : undefined,
        color: o.style.color
      }
    }
    return Utils.clean({
      $type: "img",
      src: o.url,
      class: o.className,
      style: Utils.clean(style)
    });
  },
  label: function(o) {
    var style = undefined;
    if (o.style) {
      style = {
        background: o.style.background,
        width: o.style.width ? o.style.width + 'px' : undefined,
        height: o.style.height ? o.style.height + 'px' : undefined,
        padding: o.style.padding ? o.style.padding + 'px' : undefined,
        paddingLeft: o.style.padding_left ? o.style.padding_left + 'px' : undefined,
        paddingRight: o.style.padding_right ? o.style.padding_right + 'px' : undefined,
        paddingTop: o.style.padding_top ? o.style.padding_top + 'px' : undefined,
        paddingBottom: o.style.padding_bottom ? o.style.padding_bottom + 'px' : undefined,
        borderRadius: o.style.corner_radius ? o.style.corner_radius + 'px' : undefined,
        fontFamily: o.style.font,
        fontSize: o.style.size ? o.style.size + 'px' : undefined,
        textAlign: o.style.align,
        lineHeight: o.style.height ? o.style.height + 'px' : undefined,
        color: o.style.color
      }
    }
    return Utils.clean({
      $type: "p",
      $text: o.text,
      class: o.className,
      style: Utils.clean(style)
    })
  },
  space: function(o) {
    var style = undefined;
    if (o.style) {
      style = {
        background: o.style.background,
        width: o.style.width ? o.style.width + 'px' : undefined,
        height: o.style.height ? o.style.height + 'px' : undefined,
        padding: o.style.padding ? o.style.padding + 'px' : undefined,
        paddingLeft: o.style.padding_left ? o.style.padding_left + 'px' : undefined,
        paddingRight: o.style.padding_right ? o.style.padding_right + 'px' : undefined,
        paddingTop: o.style.padding_top ? o.style.padding_top + 'px' : undefined,
        paddingBottom: o.style.padding_bottom ? o.style.padding_bottom + 'px' : undefined
      }
    }
    return Utils.clean({
      class: o.className,
      "data-flex": true,
      style: Utils.clean(style)
    })
  }
}

var Css = {
  $type: "style",
  $text: "",
  _cssText: "",
  $update: function() {
    this.$text = this._cssText;
  },
  _update: function(s) {
    var new_stylesheet = {};
    for (var key in s) {
      var attrs = {};

      var stylesheet = s[key];

      if (stylesheet.background && !/http/.test(stylesheet.background)) {
        attrs["background-color"] = stylesheet.background;
      }
      if (stylesheet.background && /http/.test(stylesheet.background)) {
        attrs["background-image"] = 'url(' + stylesheet.background + ')';
        attrs["background-size"] = "cover";
      }
      if (stylesheet.color) {
        attrs["color"] = stylesheet.color;
      }
      if (stylesheet.bottom) {
        attrs["bottom"] = stylesheet.bottom + "px";
        attrs["position"] = "absolute";
      }
      if (stylesheet.left) {
        attrs["left"] = stylesheet.left + "px";
        attrs["position"] = "absolute";
      }
      if (stylesheet.right) {
        attrs["right"] = stylesheet.right + "px";
        attrs["position"] = "absolute";
      }
      if (stylesheet.top) {
        attrs["top"] = stylesheet.top + "px";
        attrs["position"] = "absolute";
      }
      if (stylesheet.padding) {
        attrs["padding"] = stylesheet.padding + "px";
      }
      if (stylesheet.padding_left) {
        attrs["padding-left"] = stylesheet.padding_left + "px";
      }
      if (stylesheet.padding_right) {
        attrs["padding-right"] = stylesheet.padding_right + "px";
      }
      if (stylesheet.padding_top) {
        attrs["padding-top"] = stylesheet.padding_top + "px";
      }
      if (stylesheet.padding_bottom) {
        attrs["padding-bottom"] = stylesheet.padding_bottom + "px";
      }
      if (stylesheet.width) {
        attrs["width"] = stylesheet.width + "px";
      }
      if (stylesheet.height) {
        attrs["height"] = stylesheet.height + "px";
      }
      if (stylesheet.size) {
        attrs["font-size"] = stylesheet.size + "px";
      }
      if (stylesheet.font) {
        attrs["font-family"] = stylesheet.font;
      }
      if (stylesheet.corner_radius) {
        attrs["border-radius"] = stylesheet.corner_radius;
      }
      if (stylesheet.align) {
        attrs["text-align"] = stylesheet.align;
        attrs["align-items"] = stylesheet.align;
      }

      var new_attrs = {};
      Object.keys(attrs).forEach(function(k) {
        new_attrs[k] = Utils.units(attrs[k]);
      })
      new_stylesheet[key] = new_attrs;
    }

    /*******
    s looks like this:

    "item": {
      color: "#ff0000",
      padding: "10px",
      "font-family": "HelveticaNeue"
    }

    Need to transform to a string

    .item {
      color: #ff0000;
      padding: 10px;
      font-family: "HelveticaNeue"
    }
      
    ********/

    var css = Object.keys(new_stylesheet).map(function(classname) {
      var firstLine = "#jason ."+classname+" {\n";
      var content = Object.keys(new_stylesheet[classname]).map(function(attr) {
        return "\t" + attr + ": " + new_stylesheet[classname][attr] + ";";
      }).join("\n") + "\n";
      var lastLine = "}";
      return firstLine + content + lastLine;
    }).join("\n")

    this._cssText = css;
  }
}

var Footer = {
  $type: "nav",
  class: "footer nav nav-justified",
  _title: null,
  _items: [],
  _footer: null,
  _style: null,
  _tpl: {
    tabs: function(item) {
      return {
        class: "nav-item",
        $components: [{
          $type: "img",
          src: item.image,
          $init: function() {
            Style.node(this);
          }
        }, {
          $text: item.text, class: "letter"
        }]
      }
    }
  },
  _update: function(body) {
    if (body.footer) {
      this._footer = body.footer;
    }
  },
  $update: function() {
    if (this._footer.tabs) {
      if (this._footer.tabs.items) {
        if (this._footer.tabs.style) {
          this._style = this._footer.tabs.style;
        }
        this.$components = this._footer.tabs.items.map(this._tpl.tabs)
      }
    } else if (this._footer.input) {
      if (this._footer.input.style) {
        this._style = this._footer.input.style;
      }
      var i = this._footer.input;
      var inputItems = [];
      if (i.left && i.left.image) {
        var lb = {
          $type: "img",
          src: i.left.image
        };
        if (i.left.style) lb.style = Style.transform(i.left.style);
        inputItems.push({
          class: "input-item button-item",
          $components: [lb]
        })
      }
      if (i.textfield) { 
        var tf = {$type: "input"};
        if (i.textfield.placeholder) tf.placeholder = i.textfield.placeholder;
        if (i.textfield.style) tf.style = Style.transform(i.textfield.style);
        inputItems.push({
          class: "input-item textfield",
          $components: [tf]
        });
      }
      if (i.right && i.right.text) {
        var rb = {
          $type: "span",
          $text: i.right.text
        };
        if (i.right.style) rb.style = Style.transform(i.right.style);
        inputItems.push({
          class: "input-item button-item",
          $components: [rb]
        })
      }
      this.$components = inputItems;
    }
    Style.node(this);
  }
}

var Header = {
  $type: "nav",
  class: "header nav nav-justified",
  _title: null,
  _menu: null,
  _style: null,
  _update: function(body) {
    if (body.header) {
      // title
      if (body.header.title) {
        if (typeof body.header.title === 'string') {
          this._title = { type: "label", text: body.header.title };
        } else {
          this._title = body.header.title;
        }
      }
      // menu
      if (body.header.menu) {
        this._menu = body.header.menu;
      }
      // style
      if (body.header.style) {
        this._style = body.header.style;
      }
    }
  },
  $update: function() {
    // style
    Style.node(this);

    // menu drawing
    var menuItem;
    if (this._menu) {
      if (this._menu.image) {
        menuItem = {
          class: "nav-item",
          $components: [{ $type: "img", src: this._menu.image, class: "icon float-right" } ]
        }
      } else if (this._menu && this._menu.text) {
        menuItem = {
          class: "nav-item",
          $components: [{ $type: "span", $text: this._menu.text, class: "icon nav-item float-right" }]
        }
      }
      if (this._menu.style) menuItem.style = Style.transform(this._menu.style);
    } else {
      menuItem = { 
        class: "nav-item",
        $components: [{ $type: "span", $text: "", class: "icon float-right" }]
      }
    }

    // Build title
    /*
    label type
    {
      "type": "label",
      "text": "this isa title",
      "style": {
        "font": "..",
        "size": "..",
        "color": ".."
      }
    }

    image type
    {
      "type": "image",
      "url": "..",
      "style": {
        "width": "..",
        "height": ".."
      }
    }
    */

    var titleItem;
    if (this._title) {
      var t = this._title;
      if (t.type) {
        var newStyle = {};
        if (t.style) {
          var style = Style.transform(t.style);
          for (var key in style) {
            newStyle[key] = Utils.units(style[key]);
          }
        }
        if (t.type === 'label') {
          titleItem = { $type: "h5", $text: t.text, class: "nav-item" };
          if (newStyle) titleItem.style = newStyle;
        } else if (t.type === 'image') {
          titleItem = {
            class: "nav-item",
            $components: [{
              $type: "img", src: t.url
            }]
          }
          if (newStyle) titleItem.$components[0].style = newStyle;
        }
      }
    } else {
      titleItem = { $type: "h5", $text: "", class: "nav-item" };
    }

    this.$components = [
      { $type: "span", $text: "", class: "nav-item" },
      titleItem,
      menuItem
    ]
  }
}

var Item = {
  build: function(layout, parentLayout) {
    if (layout.components) {
      return Item.layout(layout, parentLayout);
    } else {
      return Item.components(layout, parentLayout);
    }
  },
  layout: function(layout, parentLayout) {
    var style = {};
    if (layout && layout.style) {
      if (layout.style.background && !/http/.test(layout.style.background)) { style.backgroundColor = layout.style.background }
      if (layout.style.background && /http/.test(layout.style.background)) { style.backgroundImage = 'url(' + layout.style.background + ')' }
      if (layout.style.background && /http/.test(layout.style.background)) { style.backgroundSize = 'cover' }
      if (layout.style.padding) { style.padding = layout.style.padding + 'px' }
      if (layout.style.width) { style.width = layout.style.width + 'px' }
      if (layout.style.height) { style.height = layout.style.height + 'px' }
      if (layout.style.align) { style.textAlign = layout.style.align }
      if (layout.style.align) { style.alignItems = layout.style.align }
      if ((parentLayout && parentLayout.type=='vertical' && layout.style.height) || (parentLayout && parentLayout.type=='horizontal' && layout.style.width)) {
        style.flexGrow = "0";
      } else {
        style.flexGrow = "1";
      }
      if (parentLayout && parentLayout.type=='vertical' && parentLayout.style && parentLayout.style.spacing) {
        style.marginBottom = parentLayout.style.spacing+'px';
      }
      if (parentLayout && parentLayout.type=='horizontal' && parentLayout.style && parentLayout.style.spacing) {
        style.marginRight = parentLayout.style.spacing+'px';
      }
    }
    var transformed = {
      style: style,
      class: layout.type + " layout",
      $components: layout.components ? layout.components.map(function(component) { return Item.build(component, layout) }) : []
    };
    if (layout.href) {
      transformed.onclick = function(e) {
        if (layout.href.view === 'web') {
          window.location.href = layout.href.url;
        } else {
          window.location.href = layout.href.url.replace(/\.json$/,'') + "/edit";
        }
      }
    }
    return transformed;
  },
  components: function(input, parentLayout) {
    var c = Components[input.type];
    var transformed;
    if (c) {
      if (input.class) input.className = input.class;
      transformed = c(input);
    } else if (input.class === 'spacing') {
      transformed = { class: input.class };
    } else {
      transformed = { $text: input.type };
    }

    var style = {};
    if (parentLayout && parentLayout.type === 'vertical' && parentLayout.style && parentLayout.style.spacing) {
      style["marginBottom"] = parentLayout.style.spacing + "px";
    } else if (parentLayout && parentLayout.type === 'horizontal' && parentLayout.style && parentLayout.style.spacing) {
      style["marginRight"] = parentLayout.style.spacing + "px";
    }
    if (transformed.style) {
      Object.keys(style).forEach(function(key) {
        transformed.style[key] = style[key];
      })
    } else {
      transformed.style = style;
    }
    return transformed;
  }
}

var Layers = {
  _items: [],
  class: "layers hidden",
  _update: function(body) {
    if (body.layers) {
      this.classList.remove("hidden");
      this._items = body.layers;
    }
  },
  $update: function() {
    this.$components = this._items.map(Layers.tpl)
  },
  tpl: function(item) {
    var component = {};
    if (item.type === 'image') {
      component.$type = 'img';
      if (item.url) {
        component.src = item.url;
      }
    } else if (item.type === 'label') {
      component.$type = 'span';
      if (item.text) {
        component.$text = item.text;
      }
    }
    if (item.class) {
      component.class = item.class;
    }
    if (item.style) {
      /// common styling
      for (var key in item.style) {
        if (/^[0-9]+$/.test(item.style[key])) {
          item.style[key] = item.style[key] + "px";
        } else if (/.*%[ ]*[+-][ ]*[0-9]+[ ]*/.test(item.style[key])) {
          // "width": "50%-10px"
          item.style[key] = ("calc(" + item.style[key] + "px)").split("+").join(" + ").split("-").join(" - ");
        } else {
          item.style[key] = item.style[key];
        }
      }
      component.style = Style.transform(item.style)

      // layer specific styling - top,left,right,bottom
      if (item.style.top != undefined) { component.style.top = item.style.top; } 
      if (item.style.left != undefined) { component.style.left = item.style.left; } 
      if (item.style.right != undefined) { component.style.right = item.style.right; } 
      if (item.style.bottom != undefined) { component.style.bottom = item.style.bottom; } 
      component.style.position = "absolute";
    }
    return component;
  }
}

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

var Section = {
  build: function(input) {
    var output = [];
    var h = Section.header(input);
    if (h) output = output.concat(h);

    var i = Section.items(input);
    if (i) output = output.concat({
      class: "section-items", $components: i
    });
    return output;
  },
  header: function(input) {
    if (input.header) {
      var output = {
        class: "section-header"
      };
      if (input.header.style) {
        output["style"] = {};
        if (input.header.style.background) {
          output["style"]["backgroundColor"] = input.header.style.background;
        }
        if (input.header.style.padding) { 
          output["style"]["padding"] = input.header.style.padding;
        }
        if (input.header.style.width) { 
          output["style"]["width"] = input.header.style.width;
        }
        if (input.header.style.height) { 
          output["style"]["height"] = input.header.style.height;
        }

      }
      output["$components"] = [Item.build(input.header)];
      return output;
    } else {
      return null;
    }
  },
  items: function(input) {
    if (input.items) {
      return input.items.map(function(item) {
        var style = {};
        if (item.style) {
          if (item.style.background) style.backgroundColor = item.style.background;
          if (item.style.padding) style.padding = item.style.padding + 'px';
          if (item.style.width) style.width = item.style.width + 'px';
          if (item.style.height) style.height = item.style.height + 'px';
        }
        return {
          class: "section-item",
          $components: [Item.build(item)],
          style: style
        }
      })
    } else {
      return null;
    }
  }
}

var Sections = {
  class: "sections hidden",
  _update: function(body) {
    var input = body.sections;
    if (input && input.length > 0) {
      this.classList.remove("hidden");
      this.$components = input.map(function(section) {
        var output = {};

        // class
        output.class = section.type + " section";

        // style
        if (section.style) {
          output.style = Style.transform(section.style)
        }

        // components
        var ss = Section.build(section);
        if (ss) output["$components"] = ss;

        return output;
      });
    } else {
      this.$components = [];
    }
  }
}

var Style = {
  tpl: function(style) {
    var s = {};
    if (style.color) {
      s.color = style.color; 
    }
    if (style.background && /http/.test(style.background)) {
      s.backgroundImage = 'url(' + style.background + ')';
      s.backgroundSize = 'cover';
    } else {
      s.backgroundColor = style.background;
    }
    if (style.padding) s.padding = style.padding;
    if (style.width) s.width = style.width;
    if (style.height) {
      s.height = style.height;
      s.lineHeight = style.height;
    }
    if (style.font) s.fontFamily = style.font;
    if (style.size) s.fontSize = style.size;
    if (style.corner_radius) s.borderRadius = style.corner_radius;
    if (style.align) {
      s.textAlign = style.align;
      s.alignItems = style.align;
    }
    return s;
  },
  /// style a node
  node: function($node) {
    if ($node._style) {
      var s = Style.tpl($node._style);
      for (var key in s) {
        $node.style[key] = Utils.units(s[key]);
      }
    }
  },
  transform: function(style) {
    return Style.tpl(style);
  }
}

var Utils = {
  units: function(str) {
    if (/^[0-9]+$/.test(str)) {
      return str + "px";
    } else if (/\(.*%[ ]*[+-][ ]*[0-9]+px[ ]*/.test(str)) {
      // "width": "50%-10px"
      return "calc(" + str + ")";
    } else {
      return str;
    }
  },
  transformer: function(fn) {
    var result = {};
    for(var key in o) {
      try {
        if (typeof o[key] !== "undefined") {
          result[key] = o[key];
        }
      } catch (e) {
        // no need to include
      }
    }
    return result;
  },
  // Cleans up all undefined values from an object
  clean: function(obj) {
    if (obj) {
      Object.keys(obj).forEach(function (key) {
        if(typeof obj[key] === 'undefined'){
          delete obj[key];
        }
      });
      if (Object.keys(obj).length === 0) {
        return null;
      } else {
        return obj;
      }
    } else {
      return obj;
    }
  }
}

var WebContainer = {
  $type: "iframe",
  class: "webcontainer hidden",
  height: "100%",
  width: "100%",
  _update: function(background) {
    if (background.style) {
      this.style = background.style;
    }
    if (background.url) {
      this.classList.remove('hidden');
      this.src = background.url;
    } else if (background.text) {
      this.classList.remove('hidden');
      this.$html = background.text;
    }
  }
}
