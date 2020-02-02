'use strict';


/**
 * @namespace ColorBanding.Renderer
 */
ColorBanding.Renderer = {


	gl: null,

	_colorCenter: null,
	_colorEnd: null,
	_colorStart: null,
	_positionBuffer: null,
	_shaderProgram: null,

	_attribLocationPosition: null,

	_uniformLocationCenter: null,
	_uniformLocationColorEnd: null,
	_uniformLocationColorStart: null,
	_uniformLocationMode: null,
	_uniformLocationTime: null,
	_uniformLocationWindowSize: null,


	/**
	 *
	 */
	init() {
		this.gl = ColorBanding.canvas.getContext( 'webgl2' );

		if( !this.gl ) {
			console.error( '[ColorBanding.Renderer.init] No WebGL context available.' );
			return;
		}

		this.setColorCenter( 0.0, 0.0 );
		this.setColorStart( 0.216, 0.553, 0.992, 1.0 );
		this.setColorEnd( 0.051, 0.141, 0.263, 1.0 );

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

		this._positionBuffer = this.gl.createBuffer();
		this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this._positionBuffer );
		this.gl.bufferData( this.gl.ARRAY_BUFFER, new Float32Array( positions ), this.gl.STATIC_DRAW );
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
			this._shaderProgram = program;

			this._attribLocationPosition = this.gl.getAttribLocation( this._shaderProgram, 'aVertexPosition' );

			this._uniformLocationCenter = this.gl.getUniformLocation( this._shaderProgram, 'uCenter' );
			this._uniformLocationColorStart = this.gl.getUniformLocation( this._shaderProgram, 'uColorStart' );
			this._uniformLocationColorEnd = this.gl.getUniformLocation( this._shaderProgram, 'uColorEnd' );
			this._uniformLocationMode = this.gl.getUniformLocation( this._shaderProgram, 'uMode' );
			this._uniformLocationTime = this.gl.getUniformLocation( this._shaderProgram, 'uTime' );
			this._uniformLocationWindowSize = this.gl.getUniformLocation( this._shaderProgram, 'uWindowSize' );
		}
	},


	/**
	 * Draw.
	 */
	draw() {
		if( !this.gl || !this._shaderProgram ) {
			return;
		}

		this.gl.viewport( 0, 0, this.gl.canvas.width, this.gl.canvas.height );

		this.gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
		this.gl.clearDepth( 1.0 );
		this.gl.clear( this.gl.COLOR_BUFFER_BIT );

		// Positions
		this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this._positionBuffer );
		this.gl.vertexAttribPointer( this._attribLocationPosition, 2, this.gl.FLOAT, false, 0, 0 );
		this.gl.enableVertexAttribArray( this._attribLocationPosition );

		this.gl.useProgram( this._shaderProgram );

		// Update uniform values
		this.gl.uniform1i( this._uniformLocationMode, ColorBanding.getMode() );
		this.gl.uniform1ui( this._uniformLocationTime, Date.now() );
		this.gl.uniform2fv( this._uniformLocationCenter, this._colorCenter );
		this.gl.uniform4fv( this._uniformLocationColorStart, this._colorStart );
		this.gl.uniform4fv( this._uniformLocationColorEnd, this._colorEnd );
		this.gl.uniform2uiv( this._uniformLocationWindowSize, new Uint32Array( [window.innerWidth, window.innerHeight] ) );

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
	},


	/**
	 *
	 * @param {number} x - Relative position [-1.0, +1.0].
	 * @param {number} y - Relative position [-1.0, +1.0].
	 */
	setColorCenter( x, y ) {
		this._colorCenter = new Float32Array( [x, y] );
	},


	/**
	 *
	 * @param {number} r
	 * @param {number} g
	 * @param {number} b
	 * @param {number} a
	 */
	setColorEnd( r, g, b, a ) {
		this._colorEnd = new Float32Array( [r, g, b, a] );
	},


	/**
	 *
	 * @param {number} r
	 * @param {number} g
	 * @param {number} b
	 * @param {number} a
	 */
	setColorStart( r, g, b, a ) {
		this._colorStart = new Float32Array( [r, g, b, a] );
	}


};
