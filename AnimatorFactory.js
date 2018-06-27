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


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * 20180621 lss
 * json 参数1：预案的json格式信息
 * qmap 参数2：当前地图对象
 * plot 参数3：标绘对象实例 
 * turf 参数4：工具对象实例
 * layerName 参数5： 图层名
 * fps  参数6：每秒帧数，默认24
 */

var AnimatorFactory = function () {
	function AnimatorFactory(json, qmap, plot, turf, layerName, fps) {
		_classCallCheck(this, AnimatorFactory);

		this.json = json;
		this.fps = fps || 24;
		this.plot = plot;
		this.turf = turf;
		this.map = qmap;
		this.layer = layerName || '_ctfoSchemaPolygon_';
		this.easing = function (p) {
			return p;
		};
		this.duration = 1;
		this.requestID;
		this.currentFps = 0; //当前帧数
		this.startFps = 0; //默认从第0帧开始播放
	}

	/**
 	* 解析json文件
 	* 目的就是生成schemaArr列表，每一帧要创建的元素（关键坐标，类型，样式，上图/下图/不变）
 	* 改为初始化时生成元素对象，
 	* 20180621 lss 
 	*/


	_createClass(AnimatorFactory, [{
		key: 'initAnalysis',
		value: function initAnalysis(json) {
			json = json || this.json;
			var schema = JSON.parse(json); // 预案JSON对象
			this.duration = schema.totalTime * 1000; //播放时长
			var steps = schema.steps; // 预案步骤列表
			var thatFps = this.fps; // 每秒播放帧数
			var turf = this.turf; // turf对象
			var schemaArr = []; //返回预案按帧播放列表对象
			var _elements_first_fps = {}; //保存元素的第一帧
			/** 遍历步骤列表生成每帧待播放元素集合对象 **/
			steps.forEach(function (step, key) {
				var totalTime = step.stepTotalTime; // 当前步骤的播放时长
				var totalFps = totalTime * thatFps; // 当前步骤总的播放帧数
				var elements = step.elements; // 当前步骤的所有元素列表
				var stepFpsArr = Array.apply(null, Array(totalFps)); // 用null填充当前步骤总帧数
				/** 遍历元素列表按帧生成元素关键信息 **/
				elements.forEach(function (element, _key) {
					if (!element.runTime || element.runTime === 0) {
						//当没有播放时长时的处理
						element.runTime = totalTime - element.delay;
					}
					/** 当前元素按帧生成关系信息对象 **/
					for (var x = element.delay * thatFps; x < totalFps; x++) {
						var _element = {}; // 每帧要播放的元素信息
						if (!stepFpsArr[x]) {
							stepFpsArr[x] = new Array();
						}
						_element.action = 'none';
						_element.type = element.elementType;
						_element.id = element.elementId;

						if (element.isChange) {
							_element.action = 'update';
							if (element.style) {
								_element.style = element.style;
							} else if (element.styleName) {
								_element.styleName = element.styleName;
							}
						}

						//步骤的最后一帧，步骤元素下图
						if (x === totalFps - 1) {
							_element.action = 'delete';
							stepFpsArr[x].push(_element);
							break;
						}

						/** 元素的最后帧，一般是下图 **/
						if (x === (element.delay + element.runTime) * thatFps - 1) {
							if (element.isRemove) {
								_element.action = 'delete';
								stepFpsArr[x].push(_element);
								break;
							} else if (element.isChange) {
								//如果元素不下图，则更新第一帧为元素形变的最后状态
								element.isChange = false;
								_element.keyPoint = element.keyPoints2;
								_elements_first_fps[element.elementId] = _element;
								stepFpsArr[x].push(_element);
								continue;
							}
						}

						/** 元素的第一帧，一般是上图 **/
						if (x === element.delay * thatFps) {
							_element.action = 'add';
							if (element.style) {
								_element.style = element.style;
							} else if (element.styleName) {
								_element.styleName = element.styleName;
							}
							_element.keyPoint = element.keyPoints1;
							stepFpsArr[x].push(_element);
							_elements_first_fps[_element.id] = _element;
							continue;
						}

						/** 如果元素什么都不变，就认为是静态元素，上完图后元素关键点与样式均与第一帧相同。*/
						if (_element.action === 'none') {
							var _element_first_fps = _elements_first_fps[_element.id];
							if (_element_first_fps.style) {
								_element.style = _element_first_fps.style;
							} else if (_element_first_fps.styleName) {
								_element.styleName = _element_first_fps.styleName;
							}
							_element.keyPoint = _element_first_fps.keyPoint;
							stepFpsArr[x].push(_element);
							continue;
						}

						var point1 = void 0; //当前元素关键点1的对应一点
						var point2 = void 0; //当前元素关键点2的对应一点
						var distance = void 0; //两点间的距离
						var line = void 0; //两个对应点生成的线对象
						var _line = void 0; //临时轨迹对象
						var phr = void 0; //每帧对应线上的实际距离
						var options = { units: 'meters' };
						var pointArr1 = element.keyPoints1; // 当前元素的关键点1
						var pointArr2 = element.keyPoints2; // 当前元素的关键点2
						var keyPointArr = []; //当前帧的关键点对象
						/** 遍历关键点以生成关键点1和关键点2之间相对应的点的变化信息 主要针对多边形的变化，**/
						/** 当无变化或只有一个状态或两个状态相同时应该是没有发生变形和位移 */
						if (!element.isChange || !pointArr2 || pointArr2.join(',') === pointArr1.join(',')) {
							keyPointArr = pointArr1;
						} else if (element.track) {
							if (element.track != 'elementId') {
								// 找到轨迹对象
								line = turf.lineString(element.track);
								distance = turf.length(line, options);
								phr = distance / (element.runTime * thatFps);
								keyPointArr = [turf.along(line, phr * (x - element.delay * thatFps), options).geometry.coordinates]; // 取线上指定距离的点
								if (x - element.delay * thatFps > 0) {
									// 注意： 此处可以优化?
									for (var k = 1, len = element.track.length; k < len; k++) {
										_line = turf.lineString(element.track.slice(0, k + 1));
										if (turf.length(_line, options) >= phr * (x - element.delay * thatFps)) {
											var dx = element.track[k][0] - element.track[k - 1][0];
											var dy = element.track[k][1] - element.track[k - 1][1];
											_element.angle = Math.atan2(dy, dx);
											_element.angle = _element.angle === 0 ? 0 : -_element.angle;
											break;
										}
									}
								}
							}
						} else {
							/** 遍历几个关键点生成每一帧对应新的关键点 **/
							for (var i = 0; i < pointArr1.length; i++) {
								point1 = turf.point(pointArr1[i]);
								point2 = turf.point(pointArr2[i]);
								distance = turf.distance(point1, point2, options);
								line = turf.lineString([pointArr1[i], pointArr2[i]]);
								if (distance < 1) {
									keyPointArr[i] = point1.geometry.coordinates;
								} else {
									phr = distance / (element.runTime * thatFps);
									keyPointArr[i] = turf.along(line, phr * (x - element.delay * thatFps), options).geometry.coordinates; // 取线上指定距离的点
								}
							}
						}
						if (element.elementType === 'TextArea') {
							_element.width = element.width;
							_element.height = element.height;
							_element.value = element.value;
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
			this.setFirstFpsElementMap(_elements_first_fps);
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
	}, {
		key: 'setFirstFpsElementMap',
		value: function setFirstFpsElementMap(firstFpsElementMap) {
			this.firstFpsElementMap = firstFpsElementMap;
		}
	}, {
		key: 'getFirstFpsElement',
		value: function getFirstFpsElement(id) {
			return this.firstFpsElementMap[id];
		}

		/*开始动画的方法， 
      参数：_fps 当前从第几帧开始播放，
      			finished 是否循环播放，true 不循环 
      true表示动画不循环执行。  
     */

	}, {
		key: 'start',
		value: function start() {
			var _fps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

			var finished = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

			var now = void 0;
			var then = Date.now();
			var interval = 1000 / this.fps;
			var delta = void 0;
			this.currentFps = _fps;
			this.startFps = _fps;

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
				// if(p < 1.0) {
				if (self.currentFps < self.getAnimatArr().length) {
					now = Date.now();
					delta = now - then;
					if (delta > interval) {
						then = now; // - (delta % interval)
						self.currentFps = self.currentFps + 1;
						self.progress(self.currentFps, self.easing(p), p); //执行动画回调函数，并传入动画算子的结果和动画进度。
						then = Date.now();
					} // 否则跳过此帧不播
				} else {
					if (finished) {
						//判断是否停止动画。如果是true代表停止动画。
						next = false;
					} else {
						next = true;
						self.currentFps = 0; //重置当前帧数
						startTime = Date.now();
					}
					console.log('startTime_end....' + (Date.now() - startTime));
				}
				// 如果next是true执行下一帧动画
				if (next) {
					// console.log(self.currentFps) 会重新执行某一帧        	
					self.requestID = requestAnimationFrame(step);
				}
			});
		}

		/**
  	* 暂停播放
  	*/

	}, {
		key: 'pause',
		value: function pause() {
			cancelAnimationFrame(this.requestID);
		}

		/**
  	* 继续播放
  	*/

	}, {
		key: 'restart',
		value: function restart() {
			this.start(this.requestID);
		}

		/**
  	* 停止播放
  	*/

	}, {
		key: 'stop',
		value: function stop() {
			this.currentFps = 0;
			// this.map.clearMap()
			cancelAnimationFrame(this.requestID);
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
  	* 添加当前步骤对象中的元素上图
  	* options 参数1：当前步骤JSON对象，里面是元素数组
  	*/

	}, {
		key: 'addStepFeatures',
		value: function addStepFeatures(options) {
			if (options) {
				if (options['elements']) {
					var elements = options['elements'];
					elements.forEach(function (element) {
						this._addStepFeature(element);
					}.bind(this));
				}
			}
		}

		/**
  	* 添加当前步骤对象中的一个元素上图
  	* element 参数1：当前元素JSON对象
  	*/

	}, {
		key: '_addStepFeature',
		value: function _addStepFeature(element) {
			if (!element) {
				return;
			}
			// elementId elementType keyPoints1 style
			var p = void 0;
			if (element.elementType === 'TextArea') {
				//文本对象的处理
				this.plot.plotDraw.createTextArea(element.elementType, element);
				return;
			}
			var arrow = this.plot.plotDraw.createPlot(element.elementType);
			arrow.setPoints(element.keyPoints1);
			// let arr = arrow.getCoordinates()
			// p = this._getGeometry(element.elementType,arr)
			p = new ol.Feature(arrow);
			if (p) {
				p.setId(element.elementId);
				p.set('isPlot', true);
				this.plot.plotDraw.drawLayer.getSource().addFeature(p);
				if (element.style) {
					var style_ = this.setStyle(element.style);
					if (style_) {
						p.setStyle(style_);
					}
				} else if (element.styleName) {
					this.plot.plotDraw.feature = p;
					this.plot.plotDraw.setStyle4Name(element.styleName);
				}
			}
		}

		/**
  	* 播放函数具体的实现方法
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
    * .style 
   */
			var addFlag = false;
			if (!element) {
				return;
			}

			/** 如果从中间开始播放，若地图上无此元素则令添加标志为真*/
			if (element.action === 'none') {
				if (this.startFps === 0) {
					return;
				} else if (!this.map.getFeatureById(element.id)) {
					addFlag = true;
				}
			}

			if (element.action === 'delete') {
				this.map.removeFeatureById(element.id);
				return;
			}

			//let p = this.map.getFeatureById2LayerName(this.layer,element.id)
			var p = this.map.getFeatureById(element.id);
			var arrow = this.plot.plotDraw.createPlot(element.type);
			if (arrow === 'TextArea') {
				arrow = this.plot.plotDraw.createPlot('Point');
			}
			arrow.setPoints(element.keyPoint);
			var arr = arrow.getCoordinates();
			//当元素动作是添加、更新或者添加标志为真时，更新元素
			if (element.action === 'add' || element.action === 'update' || addFlag) {
				if (p) {
					p.getGeometry().setCoordinates(arr);
				} else {
					p = this._getGeometry(element.type, arr);
					if (p) {
						p.setId(element.id);
					}
				}
				if (element.style) {
					var style_ = this.setStyle(element.style);
					if (style_) {
						if (p) {
							p.setStyle(style_);
						}
					}
				} else if (element.styleName) {
					if (p) {
						this.plot.plotDraw.feature = p;
						this.plot.plotDraw.setStyle4Name(element.styleName);
					}
				}
				return;
			}
			/** //注意：如果从中间开始播放，这类元素应该是无法上图的 */
			if (p) {
				if (element.angle != null) {
					p.getStyle().getImage().setRotation(element.angle);
				}
				p.getGeometry().setCoordinates(arr);
			}
		}

		/**
  	*	根据类型获取地图元素
  	* type 元素类型
  	* arr  元素坐标信息
  	*/

	}, {
		key: '_getGeometry',
		value: function _getGeometry(type, arr) {
			var p = null;
			if (type) {
				if (type === 'Polyline' || type === 'StraightArrow' || type === 'Curve' || type === 'FreeHandLine' || type === 'Arc') {
					p = this.map.addPolyline(arr.join(','), {
						layerName: this.layer,
						zoomToExtent: false
					});
				} else if (type === 'Point' || type === 'Pennant') {
					p = this.map.addPoint(arr.join(','), {
						layerName: this.layer,
						zoomToExtent: false
					});
				} else if (type === 'PlotText' || type === 'TextArea' || type === 'PlotTextBox') {
					p = this.map.addPoint(arr.join(','), {
						layerName: this.layer,
						zoomToExtent: false
					});
				} else {
					p = this.map.addPolygon(arr.join(','), {
						layerName: this.layer,
						zoomToExtent: false
					});
				}
			}
			return p;
		}

		/**
  	* 根据配置加载样式
  	* options 参数1 stylec数组对象
  	*/

	}, {
		key: 'setStyle',
		value: function setStyle(options) {
			var option = options && (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' ? options : {};
			var style = new ol.style.Style({});
			if (option['fill'] && _typeof(option['fill']) === 'object') {
				style.setFill(this._getFill(option['fill']));
			}
			if (option['image'] && _typeof(option['image']) === 'object') {
				style.setImage(this._getImage(option['image']));
			}
			if (option['stroke'] && _typeof(option['stroke']) === 'object') {
				style.setStroke(this._getStroke(option['stroke']));
			}
			if (option['text'] && _typeof(option['text']) === 'object') {
				style.setText(this._getText(option['text']));
			}
			return style;
		}

		/**
   * 获取填充颜色
   * @param options
   * @returns {ol.style.Fill}
   * @private
   */

	}, {
		key: '_getFill',
		value: function _getFill(options) {
			try {
				options = options || {};
				var fill = new ol.style.Fill({
					color: options['fillColor'] ? options['fillColor'] : undefined
				});
				return fill;
			} catch (error) {
				console.log(error);
			}
		}

		/**
   * 获取线条样式
   * @param options
   * @returns {ol.style.Stroke}
   * @private
   */

	}, {
		key: '_getStroke',
		value: function _getStroke(options) {
			try {
				options = options || {};
				var stroke = new ol.style.Stroke({
					color: options['strokeColor'] ? options['strokeColor'] : undefined,
					lineCap: options['strokeLineCap'] && typeof options['strokeLineCap'] === 'string' ? options['strokeLineCap'] : 'round',
					lineJoin: options['strokeLineJoin'] && typeof options['strokeLineJoin'] === 'string' ? options['strokeLineJoin'] : 'round',
					lineDash: options['strokeLineDash'] ? options['strokeLineDash'] : undefined,
					lineDashOffset: typeof options['strokeLineDashOffset'] === 'number' ? options['strokeLineDashOffset'] : '0',
					miterLimit: typeof options['strokeMiterLimit'] === 'number' ? options['strokeMiterLimit'] : 10,
					width: typeof options['strokeWidth'] === 'number' ? options['strokeWidth'] : undefined
				});
				return stroke;
			} catch (error) {
				console.log(error);
			}
		}

		/**
   * 获取样式文本
   * @param options
   * @returns {ol.style.Text}
   * @private
   */

	}, {
		key: '_getText',
		value: function _getText(options) {
			try {
				var text = new ol.style.Text({
					font: options['textFont'] && typeof options['textFont'] === 'string' ? options['textFont'] : '10px sans-serif',
					offsetX: typeof options['textOffsetX'] === 'number' ? options['textOffsetX'] : 0,
					offsetY: typeof options['textOffsetY'] === 'number' ? options['textOffsetY'] : 0,
					scale: typeof options['textScale'] === 'number' ? options['textScale'] : undefined,
					rotation: typeof options['textRotation'] === 'number' ? options['textRotation'] : 0,
					text: options['text'] && typeof options['text'] === 'string' ? options['text'] : undefined,
					textAlign: options['textAlign'] && typeof options['textAlign'] === 'string' ? options['textAlign'] : 'start',
					textBaseline: options['textBaseline'] && typeof options['textBaseline'] === 'string' ? options['textBaseline'] : 'alphabetic',
					rotateWithView: typeof options['rotateWithView'] === 'boolean' ? options['rotateWithView'] : false,
					fill: this._getFill(options['textFill']),
					stroke: this._getStroke(options['textStroke'])
				});
				return text;
			} catch (error) {
				console.log(error);
			}
		}

		/**
   * 获取图标样式
   * @param options
   * @returns {*}
   * @private
   */

	}, {
		key: '_getImage',
		value: function _getImage(options) {
			try {
				var image = void 0;
				options = options || {};
				if (options['type'] === 'icon') {
					image = this._getIcon(options);
				} else {
					image = this._getRegularShape(options['image']);
				}
				return image;
			} catch (e) {
				console.log(e);
			}
		}

		/**
   * 获取icon
   * @param options
   * @returns {ol.style.Icon}
   * @private
   */

	}, {
		key: '_getIcon',
		value: function _getIcon(options) {
			try {
				options = options || {};
				var icon = new ol.style.Icon({
					anchor: options['imageAnchor'] ? options['imageAnchor'] : [0.5, 0.5],
					anchorXUnits: options['imageAnchorXUnits'] ? options['imageAnchorXUnits'] : 'fraction',
					anchorYUnits: options['imageAnchorYUnits'] ? options['imageAnchorYUnits'] : 'fraction',
					anchorOrigin: options['imageAnchorOrigin'] ? options['imageAnchorYUnits'] : 'top-left',
					color: options['imageColor'] ? options['imageColor'] : undefined,
					crossOrigin: options['crossOrigin'] ? options['crossOrigin'] : undefined,
					img: options['img'] ? options['img'] : undefined,
					offset: options['offset'] && Array.isArray(options['offset']) && options['offset'].length === 2 ? options['offset'] : [0, 0],
					offsetOrigin: options['offsetOrigin'] ? options['offsetOrigin'] : 'top-left',
					scale: typeof options['scale'] === 'number' ? options['scale'] : 1,
					snapToPixel: typeof options['snapToPixel'] === 'boolean' ? options['snapToPixel'] : true,
					rotateWithView: typeof options['rotateWithView'] === 'boolean' ? options['rotateWithView'] : false,
					opacity: typeof options['imageOpacity'] === 'number' ? options['imageOpacity'] : 1,
					rotation: typeof options['imageRotation'] === 'number' ? options['imageRotation'] : 0,
					size: options['size'] && Array.isArray(options['size']) && options['size'].length === 2 ? options['size'] : undefined,
					imgSize: options['imgSize'] && Array.isArray(options['imgSize']) && options['imgSize'].length === 2 ? options['imgSize'] : undefined,
					src: options['imageSrc'] ? options['imageSrc'] : undefined
				});
				return icon;
			} catch (error) {
				console.log(error);
			}
		}

		/**
   * 获取规则样式图形
   * @param options
   * @returns {*}
   * @private
   */

	}, {
		key: '_getRegularShape',
		value: function _getRegularShape(options) {
			try {
				var regularShape = new ol.style.RegularShape({
					fill: this._getFill(options['fill']) || undefined,
					points: typeof options['points'] === 'number' ? options['points'] : 1,
					radius: typeof options['radius'] === 'number' ? options['radius'] : undefined,
					radius1: typeof options['radius1'] === 'number' ? options['radius1'] : undefined,
					radius2: typeof options['radius2'] === 'number' ? options['radius2'] : undefined,
					angle: typeof options['angle'] === 'number' ? options['angle'] : 0,
					snapToPixel: typeof options['snapToPixel'] === 'boolean' ? options['snapToPixel'] : true,
					stroke: this._getStroke(options['stroke']) || undefined,
					rotation: typeof options['rotation'] === 'number' ? options['rotation'] : 0,
					rotateWithView: typeof options['rotateWithView'] === 'boolean' ? options['rotateWithView'] : false,
					atlasManager: options['atlasManager'] ? options['atlasManager'] : undefined
				});
				return regularShape;
			} catch (e) {
				console.log(e);
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