function ParamsWindow(){
	$("body").prepend('<div id="paramsWindow" class="unselectable">' +
		'<span id="dragIcon" class="ui-icon ui-icon-arrow-4"></span>' +
		'<div class="titre" id="paramsTitle"></div>' +
	 	'<ul>' +
	 	'<li>' + '<div id="lang"></div>' + '<img src="res/img/us.png" id="us" class="flag" onclick="ParamsWindow.prototype.languageChange(this.id);" />' + '<img src="res/img/fr.png" class="flag" id="fr" onclick="ParamsWindow.prototype.languageChange(this.id);"/>' + '</li>' +
	 	'<li>' + '<div id="backcolor"></div>' + '<input id="backgroundColor" type="color" onchange="ParamsWindow.prototype.backgroundColorChange(this.value);"/>' + '</li>' +
		'<li>' + '<div id="shadowcolor"></div>' + '<input id="shadowColor" type="color" onchange="ParamsWindow.prototype.shadowColorChange(this.value);"/>' + '</li>' +
		'<li>' + '<div id="shadowsize"></div>' + '<input id="shadowSize" value="200" max="300" min="0" step="5" type="range" onchange="ParamsWindow.prototype.shadowSizeChange(this.value)"/>' + '</li>' +
		'<li>' + '<div id="hexasize"></div>' + '<input id="hexaSize" value="1" max="2" min="0.8" step="0.2" type="range" onchange="ParamsWindow.prototype.hexaSizeChange(this.value)"/>' + '</li>' +
		'<li>' + '<div id="hexaop"></div>' + '<input id="hexaOpacity" value="0.4" max="1" min="0.1" step="0.1" type="range" onchange="ParamsWindow.prototype.hexaOpacityChange(this.value)"/>' +
		'<input id="hexaOpacityHover" value="1" max="1" min="0.1" step="0.1" type="range" onchange="ParamsWindow.prototype.hexaOpacityHoverChange(this.value)"/>' + '</li>' +
		'<li>' + '<div id="key"></div>' + '<input id="key" type="text"/>' +
		'<div id="keyInfos"></div>' + '</li>' +
		'<li>' + '<div class="button" id="newKey" onclick="ParamsWindow.prototype.newKeyClick();"></div>' + '</li>' +
		'<li>' + '<div class="button" id="importButton"></div>' + '</li>' +
		'<li>' + '<div class="button" id="saveButton"></div>' + '</li>' +
		'</ul>' +
		'</div>');

	$("#paramsWindow").draggable({ containment: "body", scroll:false });
}

ParamsWindow.prototype = {
	constructor: ParamsWindow,
	close: function(){
		$("#paramsWindow").css('display', 'none');
	},
	open: function(){
		$("#paramsWindow").css('display', 'block');
	},
	languageChange: function(lang){
		language = lang;
		langManager.setLanguage();
	},
	backgroundColorChange: function(value){
		$("body").css('background', value);
		backgroundColor = value;
	},
	shadowColorChange: function(value){
		$("body").css('box-shadow', '0 0 ' + shadowSize + 'px ' + value + ' inset');
		shadowColor = value;
	},
	shadowSizeChange: function(value){
		$("body").css('box-shadow', '0 0 ' + value + 'px ' + shadowColor + ' inset');
		shadowSize = value;
	},

	hexaSizeChange: function(value){
		grid.scale = value;
		grid.redraw();
	},

	hexaOpacityChange: function(value){
		$(".hex").css('opacity', value);
		op = value;
	},

	hexaOpacityHoverChange: function(value){
		$(".hex").mouseenter(function() { 
		    $(this).css("opacity", value);
		});
		$(".hex").mouseleave(function() { 
		    $(this).css("opacity", op);
		});
		opHover = value;
	},

	keySuccess: function(message){
		$("#keyInfos").html(message);
		$("#keyInfos").css('color', '#0BE300');
	},

	keyFail: function(message){
		$("#keyInfos").html(message);
		$("#keyInfos").css('color', '#FF0000');
	},

	newKeyClick: function(){
		var value = $("#key").val();
		if(value.length >= keyMiniSize)
			properties.send(value);
		else
			this.keyFail("La clé doit faire minimum " + keyMiniSize + " caractères.");
	},

	//-----EN ATTENDANT LA BDD-----//

	getShadowSize: function(css){
		var i = 0;
		var j = 0;
		var size = "";
		while(i < 6){
			if(i == 5)
				size += css[j];
			if(css[j] == ' ')
				i++;
			j++;
		}

		return size;
	},

	getShadowColor: function(css){
		var i = 0;
		var j = 0;
		var color = "";
		while(i < 7){
			if(i == 0 || i == 1 || i == 2)
				color += css[j];
			if(css[j] == ' ')
				i++;
			j++;
		}

		return color;
	}
}
