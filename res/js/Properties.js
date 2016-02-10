function Properties(){
	//Properties constructor
}

Properties.prototype = {
	constructor: Properties,
	send: function(id){
		$.ajax({
			url: phpSend,
			type: "POST",
			data: 'id='+id+'&pos='+tools.compact(grid.hexagons.positions,true)+'&color='+tools.compact(grid.hexagons.colors,false)+'&link='+tools.compact(grid.hexagons.links,false)+'&backgroundColor='+backgroundColor+'&shadowColor='+shadowColor+'&shadowSize='+shadowSize+'&hexaSize='+grid.scale+'&hexaOpacity='+op+'&hexaOpacityHover='+opHover,
			success: function(data) {
				
			},
		});
	}
/*
	get: function(){
		$.post(phpConnect, { key : key })
			.done(function(data){
				defineProperties(data);
				grid();
			});
	},
	define: function(data){
		var tmp_pos = [];
		var tmp_color = [];
		var tmp_link = [];
		var nb_s = "";
		var type = 0;	// 0 - POSITIONS
						// 1 - COULEURS
						// 2 - LIENS

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
	}*/
}