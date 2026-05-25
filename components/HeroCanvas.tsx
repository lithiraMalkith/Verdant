"use client";
import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

const VERT = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform float uTime;
uniform vec2 uRes;
uniform vec2 uMouse;

float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233)))*43758.5453); }
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  float a=hash(i), b=hash(i+vec2(1.,0.)), c=hash(i+vec2(0.,1.)), d=hash(i+vec2(1.,1.));
  vec2 u=f*f*(3.-2.*f);
  return mix(a,b,u.x)+ (c-a)*u.y*(1.-u.x)+ (d-b)*u.x*u.y;
}
float fbm(vec2 p){
  float v=0., a=.5;
  for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.02; a*=.5; }
  return v;
}
void main(){
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= uRes.x/uRes.y;
  float t = uTime*0.08;
  vec2 q = p + vec2(uMouse.x*0.4, -uMouse.y*0.4);
  float n = fbm(q*1.2 + vec2(t, -t*0.6));
  float n2 = fbm(q*2.5 - vec2(t*0.7, t));
  float blend = smoothstep(0.2, 0.9, n*0.6 + n2*0.4);
  vec3 white = vec3(1.0);
  vec3 mint  = vec3(0.86, 0.94, 0.88);
  vec3 sage  = vec3(0.65, 0.82, 0.71);
  vec3 deep  = vec3(0.18, 0.33, 0.23);
  vec3 col = mix(white, mint, blend);
  col = mix(col, sage, smoothstep(0.55, 0.95, n));
  col = mix(col, deep, smoothstep(0.85, 1.05, n*n));
  float vignette = smoothstep(1.4, 0.3, length(p));
  col = mix(white, col, vignette);
  gl_FragColor = vec4(col, 1.0);
}
`;

export default function HeroCanvas() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const renderer = new Renderer({ alpha: true, dpr: Math.min(window.devicePixelRatio, 2) });
    const gl = renderer.gl;
    ref.current.appendChild(gl.canvas);
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.display = "block";

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uRes: { value: [gl.canvas.width, gl.canvas.height] },
        uMouse: { value: [0, 0] },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      if (!ref.current) return;
      const w = ref.current.clientWidth;
      const h = ref.current.clientHeight;
      renderer.setSize(w, h);
      program.uniforms.uRes.value = [gl.canvas.width, gl.canvas.height];
    }
    resize();
    window.addEventListener("resize", resize);

    function onMove(e: MouseEvent) {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      program.uniforms.uMouse.value = [
        (e.clientX - r.left) / r.width - 0.5,
        (e.clientY - r.top) / r.height - 0.5,
      ];
    }
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const t0 = performance.now();
    const loop = () => {
      program.uniforms.uTime.value = (performance.now() - t0) / 1000;
      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      gl.canvas.remove();
    };
  }, []);

  return <div ref={ref} className="absolute inset-0" />;
}
