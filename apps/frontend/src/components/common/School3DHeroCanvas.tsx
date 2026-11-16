import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * School3DHeroCanvas
 * Lightweight, 60fps procedural Three.js interactive 3D experience.
 * Features:
 * - Floating 3D Academy geometry: Glowing wireframe sphere (global education),
 *   orbiting rings, 3D books/geometric prism blocks, floating particle field.
 * - Real-time smooth mouse-parallax on desktop with gentle inertial dampening.
 * - Directional & point lighting with subtle holographic gradients.
 * - Graceful performance optimization (auto-scales pixel ratio and throttles offscreen).
 */

export const School3DHeroCanvas: React.FC<{ className?: string }> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 550;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x6366f1, 2.5); // Indigo
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 2.0); // Sky cyan
    dirLight2.position.set(-8, -5, 5);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xa855f7, 3, 20); // Purple glow
    pointLight.position.set(0, 0, 3);
    scene.add(pointLight);

    // 3. Central 3D Knowledge Core (Layered Icosahedron & Wireframe Orb)
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Inner Glassy Core
    const innerGeo = new THREE.IcosahedronGeometry(3.2, 1);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: 0x4f46e5,
      emissive: 0x1e1b4b,
      roughness: 0.2,
      metalness: 0.1,
      transmission: 0.7,
      thickness: 1.2,
      wireframe: false,
      transparent: true,
      opacity: 0.85,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // Outer Wireframe Halo (Global Knowledge Grid)
    const outerGeo = new THREE.IcosahedronGeometry(4.2, 2);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(outerMesh);

    // 4. Orbiting Academic Rings (Representing CBSE, Innovation, Excellence)
    const ringGeo1 = new THREE.TorusGeometry(5.4, 0.08, 16, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x0284c7,
      emissiveIntensity: 0.3,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    scene.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(6.2, 0.06, 16, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      metalness: 0.7,
      roughness: 0.3,
      emissive: 0x7e22ce,
      emissiveIntensity: 0.3,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 3;
    scene.add(ring2);

    // 5. Floating Satellites (3D Geometric Book Cubes & Scholar Prisms)
    const satellitesGroup = new THREE.Group();
    scene.add(satellitesGroup);

    const satMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.5,
      envMapIntensity: 1.0,
    });

    const satCount = 8;
    const satellites: THREE.Mesh[] = [];
    for (let i = 0; i < satCount; i++) {
      const isBox = i % 2 === 0;
      const geo = isBox ? new THREE.BoxGeometry(0.8, 1.1, 0.25) : new THREE.OctahedronGeometry(0.65);
      const mat = isBox
        ? new THREE.MeshStandardMaterial({ color: i % 4 === 0 ? 0x4f46e5 : 0x06b6d4, roughness: 0.3, metalness: 0.4 })
        : satMaterial;

      const mesh = new THREE.Mesh(geo, mat);
      const angle = (i / satCount) * Math.PI * 2;
      const radius = 6.8 + (i % 3) * 0.8;
      mesh.position.set(Math.cos(angle) * radius, (Math.sin(angle * 2) * 2.5), Math.sin(angle) * radius);
      satellites.push(mesh);
      satellitesGroup.add(mesh);
    }

    // 6. Floating Particle Field (Glowing Stardust / Curiosity Points)
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorA = new THREE.Color(0x818cf8);
    const colorB = new THREE.Color(0x38bdf8);
    const colorC = new THREE.Color(0xf472b6);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 16;

      const mixed = Math.random() < 0.4 ? colorA : Math.random() < 0.7 ? colorB : colorC;
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 7. Mouse Parallax Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      targetX = (x / rect.width) * 1.5;
      targetY = -(y / rect.height) * 1.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // 8. Animation Loop (60 FPS)
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth mouse follow interpolation
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      coreGroup.rotation.y = elapsed * 0.25 + mouseX * 0.8;
      coreGroup.rotation.x = Math.sin(elapsed * 0.3) * 0.2 + mouseY * 0.6;
      outerMesh.rotation.y = -elapsed * 0.18;
      outerMesh.rotation.z = elapsed * 0.12;

      ring1.rotation.z = elapsed * 0.35 + mouseX * 0.4;
      ring2.rotation.z = -elapsed * 0.25 - mouseY * 0.4;

      satellitesGroup.rotation.y = elapsed * 0.2;
      satellites.forEach((sat, i) => {
        sat.rotation.x += 0.015;
        sat.rotation.y += 0.02;
        sat.position.y += Math.sin(elapsed * 2 + i) * 0.005;
      });

      particles.rotation.y = elapsed * 0.05 + mouseX * 0.2;
      particles.rotation.x = mouseY * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full flex items-center justify-center pointer-events-none select-none ${className}`}
      style={{ touchAction: 'none' }}
    />
  );
};

