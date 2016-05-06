function Search() {
  $('#searchBar').keydown(function(event) {
    if (event.keyCode == 13) {
      window.location = "http://www.google.com/search?q=" + $('#searchBar').val();
    }
  });
}

$("#searchBar").autocomplete({
  source: function(request, response) {
    console.log(langManager.language);
    $.getJSON("http://suggestqueries.google.com/complete/search?callback=?", {
      "hl": langManager.langId[langManager.language], // Language
      //  "ds":"yt", // Restrict lookup to youtube
      "jsonp": "suggestCallBack", // jsonp callback function name
      "q": request.term, // query term
      "client": "youtube" // force youtube style response, i.e. jsonp
    });
    suggestCallBack = function(data) {
      var suggestions = [];
      $.each(data[1], function(key, val) {
        suggestions.push({
          "value": val[0]
        });
      });
      suggestions.length = 5; // prune suggestions list to only 5 items
      response(suggestions);
    };
  },
});

Search.prototype = {
  constructor: Search,
  show: function() {
    $("#searchBar").show();
  },
  hide: function() {
    $("#searchBar").hide();
  },
  update: function() {
    if (showSearchBar)
      this.show();
    else
      this.hide();
  }
};
