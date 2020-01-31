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
