function Tools(){
	//Tools constructor
}

Tools.prototype = {
	constructor: Tools,
	getHexPos: function(x,y)
	{
		var pos = [0,0];

		pos[0] = x - Math.round(hexGrid.length / 2);
		pos[1] = y - Math.round(hexGrid[0].length / 2) + 2;

		return pos;
	},
	getPosInArrays: function(pos, parray){
		for(var i = 0; i < parray.length; ++i)
			if(pos.equals(parray[i]))
				return i;
	},

	idToArray: function(id){
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
	},

	exist: function(pos,parent){
		var exist = false;
		for(var i = 0; i < parent.length && exist === false; ++i){
			if(pos.equals(parent[i]) || pos.equals([0,0])){
				exist = true;
			}
		}
		return exist;
	},

	compact: function(array, isDoubleArray){
		var compact = "";
		for(var i = 0; i < array.length; ++i){
			if(isDoubleArray){
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
};

//POUR TEST EQUALITE ENTRE ARRAY
Array.prototype.equals = function(array) {
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
};

Object.defineProperty(Array.prototype, "equals", {enumerable: false});
