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
