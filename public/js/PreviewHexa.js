// PreviewHexas are the white hexagons that you can see before creating a new "basic" hexagon

function PreviewHexa(id, position) {
  this.id = id;
  this.position = position;
  var realPosition = tools.convertToRealPosition(position);

  $("#previewContainer").append('<div id="' + id + '"></div>');

  $('#' + id).attr({
      class: 'previewHexa',
      onclick: 'PreviewHexa.prototype.click(this)',
      style: 'transform:scale(' + infos.hexaSize.value + ') rotate(120deg); left: ' + realPosition.x + 'px; top: ' + realPosition.y + 'px;'
    })
    .append('<div class="hex-in1" id="' + id + '"></div>');

  $('.previewHexa #' + id + '.hex-in1').append('<div class="hex-in2" id="' + id + '"></div>');
  $('.previewHexa .hex-in1 #' + id + '.hex-in2').attr({
      style: 'background-color:#ffffff;'
    });
}

PreviewHexa.prototype = {
  click: function(hexa) {
    if (!editing) {
      var id = hexa.id;
      $('#' + id).remove();

      var prop = {
        id: tools.newId(),
        position: grid.previewHexas[tools.findPreviewHexaIndex(id)].position
      };

      for(var p in hexa_prop){
        if(!prop[p]){
          if(hexa_prop[p].defaultValue !== undefined){
            prop[p] = hexa_prop[p].defaultValue;
          }
        }
      }

      grid.addHexagon(prop);
      grid.removePreviewHexa();
      paramsWindowHexa.open(prop.id);
    }
  },
  updateRealPosition: function() {
    realPosition = tools.convertToRealPosition(this.position);
    $('#' + this.id + '.previewHexa').attr({
      style: 'transform:scale(' + infos.hexaSize.value + ') rotate(120deg); left: ' + realPosition.x + 'px; top: ' + realPosition.y + 'px;'
    });
  }
};

/*

ActiveRecord::Schema.define(version: 20160607130516) do

  create_table "categories", force: :cascade do |t|
    t.string   "title"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.integer  "work_id"
    t.boolean  "show_infos",         default: true
  end

  add_index "categories", ["work_id"], name: "index_categories_on_work_id"

  create_table "works", force: :cascade do |t|
    t.string   "title"
    t.string   "image"
    t.text     "description"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.integer  "category_id"
  end

  add_index "works", ["category_id"], name: "index_works_on_category_id"

end

*/
