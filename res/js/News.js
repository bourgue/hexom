function News() {

}

News.prototype = {
  constructor: News,
  add: function(text) {
    $("body").prepend('<p class="news unselectable">' + text + '</p>');
    $(".news").hide();
    $(".news").slideDown("slow").delay(3000).slideUp("slow", function() {
      $(".news").remove();
    });
  }
};
