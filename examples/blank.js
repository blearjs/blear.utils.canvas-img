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


drawEl.onclick = function () {
    drawEl.disabled = true;
    urlEl.disabled = true;

    var imgEl = new Image();
    imgEl.src = urlEl.value;
    imgEl.onload = function () {
        drawEl.disabled = false;
        urlEl.disabled = false;

        canvasImg.draw(canvasEl, imgEl, {
            srcLeft: -100,
            srcTop: -300,
            srcWidth: imgEl.width,
            srcHeight: imgEl.height,
            drawLeft: 0,
            drawTop: 0,
            drawWidth: 400,
            drawHeight: 400
        });
    };
    imgEl.onerror = function () {
        alert('图片加载失败');
        drawEl.disabled = false;
        urlEl.disabled = false;
    };
};
