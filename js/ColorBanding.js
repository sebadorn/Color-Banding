'use strict';


/**
 * @namespace ColorBanding
 */
const ColorBanding = {


	canvas: null,


	/**
	 *
	 */
	init() {
		this.canvas = document.getElementById( 'main' );

		ColorBanding.UI.init();
		ColorBanding.Renderer.init();
	}


};
