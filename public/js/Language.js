function LangManager() {
  this.navigatorLang();

  this.langId = {
    "en": 0,
    "fr": 1
  };

  this.lang = 'fr';

  this.words = {
    "PARAMS_GENE": ["General settings", "Paramètres généraux"],
    "CHANGE_LANG": ["Change language :", "Changer la langue :"],
    "COLOR": ["Color :", "Couleur :"],
    "SHADOW_SIZE": ["Shadow size :", "Taille de l'ombre :"],
    "SIZE": ["Size :", "Taille :"],
    "CREATE": ["CREATE", "CREER"],
    "PARAMS_HEXA": ["Hexagon settings", "Paramètres de l'hexagone"],
    "LINK": ["Link :", "Lien :"],
    "DELETE": ["Delete", "Supprimer"],
    "SEARCH_BAR": ["Search on Google", "Chercher sur Google"],
    "IMG": ["Picture (url):", "Image (url):"],
    "ADD_HEXA": ["Add hexagon", "Ajouter un hexagone"],
    "MODIF_HEXA": ["Modify hexagon", "Modifier un hexagone"],
    "LOGOUT": ["Sign out", "Se déconnecter"],
    "OK": ["Submit", "Valider"],
    "NOACC": ["No account yet ?", "Pas encore de compte ?"],
    "ALREADYACC": ["Already have an account ?", "Vous avez déjà un compte ?"],
    "HELLO": ["Hello, ", "Bonjour, "],
    "UPLOAD_IMG": ["Upload picture", "Envoyer une image"],
    "HEXA_MARGIN": ["Spacing :", "Espacement :"],
    "SHOW_SEARCHBAR": ["Showed", "Affichée"],
    "TEXT": ["Text :", "Texte :"],
    "SEARCHBAR_POS": ["Position :", "Position :"],
    "BACKIMG": ["Image :", "Image :"],
    "CENTERBACK": ["Center", "Centrer"],
    "REPEATBACK": ["Repeat", "Répéter"],
    "AJUSTBACK": ["Ajust", "Ajuster"],
    "BACKGROUND": ["Background", "Fond"],
    "HEXA": ["Hexagons", "Hexagones"],
    "SEARCHBAR": ["Search bar", "Barre de recherche"],
    "TEXT_TITLE": ["Text", "Texte"],
    "IMPORT_EXPORT": ["Import/Export", "Importer/Exporter"],
    "EXPORT": ["Export :", "Exporter :"],
    "IMPORT": ["Import :", "Importer :"],
    "COPY_EXPORT_CODE": ["Copy the code", "Copier le code"],
    "PASTE_HERE": ["Paste a code here", "Collez un code ici"],
    "CODE_ERROR": ["This code isn't valid.", "Ce code n'est pas valide."],
    "YOUTUBE_VIDEO": ["Youtube video ID:", "ID de la vidéo Youtube:"],
    "SHADOW_COLOR": ["Shadow color", "Couleur de l'ombre"],
    "SOUND": ["Sound", "Son"],
    "SHOW_MESSAGES": ["Show helps", "Afficher les aides"],

    // MESSAGES
    "WELCOME": ["Welcome to Hexom !", "Bienvenue sur Hexom !"],
    "WHERE_ADD_HEXA": ["Choose where you want to add the hexagon", "Choisissez où ajouter l'hexagone"],
    "MODIFY_HEXA_PROP": ["Modify the hexagon properties", "Modifiez les paramètres de l'hexagone"],
    "MODIFY_GENE_PROP": ["Modify the general settings", "Modifiez les paramètres généraux"],
    "CHOOSE_HEXA_TO_MOD": ["Choose the hexagon to modify", "Choisissez l'hexagone à modifier"],

    // LOGIN & REGISTER
    "CONN": ["Sign in", "Connexion"],
    "LOGIN": ["Sign in", "Se connecter"],
    "USERNAME": ["Username :", "Nom d'utilisateur :"],
    "PASSWORD": ["Password :", "Mot de passe :"],
    "REGISTER": ["Sign up", "S'enregistrer"],
    "EMAIL": ["Email address :", "Adresse e-mail :"],
    "TITLE_SIGNIN": ["Hexom - Sign in", "Hexom - Connexion"],
    "TITLE_SIGNUP": ["Hexom - Sign up", "Hexom - S'enregistrer"],

    // LOGIN ERRORS MESSAGES
    "USERNAME_NOTEXIST": ["This account doesn't exist.", "Ce compte n'existe pas."],
    "PASSWORD_WRONG": ["Incorrect password.", "Mauvais mot de passe."],

    // REGISTER ERRORS MESSAGES
    "USERNAME_INVALID": ["Invalid username.", "Nom d'utilisateur invalide."],
    "USERNAME_SHORT": ["Username too short.", "Nom d'utilisateur trop court."],
    "USERNAME_LONG": ["Username too long.", "Nom d'utilisateur trop long."],
    "USERNAME_EXIST": ["Username already exist.", "Nom d'utilisateur déjà existant."],
    "PASSWORD_SHORT": ["Password too short.", "Mot de passe trop court."],
    "PASSWORD_LONG": ["Password too long.", "Mot de passe trop long."],
    "EMAIL_INVALID": ["Invalid email.", "Email invalide."],
    "EMAIL_EXIST": ["Email already exist.", "Email déjà existante."]
  };
}



