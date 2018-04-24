let lineLength = 40;
let lineHeight = 10;

function wrapText(g, text, x, y) {
	var words = text.split(' ');
	var line = '';
	var linesWritten = [];

	for(var n = 0; n < words.length; n++) {
		var testLine = line + words[n] + ' ';
		var metrics = g.measureText(testLine);
		var testWidth = metrics.width;
		if (testWidth > lineLength && n > 0) {
			linesWritten.push(line);
			g.fillText(line, x, y);
			line = words[n] + ' ';
			y += lineHeight;
		}
		else {
			line = testLine;
		}
	}
	linesWritten.push(line);
	g.fillText(line, x, y);
	return linesWritten;
}

function draw(){
	var g = canvas.getContext('2d');

	// clear the canvas

  g.fillStyle = "#eee";

  g.setTransform(1, 0, 0, 1, 0, 0);
  g.fillRect(0, 0, canvas.width, canvas.height);

	// move and scale the canvas

  g.translate(canvas_pos_x + width / 2, canvas_pos_y + height / 2);
  g.scale(canvas_zoom, canvas_zoom);
  g.translate(-canvas_pos_x/ canvas_zoom-width / 2, -canvas_pos_y / canvas_zoom -height / 2);

  g.translate(canvas_pos_x/ canvas_zoom, canvas_pos_y / canvas_zoom);


	// draw the canvas elements

	g.fillStyle = "#000";
	g.lineWidth=1;
	g.strokeStyle = "#000";
  for (var i = 0; i < tree_layers.length; i++) {
    for (var j = 0; j < tree_layers[i].length; j++) {

			if(debug_gui){
				draw_crosshair(g, tree_layers[i][j]);
			}
      // g.stroke();
			g.font="10px Arial";
      const linesWritten = wrapText(g, tree_layers[i][j].value, tree_layers[i][j].box_x + tree_layers[i][j].inner_box_padding, tree_layers[i][j].box_y + tree_layers[i][j].inner_box_padding);
			// if (linesWritten.length > 1) {
			// 	tree_layers[i][j].box_width = lineLength + tree_layers[i][j].outer_box_padding * 3;
			// 	tree_layers[i][j].box_height = linesWritten.length * lineHeight  + tree_layers[i][j].outer_box_padding * 2;
			// }

			strokeRect(g, tree_layers[i][j].box_x, tree_layers[i][j].box_y, tree_layers[i][j].box_width, tree_layers[i][j].box_height);
    }
  }

	// draw arrows

  for (var i = 0; i < tree_layers[0].length; i++) {
    draw_arrows_in_tree(tree_layers[0][i]);
  }

  function draw_arrows_in_tree(current_tree){
    for (var i = 0; i < current_tree.children.length; i++) {
      canvas_right_arrow(g, current_tree, current_tree.children[i]);
      if(current_tree.children[i].children.length > 0){
        draw_arrows_in_tree(current_tree.children[i]);
      }
    }
  }

	for (var i = 0; i < arrow_list.length; i++) {
		var arrow = arrow_list[i];
		canvas_new_arrow(g, arrow.node_1, arrow.node_2);
	}

	if(selected_nodes.currently_selected()){
		g.strokeStyle = "blue";
		g.lineWidth=2;
		for (var i = 0; i < selected_nodes.selected_nodes.length; i++) {
			strokeRect(g, selected_nodes.selected_nodes[i].box_x, selected_nodes.selected_nodes[i].box_y, selected_nodes.selected_nodes[i].box_width, selected_nodes.selected_nodes[i].box_height);
		}
	}

	if(selection_box.currently_selecting){
		g.strokeStyle = "blue";
		g.lineWidth=1;
		// g.lineStyle="dashed";
		strokeRect(g, selection_box.x, selection_box.y, selection_box.width, selection_box.height);
	}

	window.requestAnimationFrame(draw);
}


$(document).on("line-length", (e, data) => {
  const newLineLength = Number.parseInt(data);
  if (newLineLength) {
    lineLength = newLineLength;
  }
});
