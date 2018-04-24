function mousePress(e) {
  // console.log("mousedown");
  var offset = $("canvas").offset();
  var mouse_x = e.pageX - offset.left;
  var mouse_y = e.pageY - offset.top;
  mouse_is_down = true;

  // console.log(currently_selected() != undefined);

  if(selected_nodes.currently_selected() && selected_nodes.isMouseInside(mouse_x - canvas_pos_x, mouse_y - canvas_pos_y)){
    console.log("move");
    moving_node = true;
    selected_nodes.setNodesToMoving();
  }

  if(!shift_down && !moving_node){
    // draw selection box
    selection_box.currently_selecting = true;
    // selection_box.clearEndPos();
    selection_box.setStartPos(mouse_x - canvas_pos_x, mouse_y - canvas_pos_y);
  }
}

function mouseRelease(e){
  // console.log("mouseup");
  mouse_is_down = false;

  var offset = $("canvas").offset();

  var mouse_x = e.pageX - offset.left;
  var mouse_y = e.pageY - offset.top;

  if(moving_node){
    moving_node = false;
    selected_nodes.currently_moving = null;
  }else{

    var click_was_inside_a_node = false;

    for (var i = 0; i < tree_layers.length; i++) {
      for (var j = 0; j < tree_layers[i].length; j++) {
        var temp = tree_layers[i][j];

        // console.log(temp.value, temp.pos_x, temp.box_width, temp.width);

        // console.log(mouse_x - canvas_pos_x, mouse_y - canvas_pos_y);
        if(temp.isMouseInside(mouse_x - canvas_pos_x, mouse_y - canvas_pos_y)){
          if(shift_down && selected_nodes.currently_selected()){

            arrow_list.push(new Arrow(selected_nodes.getFirstNode() , temp));

            selected_nodes.removeFirstNode();
          }else{
            selected_nodes.selectSingleNode(temp);
            console.log(temp.children_widths);
          }

          click_was_inside_a_node = true;
        }
      }
    }
  }

  if(click_was_inside_a_node){
    selected_nodes.clearNodes();
  }

  if(selection_box.currently_selecting){
    selection_box.makeSelection();
  }

  selection_box.currently_selecting = false;


}

function mouseMove(e){
  var offset = $("canvas").offset();
  var mouse_x = e.pageX - offset.left;
  var mouse_y = e.pageY - offset.top;

  if(mouse_is_down && !moving_node && shift_down){
    if(old_mouse_x != null){
      canvas_pos_x += mouse_x - old_mouse_x;
      canvas_pos_y += mouse_y - old_mouse_y;
    }
  }

  if(mouse_is_down && moving_node){
    selected_nodes.movePositions(mouse_x - old_mouse_x, mouse_y - old_mouse_y)
  }

  if(mouse_is_down && selection_box.currently_selecting){
    selection_box.setEndPos(mouse_x - canvas_pos_x, mouse_y - canvas_pos_y);
  }

  old_mouse_x = mouse_x;
  old_mouse_y = mouse_y;

}

function mouseCancel(e) {
  mouseRelease(e);
}

function keyPressed(e) {
  if(e.code == "Minus"){
    canvas_zoom *= 0.9;
  }
  if(e.code == "Equal"){
    canvas_zoom *= 1.1;
  }
  if(e.code == "ShiftLeft" || e.code == "ShiftRight"){
    shift_down = true;
  }

  if(e.code == "KeyR"){
    if(selected_nodes.currently_selected()){
      selected_nodes.resetPositions();
    }
  }

  if(e.code == "KeyN"){
    if(selected_nodes.currently_selected()){
      var node = selected_nodes.getFirstNode()
      node.children.push(new Tree("new",node.depth+1,node));
      layoutTree();
    }
  }

  console.log(e.code);

}

function keyReleased(e) {
  if(e.code == "ShiftLeft" || e.code == "ShiftRight"){
    shift_down = false;
  }
}
