(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("AnimatorFactory", [], factory);
	else if(typeof exports === 'object')
		exports["AnimatorFactory"] = factory();
	else
		root["AnimatorFactory"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
  json 参数1：预案的json格式信息
  qmap 参数2：当前地图对象
  plot 参数3：标绘对象实例 
  turf 参数4：工具对象实例
  layerName 参数5： 图层名
  fps  参数6：每秒帧数，默认24
 */

var AnimatorFactory = function () {
	function AnimatorFactory(json, qmap, plot, turf, layerName, fps) {
		_classCallCheck(this, AnimatorFactory);

		this.json = json;
		this.fps = fps || 30;
		this.plot = plot;
		this.turf = turf;
		this.map = qmap;
		this.layer = layerName || '_ctfoSchemaPolygon_';
		this.easing = function (p) {
			return p;
		};
		this.duration = 1;
	}

	/**
 	* 解析json文件
 	*/


	_createClass(AnimatorFactory, [{
		key: 'initAnalysis',
		value: function initAnalysis(json) {
			json = json || this.json;
			var schema = JSON.parse(json); // 预案JSON对象
			this.duration = schema.totalTime * 1000;
			var steps = schema.steps; // 预案步骤列表
			var thatFps = this.fps; // 当前播放帧数
			var turf = this.turf; // turf对象
			var schemaArr = []; //返回预案按帧播放列表对象
			/** 遍历步骤列表生成每帧待播放元素集合对象 **/
			steps.forEach(function (step, key) {
				var totalTime = step.stepTotalTime; // 当前步骤的播放时长
				var totalFps = totalTime * thatFps; // 当前步骤总的播放帧数
				var elements = step.elements; // 当前步骤的所有元素列表
				var stepFpsArr = Array.apply(null, Array(totalFps)); // 当前步骤每帧要完成的元素信息
				//stepFpsArr.length = totalFps
				/** 遍历元素列表按帧生成元素关键信息 **/
				elements.forEach(function (element, _key) {
					//console.log(element.delay +','+ element.runTime)
					//console.log(element.delay + element.runTime)
					if (element.runTime === 0) {}
					//当没有播放时长时的处理	

					/** 当前元素按帧生成关系信息对象 **/
					for (var x = element.delay * thatFps; x < (element.delay + element.runTime) * thatFps; x++) {
						var _element = {}; // 每帧要播放的元素信息
						if (!stepFpsArr[x]) {
							stepFpsArr[x] = new Array();
						}
						_element.action = 'none';
						_element.type = element.elementType;
						_element.id = element.elementId;
						if (element.isChange) {
							_element.action = 'update';
						}
						/** 元素的第一帧，一般是上图 **/
						if (x === element.delay * thatFps) {
							_element.action = 'add';
						}
						/** 元素的最后帧，一般是下图 **/
						if (x === element.runTime * thatFps - 1) {
							if (element.isRemove) {
								_element.action = 'delete';
							}
						}
						if (_element.action === 'none') {
							stepFpsArr[x].push(_element);
							continue;
						}
						var point1 = void 0; //当前元素关键点1的一个点
						var point2 = void 0; //当前元素关键点2的对应点
						var distance = void 0; //两点间的距离
						var line = void 0; //两个对应点生成的线对象
						var phr = void 0; //每帧对应线上的实际距离
						var options = { units: 'meters' };
						var pointArr1 = element.keyPoints1; // 当前元素的关键点1
						var pointArr2 = element.keyPoints2; // 当前元素的关键点2
						var keyPointArr = []; //当前帧的关关键点对象
						/** 遍历关键点以生成关键点1和关键点2之间相对应的点的变化信息 主要针对多边形的变化，暂不涉及轨迹的播放 **/
						for (var i = 0; i < pointArr1.length; i++) {
							point1 = turf.point(pointArr1[i]);
							point2 = turf.point(pointArr2[i]);
							distance = turf.distance(point1, point2, options);
							line = turf.lineString([pointArr1[i], pointArr2[i]]);
							if (distance < 10) {
								keyPointArr[i] = point1.geometry.coordinates;
							} else {
								phr = distance / (element.runTime * thatFps);
								keyPointArr[i] = turf.along(line, phr * (x - element.delay + 1), options).geometry.coordinates; // 取线上指定距离的点
							}
						}
						_element.keyPoint = keyPointArr;
						stepFpsArr[x].push(_element);
					}
				});
				stepFpsArr.forEach(function (stepFps, _key_) {
					schemaArr.push(stepFps);
				});
			});
			this.setAnimatArr(schemaArr);
			return schemaArr;
		}
	}, {
		key: 'setAnimatArr',
		value: function setAnimatArr(schemaArr) {
			this.animatArr = schemaArr;
		}
	}, {
		key: 'getAnimatArr',
		value: function getAnimatArr() {
			return this.animatArr;
		}

		/*开始动画的方法， 
      参数：一个布尔值
      true表示动画不循环执行。  
     */

	}, {
		key: 'start',
		value: function start(finished) {
			var now = void 0;
			var then = Date.now();
			var interval = 1000 / this.fps;
			var delta = void 0;
			var currentFps = 0; //当前帧数

			/*动画开始时间*/
			var startTime = Date.now();
			console.log('startTime....' + startTime);
			/*动画执行时间*/
			var duration = this.duration,
			    self = this;
			/*是否执行下一帧动画*/
			var next = true;
			/*定义动画执行函数*/
			requestAnimationFrame(function step() {
				/*得到动画执行进度*/
				//let p = (delta) / duration
				var p = (Date.now() - startTime) / duration;

				/*判断动画进度是否完成*/
				if (p < 1.0) {
					now = Date.now();
					delta = now - then;
					if (delta > interval) {
						then = now - delta % interval;
						currentFps++;
						//self.progress(currentFps,self.easing(p), p)   //执行动画回调函数，并传入动画算子的结果和动画进度。
						self.progress(currentFps, self.easing(p), p);
					}
				} else {
					if (finished) {
						//判断是否停止动画。如果是true代表停止动画。
						next = false;
					} else {
						next = true;
						currentFps = 0; //重置当前帧数
						startTime = Date.now();
					}
					console.log('startTime_end....' + (Date.now() - startTime));
				}
				// 如果next是true执行下一帧动画
				if (next) requestAnimationFrame(step);
			});
		}

		/**
  	* 播放函数
  	* currentFps 参数1：当前帧数，从1开始
  	*/

	}, {
		key: 'progress',
		value: function progress(currentFps) {
			var schemaArr = this.getAnimatArr();

			var elementArr = schemaArr[currentFps - 1];
			if (elementArr) {
				elementArr.forEach(function (element) {
					this._playElement(element);
				}.bind(this));
			}
		}

		/**
  	* 播放函数
  	* currentFps 参数1：当前帧数，从1开始
  	*/

	}, {
		key: '_playElement',
		value: function _playElement(element) {
			/*
    * element 当前播放的元素对象，包含:
    * .action 动作 none,update,add,delete
    * .type 类型
    * .id 
    * .keyPoint 点对象 数组
   */
			if (!element) {
				return;
			}
			if (element.action === 'none') {
				return;
			}
			if (element.action === 'delete') {
				this.map.removeFeatureById(element.id);
				return;
			}
			//let p = this.map.getFeatureById2LayerName(this.layer,element.id)
			var p = this.map.getFeatureById(element.id);
			var arrow = this.plot.plotDraw.createPlot(element.type);
			arrow.setPoints(element.keyPoint);
			var arr = arrow.getCoordinates();
			if (element.action === 'add') {
				if (p) {
					p.getGeometry().setCoordinates(arr);
				} else {
					if (element.type === 'Polyline') {
						p = this.map.addPolyline(arr.join(','), {
							layerName: this.layer,
							zoomToExtent: false
						});
					} else if (element.type === 'Point') {
						p = this.map.addPoint(arr.join(','), {
							layerName: this.layer,
							zoomToExtent: false
						});
					} else if (element.type === 'PlotText') {} else {
						p = this.map.addPolygon(arr.join(','), {
							layerName: this.layer,
							zoomToExtent: false
						});
					}
					if (p) {
						p.setId(element.id);
					}
				}
				return;
			}
			if (p) {
				p.getGeometry().setCoordinates(arr);
			}
		}
	}]);

	return AnimatorFactory;
}();

module.exports = AnimatorFactory;

/***/ })

/******/ });
});
//# sourceMappingURL=AnimatorFactory.js.map