var Utils = {
  units: function(str) {
    if (/^[0-9]+$/.test(str)) {
      return str + "px";
    } else if (/\(.*%[ ]*[+-][ ]*[0-9]+px[ ]*/.test(str)) {
      // "width": "50%-10px"
      return "calc(" + str + ")";
    } else {
      return str;
    }
  },
  transformer: function(fn) {
    var result = {};
    for(var key in o) {
      try {
        if (typeof o[key] !== "undefined") {
          result[key] = o[key];
        }
      } catch (e) {
        // no need to include
      }
    }
    return result;
  },
  // Cleans up all undefined values from an object
  clean: function(obj) {
    if (obj) {
      Object.keys(obj).forEach(function (key) {
        if(typeof obj[key] === 'undefined'){
          delete obj[key];
        }
      });
      if (Object.keys(obj).length === 0) {
        return null;
      } else {
        return obj;
      }
    } else {
      return obj;
    }
  }
}
