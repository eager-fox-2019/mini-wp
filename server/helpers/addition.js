module.exports = {
  toProperCase : function(str){
      return str.replace(/\w\S*/g, function(str){return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();});
  }
}