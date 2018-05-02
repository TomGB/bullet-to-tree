"use strict";

var canvas;
var width;
var height;

var tree_layers;

var node_list = new Array();

var top_tree;

var canvas_pos_x = 0;
var canvas_pos_y = 0;

var old_mouse_x;
var old_mouse_y;

var mouse_is_down = false;

var canvas_zoom = 1;

var debug_gui = false;

function Selected_nodes_class() {

	this.moving = false;
	this.selected_nodes = new Array();

	this.currently_selected = function() {
		// console.log(this.selected_nodes.length);
		return (this.selected_nodes.length>0);
	}
	this.isMouseInside = function(x, y) {
		for (var i = 0; i < this.selected_nodes.length; i++) {
			if (this.selected_nodes[i].isMouseInside(x, y)){
				return true;
			}
		}
		return false;
	}
	this.setNodesToMoving = function () {
		this.moving = true;
	}

	this.getFirstNode = function () {
		return this.selected_nodes[0];
	}

	this.removeFirstNode = function () {
		this.selected_nodes.pop();
	}

	this.selectSingleNode = function (node) {
		this.selected_nodes = new Array();
		this.selected_nodes.push(node);
	}

	this.resetPositions = function () {
		for (var i = 0; i < this.selected_nodes.length; i++) {
			this.selected_nodes[i].resetPosition();
		}
	}

	this.movePositions = function (x, y) {
		for (var i = 0; i < this.selected_nodes.length; i++) {
			this.selected_nodes[i].movePosition(x, y);
		}
	}

	this.addNode = function (node) {
		this.selected_nodes.push(node);
	}

	this.clearNodes = function () {
		this.selected_nodes = new Array();
	}
}

var selected_nodes = new Selected_nodes_class();

var shift_down = false;

var moving_node = false;

var currently_moving = null;

var arrow_list = new Array();

function Selection_box_class() {

	this.x;
	this.y;
	this.x2;
	this.y2;

	this.currently_selecting = false;

	this.setStartPos = function(x, y){
		this.x = x;
		this.y = y;
		this.x2 = x;
		this.y2 = y;
		this.width = this.x2 - this.x;
		this.height = this.y2 - this.y;
	}

	this.setEndPos = function(x, y){
		this.x2 = x;
		this.y2 = y;

		this.width = this.x2 - this.x;
		this.height = this.y2 - this.y;
	}

	this.makeSelection = function () {
		selected_nodes.clearNodes();
		for (var i = 0; i < node_list.length; i++) {
			var node = node_list[i];

			if(this.x > this.x2){
				var temp = this.x;
				this.x = this.x2;
				this.x2 = temp;
			}

			if(this.y > this.y2){
				var temp = this.y;
				this.y = this.y2;
				this.y2 = temp;
			}

			if (this.x < node.box_x + node.box_width && this.x2 > node.box_x &&
    		this.y < node.box_y + node.box_height && this.y2 > node.box_y){
					selected_nodes.addNode(node);
			}
		}
	}
}

var selection_box = new Selection_box_class();

window.addEventListener('load', function () {
	canvas = document.getElementById('canvas');
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;
	width = canvas.width;
	height = canvas.height;
	console.log(width+' '+height);

  $("canvas")[0].addEventListener("touchstart", mousePress, false);
  $("body")[0].addEventListener("touchend", mouseRelease, false);
  $("body")[0].addEventListener("touchcancel", mouseCancel, false);
  $("canvas")[0].addEventListener("touchmove", mouseMove, false);

	$("canvas").mousedown(mousePress);
	$("body").mouseup(mouseRelease);
	$("canvas").mousemove(mouseMove);

  $(document).keyup(function(e) {

  });

  $(".input").val("1\n2\n 2a\n 2b\n  2b1\n 2c\n3\n 3a\n 3b");

	$(".insert_toki_pona").click(function () {
		$(".input").val("lon sin pi soweli\n jelo\n  kasi\n   ken mama e mute\nlawa e olin pi mama\n ona suli\n  tenpo pini\n pan pi pan\n  sin insa\n  li\n   seli pi waso\nopen sinpin e awen pi sike\n kepeken mute\n  anpa\n   luka\n    lape\n   suli\n  kepeken\n   lipu e lape\n   kili\n    tomo\n jaki\n  tomo mi\n   jan Santa\n    e\n   oko");
	});

  $(".go").click(function() {
    generateTree();
    draw();
  });

  $(".js-line-length").on('input', function(e) {
    $(document).trigger("line-length",$(".js-line-length").val());
  });

	$(".minimise").on('click', () => {
		$('.tools').toggle();
	})

  document.addEventListener('keydown', keyPressed, false);
  document.addEventListener('keyup', keyReleased, false);

}, false);
