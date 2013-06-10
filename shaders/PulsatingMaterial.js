// Sort of made by Oliver Uvman, with help from MrDoob's NormalMapShader and
// stuff from http://www.aerotwist.com/tutorials/getting-started-with-three-js/

// Also https://github.com/ashima/webgl-noise used under MIT License,
// all of this code can also be used under the same license. It ain't
// nothing special. Enjoy. :)

(function() {
  var noiseFunctions = [
    'float rand(vec2 n)',
    '{',
    '  return 0.5 + 0.5 * ',
    '     fract(sin(dot(n.xy, vec2(12.9898, 78.233)))* 43758.5453);',
    '}',
    'vec3 mod289(vec3 x) {',
    '  return x - floor(x * (1.0 / 289.0)) * 289.0;',
    '}',
    'vec2 mod289(vec2 x) {',
    '  return x - floor(x * (1.0 / 289.0)) * 289.0;',
    '}',
    'vec3 permute(vec3 x) {',
    '  return mod289(((x*34.0)+1.0)*x);',
    '}',
    'float snoise(vec2 v) {',
    '  const vec4 C = vec4(0.211324865405187,',
    '                      0.366025403784439,',
    '                     -0.577350269189626,',
    '                      0.024390243902439);',
    '  vec2 i  = floor(v + dot(v, C.yy) );',
    '  vec2 x0 = v -   i + dot(i, C.xx);',
    '  vec2 i1;',
    '  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);',
    '  vec4 x12 = x0.xyxy + C.xxzz;',
    '  x12.xy -= i1;',
    '  i = mod289(i);',
    '  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))',
    '		+ i.x + vec3(0.0, i1.x, 1.0 ));',
    '  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),',
    '         dot(x12.zw,x12.zw)), 0.0);',
    '  m = m*m ;',
    '  m = m*m ;',
    '  vec3 x = 2.0 * fract(p * C.www) - 1.0;',
    '  vec3 h = abs(x) - 0.5;',
    '  vec3 ox = floor(x + 0.5);',
    '  vec3 a0 = x - ox;',
    '  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );',
    '  vec3 g;',
    '  g.x  = a0.x  * x0.x  + h.x  * x0.y;',
    '  g.yz = a0.yz * x12.xz + h.yz * x12.yw;',
    '  return 130.0 * dot(m, g);',
    '}'
  ];

  THREE.PulsatingMaterial = {
    attributes: {
      displacement: {type: 'f', value: []}
    },

    uniforms: {
      // deforming the sphere
      amplitude: {type: 'f', value: 0},
      randomValue: {type: 'f', value: 0},
      // normal map
      heightMap: {type: 't', value: null},
      resolution: {type: 'v2', value: new THREE.Vector2(500, 500)},
      scale: {type: 'v2', value: new THREE.Vector2(1, 1)},
      height: {type: 'f', value: 0.05}
    },

    vertexShader: [
      'uniform float amplitude;',
      'attribute float displacement;',
      'varying vec3 vNormal;',
      'varying vec3 vDisp;',
      'varying vec2 vUv;',
      'void main() {',
      '  vUv = uv;',
      '  vNormal = normal;',
      '  vec3 newPosition = position + normal',
      '      * vec3(displacement * amplitude * 1.0);',
      '  vDisp = newPosition;',
      '  gl_Position = projectionMatrix *',
      '      modelViewMatrix *',
      '      vec4(newPosition,1.0);',
      '}'
    ].join('\n'),

    fragmentShader: noiseFunctions.concat([
      'uniform float amplitude;',
      'uniform float randomValue;',
      'varying vec3 vNormal;',
      'varying vec3 vDisp;',
      'uniform float height;',
      'uniform vec2 resolution;',
      'uniform sampler2D heightMap;',
      'varying vec2 vUv;',
      'void main() {',
      '  vec3 light = vec3(0.5, 0.2, 1.0);',
      '  light = normalize(light);',
      '  float dProd = max(0.0, dot(vNormal, light));',
      '  float noise = rand(vDisp.xy);',
      '  float rumble = snoise(vDisp.xy);',
      '  float r = dProd * 0.5 + 0.5;',
      '  float g = dProd * 0.8;',
      '  float b = dProd * 0.8;',
      '  float noiseStrength = 0.17;',
      '  r += (noiseStrength * noise) * 0.5;',
      '  g += noiseStrength * noise;',
      '  b += noiseStrength * noise;',
      '  float amp = smoothstep(-0.5, 1.5, amplitude);',
      '  float rumbleStrength = 0.032 * amp;',
      '  r -= (rumbleStrength * rumble) * 0.5;',
      '  g -= rumbleStrength * rumble;',
      '  b -= rumbleStrength * rumble;',
      '  gl_FragColor = vec4(r, g, b, 1.0);',
      '}']).join('\n')
  };
}());
