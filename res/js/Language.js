function LangManager(){
	//Constructor
}

LangManager.prototype = {
	constructor: LangManager,
	setLanguage: function(){
		$("#paramsTitle").html(words["PARAMS_GENE"][langId[language]]);
		$("#lang").html(words["CHANGE_LANG"][langId[language]]);
		$("#backcolor").html(words["BACK_COLOR"][langId[language]]);
		$("#shadowcolor").html(words["SHADOW_COLOR"][langId[language]]);
		$("#shadowsize").html(words["SHADOW_SIZE"][langId[language]]);
		$("#hexasize").html(words["HEXA_SIZE"][langId[language]]);
		$("#hexaop").html(words["HEXA_OP"][langId[language]]);
		$("#key").html(words["SAVE_KEY"][langId[language]]);
		$("#newKey").html(words["CREATE"][langId[language]]);
		$("#importButton").html(words["IMPORT"][langId[language]]);
		$("#saveButton").html(words["SAVE"][langId[language]]);
		$("#paramsHexaTitle").html(words["PARAMS_HEXA"][langId[language]]);
		$("#deleteButton").html(words["DELETE"][langId[language]]);
		$("#link").html(words["LINK"][langId[language]]);
		$("#backcolorhexa").html(words["BACKCOLORHEXA"][langId[language]]);
	}
}