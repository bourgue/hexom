function Grid(){
	this.div = document.getElementById("grid");
	this.pos = [$(window).width()/2,$(window).height()/2];
	this.scale = 1;
	this.key = "menu";

	this.hexagons = {
		margin: 10,
		sizeXY: [100*this.scale,Math.round(Math.sqrt((100*this.scale)*(100*this.scale) + (58*this.scale) * (58*this.scale)) * 100) / 100],
		
		positions: [],
		colors: [],
		links: []
	};

	this.addParamsHexa();
}

Grid.prototype = {
	constructor: Grid,
	//Hexagon
	addHexagon: function(pos,type){
		var id = pos[0] + ";" + pos[1];
		var f = [this.pos[0] - this.hexagons.sizeXY[0] / 2 + pos[0] * this.hexagons.sizeXY[0] + this.hexagons.margin * pos[0] * this.scale, this.pos[1] - this.hexagons.sizeXY[1]/4 + pos[1] * (this.hexagons.sizeXY[1] - this.hexagons.sizeXY[1]/4) + this.hexagons.margin * pos[1] * this.scale];
		
		if(pos[1] % 2 != 0)
			f[0] += (this.hexagons.sizeXY[0] + this.hexagons.margin) / 2;
		

		var hexa = document.createElement("div");
		hexa.setAttribute('id', id);
		if(type == "preview"){
			hexa.setAttribute('class', "preview");
			hexa.setAttribute('onclick',"grid.clickPrevewHexa(this)");
		}
		else if(type == "paramsHexa"){
			hexa.setAttribute('class', "hex");
			hexa.setAttribute('onclick',"grid.clickParamsHexa()");
		}
		else{
			hexa.setAttribute('class', "hex");
			hexa.style.background = this.hexagons.colors[tools.getPosInArrays(pos)];
			hexa.setAttribute('onclick',"grid.clickHexagon(this)");
		}
		hexa.innerHTML = '<div class="hex-in1" id="' + id + '"><div class="hex-in2" id="' + id + '"></div></div>';
		hexa.style.transform = "scale("+this.scale+")";
		hexa.style.left = f[0] + "px";
		hexa.style.top = f[1] + "px";
		this.div.appendChild(hexa);
	},
	clickHexagon: function(hexa){
		if(!previewing){
			//Ouvre le lien AVEC ou SANS http://
			if(this.hexagons.links[tools.getPosInArrays(tools.idToArray(hexa.getAttribute('id')))])
				window.location = /^(http|https):/.test(this.hexagons.links[tools.getPosInArrays(tools.idToArray(hexa.getAttribute('id')))]) ? this.hexagons.links[tools.getPosInArrays(tools.idToArray(hexa.getAttribute('id')))] : 'http://' + this.hexagons.links[tools.getPosInArrays(tools.idToArray(hexa.getAttribute('id')))];
		}
		else if(!editing)
				var paramsWindoowHexa = new ParamsWindowHexa(hexa.getAttribute('id'));
		else
			$("#paramsWindowHexa").effect("shake");
	},
	//Parameters Hexagon
	addParamsHexa: function(){
		this.addHexagon([0,0],"paramsHexa");
	},
	clickParamsHexa: function(){
		if(!previewing){
			this.addPreviewHexa();
			previewing = true;
			paramsWindow.open();
		}else{
			$(".preview").remove();
			previewing = false;
			paramsWindow.close();
		}
	},
	//Preview Hexagons
	addPreviewHexa: function(){
		var new_pos = [];
		for(var i = 0; i < this.hexagons.positions.length + 1; ++i){
			for(var j = 0; j < around.length; ++j){
				var tmp_pos = [0,0];
				if(i < this.hexagons.positions.length){
					if(this.hexagons.positions[i][1] % 2 != 0){
						tmp_pos = [this.hexagons.positions[i][0] - around[j][0], this.hexagons.positions[i][1] - around[j][1]];
					}else{
						tmp_pos = [this.hexagons.positions[i][0] + around[j][0], this.hexagons.positions[i][1] + around[j][1]];
					}
				}else{
					tmp_pos = [around[j][0], around[j][1]];
				}
				if(!tools.exist(tmp_pos,this.hexagons.positions) && !tools.exist(tmp_pos,new_pos)){
					new_pos.push(tmp_pos);
				}
			}
		}

		for(var i = 0; i < new_pos.length; ++i){
			this.addHexagon(new_pos[i],"preview");
		}
	},
	clickPrevewHexa: function(hexa){
		if(!editing){
			var id = hexa.getAttribute('id');
			var pos = tools.idToArray(id);
			
			this.hexagons.positions.push(pos);
			this.hexagons.colors.push("#000000");
			this.hexagons.links.push("");
			this.addHexagon(pos,id);
			this.redraw();

			var paramsWindowHexa = new ParamsWindowHexa(id);
		}else
			$("#paramsWindowHexa").effect("shake");
	},

	redraw: function(){
		//CHANGE LA POSITION DE LA GRILLE
	    grid.pos = [$(window).width()/2,$(window).height()/2];


	    //SUPPRESSION
		$(".hex").remove();
		$(".preview").remove();

		grid.addParamsHexa();

	    //DRAW LES HEXAGONES
		for(var i = 0; i < grid.hexagons.positions.length; ++i)
			grid.addHexagon(grid.hexagons.positions[i], "hexagon");

		//DRAW LES PREVIEWS
		if(previewing)
			grid.addPreviewHexa();
	}
}