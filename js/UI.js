'use strict';


/**
 * @namespace ColorBanding.UI
 */
ColorBanding.UI = {


	_timeoutResize: null,


	/**
	 *
	 */
	init() {
		this.updateSize();

		window.addEventListener( 'resize', () => this.updateSize() );

		ColorBanding.canvas.addEventListener( 'mousedown', ev => this._setNewCenter( ev ) );
		ColorBanding.canvas.addEventListener( 'mousemove', ev => this._setNewCenter( ev ) );

		this._initSettings();
	},


	/**
	 *
	 * @private
	 */
	_initColors() {
		const selectPreset = document.querySelector( '.color-presets' );
		selectPreset.addEventListener( 'change', ev => {
			if( ev.target.value === '-1' ) {
				return;
			}

			const values = ev.target.value.split( ';' );
			const start = values[0].split( ',' );
			const end = values[1].split( ',' );

			ColorBanding.Renderer.setColorStart( ...start );
			ColorBanding.Renderer.setColorEnd( ...end );
			ColorBanding.Renderer.draw();

			inputStart.value = ColorBanding.Renderer.getColorStartHex();
			inputEnd.value = ColorBanding.Renderer.getColorEndHex();
		} );

		const inputStart = document.querySelector( '.color-start' );
		inputStart.value = ColorBanding.Renderer.getColorStartHex();
		inputStart.addEventListener( 'change', ev => {
			ColorBanding.Renderer.setColorStartHex( ev.target.value );
			ColorBanding.Renderer.draw();

			selectPreset.selectedIndex = selectPreset.options.length - 1;
		} );

		const inputEnd = document.querySelector( '.color-end' );
		inputEnd.value = ColorBanding.Renderer.getColorEndHex();
		inputEnd.addEventListener( 'change', ev => {
			ColorBanding.Renderer.setColorEndHex( ev.target.value );
			ColorBanding.Renderer.draw();

			selectPreset.selectedIndex = selectPreset.options.length - 1;
		} );
	},


	/**
	 *
	 * @private
	 */
	_initGradientType() {
		const selectGradient = document.querySelector( '.gradient-type' );
		selectGradient.value = ColorBanding.getType();

		selectGradient.addEventListener( 'change', ev => {
			let type = ev.target.value;
			ColorBanding.setType( type );
			ColorBanding.Renderer.draw();
		} );

		const sizeMod = document.querySelector( 'input#sqrt-distance' );
		sizeMod.checked = ( ColorBanding.getSizeModifier() === ColorBanding.SIZE_MOD.SQRT );

		sizeMod.addEventListener( 'change', ev => {
			let value = ColorBanding.SIZE_MOD.NONE;

			if( ev.target.checked ) {
				value = ColorBanding.SIZE_MOD.SQRT;
			}

			ColorBanding.setSizeModifier( value );
			ColorBanding.Renderer.draw();
		} );
	},


	/**
	 *
	 * @private
	 */
	_initNoiseMode() {
		const selectNoise = document.querySelector( '.noise-mode' );
		selectNoise.value = ColorBanding.getMode();

		selectNoise.addEventListener( 'change', ev => {
			let mode = ev.target.value;
			ColorBanding.setMode( mode );
			ColorBanding.Renderer.draw();
		} );
	},


	/**
	 *
	 * @private
	 */
	_initSettings() {
		this._initColors();
		this._initGradientType();
		this._initNoiseMode();
	},


	/**
	 *
	 * @private
	 * @param {MouseEvent} ev
	 */
	_setNewCenter( ev ) {
		// Only react the primary button mousedowns.
		if( ev.type === 'mousedown' && ev.buttons !== 1 ) {
			return;
		}

		// Ignore mouse moves if no button is pressed.
		if( ev.type === 'mousemove' && ev.buttons === 0 ) {
			return;
		}

		let pxX = ev.clientX - ColorBanding.canvas.offsetLeft;
		let pxY = ev.clientY - ColorBanding.canvas.offsetTop;

		let x = pxX / ColorBanding.canvas.width; // [0.0, 1.0]
		let y = pxY / ColorBanding.canvas.height;

		x = x * 2 - 1; // [-1.0, +1.0]
		y = -( y * 2 - 1 );

		ColorBanding.Renderer.setColorCenter( x, y );
		ColorBanding.Renderer.draw();
	},


	/**
	 * Adjust to the window size.
	 */
	updateSize() {
		const canvas = ColorBanding.canvas;

		canvas.removeAttribute( 'width' );
		canvas.removeAttribute( 'height' );

		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;

		clearTimeout( this._timeoutResize );

		this._timeoutResize = setTimeout(() => {
			ColorBanding.Renderer.draw();
		}, 125);
	}


};
