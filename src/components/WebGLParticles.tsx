"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WebGLParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current!;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    container.appendChild(renderer.domElement);

    // ─────────────────────────────
    // PARTICLES
    // ─────────────────────────────
    const COUNT = 2000;

    const positions = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 5;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
      positions[i * 3 + 2] = 0;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // ─────────────────────────────
    // SHADER
    // ─────────────────────────────
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,

      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },

      vertexShader: `
        uniform float uTime;
        uniform float uScroll;
        uniform vec2 uMouse;

        varying float vAlpha;

        // Simple pseudo-noise
        float noise(vec2 p) {
          return sin(p.x) * sin(p.y);
        }

        void main() {
          vec3 pos = position;

          float n = noise(pos.xy * 2.0 + uTime * 0.3);

          // Flow motion
          pos.x += cos(n * 6.2831) * 0.1;
          pos.y += sin(n * 6.2831) * 0.1;

          // Scroll influence
          pos.y += uScroll * 0.5;

          // Mouse interaction
          float dist = distance(pos.xy, uMouse);
          pos.xy += normalize(pos.xy - vec2(uMouse)) * 0.05 / (dist + 0.1);

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          gl_PointSize = 2.5;

          vAlpha = 0.6;
        }
      `,

      fragmentShader: `
        varying float vAlpha;

        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          float alpha = smoothstep(0.5, 0.0, d);

          gl_FragColor = vec4(0.05, 0.05, 0.05, alpha * vAlpha);
        }
      `,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // ─────────────────────────────
    // SCROLL (GSAP)
    // ─────────────────────────────
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        material.uniforms.uScroll.value = self.getVelocity() * 0.0002;
      },
    });

    // ─────────────────────────────
    // MOUSE
    // ─────────────────────────────
    window.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;

      material.uniforms.uMouse.value.set(x, y);
    });

    // ─────────────────────────────
    // LOOP
    // ─────────────────────────────
    const clock = new THREE.Clock();

    const tick = () => {
      material.uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };

    tick();

    // ─────────────────────────────
    // RESIZE
    // ─────────────────────────────
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    return () => {
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
}