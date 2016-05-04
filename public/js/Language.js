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
    "SHADOW_COLOR": ["Shadow color :", "Couleur de l\'ombre :"],
    "SHADOW_SIZE": ["Shadow size :", "Taille de l\'ombre :"],
    "HEXA_SIZE": ["Hexagons size :", "Taille des hexagones :"],
    "HEXA_OP": ["Hexagons opacity :", "Opacité des hexagones :"],
    "SAVE_KEY": ["Save key :", "Clé de sauvegarde :"],
    "CREATE": ["CREATE", "CREER"],
    "SAVE": ["Save", "Sauvegarder"],
    "PARAMS_HEXA": ["Hexagon settings", "Paramètres de l\'hexagone"],
    "LINK": ["Link :", "Lien :"],
    "BACKCOLORHEXA": ["Background color :", "Couleur de fond :"],
    "DELETE": ["DELETE", "SUPPRIMER"],
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
    // "MAXCHAR": ["Maximum " + inputMaxLength + " characters !", "Maximum " + inputMaxLength + " caractères !"],
    // "MINCHAR": ["Minimum " + inputMinLength + " characters !", "Minimum " + inputMinLength + " caractères !"],
    "EMAIL_ERROR": ["Invalid email !", "E-mail invalide !"],
    "USERNAME_ERROR": ["Username already taken !", "Nom d'utilisateur déjà prit !"],
    "NEW_USER": ["Your account is created, you can sign in with it", "Votre compte est crée, vous pouvez vous connecter"],
    "NO_ACCOUNT": ["This account doesn't exist !", "Ce compte n'existe pas !"],
    "MDP_ERROR": ["Invalid password !", "Mot de passe incorrect !"],
    "SAVE_CONFIRM": ["Your menu has been saved", "Votre menu a été sauvegardé"],
    "LOGOUT": ["Sign out", "Se déconnecter"],
    "CONNECT_INFO": ["Sign in to save your menu", "Connectez-vous pour sauvegarder votre menu"],
    "WELCOME": ["Welcome to HexaMenu", "Bienvenue sur HexaMenu"],
    // "WELCOME_TXT": ["HexaMenu is a customizable home page where your favorite websites are hexagons. You can sign up now and without mail confirmation.", "HexaMenu est une page d'accueil personnalisable où vos sites webs favoris sont des hexagones. Vous pouvez vous inscrire maintenant, gratuitement et sans vérification par mail."],
    "OK": ["OK", "OK"],
    "CONN": ["Sign in", "Connexion"],
    "NOACC": ["No account yet ?", "Pas encore de compte ?"],
    "ALREADYACC": ["Already have an account ?", "Vous avez déjà un compte ?"],
    "HELLO": ["Hello, ", "Bonjour, "],
    "UPLOAD_IMG": ["Upload picture", "Envoyer une image"]
  };
}



LangManager.prototype = {
  constructor: LangManager,
  setLanguage: function() {
    $("#paramsTitle").html(this.words.PARAMS_GENE[this.langId[this.language]]);
    $("#lang").html(this.words.CHANGE_LANG[this.langId[this.language]]);
    $("#backColor").html(this.words.BACK_COLOR[this.langId[this.language]]);
    $("#shadowColor").html(this.words.SHADOW_COLOR[this.langId[this.language]]);
    $("#shadowSize").html(this.words.SHADOW_SIZE[this.langId[this.language]]);
    $("#hexaSize").html(this.words.HEXA_SIZE[this.langId[this.language]]);
    $("#save").html(this.words.SAVE[this.langId[this.language]]);
    $("#paramsHexaTitle").html(this.words.PARAMS_HEXA[this.langId[this.language]]);
    $("#deleteButton").html(this.words.DELETE[this.langId[this.language]]);
    $("#link").html(this.words.LINK[this.langId[this.language]]);
    $("#img").html(this.words.IMG[this.langId[this.language]]);
    $("#imgSize").html(this.words.IMG_SIZE[this.langId[this.language]]);
    $("#backcolorhexa").html(this.words.BACKCOLORHEXA[this.langId[this.language]]);
    $("#searchBar").attr("placeholder", this.words.SEARCH_BAR[this.langId[this.language]]);
    $("#addHexa").html(this.words.ADD_HEXA[this.langId[this.language]]);
    $("#generalParams").html(this.words.PARAMS_GENE[this.langId[this.language]]);
    $("#modifHexa").html(this.words.MODIF_HEXA[this.langId[this.language]]);
    $("#paramsSubmitButton").html(this.words.OK[this.langId[this.language]]);
    $("#okButton").html(this.words.OK[this.langId[this.language]]);
    $("#hello").html(this.words.HELLO[this.langId[this.language]]);
    $("#uploadButton").html(this.words.UPLOAD_IMG[this.langId[this.language]]);

    // LOGIN & REGISTER
    $("#username_lbl").html(this.words.USERNAME[this.langId[this.language]]);
    $("#password_lbl").html(this.words.PASSWORD[this.langId[this.language]]);
    $("#conn").html(this.words.CONN[this.langId[this.language]]);
    $("#noacc").html(this.words.NOACC[this.langId[this.language]]);
    $("#signin_button").html(this.words.LOGIN[this.langId[this.language]]);
    $("#signup").html(this.words.REGISTER[this.langId[this.language]]);
    $("#already_acc").html(this.words.ALREADYACC[this.langId[this.language]]);
    $("#signin_button").html(this.words.LOGIN[this.langId[this.language]]);
    $("#register").html(this.words.REGISTER[this.langId[this.language]]);
    $("#logout_button").html(this.words.LOGOUT[this.langId[this.language]]);

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
