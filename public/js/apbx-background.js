(() => {
  'use strict';

  const canvas = document.getElementById('platinum-webgl');
  if (!canvas) return;

  const useFallback = () => {
    if (document.body) document.body.classList.add('platinum-fallback');
    canvas.setAttribute('data-fallback', 'true');
  };

  let gl = null;
  try {
    gl = canvas.getContext('webgl', { alpha: false, antialias: false })
      || canvas.getContext('experimental-webgl', { alpha: false, antialias: false });
  } catch (error) {
    useFallback();
    return;
  }
  if (!gl) {
    useFallback();
    return;
  }

  const vertex = 'attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }';
  const fragment = `precision mediump float;
uniform vec2 u_res; uniform float u_time;
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
float snoise(vec2 v){const vec4 C=vec4(0.2113248654,0.3660254038,-0.5773502692,0.0243902439);vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod289(i);vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);m=m*m;m=m*m;vec3 x=2.0*fract(p*C.www)-1.0;vec3 h=abs(x)-0.5;vec3 ox=floor(x+0.5);vec3 a0=x-ox;m*=1.7928429-0.8537347*(a0*a0+h*h);vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;return 130.0*dot(m,g);}
void main(){vec2 uv=(gl_FragCoord.xy-0.5*u_res)/u_res.y;float t=u_time*0.08;float n1=snoise(uv*1.4+vec2(t,t*0.6));float n2=snoise(uv*2.2-vec2(t*0.4,t*0.7)+n1*0.6);float n3=snoise(uv*0.7+vec2(-t*0.5,t*0.3)+n2*0.4);vec3 c1=vec3(0.42,0.16,0.72);vec3 c2=vec3(0.035,0.12,0.18);vec3 c3=vec3(0.30,0.48,0.68);vec3 c4=vec3(0.016,0.016,0.020);vec3 col=mix(c4,c1,smoothstep(-0.20,0.66,n1)*0.68);col=mix(col,c2,smoothstep(0.02,0.72,n2)*0.44);col=mix(col,c3,smoothstep(0.30,0.90,n3)*0.20);float v=smoothstep(1.2,0.2,length(uv));col*=mix(0.25,1.0,v);float grain=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453);col+=(grain-0.5)*0.018;gl_FragColor=vec4(col,1.0);}`;

  const compile = (type, source) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  };

  const vert = compile(gl.VERTEX_SHADER, vertex);
  const frag = compile(gl.FRAGMENT_SHADER, fragment);
  if (!vert || !frag) {
    useFallback();
    return;
  }

  const program = gl.createProgram();
  if (!program) {
    useFallback();
    return;
  }
  gl.attachShader(program, vert);
  gl.attachShader(program, frag);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    useFallback();
    return;
  }
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'p');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const resolution = gl.getUniformLocation(program, 'u_res');
  const time = gl.getUniformLocation(program, 'u_time');
  if (!resolution || !time) {
    useFallback();
    return;
  }
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const raf = window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : ((callback) => window.setTimeout(() => callback(Date.now()), 1000 / 30));
  const caf = window.cancelAnimationFrame ? window.cancelAnimationFrame.bind(window) : window.clearTimeout.bind(window);
  let frameId = 0;

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(window.innerWidth * ratio));
    canvas.height = Math.max(1, Math.floor(window.innerHeight * ratio));
    gl.viewport(0, 0, canvas.width, canvas.height);
  };

  const frame = (now) => {
    gl.uniform2f(resolution, canvas.width, canvas.height);
    gl.uniform1f(time, reduced ? 0 : now * 0.001);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    if (!reduced) frameId = raf(frame);
  };

  canvas.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    caf(frameId);
    useFallback();
  }, { passive: false });

  resize();
  window.addEventListener('resize', resize, { passive: true });
  frameId = raf(frame);
})();
