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
