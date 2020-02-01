'use strict';


ColorBanding.Renderer.fragmentShader = `
	uniform lowp float uWindowRatio;
	uniform lowp vec2 uCenter;
	uniform lowp vec4 uColorEnd;
	uniform lowp vec4 uColorStart;

	varying lowp vec2 vPos;

	void main( void ) {
		lowp float xDist = vPos.x - uCenter.x;
		lowp float yDist = ( vPos.y - uCenter.y ) * uWindowRatio;
		lowp float euclideanDist = sqrt( xDist * xDist + yDist * yDist );
		lowp float f = sqrt( euclideanDist );

		gl_FragColor = uColorStart * ( 1.0 - f ) + uColorEnd * f;
		gl_FragColor.w = 1.0;
	}
`;
