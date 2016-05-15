function LangManager() {
  this.language = "";

  this.navigatorLang();

  this.langId = {
    "en": 0,
    "fr": 1
  };

  this.words = {
    "PARAMS_GENE": ["General settings", "Paramètres généraux"],
    "CHANGE_LANG": ["Change language :", "Changer la langue :"],
    "BACK_COLOR": ["Background color :", "Couleur de fond :"],
    "GRADIENT_SIZE": ["Gradient size :", "Taille du dégradé :"],
    "HEXA_SIZE": ["Hexagons size :", "Taille des hexagones :"],
    "HEXA_OP": ["Hexagons opacity :", "Opacité des hexagones :"],
    "SAVE_KEY": ["Save key :", "Clé de sauvegarde :"],
    "CREATE": ["CREATE", "CREER"],
    "SAVE": ["Save", "Sauvegarder"],
    "PARAMS_HEXA": ["Hexagon settings", "Paramètres de l\'hexagone"],
    "LINK": ["Link :", "Lien :"],
    "DELETE": ["Delete", "Supprimer"],
    "SEARCH_BAR": ["Search on Google", "Chercher sur Google"],
    "IMG": ["Picture (url):", "Image (url):"],
    "IMG_SIZE": ["Picture size :", "Taille de l'image :"],
    "ADD_HEXA": ["Add hexagon", "Ajouter un hexagone"],
    "MODIF_HEXA": ["Modify hexagon", "Modifier un hexagone"],
    "LOGIN": ["Sign in", "Se connecter"],
    "USERNAME": ["Username :", "Nom d'utilisateur :"],
    "PASSWORD": ["Password :", "Mot de passe :"],
    "REGISTER": ["Sign up", "S'enregistrer"],
    "EMAIL": ["Email address :", "Adresse e-mail :"],
    "EMAIL_ERROR": ["Invalid email !", "E-mail invalide !"],
    "USERNAME_ERROR": ["Username already taken !", "Nom d'utilisateur déjà prit !"],
    "NEW_USER": ["Your account is created, you can sign in with it", "Votre compte est crée, vous pouvez vous connecter"],
    "NO_ACCOUNT": ["This account doesn't exist !", "Ce compte n'existe pas !"],
    "MDP_ERROR": ["Invalid password !", "Mot de passe incorrect !"],
    "SAVE_CONFIRM": ["Your menu has been saved", "Votre menu a été sauvegardé"],
    "LOGOUT": ["Sign out", "Se déconnecter"],
    "CONNECT_INFO": ["Sign in to save your menu", "Connectez-vous pour sauvegarder votre menu"],
    "WELCOME": ["Welcome to HexaMenu", "Bienvenue sur HexaMenu"],
    "OK": ["Submit", "Valider"],
    "CONN": ["Sign in", "Connexion"],
    "NOACC": ["No account yet ?", "Pas encore de compte ?"],
    "ALREADYACC": ["Already have an account ?", "Vous avez déjà un compte ?"],
    "HELLO": ["Hello, ", "Bonjour, "],
    "UPLOAD_IMG": ["Upload picture", "Envoyer une image"],
    "HEXA_MARGIN": ["Space between hexagons :", "Espacement des hexagones :"],
    "SHOW_SEARCHBAR": ["Show search bar", "Barre de recherche"],
    "TEXT": ["Text :", "Texte :"],
    "TEXT_COLOR": ["Text color :", "Couleur du texte :"]
  };
}



LangManager.prototype = {
  constructor: LangManager,
  setLanguage: function() {
    $("#paramsTitle").html(this.word("PARAMS_GENE"));
    $("#lang").html(this.word("CHANGE_LANG"));
    $("#backColor").html(this.word("BACK_COLOR"));
    $("#gradientSize").html(this.word("GRADIENT_SIZE"));
    $("#hexaSize").html(this.word("HEXA_SIZE"));
    $("#save").html(this.word("SAVE"));
    $("#paramsHexaTitle").html(this.word("PARAMS_HEXA"));
    $("#deleteButton").html(this.word("DELETE"));
    $("#link").html(this.word("LINK"));
    $("#img").html(this.word("IMG"));
    $("#imgSize").html(this.word("IMG_SIZE"));
    $("#backcolorhexa").html(this.word("BACK_COLOR"));
    $("#searchBar").attr("placeholder", this.word("SEARCH_BAR"));
    $("#addHexa").html(this.word("ADD_HEXA"));
    $("#generalParams").html(this.word("PARAMS_GENE"));
    $("#modifHexa").html(this.word("MODIF_HEXA"));
    $("#paramsSubmitButton").html(this.word("OK"));
    $("#okButton").html(this.word("OK"));
    $("#hello").html(this.word("HELLO"));
    $("#uploadButton").html(this.word("UPLOAD_IMG"));
    $("#marginSize").html(this.word("HEXA_MARGIN"));
    $("#showSearchBar").html(this.word("SHOW_SEARCHBAR"));
    $("#text").html(this.word("TEXT"));
    $("#textColor").html(this.word("TEXT_COLOR"));

    // LOGIN & REGISTER
    $("#username_lbl").html(this.word("USERNAME"));
    $("#password_lbl").html(this.word("PASSWORD"));
    $("#conn").html(this.word("CONN"));
    $("#noacc").html(this.word("NOACC"));
    $("#signin_button").html(this.word("LOGIN"));
    $("#signup").html(this.word("REGISTER"));
    $("#already_acc").html(this.word("ALREADYACC"));
    $("#signin_button").html(this.word("LOGIN"));
    $("#register").html(this.word("REGISTER"));
    $("#logout_button").html(this.word("LOGOUT"));
  },
  word: function(w){
    return this.words[w][this.langId[this.language]] || "";
  },
  navigatorLang: function() {
    var navLang;

    if (navigator.browserLanguage)
      navLang = navigator.browserLanguage;
    else
      navLang = navigator.language;

    if (navLang.indexOf('fr') > -1)
      this.language = 'fr';
    else
      this.language = 'en';
  }
};
