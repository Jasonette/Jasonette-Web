var WebContainer = {
  $type: "iframe",
  class: "webcontainer hidden",
  height: "100%",
  width: "100%",
  _update: function(background) {
    if (background.style) {
      this.style = background.style;
    }
    if (background.url) {
      this.classList.remove('hidden');
      this.src = background.url;
    } else if (background.text) {
      this.classList.remove('hidden');
      this.$html = background.text;
    }
  }
}
