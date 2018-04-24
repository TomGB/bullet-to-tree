"use strict";

function Arrow(_node_1, _node_2){
  this.node_1 = _node_1;
  this.node_2 = _node_2;
  this.higher_node;

  if(this.node_1.box_y > this.node_2.box_y){
    this.higher_node = this.node_2;
  }else{
    this.higher_node = this.node_1;
  }
}
