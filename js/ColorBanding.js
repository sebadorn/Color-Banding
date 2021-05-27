'use strict';


/**
 * @namespace ColorBanding
 */
const ColorBanding = {


	canvas: null,

	_mode: null,
	_sizeModifier: null,
	_type: null,

	MODE: {
		NONE: 0,
		DITHERING: 1
	},

	SIZE_MOD: {
		NONE: 0,
		SQRT: 1
	},

	TYPE: {
		LINEAR_H: 0,
		LINEAR_V: 1,
		RADIAL: 2
	},


	/**
	 *
	 */
	init() {
		this.canvas = document.getElementById( 'main' );

		this._mode = this.MODE.DITHERING;
		this._sizeModifier = this.SIZE_MOD.NONE;
		this._type = this.TYPE.LINEAR_H;

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
	 * Get the mode name.
	 * @return {?string}
	 */
	getModeName() {
		const mode = this.getMode();

		for( const key in this.MODE ) {
			if( this.MODE[key] === mode ) {
				return key.toLowerCase();
			}
		}

		return null;
	},


	/**
	 * Get the size modifier.
	 * @return {number}
	 */
	getSizeModifier() {
		return this._sizeModifier;
	},


	/**
	 * Get the gradient type.
	 * @return {number}
	 */
	getType() {
		return this._type;
	},


	/**
	 * Get the gradient type as name.
	 * @return {?string}
	 */
	getTypeName() {
		const type = this.getType();

		for( const key in this.TYPE ) {
			if( this.TYPE[key] === type ) {
				return key.toLowerCase();
			}
		}

		return null;
	},


	/**
	 * Set the mode.
	 * @param {number} mode
	 */
	setMode( mode ) {
		this._mode = mode;
	},


	/**
	 * Set the size modifier.
	 * @param {number} sm
	 */
	setSizeModifier( sm ) {
		this._sizeModifier = sm;
	},


	/**
	 * Set the gradient type.
	 * @param {number} type
	 */
	setType( type ) {
		this._type = type;
	}


};
