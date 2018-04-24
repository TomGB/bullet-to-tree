"use strict";

function generateTree() {

  top_tree = new Tree("Tree",-1, null);

  var input_string = $(".input").val().split("\n");

  // create tree structure from input string
  // recurse the input string treating each extra space as a new level

  recurse(0, top_tree, 0);

  function recurse(position, current_tree, level) {
    for (var i = position; i < input_string.length; i++) {
      var depth = input_string[i].search(/\S/);

      if(depth == level){
        console.log(i+" = current level");
        current_tree.children.push(new Tree(input_string[i].substring(depth), level, current_tree));
      }else if(depth == level + 1){
        console.log(i+" = new level");
        current_tree.children[current_tree.children.length-1].children.push(new Tree(input_string[i].substring(depth), level+1, current_tree.children[current_tree.children.length-1]));
        i = recurse(i+1, current_tree.children[current_tree.children.length-1], depth)-1;
        console.log("finished new level");
      }else{
        console.log("no more level, "+position+" "+level);
        return i;
      }
    }
  }
  layoutTree();
}
function layoutTree() {

  // create positional array tree_layers
  // recurse the tree to create a positional array called tree_layers

  tree_layers = new Array();

  recurse_tree(top_tree);

  function recurse_tree(current_tree){
    for (var i = 0; i < current_tree.children.length; i++) {
      add_to_layers(current_tree.children[i], tree_layers);
      console.log(current_tree.children[i].value, current_tree.children[i].children_widths);
      if(current_tree.children[i].children.length > 0){
        recurse_tree(current_tree.children[i]);
      }
    }
  }

  function add_to_layers(tree, layers) {
    node_list.push(tree);
    if(layers[tree.depth] === undefined){
      console.log("new tree layer",tree.depth);
      layers.push(new Array());
      console.log("length",layers.length,"depth",tree.depth);
      layers[tree.depth].push(tree);
    }else{
      layers[tree.depth].push(tree);
    }
  }

  console.log("tree_layers",tree_layers);

  // set box width of each element based on their string length

  var g = canvas.getContext('2d');
  g.font="10px Arial";
  for (var i = 0; i < tree_layers.length; i++) {
    for (var j = 0; j < tree_layers[i].length; j++) {
      tree_layers[i][j].setBoxWidth(g.measureText(tree_layers[i][j].value).width + tree_layers[i][j].inner_box_padding*2);
    }
  }

  // set space width from children
  // recurse down to the lowest level of the tree and return the width
  // sum the width of all the children of each level to set the width of the parent

  get_width_of_all_children(top_tree);

  function get_width_of_all_children(current_tree){
    var width_sum_of_children = 0;
    for (var i = 0; i < current_tree.children.length; i++) {

      // console.log(current_tree.children[i].depth, current_tree.children[i].value);
      if(current_tree.children[i].children.length > 0){
        var current_width = get_width_of_all_children(current_tree.children[i]);
        if(current_tree.children[i].box_width > current_width){
          width_sum_of_children += current_tree.children[i].box_width + current_tree.children[i].outer_box_padding * 2;
        }else{
          width_sum_of_children += current_width;
        }
      }else{
        width_sum_of_children += current_tree.children[i].box_width + current_tree.children[i].outer_box_padding * 2;
      }
    }
    current_tree.children_widths = width_sum_of_children - current_tree.outer_box_padding * 2;
    return width_sum_of_children;
  }

  // for each tree, set the width = the children widths
  // (if it's box width is not greater)

  for (var i = 0; i < tree_layers.length; i++) {
    for (var j = 0; j < tree_layers[i].length; j++) {
      // console.log(tree_layers[i][j].value, tree_layers[i][j].children_widths);
      if(tree_layers[i][j].children_widths > tree_layers[i][j].box_width){
        tree_layers[i][j].width = tree_layers[i][j].children_widths;
      }else{
        tree_layers[i][j].width = tree_layers[i][j].box_width;
      }
    }
  }

  // set the position of the tree nodes
  // either set based on previous left element
  // or based on parents position

  for (var i = 0; i < tree_layers.length; i++) {
    var distance_from_left = 100;
    for (var j = 0; j < tree_layers[i].length; j++) {

      // console.log(tree_layers[i][j].parent.pos_x);

      var extra_padding_for_children = 0;

      if(tree_layers[i][j].width){
        extra_padding_for_children = (tree_layers[i][j].width - tree_layers[i][j].box_width) / 2;
      }

      if(tree_layers[i][j].parent.pos_x > distance_from_left){
        tree_layers[i][j].setPosition(tree_layers[i][j].parent.pos_x, 100+i*100);
        distance_from_left = tree_layers[i][j].parent.pos_x;
      }else{
        tree_layers[i][j].setPosition(distance_from_left, 100+i*100);
      }

      // set position of boxes

      var parent = tree_layers[i][j].parent;

      var larger_parent = 0;
      // if(parent.box_width == parent.width){
        if(parent.width > parent.children_widths){
          if(tree_layers[i][j].children_widths < parent.width){
            tree_layers[i][j].children_widths = parent.width;
          }
          larger_parent = (parent.box_width - parent.children_widths) /2;
        }
      // }

      tree_layers[i][j].setCornerOfBox(tree_layers[i][j].pos_x + extra_padding_for_children + larger_parent, tree_layers[i][j].pos_y);


      distance_from_left+= tree_layers[i][j].box_width + 20 + extra_padding_for_children * 2;
    }
  }
}
