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
