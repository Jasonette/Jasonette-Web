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
