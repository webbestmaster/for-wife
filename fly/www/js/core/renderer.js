/*global window, devicePixelRatio */
/*global define, PIXI, FPSMeter */
define(['device', 'mediator', 'deviceKeys', 'FPSMeter', 'rendererKeys'],
	function (device, mediator, deviceKeys, fpsMeter, rendererKeys) {

		"use strict";

		var win = window;

		return {

			renderer: null,
			stage: null,

			pixelRatio: 1,
			isWebGLSupport: false,

			resolution: 1,

			fpsMeter: new FPSMeter(), // remove

			initialize: function () {

				var renderer = this;

				renderer.detectResolution();

				renderer.createRenderer();

				renderer.bindEventListeners();

				renderer.start();

			},

			detectPixelRatio: function () {

				this.pixelRatio = win.devicePixelRatio || 1;

				return this.pixelRatio;

			},

			detectWebGlSupport: function () {

				var tempCanvas, isWebGLSupport;

				tempCanvas = win.document.createElement('canvas');

				try {
					isWebGLSupport = !!(tempCanvas.getContext('webgl') || tempCanvas.getContext('experimental-webgl'));
				} catch (e) {
					isWebGLSupport = false;
				}

				this.isWebGLSupport = isWebGLSupport;

				return this.isWebGLSupport;

			},

			detectResolution: function () {

				var renderer = this,
					pixelRatio = renderer.detectPixelRatio(),
					isWebGLSupport = renderer.detectWebGlSupport();

				renderer.resolution = pixelRatio >= 2 && isWebGLSupport ? 2 : 1;

				return renderer.resolution;

			},

			start: function () {

				var renderer = this,
					ticker = win.PIXI.ticker.shared;

				ticker.add(renderer.draw, renderer);

				ticker.start();
			},

			draw: function () {

				var renderer = this;

				renderer.renderer.render(renderer.stage);

				renderer.fpsMeter.tick(); // remove

				renderer.publish(rendererKeys.UPDATED);

			},

			createRenderer: function () {

				var renderer = this,

					deviceData = device.attr,

					pixiRenderer = win.PIXI.autoDetectRenderer(
						deviceData.width,
						deviceData.height,
						{
							resolution: renderer.resolution
						}
					);

				renderer.stage = new win.PIXI.Container();

				win.document.body.appendChild(pixiRenderer.view);

				renderer.renderer = pixiRenderer;

				return renderer.renderer;

			},

			bindEventListeners: function () {

				var renderer = this;

				mediator.installTo(renderer);

				renderer.subscribe(deviceKeys.RESIZE, renderer.onResize);
				renderer.subscribe(rendererKeys.APPEND, renderer.append);
				renderer.subscribe(rendererKeys.REMOVE, renderer.remove);

			},

			onResize: function (data) {
				this.renderer.resize(data.width, data.height);
			},

			append: function (sprite) {
				this.stage.addChild(sprite);
			},

			remove: function (sprite) {
				this.stage.removeChild(sprite);
			},

			//////
			//  only for mediator
			//////
			publish: null,
			subscribe: null,
			unsubscribe: null

		};

	}
);
