createParamsHexa();
function grid(){
	createParamsHexa();

	for(var i = 0; i < positions.length; ++i)
		Hexagon(positions[i], "hexagon");
}

function Hexagon(pos,type)
{
	var id = pos[0] + ";" + pos[1];
	var f = [gridPos[0] - size[0] / 2 + pos[0] * size[0] + margin * pos[0] * scale, gridPos[1] - size[1]/4 + pos[1] * (size[1] - size[1]/4) + margin * pos[1] * scale];
	
	if(pos[1] % 2 != 0)
		f[0] += (size[0] + margin) / 2;
	

	var hexa = document.createElement("div");
	hexa.setAttribute('id', id);
	if(type == "preview"){
		hexa.setAttribute('class', "preview");
		hexa.setAttribute('onclick',"clickOnPreviewHexa(this)");
	}
	else if(type == "paramsHexa"){
		hexa.setAttribute('class', "hex");
		hexa.setAttribute('onclick',"clickOnParamsHexa()");
	}
	else{
		hexa.setAttribute('class', "hex");
		hexa.style.background = colors[getPosInArrays(pos)];
		hexa.setAttribute('onclick',"clickOnHexa(this)");
	}
	hexa.innerHTML = '<div class="hex-in1" id="' + id + '"><div class="hex-in2" id="' + id + '"></div></div>';
	hexa.style.transform = "scale("+scale+")";
	hexa.style.left = f[0] + "px";
	hexa.style.top = f[1] + "px";
	grid_div.appendChild(hexa);
}

function addPreviewHexa()
{
	var new_pos = [];
	for(var i = 0; i < positions.length + 1; ++i){
		for(var j = 0; j < around.length; ++j){
			var tmp_pos = [0,0];
			if(i < positions.length){
				if(positions[i][1] % 2 != 0){
					tmp_pos = [positions[i][0] - around[j][0], positions[i][1] - around[j][1]];
				}else{
					tmp_pos = [positions[i][0] + around[j][0], positions[i][1] + around[j][1]];
				}
			}else{
				tmp_pos = [around[j][0], around[j][1]];
			}

			if(!exist(tmp_pos,positions) && !exist(tmp_pos,new_pos)){
				new_pos.push(tmp_pos);
			}
		}
	}

	for(var i = 0; i < new_pos.length; ++i){
		Hexagon(new_pos[i],"preview");
	}
}

function createParamsHexa(){
	Hexagon([0,0],"paramsHexa");
}

//-------//
//-CLICK-//
//-------//

function clickOnParamsHexa(){
	if(!previewing){
		addPreviewHexa();
		previewing = true;
		paramsWindow();
	}else{
		$(".preview").remove();
		previewing = false;
		closeParamsWindow();
	}
}

function clickOnHexa(hexa){
	if(!previewing){
		//Ouvre le lien AVEC ou SANS http://
		if(links[getPosInArrays(idToArray(hexa.getAttribute('id')))])
			window.location = /^(http|https):/.test(links[getPosInArrays(idToArray(hexa.getAttribute('id')))]) ? links[getPosInArrays(idToArray(hexa.getAttribute('id')))] : 'http://' + links[getPosInArrays(idToArray(hexa.getAttribute('id')))];
	}else if(!editing){
		paramsWindowHexa(hexa.getAttribute('id'));
	}else{
		$("#paramsWindowHexa").effect("shake");
	}
}

function clickOnPreviewHexa(hexa){
	if(!editing){
		var id = hexa.getAttribute('id');
		
		var pos = idToArray(id);
		
		positions.push(pos);
		colors.push("#000000");
		links.push("");
		Hexagon(pos,id);
		redraw();
		paramsWindowHexa(id);
	}else
		$("#paramsWindowHexa").effect("shake");
}