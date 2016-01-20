window.addEventListener('resize', redraw, false);

//POUR TEST EQUALITE ENTRE ARRAY
Array.prototype.equals = function (array) {
    if (!array)
        return false;

    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        if (this[i] instanceof Array && array[i] instanceof Array) {
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            return false;   
        }           
    }       
    return true;
}

Object.defineProperty(Array.prototype, "equals", {enumerable: false});

function redraw() {
	//CHANGE LA POSITION DE LA GRILLE
    gridPos = [window.innerWidth/2,window.innerHeight/2];

    //SUPPRESSION
	$(".hex").remove();
	$(".preview").remove();

    //DRAW LES HEXAGONES
	grid();

	//DRAW LES PREVIEWS
	if(previewing)
		addPreviewHexa();
}

function getHexPos(x,y)
{
	var pos = [0,0];

	pos[0] = x - Math.round(hexGrid.length / 2);
	pos[1] = y - Math.round(hexGrid[0].length / 2) + 2;

	return pos;
}

function getPosInArrays(pos){
	for(var i = 0; i < positions.length; ++i)
		if(pos.equals(positions[i]))
			return i;
}

function idToArray(id){
	var x = "";
	var y = "";
	var change = false;
	for(var i = 0; i < id.length; ++i){
		if(id[i] == ";"){
			change = true;
			i++;
		}

		if(!change)
			x += id[i];
		else
			y += id[i];
	}

	return [parseInt(x), parseInt(y)];
}

function exist(pos,parent){
	var exist = false;
	for(var i = 0; i < parent.length && exist == false; ++i){
		if(pos.equals(parent[i]) || pos.equals([0,0])){
			exist = true;
		}
	}
	return exist;
}

function compact(array, idDoubleArray){
	var compact = "";
	for(var i = 0; i < array.length; ++i){
		if(idDoubleArray){
			for(var j = 0; j < array[i].length; ++j){
				compact += array[i][j];
				if(j < array[i].length-1)
					compact += ',';
			}

			if(i < array.length-1)
				compact += ';';
		}else{
			for(var i = 0; i < array.length; ++i){
				compact += array[i];
				if(i < array.length-1)
					compact += ';';
			}
		}
	}

	return compact;
}

function sendProperties(mkey){
	$.ajax({
		url: phpSend,
		type: "POST",
		data: 'key='+mkey+'&pos='+compact(positions,true)+'&color='+compact(colors,false)+'&link='+compact(links,false)+'&backgroundColor='+backgroundColor+'&shadowColor='+shadowColor+'&shadowSize='+shadowSize+'&hexaSize='+scale+'&hexaOpacity='+op+'&hexaOpacityHover='+opHover,
		success: function(data) {
			$("#keyInfos").html("La clé a bien été créé.");
			$("#keyInfos").css('color', '#00CF07');
		},
	});
}


//--------------------------------------//
//------------GET PROPERTIES------------//
//--------------------------------------//

function getProperties(){
	$.post(phpConnect, { key : key })
		.done(function(data){
			defineProperties(data);
			grid();
		});
}

//A FAIRE: COULEUR, LIENS
function defineProperties(data)
{
	var tmp_pos = [];
	var tmp_color = [];
	var tmp_link = [];
	var nb_s = "";
	var type = 0;	// 0 - POSITIONS
					// 1 - COULEURS
					// 2 - LIENS

	//POSITIONS
	for(var i = 0; i < data.length; ++i){
		if(data[i] != ',' && data[i] != ';' && data[i] != '|'){
			nb_s += data[i];
		}
		else{
			if(type == 0)
				tmp_pos.push(parseInt(nb_s));
			else if(type == 1)
				tmp_color.push(parseInt(nb_s));
			else if(type == 2)
				tmp_link = nb_s;

			nb_s = "";

			if(data[i] == ';' || data[i] == '|' || i == data.length-1){
				
				if(type == 0){
					positions.push(tmp_pos);
					tmp_pos = [];
				}
				else if(type == 1){
					colors.push(tmp_color);
					tmp_color = [];
				}
				else if(type == 2){
					links.push(tmp_link);
					tmp_link = "";
				}
			}

			if(data[i] == '|')
				type++;
		}
	}
}













