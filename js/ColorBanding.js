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
	 *
	 * @param  {Float32Array} v
	 * @return {string}
	 */
	floatRGBToHex( v ) {
		let r = Math.round( v[0] * 255 ).toString( 16 );
		let g = Math.round( v[1] * 255 ).toString( 16 );
		let b = Math.round( v[2] * 255 ).toString( 16 );

		let hex = '#';
		hex += ( r.length < 2 ) ? '0' + r : r;
		hex += ( g.length < 2 ) ? '0' + g : g;
		hex += ( b.length < 2 ) ? '0' + b : b;

		return hex.toUpperCase();
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
