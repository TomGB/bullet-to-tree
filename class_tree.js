"use strict";

function Tree(_value, _depth, _parent){
  this.value = _value;
  this.depth = _depth
  this.children = new Array();
  this.parent = _parent;
  this.children_widths = 0;

  this.width;
  this.box_width;
  this.box_height = 30;

  this.setBoxWidth = function (_box_width) {
    this.box_width = _box_width;
  }

  this.setBoxHeight = function (_box_height) {
    this.box_height = _box_height;
  }

  this.pos_x;
  this.pos_y;

  this.setPosition = function(_pos_x, _pos_y){
  	this.pos_x = _pos_x;
  	this.pos_y = _pos_y;
  }

  this.inner_box_padding = 20;
  this.outer_box_padding = 10;

  this.box_x;
  this.box_y;

  this.origional_x;
  this.origional_y;

  this.setCornerOfBox = function(x, y) {
    this.box_x = x;
    this.box_y = y;
    this.origional_x = x;
    this.origional_y = y;
  }

  this.isMouseInside = function(mouse_x, mouse_y){
    return mouse_x > this.box_x &&
    mouse_x < this.box_x + this.box_width &&
    mouse_y > this.box_y &&
    mouse_y < this.box_y + this.box_height;
  }

  this.resetPosition = function () {
    this.box_x = this.origional_x;
    this.box_y = this.origional_y;
  }

  this.movePosition = function (x, y) {
    this.box_x += x;
    this.box_y += y;
  }
}
