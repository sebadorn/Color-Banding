'use strict';


ColorBanding.Renderer.fragmentShader = `#version 300 es
	const uint UINT_MAX_VALUE = uint( -1 );

	uniform int uMode;
	uniform int uType;
	uniform int uSize;
	uniform lowp vec4 uColorEnd;
	uniform lowp vec4 uColorStart;
	uniform uint uTime;
	uniform uvec2 uWindowSize; // Size in pixels

	// Relative coordinates in range [-1.0, +1.0]
	uniform lowp vec2 uCenter;

	// Relative coordinates in range [-1.0, +1.0]
	in lowp vec2 vPos;

	out lowp vec4 fragColor;


	uint wang_hash( uint seed ) {
		seed = ( seed ^ 61u ) ^ ( seed >> 16u );
		seed *= 9u;
		seed = seed ^ ( seed >> 4u );
		seed *= 668265261u;
		seed = seed ^ ( seed >> 15u );

		return seed;
	}


	void main( void ) {
		lowp float f = 1.0;
		lowp float windowRatio = float( uWindowSize.y ) / float( uWindowSize.x );
		lowp float xDist = vPos.x - uCenter.x;
		lowp float yDist = vPos.y - uCenter.y;

		// Linear gradient (horizontal)
		if( uType == 0 ) {
			f = abs( xDist ) * 0.5;
		}
		// Linear gradient (vertical)
		else if( uType == 1 ) {
			f = abs( yDist ) * 0.5;
		}
		// Radial gradient
		else if( uType == 2 ) {
			yDist *= windowRatio;

			lowp float euclideanDist = sqrt( xDist * xDist + yDist * yDist );
			f = min( 1.0, euclideanDist );
		}

		if( uSize == 1 ) {
			f = sqrt( f );
		}

		fragColor = uColorStart * ( 1.0 - f ) + uColorEnd * f;
		fragColor.w = 1.0;

		// Apply dithering
		if( uMode == 1 ) {
			lowp float relX = ( vPos.x + 1.0 ) * 0.5;
			lowp float relY = ( vPos.y + 1.0 ) * 0.5;

			uint pxRows = uint( max( 0.0, ceil( relY * float( uWindowSize.y ) ) - 1.0 ) );
			uint pixelIndex = pxRows * uWindowSize.x + uint( relX * float( uWindowSize.x ) );

			lowp vec3 rnd = vec3( 0.0, 0.0, 0.0 );

			uint seed1 = wang_hash( pixelIndex + uTime );
			rnd.x = float( seed1 ) / float( UINT_MAX_VALUE );

			uint seed2 = wang_hash( seed1 );
			rnd.y = float( seed2 ) / float( UINT_MAX_VALUE );

			uint seed3 = wang_hash( seed2 );
			rnd.z = float( seed3 ) / float( UINT_MAX_VALUE );

			rnd /= 255.0;

			fragColor.xyz += rnd;
		}
	}
`;
