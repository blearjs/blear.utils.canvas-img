/**
 * blear.utils.canvas-img
 * @author ydr.me
 * @create 2016年08月20日10:21:42
 * @update 2018年06月28日19:27:22
 */

'use strict';


var object = require('blear.utils.object');
var typeis = require('blear.utils.typeis');


var defaults = {
    srcLeft: 0,
    srcTop: 0,
    srcWidth: null,
    srcHeight: null,
    drawLeft: 0,
    drawTop: 0,
    drawWidth: null,
    drawHeight: null
};
var isEmpty = function (o) {
    return typeis.Null(o) || typeis.Undefined(o);
};
var tempCanvasEl = document.createElement('canvas');


/**
 * 绘制图像
 * @param canvasEl {HTMLCanvasElement} 画布
 * @param imgEl {HTMLImageElement} 图片对象，必须保证图片已经 onload 了
 * @param [options] {Object} 配置
 * @param [options.srcLeft] {Number} 源横坐标
 * @param [options.srcTop] {Number} 源纵坐标
 * @param [options.srcWidth] {Number} 源宽度
 * @param [options.srcHeight] {Number} 源高度
 * @param [options.drawLeft] {Number} 绘制横坐标
 * @param [options.drawTop] {Number} 绘制纵坐标
 * @param [options.drawWidth] {Number} 绘制宽度
 * @param [options.drawHeight] {Number} 绘制高度
 */
var draw = exports.draw = function (canvasEl, imgEl, options) {
    options = object.assign({}, defaults, options);
    var context = canvasEl.getContext('2d');
    var srcLeft = options.srcLeft;
    var srcTop = options.srcTop;
    var srcWidth = options.srcWidth;
    var srcHeight = options.srcHeight;
    var drawLeft = options.drawLeft;
    var drawTop = options.drawTop;
    var drawWidth = options.drawWidth;
    var drawHeight = options.drawHeight;

    if (isEmpty(srcWidth)) {
        srcWidth = imgEl.width;
    }

    if (isEmpty(srcHeight)) {
        srcHeight = imgEl.height;
    }

    if (isEmpty(drawLeft)) {
        drawLeft = 0;
    }

    if (isEmpty(drawTop)) {
        drawTop = 0;
    }

    if (isEmpty(drawWidth)) {
        drawWidth = srcWidth;
    }

    if (isEmpty(drawHeight)) {
        drawHeight = options.srcHeight;
    }

    if (srcLeft < 0 || srcTop < 0) {
        throw new Error('`srcLeft` 或 `srcTop` 不能小于 0');
    }

    context.drawImage(imgEl,
        srcLeft, srcTop, srcWidth, srcHeight,
        drawLeft, drawTop, drawWidth, drawHeight);
};


/**
 * 旋转定向，只支持 0°、90°、180°、270°
 * @param canvasEl {HTMLCanvasElement} 画布
 * @param angle {number} 顺时针为正
 * @param [unResize=false] {Boolean} 不重置尺寸
 */
exports.orientate = function (canvasEl, angle, unResize) {
    var srcWidth = canvasEl.width;
    var srcHeight = canvasEl.height;
    var translateX = 0;
    var translateY = 0;
    angle %= 360;

    if (angle < 0) {
        angle += 360;
    }

    var radian = angle * Math.PI / 180;
    var context = tempCanvasEl.getContext('2d');
    var actualWidth = 0;
    var actualHeight = 0;

    switch (angle) {
        case 0:
            actualWidth = srcWidth;
            actualHeight = srcHeight;
            break;

        case 90:
            translateX = srcHeight;
            actualWidth = srcHeight;
            actualHeight = srcWidth;
            break;

        case 180:
            translateX = srcWidth;
            translateY = srcHeight;
            actualWidth = srcWidth;
            actualHeight = srcHeight;
            break;

        case 270:
            translateY = srcWidth;
            actualWidth = srcHeight;
            actualHeight = srcWidth;
            break;

        default:
            throw new Error('不支持非 0/90/180/270 度数旋转定向');
    }

    tempCanvasEl.width = actualWidth;
    tempCanvasEl.height = actualHeight;
    context.save();
    context.translate(translateX, translateY);
    context.rotate(radian);
    draw(tempCanvasEl, canvasEl, {
        srcWidth: srcWidth,
        srcHeight: srcHeight
    });
    context.restore();

    if (unResize) {
        canvasEl.width = srcWidth;
    } else {
        canvasEl.width = actualWidth;
        canvasEl.height = actualHeight;
    }

    draw(canvasEl, tempCanvasEl, {
        srcWidth: actualWidth,
        srcHeight: actualHeight
    });
};