LangManager.prototype = {
  constructor: LangManager,
  setLanguage: function() {
    $("#paramsTitle").html(this.word("PARAMS_GENE"));
    $("#lang").html(this.word("CHANGE_LANG"));
    $("#backColor").html(this.word("COLOR"));
    $("#shadowSize").html(this.word("SHADOW_SIZE"));
    $("#hexaSize").html(this.word("SIZE"));
    $("#paramsHexaTitle").html(this.word("PARAMS_HEXA"));
    $("#deleteButton").html(this.word("DELETE"));
    $("#link").html(this.word("LINK"));
    $("#img").html(this.word("IMG"));
    $("#imgSize").html(this.word("SIZE"));
    $("#backcolorhexa").html(this.word("COLOR"));
    $("#addHexa").html(this.word("ADD_HEXA"));
    $("#generalParams").html(this.word("PARAMS_GENE"));
    $("#modifHexa").html(this.word("MODIF_HEXA"));
    $("#paramsSubmitButton").html(this.word("OK"));
    $("#okButton").html(this.word("OK"));
    $("#hello").html(this.word("HELLO"));
    $("#uploadButton").html(this.word("UPLOAD_IMG"));
    $("#uploadBackImgButton").html(this.word("UPLOAD_IMG"));
    $("#hexaMargin").html(this.word("HEXA_MARGIN"));
    $("#searchBar").attr("placeholder", this.word("SEARCH_BAR"));
    $("#showSearchbar").html(this.word("SHOW_SEARCHBAR"));
    $("#text").html(this.word("TEXT"));
    $("#textColor").html(this.word("COLOR"));
    $("#searchPos").html(this.word("SEARCHBAR_POS"));
    $("#backImage").html(this.word("BACKIMG"));
    $("#center").html(this.word("CENTERBACK"));
    $("#repeat").html(this.word("REPEATBACK"));
    $("#ajust").html(this.word("AJUSTBACK"));
    $("#bg_grp.subtitle").html(this.word("BACKGROUND"));
    $("#bgHexa_grp.subtitle").html(this.word("BACKGROUND"));
    $("#hexa_grp.subtitle").html(this.word("HEXA"));
    $("#search_grp.subtitle").html(this.word("SEARCHBAR"));
    $("#text_grp.subtitle").html(this.word("TEXT_TITLE"));
    $("#importExport_grp.subtitle").html(this.word("IMPORT_EXPORT"));
    $("#export").html(this.word("EXPORT"));
    $("#import").html(this.word("IMPORT"));
    $("#exportButton").html(this.word("COPY_EXPORT_CODE"));
    $("#import_ipt").attr("placeholder", this.word("PASTE_HERE"));
    $("#codeError").html(this.word("CODE_ERROR"));
    $("#youtubeVid").html(this.word("YOUTUBE_VIDEO"));
    $("#shadowColor").html(this.word("SHADOW_COLOR"));
    $("#videoSound").html(this.word("SOUND"));
    $("#showMessages").html(this.word("SHOW_MESSAGES"));

    // MESSAGES
    $("#welcome_mess").html(this.word("WELCOME"));
    $("#whereaddhexa_mess").html(this.word("WHERE_ADD_HEXA"));
    $("#modifyhexaprop_mess").html(this.word("MODIFY_HEXA_PROP"));
    $("#modifygeneralprop_mess").html(this.word("MODIFY_GENE_PROP"));
    $("#choosehexatomod_mess").html(this.word("CHOOSE_HEXA_TO_MOD"));

    // LOGIN & REGISTER
    $("#username_lbl").html(this.word("USERNAME"));
    $("#password_lbl").html(this.word("PASSWORD"));
    $("#conn").html(this.word("CONN"));
    $("#noacc").html(this.word("NOACC"));
    $("#signin_button").html(this.word("LOGIN"));
    $("#signup").html(this.word("REGISTER"));
    $("#signup_button").html(this.word("REGISTER"));
    $("#already_acc").html(this.word("ALREADYACC"));
    $("#signin_button").html(this.word("LOGIN"));
    $("#register").html(this.word("REGISTER"));
    $("#logout_button").html(this.word("LOGOUT"));
    $("#title_signin").html(this.word("TITLE_SIGNIN"));
    $("#title_signup").html(this.word("TITLE_SIGNUP"));

    // LOGIN ERRORS MESSAGES
    $("#username_not_exist").html(this.word("USERNAME_NOTEXIST"));
    $("#password_wrong").html(this.word("PASSWORD_WRONG"));

    // REGISTER ERRORS MESSAGES
    $("#username_invalid").html(this.word("USERNAME_INVALID"));
    $("#username_short").html(this.word("USERNAME_SHORT"));
    $("#username_long").html(this.word("USERNAME_LONG"));
    $("#username_exist").html(this.word("USERNAME_EXIST"));
    $("#password_short").html(this.word("PASSWORD_SHORT"));
    $("#password_long").html(this.word("PASSWORD_LONG"));
    $("#email_invalid").html(this.word("EMAIL_INVALID"));
    $("#email_exist").html(this.word("EMAIL_EXIST"));
  },
  word: function(w) {
    return this.words[w][this.langId[this.lang]];
  },
  navigatorLang: function() {
    var navLang;

    if (navigator.browserLanguage)
      navLang = navigator.browserLanguage;
    else
      navLang = navigator.language;

    if (navLang.indexOf('fr') > -1)
      return 'fr';
    else
      return 'en';
  }
};
