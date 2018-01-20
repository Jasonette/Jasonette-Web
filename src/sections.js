var Sections = {
  class: "sections",
  _update: function(body) {
    var input = body.sections;
    if (input && input.length > 0) {
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
