function Search(){
  $('#searchBar').keydown(function(event) {
        if (event.keyCode == 13) {
            window.location = "http://www.google.com/search?q=" + $('#searchBar').val();
         }
    });

}

Search.prototype = {
  constructor: Search
};
