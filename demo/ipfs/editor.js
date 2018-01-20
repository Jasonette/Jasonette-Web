cm = function(vars){
  var e = {
    id: "editor",
    $cell: true,
    $type: "textarea",
    _ed: null,
    _value: null,
    $init: function(){
      this._ed = CodeMirror.fromTextArea(this, {
        mode: "application/json", lineNumbers: true, lineWrapping: true, lint: true, styleActiveLine: true, autoCloseBrackets: true, matchBrackets: true, viewportMargin: true, theme: "railscasts", gutters: ["CodeMirror-lint-markers"]
      })
      var wrapper = this._ed.getWrapperElement()
      wrapper.style.minHeight = window.innerHeight;
      wrapper.setAttribute("class", wrapper.getAttribute("class") + " " + vars.class)
      if (vars.style) wrapper.style = vars.style

      try{
        this._ed.on("change", function(e){
          this._value = this._ed.getValue();
          if(this._update) this._update(this._ed.getValue());
        }.bind(this))
      } catch (e) {}
    },
  }
  for(var key in vars){
    if(key !== "$init") e[key] = vars[key];
  }
  return e;
}
