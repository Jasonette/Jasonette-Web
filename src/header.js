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
