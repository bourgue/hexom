function LangManager() {

  this.language = "fr";

  this.langId = {
    "us": 0,
    "fr": 1
  };

  this.words = {
    "PARAMS_GENE": ["General settings", "Paramètres généraux"],
    "CHANGE_LANG": ["Change language :", "Changer la langue :"],
    "BACK_COLOR": ["Background color :", "Couleur de fond :"],
    "SHADOW_COLOR": ["Shadow color :", "Couleur de l\'ombre :"],
    "SHADOW_SIZE": ["Shadow size :", "Taille de l\'ombre :"],
    "HEXA_SIZE": ["Hexagons size :", "Taille des hexagones :"],
    "HEXA_OP": ["Hexagons opacity :", "Opacité des hexagones :"],
    "SAVE_KEY": ["Save key :", "Clé de sauvegarde :"],
    "CREATE": ["CREATE", "CREER"],
    "IMPORT": ["IMPORT", "IMPORTER"],
    "SAVE": ["SAVE", "SAUVEGARDER"],
    "PARAMS_HEXA": ["Hexagon settings", "Paramètres de l\'hexagone"],
    "LINK": ["Link :", "Lien :"],
    "BACKCOLORHEXA": ["Background color :", "Couleur de fond :"],
    "DELETE": ["DELETE", "SUPPRIMER"],
    "SEARCH_BAR": ["Search on Google", "Chercher sur Google"],
    "IMG": ["Picture (url):", "Image (url):"],
    "IMG_SIZE": ["Picture size :", "Taille de l'image :"]
      //"GOOGLE_SAVE": 	["Save your bookmarks with", "Sauvegardez votre menu avec"]
  };
}



LangManager.prototype = {

  constructor: LangManager,
  setLanguage: function() {
    $("#paramsTitle").html(this.words.PARAMS_GENE[this.langId[this.language]]);
    $("#lang").html(this.words.CHANGE_LANG[this.langId[this.language]]);
    $("#backcolor").html(this.words.BACK_COLOR[this.langId[this.language]]);
    $("#shadowcolor").html(this.words.SHADOW_COLOR[this.langId[this.language]]);
    $("#shadowsize").html(this.words.SHADOW_SIZE[this.langId[this.language]]);
    $("#hexasize").html(this.words.HEXA_SIZE[this.langId[this.language]]);
    $("#hexaop").html(this.words.HEXA_OP[this.langId[this.language]]);
    $("#keyString").html(this.words.SAVE_KEY[this.langId[this.language]]);
    $("#newKey").html(this.words.CREATE[this.langId[this.language]]);
    $("#importButton").html(this.words.IMPORT[this.langId[this.language]]);
    $("#saveButton").html(this.words.SAVE[this.langId[this.language]]);
    $("#paramsHexaTitle").html(this.words.PARAMS_HEXA[this.langId[this.language]]);
    $("#deleteButton").html(this.words.DELETE[this.langId[this.language]]);
    $("#link").html(this.words.LINK[this.langId[this.language]]);
    $("#img").html(this.words.IMG[this.langId[this.language]]);
    $("#imgSize").html(this.words.IMG_SIZE[this.langId[this.language]]);
    $("#backcolorhexa").html(this.words.BACKCOLORHEXA[this.langId[this.language]]);
    $("#searchBar").attr("placeholder", this.words.SEARCH_BAR[this.langId[this.language]]);
    //$("#savetext").html(words[GOOGLE_SAVE][langId[language]]);
  }
};
