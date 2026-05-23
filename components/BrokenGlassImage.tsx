'use client';

import { useRef, useCallback, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

const VERT_SHADER = `precision mediump float;
varying vec2 vUv;
attribute vec2 a_position;
void main() {
  vUv = .5 * (a_position + 1.);
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FRAG_SHADER = `precision highp float;
precision highp sampler2D;
varying vec2 vUv;
uniform sampler2D u_image_texture;
uniform float u_edge_thickness;
uniform float u_ratio;
uniform vec2 u_pointer_position;
uniform float u_img_ratio;
uniform float u_click_randomizer;
uniform float u_rotation;
uniform float u_effect;
uniform float u_effect_active;

#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846

float random(float x) {
  return fract(sin(x * 12.9898) * 43758.5453);
}
float random2(vec2 p) {
  return fract(sin(dot(p.xy, vec2(12.9898, 78.233))) * 43758.5453);
}
float noise(vec2 p) {
  vec2 ip = floor(p);
  vec2 u = fract(p);
  u = u*u*(3.0-2.0*u);
  float res = mix(
    mix(random2(ip), random2(ip+vec2(1.0,0.0)), u.x),
    mix(random2(ip+vec2(0.0,1.0)), random2(ip+vec2(1.0,1.0)), u.x), u.y);
  return res*res;
}
float get_sector_shape(float d, float a, float angle, float edges) {
  float angle1 = PI;
  float angle2 = angle1 + angle;
  float edge1 = smoothstep(angle1 - edges/d, angle1 + edges/d, a);
  float edge2 = smoothstep(angle2 - edges/d, angle2 + edges/d, a);
  return edge1 * (1. - edge2);
}
float get_img_frame_alpha(vec2 uv, float w) {
  float a = smoothstep(0., w, uv.x) * smoothstep(1., 1.-w, uv.x);
  a *= smoothstep(0., w, uv.y) * smoothstep(1., 1.-w, uv.y);
  return a;
}
float get_simple_cracks(float a, float d, float n) {
  a *= (1. + sin(2.*a + PI + 2.*u_click_randomizer));
  float step_a = TWO_PI / 10.;
  float crack_a = mod(a + n + u_click_randomizer, step_a);
  float shape = 4. * abs(crack_a - .5*step_a);
  shape = mix(shape, 1., smoothstep(.9, 1., d));
  shape *= pow(d + .4*u_click_randomizer*max(0., cos(2.*a+u_click_randomizer)*sin(a)), 12.);
  shape = (1.+n) * (1.+sin(4.*a)) * step(.9, shape);
  return shape;
}
vec2 get_img_uv() {
  vec2 uv = vUv - .5;
  if (u_ratio > u_img_ratio) {
    uv.x = uv.x * u_ratio / u_img_ratio;
  } else {
    uv.y = uv.y * u_img_ratio / u_ratio;
  }
  uv *= 1.0;
  uv += .5;
  uv.y = 1. - uv.y;
  return uv;
}
vec2 get_disturbed_uv(vec2 uv, float sc, float edge, vec2 dir, float border) {
  float d = u_effect * (sc - .5);
  vec2 out_uv = uv + 2.*d;
  out_uv.x -= mix(.03*edge*dir.x, -.1*edge, border);
  out_uv.y -= mix(.03*edge*dir.y, -.1*edge, border);
  vec2 center = vec2(.5);
  out_uv -= center;
  float cosA = cos(4.*d);
  float sinA = sin(4.*d);
  float persp = 1. + d*out_uv.y;
  out_uv = vec2(
    persp*(cosA*out_uv.x - sinA*out_uv.y),
    persp*(sinA*out_uv.x + cosA*out_uv.y)
  );
  out_uv += center;
  return out_uv;
}
void main() {
  vec2 uv = vUv;
  uv.y = 1. - uv.y;
  uv.x *= u_ratio;
  vec2 ptr = u_pointer_position;
  vec2 ptr_dir = normalize(u_pointer_position - vec2(vUv.x, 1.-vUv.y));
  ptr.x *= u_ratio;
  ptr = ptr - uv;
  float ptr_a = atan(ptr.y, ptr.x);
  float ptr_d = length(ptr);
  float ptr_dn = 1. - clamp(ptr_d, 0., 1.);
  vec2 img_uv = get_img_uv();
  float sector_c = 0.;
  float sector_start = 0.;
  float is_sector_edge = 0.;
  float is_grid_edge = 0.;
  float is_central_edge = 0.;
  float angle_noise = .3 * noise(3. * img_uv);

  for (int i = 0; i < 12; i++) {
    float seed = float(i) + u_click_randomizer + 2.;
    float an = mod((ptr_a - sector_start) / TWO_PI, 1.) + .1*angle_noise;
    float angle = an * TWO_PI;
    float sz = min(.01 + 2.*random2(vec2(float(i)+u_click_randomizer, u_pointer_position.x)), TWO_PI - sector_start);
    float thick = u_edge_thickness*(.2+random(3.*seed)) + angle_noise*.03*pow(ptr_dn,80.);
    float shape = get_sector_shape(ptr_d, angle, sz, thick);
    is_sector_edge = max(is_sector_edge, smoothstep(.6, 1., shape));
    sector_c = mix(sector_c, random(seed), smoothstep(.2, .8, shape));
    vec2 guv = 2.*(.8+.5*ptr_dn)*img_uv;
    float gn = noise(guv+seed);
    float gt = (.4+.4*random(10.*seed))*u_edge_thickness;
    float gs = shape * smoothstep(.27, .27+gt, gn);
    is_grid_edge += smoothstep(.1,.5,gs)*smoothstep(.9,.6,gs);
    sector_c = mix(sector_c, random(seed+100.), smoothstep(.2,.8,gs));
    vec2 cuv = img_uv*(3.+3.*pow(ptr_dn,10.));
    float cn = noise(cuv+seed);
    float ct = (1.+.5*random(-2.+seed))*u_edge_thickness;
    float cs = step(.7,shape)*smoothstep(.27,.27+ct,cn);
    is_central_edge += smoothstep(.0,.5,cs)*smoothstep(1.,.5,cs);
    is_central_edge *= step(.8,ptr_dn);
    sector_c = mix(sector_c, random(seed+100.), smoothstep(.2,.8,cs));
    sector_start += sz;
  }

  is_sector_edge = 1. - is_sector_edge;
  float cracks = max(is_grid_edge, is_sector_edge);
  cracks = max(cracks, is_central_edge);
  float central_cracks = get_simple_cracks(ptr_a, ptr_dn, angle_noise);
  cracks += central_cracks;

  if (u_effect_active > 0.) {
    img_uv = get_disturbed_uv(img_uv, sector_c, cracks, ptr_dir, get_img_frame_alpha(img_uv, .2));
  }

  vec4 img = texture2D(u_image_texture, img_uv);
  vec3 color = img.rgb + .12*u_effect_active*(sector_c-.5);
  float alpha = get_img_frame_alpha(img_uv, .004);
  alpha -= .3*u_effect_active*pow(is_grid_edge, 4.);
  alpha -= .3*u_effect_active*is_central_edge;
  alpha -= .03*u_effect_active*pow(central_cracks, 4.);
  gl_FragColor = vec4(color, alpha);
}`;

type GlState = {
  gl: WebGLRenderingContext;
  uniforms: Record<string, WebGLUniformLocation | null>;
  animFrame: number;
  shattered: boolean;
};

export default function BrokenGlassImage(props: ImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GlState | null>(null);

  useEffect(() => {
    return () => {
      const s = stateRef.current;
      if (!s) return;
      cancelAnimationFrame(s.animFrame);
    };
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const imgEl = container.querySelector('img') as HTMLImageElement | null;
    if (!imgEl || !imgEl.complete || imgEl.naturalWidth === 0) return;

    // Lazy GL init on first click
    if (!stateRef.current) {
      const gl = canvas.getContext('webgl');
      if (!gl) return;

      const mkShader = (type: number, src: string) => {
        const s = gl.createShader(type)!;
        gl.shaderSource(s, src);
        gl.compileShader(s);
        return s;
      };

      const prog = gl.createProgram()!;
      gl.attachShader(prog, mkShader(gl.VERTEX_SHADER, VERT_SHADER));
      gl.attachShader(prog, mkShader(gl.FRAGMENT_SHADER, FRAG_SHADER));
      gl.linkProgram(prog);
      gl.useProgram(prog);

      const uniforms: Record<string, WebGLUniformLocation | null> = {};
      const count = gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < count; i++) {
        const info = gl.getActiveUniform(prog, i)!;
        uniforms[info.name] = gl.getUniformLocation(prog, info.name);
      }

      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
      const pos = gl.getAttribLocation(prog, 'a_position');
      gl.enableVertexAttribArray(pos);
      gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgEl);
      gl.uniform1i(uniforms.u_image_texture, 0);
      gl.uniform1f(uniforms.u_img_ratio, imgEl.naturalWidth / imgEl.naturalHeight);
      gl.uniform1f(uniforms.u_edge_thickness, 0.006);
      gl.uniform1f(uniforms.u_rotation, 0);

      stateRef.current = { gl, uniforms, animFrame: 0, shattered: false };
    }

    const state = stateRef.current!;
    const { gl, uniforms } = state;

    // Toggle: if already shattered, restore and stop
    if (state.shattered) {
      cancelAnimationFrame(state.animFrame);
      state.animFrame = 0;
      gl.uniform1f(uniforms.u_effect_active, 0);
      canvas.style.transition = 'none';
      canvas.style.opacity = '0';
      imgEl.style.transition = 'none';
      imgEl.style.opacity = '1';
      state.shattered = false;
      return;
    }

    // Shatter: resize canvas, set uniforms, start render loop
    const dpr = Math.min(window.devicePixelRatio, 2);
    const w = Math.round(canvas.offsetWidth * dpr);
    const h = Math.round(canvas.offsetHeight * dpr);
    canvas.width = w;
    canvas.height = h;
    gl.viewport(0, 0, w, h);
    gl.uniform1f(uniforms.u_ratio, w / h);

    const rect = container.getBoundingClientRect();
    gl.uniform2f(uniforms.u_pointer_position,
      (e.clientX - rect.left) / rect.width,
      (e.clientY - rect.top) / rect.height
    );
    gl.uniform1f(uniforms.u_click_randomizer, Math.random());
    gl.uniform1f(uniforms.u_effect, 0.015);
    gl.uniform1f(uniforms.u_effect_active, 1);

    imgEl.style.transition = 'none';
    imgEl.style.opacity = '0';
    canvas.style.transition = 'none';
    canvas.style.opacity = '1';

    const render = () => {
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      state.animFrame = requestAnimationFrame(render);
    };
    render();
    state.shattered = true;
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full" onClick={handleClick}>
      <Image {...props} />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0 }}
      />
    </div>
  );
}
