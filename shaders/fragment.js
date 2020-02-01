'use strict';


ColorBanding.Renderer.fragmentShader = `
	uniform lowp vec4 uColorStart;
	uniform lowp vec4 uColorEnd;

	varying lowp vec2 vPos;

	void main( void ) {
		lowp float x = ( vPos.x + 1.0 ) * 0.5;
		gl_FragColor = uColorStart * ( 1.0 - x ) + uColorEnd * x;
	}
`;
