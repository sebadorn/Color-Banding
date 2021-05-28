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
		this.initFromURL();
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
	 * Get the size modifier name.
	 * @return {?string}
	 */
	getSizeModifierName() {
		const sm = this.getSizeModifier();

		for( const key in this.SIZE_MOD ) {
			if( this.SIZE_MOD[key] === sm ) {
				return key.toLowerCase();
			}
		}

		return null;
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
	 *
	 */
	initFromURL() {
		let search = window.location.search;

		if( search.length <= 1 ) {
			return;
		}

		if( search.startsWith( '?' ) ) {
			search = search.slice( 1 );
		}

		const params = search.split( '&' );

		if( params.length === 0 ) {
			return;
		}

		params.forEach( param => {
			const parts = param.split( '=' );

			if( parts.length !== 2 ) {
				return;
			}

			const key = parts[0];
			let value = decodeURIComponent( parts[1] );

			switch( key ) {
				case 'cs':
					{
						const inputStart = document.querySelector( '.color-start' );
						inputStart.value = '#' + value;

						const event = new CustomEvent( 'change', { target: inputStart } );
						inputStart.dispatchEvent( event );
					}
					break;

				case 'ce':
					{
						const inputEnd = document.querySelector( '.color-end' );
						inputEnd.value = '#' + value;

						const event = new CustomEvent( 'change', { target: inputEnd } );
						inputEnd.dispatchEvent( event );
					}
					break;

				case 'g':
					{
						value = value.toUpperCase();

						if( typeof this.TYPE[value] !== 'undefined' ) {
							const selectGradient = document.querySelector( '.gradient-type' );
							selectGradient.value = this.TYPE[value];

							const event = new CustomEvent( 'change', { target: selectGradient } );
							selectGradient.dispatchEvent( event );
						}
					}
					break;

				case 'sm':
					{
						value = value.toUpperCase();

						if( typeof this.SIZE_MOD[value] !== 'undefined' ) {
							const sizeMod = document.querySelector( 'input#sqrt-distance' );
							sizeMod.checked = ( this.SIZE_MOD[value] === ColorBanding.SIZE_MOD.SQRT );

							const event = new CustomEvent( 'change', { target: sizeMod } );
							sizeMod.dispatchEvent( event );
						}
					}
					break;

				case 'm':
					{
						value = value.toUpperCase();

						if( typeof this.MODE[value] !== 'undefined' ) {
							const selectNoise = document.querySelector( '.noise-mode' );
							selectNoise.value = this.MODE[value];

							const event = new CustomEvent( 'change', { target: selectNoise } );
							selectNoise.dispatchEvent( event );
						}
					}
					break;
			}
		} );
	},


	/**
	 * Set the mode.
	 * @param {number} mode
	 */
	setMode( mode ) {
		if( typeof mode !== 'number' || isNaN( mode ) ) {
			throw new Error( '[setMode] Expected value to be a number.' );
		}

		this._mode = mode;
	},


	/**
	 * Set the size modifier.
	 * @param {number} sm
	 */
	setSizeModifier( sm ) {
		if( typeof sm !== 'number' || isNaN( sm ) ) {
			throw new Error( '[setSizeModifier] Expected value to be a number.' );
		}

		this._sizeModifier = sm;
	},


	/**
	 * Set the gradient type.
	 * @param {number} type
	 */
	setType( type ) {
		if( typeof type !== 'number' || isNaN( type ) ) {
			throw new Error( '[setSizeModifier] Expected value to be a number.' );
		}

		this._type = type;
	}


};
