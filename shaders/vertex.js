'use strict';


ColorBanding.Renderer.vertexShader = `
	attribute vec4 aVertexPosition;

	varying lowp vec2 vPos;

	void main( void ) {
		gl_Position = aVertexPosition;
		vPos = vec2( gl_Position.x, gl_Position.y );
	}
`;
