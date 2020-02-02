'use strict';


/**
 * @namespace ColorBanding
 */
const ColorBanding = {


	canvas: null,

	_mode: 1,


	MODE: {
		NONE: 0,
		DITHERING: 1
	},


	/**
	 *
	 */
	init() {
		this.canvas = document.getElementById( 'main' );

		ColorBanding.UI.init();
		ColorBanding.Renderer.init();
	},


	/**
	 * Get the mode.
	 * @return {number}
	 */
	getMode() {
		return this._mode;
	},


	/**
	 * Set the mode.
	 * @param {number} mode
	 */
	setMode( mode ) {
		this._mode = mode;
	}


};
