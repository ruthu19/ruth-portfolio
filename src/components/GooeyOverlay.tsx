
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugin
if (typeof window !== "undefined" && gsap && ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

const FRAGMENT_SHADER = `
  precision mediump float;
  uniform float u_time;
  uniform float u_scroll;
  uniform vec2 u_resolution;
  // Circle params for N blobs
  #define N 3

  // Blob definitions
  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv.y = 1.0 - uv.y;

    float time = u_time*0.15 + u_scroll*1.5;
    float intensity = 0.0;
    // Main goo blobs
    for (int i=0; i<N; i++) {
      float id = float(i);
      // Calculate animated position for each blob
      float phase = (time + id * 1.6);
      float x = 0.25 + 0.5*fract(id/3.0) + 0.2*sin(phase + id*2.5);
      float y = 0.30 + 0.4*fract(id/4.0) + 0.18*cos(phase*0.9 + id);
      float radius = 0.18 + 0.04*sin(phase*1.3+id*1.2);
      float d = length(uv - vec2(x, y));
      intensity += radius / (d*15.0+0.02) ;
    }
    // Gooey effect by "thresholding" and color mixing
    float goo = smoothstep(0.35, 0.85, intensity);
    float yellow = mix(1.0, 0.8, uv.y);
    gl_FragColor = vec4(yellow, yellow, 0.0, 0.10 + 0.22*goo*goo); // subtle yellow, alpha varies with blob
  }
`;

const VERTEX_SHADER = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0, 1);
  }
`;

function GooeyOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>();
  const webglRef = useRef<WebGLRenderingContext| null>(null);
  const programRef = useRef<WebGLProgram| null>(null);
  const uniformLocs = useRef<any>({});

  // Helper to create shader
  function createShader(gl: WebGLRenderingContext, source: string, type: number) {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader error', gl.getShaderInfoLog(shader));
    }
    return shader;
  }

  // Handle resize
  function resize(gl: WebGLRenderingContext, canvas: HTMLCanvasElement) {
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  // Render gooey overlay using shaders
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { premultipliedAlpha: false, antialias: true });
    webglRef.current = gl;
    if (!gl) return;

    // Compile shaders and program
    const vShader = createShader(gl, VERTEX_SHADER, gl.VERTEX_SHADER);
    const fShader = createShader(gl, FRAGMENT_SHADER, gl.FRAGMENT_SHADER);
    const program = gl.createProgram()!;
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);

    // Look up attribute & uniform locations
    const locA = gl.getAttribLocation(program, "a_position");
    const locUTime = gl.getUniformLocation(program, "u_time");
    const locUScroll = gl.getUniformLocation(program, "u_scroll");
    const locUResolution = gl.getUniformLocation(program, "u_resolution");

    programRef.current = program;
    uniformLocs.current = { locA, locUTime, locUScroll, locUResolution };

    // Fullscreen quad
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, +1, -1, -1, +1, +1, +1]),
      gl.STATIC_DRAW
    );

    // Setup
    function draw(time: number = 0, scroll: number = 0) {
      if (!canvasRef.current) return;
      resize(gl, canvasRef.current);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0); // transparent
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);

      gl.enableVertexAttribArray(locA);
      gl.vertexAttribPointer(locA, 2, gl.FLOAT, false, 0, 0);

      gl.uniform1f(locUTime, time / 1000);
      gl.uniform1f(locUScroll, scroll);
      gl.uniform2f(locUResolution, canvas.width, canvas.height);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    let scrollY = 0, show = false, progress = 0;
    let cleanup = false; // for cancelling anim

    // GSAP/ScrollTrigger setup
    if (gsap && ScrollTrigger) {
      ScrollTrigger.create({
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          scrollY = self.scroll();
          progress = self.progress;
        },
      });
    }

    // Animation loop
    let start = performance.now();
    const animate = () => {
      if (cleanup) return;
      // ScrollTrigger progress as "show" threshold
      if (typeof window !== "undefined" && ScrollTrigger) {
        const st = ScrollTrigger.getAll();
        progress = st[0]?.progress || 0;
        show = progress > 0.03 && progress < 0.98;
      }

      // Animate visible only when scrolled
      if (show) {
        canvas.style.opacity = "1";
        canvas.style.pointerEvents = "none";
        draw(performance.now() - start, scrollY/600 || progress);
      } else {
        canvas.style.opacity = "0";
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Resize on window
    const onResize = () => resize(gl, canvas);
    window.addEventListener("resize", onResize);

    // Cleanup
    return () => {
      cleanup = true;
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animRef.current!);
    };
    // eslint-disable-next-line
  }, []);

  // Overlay styles
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        zIndex: 49,
        left: 0, top: 0,
        width: "100vw", height: "100vh",
        pointerEvents: "none",
        mixBlendMode: "screen",
        opacity: 0,
        transition: "opacity 0.38s cubic-bezier(.47,1.07,.56,0.97)",
      }}
      width={window.innerWidth * (window.devicePixelRatio || 1)}
      height={window.innerHeight * (window.devicePixelRatio || 1)}
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}

export default GooeyOverlay;
