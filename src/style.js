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
