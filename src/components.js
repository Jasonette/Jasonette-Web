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
