function Search() {
  $('#searchBar').keydown(function(event) {
    if (event.keyCode == 13) {
      window.location = "http://www.google.com/search?q=" + $('#searchBar').val();
    }
  });
}

$("#searchBar").autocomplete({
  source: function(request, response) {
    $.getJSON("http://suggestqueries.google.com/complete/search?callback=?", {
      "hl": langManager.langId[langManager.language],
      "jsonp": "suggestCallBack",
      "q": request.term,
      "client": "youtube"
    });
    suggestCallBack = function(data) {
      var suggestions = [];
      $.each(data[1], function(key, val) {
        suggestions.push({
          "value": val[0]
        });
      });
      suggestions.length = 5;
      response(suggestions);
    };
  },
});

Search.prototype = {
  constructor: Search,
  show: function() {
    $("#searchBar").fadeIn(fadeSpeed);
  },
  hide: function() {
    $("#searchBar").fadeOut(fadeSpeed);
  },
  update: function() {
    $("#searchBar").css('top', 'calc(' + infos.searchPos.value + '% - 25px)');
    if (infos.showSearchbar.value)
      this.show();
    else
      this.hide();
  }
};
