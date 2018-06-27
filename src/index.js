/**
 * blear.utils.canvas-img
 * @author ydr.me
 * @create 2016年08月20日10:21:42
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


/**
 * 绘制图像
 * @param canvasEl {Object} 画布
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
exports.draw = function (canvasEl, imgEl, options) {
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

    if (srcLeft < 0 || srcTop) {
        throw new Error('`srcLeft` 或 `srcTop` 不能小于 0');
    }

    context.drawImage(imgEl,
        srcLeft, srcTop, srcWidth, srcHeight,
        drawLeft, drawTop, drawWidth, drawHeight);
};

