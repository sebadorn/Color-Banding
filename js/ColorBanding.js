'use strict';


/**
 * @namespace ColorBanding
 */
const ColorBanding = {


	canvas: null,

	_mode: null,
	_type: null,

	MODE: {
		NONE: 0,
		DITHERING: 1
	},

	TYPE: {
		LINEAR: 0,
		RADIAL: 1
	},


	/**
	 *
	 */
	init() {
		this.canvas = document.getElementById( 'main' );

		this._mode = this.MODE.DITHERING;
		this._type = this.TYPE.RADIAL;

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
	 * Get the gradient type.
	 * @return {number}
	 */
	getType() {
		return this._type;
	},


	/**
	 * Set the mode.
	 * @param {number} mode
	 */
	setMode( mode ) {
		this._mode = mode;
	},


	/**
	 * Set the gradient type.
	 * @param {number} type
	 */
	setType( type ) {
		this._type = type;
	}


};
