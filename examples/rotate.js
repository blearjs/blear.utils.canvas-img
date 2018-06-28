/**
 * 文件描述
 * @author ydr.me
 * @create 2016-06-27 17:34
 */


'use strict';

var canvasImg = require('../src/index');

var canvasEl = document.getElementById('canvas');
var urlEl = document.getElementById('url');
var drawEl = document.getElementById('draw');
var rotate1El = document.getElementById('rotate1');
var rotate2El = document.getElementById('rotate2');
var rotate3El = document.getElementById('rotate3');
var rotate4El = document.getElementById('rotate4');
var flip1El = document.getElementById('flip1');
var flip2El = document.getElementById('flip2');


drawEl.onclick = function () {
    drawEl.disabled = true;
    urlEl.disabled = true;

    var imgEl = new Image();

    imgEl.src = urlEl.value;
    imgEl.onload = function () {
        drawEl.disabled = false;
        urlEl.disabled = false;
        canvasEl.width = imgEl.width;
        canvasEl.height = imgEl.height;
        canvasImg.draw(canvasEl, imgEl, {
            srcWidth: imgEl.width,
            srcHeight: imgEl.height
        });
    };
    imgEl.onerror = function () {
        alert('图片加载失败');
        drawEl.disabled = false;
        urlEl.disabled = false;
    };

    rotate1El.onclick = function () {
        canvasImg.orientate(canvasEl, 90);
    };

    rotate2El.onclick = function () {
        canvasImg.orientate(canvasEl, 180);
    };

    rotate3El.onclick = function () {
        canvasImg.orientate(canvasEl, 270);
    };

    rotate4El.onclick = function () {
        canvasImg.orientate(canvasEl, -90);
    };

    flip1El.onclick = function () {
        canvasImg.flip(canvasEl);
    };

    flip2El.onclick = function () {
        canvasImg.flip(canvasEl, true);
    };
};
