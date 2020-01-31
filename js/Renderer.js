'use strict';


/**
 * @namespace ColorBanding.Renderer
 */
ColorBanding.Renderer = {


	colorBuffer: null,
	positionBuffer: null,

	gl: null,
	shaderProgram: null,

	_attribLocationColor: null,
	_attribLocationPosition: null,


	/**
	 *
	 */
	init() {
		this.gl = ColorBanding.canvas.getContext( 'webgl' );

		if( !this.gl ) {
			console.error( '[ColorBanding.Renderer.init] No WebGL context available.' );
			return;
		}

		this._createShaders();
		this._createBuffers();

		this.draw();
	},


	/**
	 *
	 * @private
	 * @return {object}
	 */
	_createBuffers() {
		const positions = [
			+1.0, +1.0,
			-1.0, +1.0,
			+1.0, -1.0,
			-1.0, -1.0
		];

		this.positionBuffer = this.gl.createBuffer();
		this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.positionBuffer );
		this.gl.bufferData( this.gl.ARRAY_BUFFER, new Float32Array( positions ), this.gl.STATIC_DRAW );


		const colors = [
			0.216, 0.553, 0.992, 1.000,
			0.051, 0.141, 0.263, 1.000,
			0.216, 0.553, 0.992, 1.000,
			0.051, 0.141, 0.263, 1.000
		];

		this.colorBuffer = this.gl.createBuffer();
		this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.colorBuffer );
		this.gl.bufferData( this.gl.ARRAY_BUFFER, new Float32Array( colors ), this.gl.STATIC_DRAW );
	},


	/**
	 *
	 * @private
	 */
	_createShaders() {
		const vertexShader = this.loadShader( this.gl.VERTEX_SHADER, ColorBanding.Renderer.vertexShader );
		const fragmentShader = this.loadShader( this.gl.FRAGMENT_SHADER, ColorBanding.Renderer.fragmentShader );

		const program = this.gl.createProgram();
		this.gl.attachShader( program, vertexShader );
		this.gl.attachShader( program, fragmentShader );
		this.gl.linkProgram( program );

		if( !this.gl.getProgramParameter( program, this.gl.LINK_STATUS ) ) {
			console.error(
				'[ColorBanding.Renderer._createShaders] Unable to initialize shader program: ' +
					this.gl.getProgramInfoLog( program )
			);
		}
		else {
			this.shaderProgram = program;

			this._attribLocationPosition = this.gl.getAttribLocation( this.shaderProgram, 'aVertexPosition' );
			this._attribLocationColor = this.gl.getAttribLocation( this.shaderProgram, 'aVertexColor' );
		}
	},


	/**
	 * Draw.
	 */
	draw() {
		if( !this.gl || !this.shaderProgram ) {
			return;
		}

		this.gl.viewport( 0, 0, this.gl.canvas.width, this.gl.canvas.height );

		this.gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
		this.gl.clearDepth( 1.0 );
		this.gl.clear( this.gl.COLOR_BUFFER_BIT );

		// Positions
		this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.positionBuffer );
		this.gl.vertexAttribPointer( this._attribLocationPosition, 2, this.gl.FLOAT, false, 0, 0 );
		this.gl.enableVertexAttribArray( this._attribLocationPosition );

		// Colors
		this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.colorBuffer );
		this.gl.vertexAttribPointer( this._attribLocationColor, 4, this.gl.FLOAT, false, 0, 0 );
		this.gl.enableVertexAttribArray( this._attribLocationColor );

		this.gl.useProgram( this.shaderProgram );
		this.gl.drawArrays( this.gl.TRIANGLE_STRIP, 0, 4 );
	},


	/**
	 *
	 * @param  {number} type
	 * @param  {string} source
	 * @return {?WebGLShader}
	 */
	loadShader( type, source ) {
		const shader = this.gl.createShader( type );
		this.gl.shaderSource( shader, source );
		this.gl.compileShader( shader );

		if( !this.gl.getShaderParameter( shader, this.gl.COMPILE_STATUS ) ) {
			console.error(
				'[ColorBanding.Renderer.loadShader] Failed to compile shader: ' +
					this.gl.getShaderInfoLog( shader )
			);

			this.gl.deleteShader( shader );

			return null;
		}

		return shader;
	}


};
