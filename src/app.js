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
