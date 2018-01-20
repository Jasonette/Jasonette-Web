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
