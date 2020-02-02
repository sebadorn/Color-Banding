'use strict';


ColorBanding.Renderer.vertexShader = `#version 300 es
	in vec4 aVertexPosition;

	out lowp vec2 vPos;


	void main( void ) {
		gl_Position = aVertexPosition;
		vPos = vec2( gl_Position.x, gl_Position.y );
	}
`;
