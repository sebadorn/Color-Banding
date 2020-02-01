'use strict';


/**
 * @namespace ColorBanding.UI
 */
ColorBanding.UI = {


	/**
	 *
	 */
	init() {
		this.updateSize();

		window.addEventListener( 'resize', () => this.updateSize() );

		ColorBanding.canvas.addEventListener( 'mousedown', ev => this._setNewCenter( ev ) );
		ColorBanding.canvas.addEventListener( 'mousemove', ev => this._setNewCenter( ev ) );
	},


	/**
	 *
	 * @private
	 * @param {MouseEvent} ev
	 */
	_setNewCenter( ev ) {
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
		ColorBanding.canvas.width = window.innerWidth;
		ColorBanding.canvas.height = window.innerHeight;

		ColorBanding.Renderer.draw();
	}


};
