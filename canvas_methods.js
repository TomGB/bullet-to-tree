"use strict";

function round(input) {
  return Math.round(input-0.5)+0.5;
}

function moveTo(g, a, b) {
  g.moveTo(round(a), round(b));
}

function lineTo(g, a, b) {
  g.lineTo(round(a), round(b));
}



function fillRect(g, a, b, c, d) {
  g.fillRect(round(a), round(b), Math.round(c), Math.round(d));
}

function strokeRect(g, a, b, c, d) {
  g.strokeRect(round(a), round(b), Math.round(c), Math.round(d));
}

// function moveTo(g, a, b, c, d) {
//   g.moveTo(a, b, c, d);
// }

// function canvas_arrow(g, tree_from, tree_to){
//
//   // console.log(tree_from.value, tree_to.value);
//
//   var extra_padding_for_children = 0;
//
//   if(tree_from.width){
//     extra_padding_for_children = (tree_from.width - tree_from.box_width) / 2;
//   }
//
//   var fromx = tree_from.pos_x + ((tree_from.box_width - 40) / 2) + extra_padding_for_children;
//   var fromy = tree_from.pos_y + 10;
//
//   extra_padding_for_children = 0;
//
//   if(tree_to.width){
//     extra_padding_for_children = (tree_to.width - tree_to.box_width) / 2;
//   }
//
//   var tox = tree_to.pos_x + ((tree_to.box_width - 40) / 2) + extra_padding_for_children;
//   var toy = tree_to.pos_y - 20;
//
//   var headlen = 10;   // length of head in pixels
//   var angle = Math.atan2(toy-fromy,tox-fromx);
//   g.beginPath();
//   moveTo(g, fromx, fromy);
//   lineTo(g, tox, toy);
//   lineTo(g, tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
//   moveTo(g, tox, toy);
//   lineTo(g, tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));
//   g.stroke();
// }

function canvas_right_arrow(g, tree_from, tree_to){

  // console.log(tree_from.value, tree_to.value);

  var fromx = tree_from.box_x + tree_from.box_width/2;
  var fromy = tree_from.box_y + tree_from.box_height;

  var tox = tree_to.box_x + tree_to.box_width/2;
  var toy = tree_to.box_y;

  var headlen = 5;   // length of head in pixels
  var angle = Math.atan2(toy-fromy,tox-fromx);
  g.beginPath();
  moveTo(g, fromx, fromy);
  lineTo(g, fromx, fromy + (toy - fromy) / 2);
  lineTo(g, tox, fromy + (toy - fromy) / 2);
  lineTo(g, tox, toy);
  lineTo(g, tox-headlen, toy-headlen - 2);
  moveTo(g, tox, toy);
  lineTo(g, tox+headlen, toy-headlen - 2);
  g.stroke();
}

function draw_crosshair(g, tree) {
  var headlen = 2;   // length of head in pixels

  var pos_x = tree.pos_x;
  var pos_y = tree.pos_y;

  g.beginPath();
  moveTo(g, pos_x, pos_y - headlen);
  lineTo(g, pos_x, pos_y + headlen);
  moveTo(g, pos_x - headlen, pos_y);
  lineTo(g, pos_x + headlen, pos_y);
  g.stroke();

  g.font="8px Arial";

  g.fillText('o', pos_x + 2, pos_y - 2);

  var pos_x = tree.box_x;
  var pos_y = tree.box_y;

  g.beginPath();
  moveTo(g, pos_x, pos_y - headlen);
  lineTo(g, pos_x, pos_y + headlen);
  moveTo(g, pos_x - headlen, pos_y);
  lineTo(g, pos_x + headlen, pos_y);
  g.stroke();

  g.fillText('b', pos_x - 7, pos_y - 2);
}

function canvas_new_arrow(g, node1, node2) {

  var fromx;
  var fromy;

  var tox;
  var toy;

  var bottom_to_top;

  if(node1.box_x > node2.box_x){
    // arrow from right to left
    fromx = node1.box_x;
    tox = node2.box_x + node2.box_width;
  }else{
    //arrow from right to left
    fromx = node1.box_x + node1.box_width;
    tox = node2.box_x;
  }

  if(node1.box_y > node2.box_y){
    //arrow from bottom to top
    fromy = node1.box_y;
    toy = node2.box_y + node2.box_height;
    bottom_to_top = true;
  }else {
    //arrow from top to bottom
    fromy = node1.box_y + node1.box_height;
    toy = node2.box_y;
    bottom_to_top = false;
  }

  console.log(fromy,toy);


  var headlen = 10;   // length of head in pixels
  var angle = Math.atan2(toy-fromy,tox-fromx);
  g.beginPath();
  moveTo(g, fromx, fromy);
  lineTo(g, tox, toy);
  lineTo(g, tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
  moveTo(g, tox, toy);
  lineTo(g, tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));
  g.stroke();
}
