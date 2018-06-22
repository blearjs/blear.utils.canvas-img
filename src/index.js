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
 * @param imgEl {Object} 图片对象，必须保证图片已经 onload 了
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
    var context = canvasEl.getContext('2d');

    options = object.assign({}, defaults, options);

    if (isEmpty(options.srcWidth)) {
        options.srcWidth = imgEl.width;
    }

    if (isEmpty(options.srcHeight)) {
        options.srcHeight = imgEl.height;
    }

    if (isEmpty(options.drawLeft)) {
        options.drawLeft = 0;
    }

    if (isEmpty(options.drawTop)) {
        options.drawTop = 0;
    }

    if (isEmpty(options.drawWidth)) {
        options.drawWidth = options.srcWidth;
    }

    if (isEmpty(options.drawHeight)) {
        options.drawHeight = options.srcHeight;
    }

    var srcLeft = options.srcLeft;
    var srcTop = options.srcTop;
    var deltaLeft = 0;
    var deltaTop = 0;

    if (srcLeft < 0) {
        deltaLeft = -srcLeft;
        srcLeft = 0;
    }

    if (srcTop < 0) {
        deltaTop = -srcTop;
        srcTop = 0;
    }

    context.drawImage(imgEl,
        srcLeft, srcTop, options.srcWidth, options.srcHeight,
        options.drawLeft + deltaLeft, options.drawTop + deltaTop, options.drawWidth - deltaLeft, options.drawHeight - deltaTop);
};

