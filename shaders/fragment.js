'use strict';


ColorBanding.Renderer.fragmentShader = `
	varying lowp vec4 vColor;

	void main( void ) {
		gl_FragColor = vColor;
	}
`;
