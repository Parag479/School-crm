import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * School3DHeroCanvas - Realistic 3D Open Academic Book & Knowledge Experience
 * Built with Three.js (Procedural geometries, realistic materials, dynamic lighting)
 * Features:
 * - 3D Open Leather Hardcover Book with gold-gilded edges and spine
 * - Left & Right curved page blocks fanning outward
 * - Animated fluttering/flipping 3D pages that turn dynamically
 * - Golden silk bookmark ribbon hanging from the binding
 * - Floating 3D Graduation Mortarboard cap with gold tassel
 * - Orbiting rings of academic excellence with glowing particles
 * - Interactive mouse tilt & drag rotation
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
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 2.5, 16);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xfff6ea, 1.6);
    scene.add(ambientLight);

    // Key Light (Warm Champagne Gold)
    const keyLight = new THREE.DirectionalLight(0xffeedd, 3.2);
    keyLight.position.set(8, 12, 10);
    scene.add(keyLight);

    // Fill Light (Royal Sapphire)
    const fillLight = new THREE.DirectionalLight(0x38bdf8, 2.2);
    fillLight.position.set(-10, -4, 8);
    scene.add(fillLight);

    // Back Rim Light (Warm Golden Glow)
    const rimLight = new THREE.PointLight(0xd4af37, 4.5, 25);
    rimLight.position.set(0, 5, -4);
    scene.add(rimLight);

    // Master Group for Mouse Parallax
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // ----------------------------------------------------
    // 3. MASTER 3D OPEN BOOK GROUP
    // ----------------------------------------------------
    const bookGroup = new THREE.Group();
    bookGroup.position.set(0, -0.6, 0);
    bookGroup.rotation.x = 0.55; // angled towards viewer
    bookGroup.rotation.y = -0.15;
    masterGroup.add(bookGroup);

    // Materials
    // Hardcover Material: Royal Deep Navy Leather
    const coverMat = new THREE.MeshStandardMaterial({
      color: 0x071126,
      roughness: 0.3,
      metalness: 0.25,
    });

    // Royal Blue Metallic Trim & Spine Material
    const royalBlueTrimMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      roughness: 0.2,
      metalness: 0.85,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.35,
    });

    // Paper Material (Fine Archival Crisp White Stock)
    const paperMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.85,
      metalness: 0.05,
    });

    // Page Edge Gilding (Sapphire Blue gilded edges)
    const gildedEdgeMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      roughness: 0.3,
      metalness: 0.75,
    });

    const bookWidth = 4.2;
    const bookLength = 5.6;
    const bookThickness = 0.38;

    // A. Left Cover
    const leftCoverGeo = new THREE.BoxGeometry(bookWidth, bookThickness, bookLength);
    const leftCover = new THREE.Mesh(leftCoverGeo, coverMat);
    leftCover.position.set(-bookWidth / 2 - 0.1, -0.25, 0);
    leftCover.rotation.z = 0.18; // slightly sloped open
    bookGroup.add(leftCover);

    // Left Cover Gold Edge Accent
    const leftGoldTrimGeo = new THREE.BoxGeometry(bookWidth * 0.98, 0.02, bookLength * 0.98);
    const leftGoldTrim = new THREE.Mesh(leftGoldTrimGeo, royalBlueTrimMat);
    leftGoldTrim.position.set(-bookWidth / 2 - 0.1, -0.05, 0);
    leftGoldTrim.rotation.z = 0.18;
    bookGroup.add(leftGoldTrim);

    // B. Right Cover
    const rightCoverGeo = new THREE.BoxGeometry(bookWidth, bookThickness, bookLength);
    const rightCover = new THREE.Mesh(rightCoverGeo, coverMat);
    rightCover.position.set(bookWidth / 2 + 0.1, -0.25, 0);
    rightCover.rotation.z = -0.18;
    bookGroup.add(rightCover);

    // Right Cover Gold Edge Accent
    const rightGoldTrim = new THREE.Mesh(leftGoldTrimGeo, royalBlueTrimMat);
    rightGoldTrim.position.set(bookWidth / 2 + 0.1, -0.05, 0);
    rightGoldTrim.rotation.z = -0.18;
    bookGroup.add(rightGoldTrim);

    // C. Center Spine (Curved Cylinder Segment)
    const spineGeo = new THREE.CylinderGeometry(0.35, 0.35, bookLength, 16, 1, false, 0, Math.PI);
    const spine = new THREE.Mesh(spineGeo, royalBlueTrimMat);
    spine.rotation.x = Math.PI / 2;
    spine.rotation.z = Math.PI;
    spine.position.set(0, -0.38, 0);
    bookGroup.add(spine);

    // D. Left Main Page Block (Stack of pages)
    const leftPageStackGeo = new THREE.BoxGeometry(bookWidth * 0.92, 0.55, bookLength * 0.94);
    const leftPageStack = new THREE.Mesh(leftPageStackGeo, paperMat);
    leftPageStack.position.set(-bookWidth / 2 - 0.05, 0.08, 0);
    leftPageStack.rotation.z = 0.14;
    bookGroup.add(leftPageStack);

    // Left Gilded Edge
    const leftGildedGeo = new THREE.BoxGeometry(0.04, 0.54, bookLength * 0.93);
    const leftGilded = new THREE.Mesh(leftGildedGeo, gildedEdgeMat);
    leftGilded.position.set(-bookWidth + 0.1, 0.12, 0);
    leftGilded.rotation.z = 0.14;
    bookGroup.add(leftGilded);

    // E. Right Main Page Block (Stack of pages)
    const rightPageStackGeo = new THREE.BoxGeometry(bookWidth * 0.92, 0.55, bookLength * 0.94);
    const rightPageStack = new THREE.Mesh(rightPageStackGeo, paperMat);
    rightPageStack.position.set(bookWidth / 2 + 0.05, 0.08, 0);
    rightPageStack.rotation.z = -0.14;
    bookGroup.add(rightPageStack);

    // Right Gilded Edge
    const rightGilded = new THREE.Mesh(leftGildedGeo, gildedEdgeMat);
    rightGilded.position.set(bookWidth - 0.1, 0.12, 0);
    rightGilded.rotation.z = -0.14;
    bookGroup.add(rightGilded);

    // F. Dynamic Animated Turning Pages (3 thin curved page meshes that sway in 3D)
    const turningPages: THREE.Mesh[] = [];
    const pageCurveGeo = new THREE.PlaneGeometry(3.6, 5.0, 16, 1);
    // Give geometry curvature
    const pos = pageCurveGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const u = (pos.getX(i) + 1.8) / 3.6; // 0 at left spine, 1 at right edge
      const zOffset = Math.sin(u * Math.PI) * 0.35;
      pos.setZ(i, zOffset);
    }
    pageCurveGeo.computeVertexNormals();

    const animatedPageMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.94,
    });

    for (let i = 0; i < 3; i++) {
      const pageMesh = new THREE.Mesh(pageCurveGeo, animatedPageMat);
      pageMesh.position.set(1.8, 0.45 + i * 0.06, 0);
      pageMesh.rotation.x = -Math.PI / 2;
      pageMesh.rotation.y = 0.2 - i * 0.18;
      bookGroup.add(pageMesh);
      turningPages.push(pageMesh);
    }

    // G. Golden Silk Bookmark Ribbon (Flowing down across the pages)
    const ribbonCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.45, -2.5),
      new THREE.Vector3(0.2, 0.55, -0.5),
      new THREE.Vector3(-0.3, 0.38, 1.5),
      new THREE.Vector3(-0.5, 0.05, 3.4),
      new THREE.Vector3(-0.35, -0.4, 4.2),
    ]);
    const ribbonGeo = new THREE.TubeGeometry(ribbonCurve, 32, 0.12, 8, false);
    const ribbonMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      roughness: 0.2,
      metalness: 0.85,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.45,
    });
    const ribbon = new THREE.Mesh(ribbonGeo, ribbonMat);
    bookGroup.add(ribbon);

    // ----------------------------------------------------
    // 4. FLOATING 3D GRADUATION CAP (MORTARBOARD)
    // ----------------------------------------------------
    const capGroup = new THREE.Group();
    capGroup.position.set(4.2, 3.5, 1.5);
    capGroup.rotation.x = 0.35;
    capGroup.rotation.z = -0.25;
    masterGroup.add(capGroup);

    // Cap Top (Diamond Square Plate)
    const capTopGeo = new THREE.BoxGeometry(2.4, 0.08, 2.4);
    const capMat = new THREE.MeshStandardMaterial({
      color: 0x081028,
      roughness: 0.4,
      metalness: 0.3,
    });
    const capTop = new THREE.Mesh(capTopGeo, capMat);
    capTop.rotation.y = Math.PI / 4;
    capGroup.add(capTop);

    // Cap Skull (Underneath hemisphere)
    const skullGeo = new THREE.CylinderGeometry(0.7, 0.85, 0.7, 24);
    const skull = new THREE.Mesh(skullGeo, capMat);
    skull.position.set(0, -0.38, 0);
    capGroup.add(skull);

    // Button on Cap Center
    const btnGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const btn = new THREE.Mesh(btnGeo, royalBlueTrimMat);
    btn.position.set(0, 0.08, 0);
    capGroup.add(btn);

    // Hanging Tassel
    const tasselCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.08, 0),
      new THREE.Vector3(0.7, 0.06, 0.7),
      new THREE.Vector3(1.1, -0.4, 1.1),
      new THREE.Vector3(1.15, -1.0, 1.15),
    ]);
    const tasselGeo = new THREE.TubeGeometry(tasselCurve, 16, 0.03, 8, false);
    const tassel = new THREE.Mesh(tasselGeo, royalBlueTrimMat);
    capGroup.add(tassel);

    // ----------------------------------------------------
    // 5. ORBITING RINGS OF EXCELLENCE & KNOWLEDGE GLOW
    // ----------------------------------------------------
    const ringGeo1 = new THREE.TorusGeometry(6.8, 0.05, 16, 120);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.15,
      emissive: 0x997523,
      emissiveIntensity: 0.4,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2.8;
    ring1.rotation.y = Math.PI / 6;
    masterGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(7.8, 0.04, 16, 120);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.85,
      roughness: 0.2,
      emissive: 0x0284c7,
      emissiveIntensity: 0.35,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 3.2;
    ring2.rotation.y = -Math.PI / 4;
    masterGroup.add(ring2);

    // ----------------------------------------------------
    // 6. GOLDEN PARTICLE FIELD (LUMINOUS ACADEMIC DUST)
    // ----------------------------------------------------
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 22;
      particlePositions[i + 1] = (Math.random() - 0.5) * 16;
      particlePositions[i + 2] = (Math.random() - 0.5) * 14;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.16,
      color: 0xffe28a,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    masterGroup.add(particles);

    // ----------------------------------------------------
    // 7. SMOOTH MOUSE INTERACTION & ANIMATION LOOP
    // ----------------------------------------------------
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.45;
      targetY = y * 0.35;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth camera/masterGroup dampening (ease towards target mouse)
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      masterGroup.rotation.y = mouseX * 0.8 + Math.sin(elapsed * 0.4) * 0.08;
      masterGroup.rotation.x = -mouseY * 0.6 + Math.cos(elapsed * 0.3) * 0.05;

      // Gentle floating levitation for the 3D book
      bookGroup.position.y = -0.6 + Math.sin(elapsed * 1.2) * 0.22;
      bookGroup.rotation.z = Math.sin(elapsed * 0.8) * 0.03;

      // Dynamic fluttering page turn animation!
      turningPages.forEach((page, index) => {
        const offset = index * 0.35;
        const pageAngle = -0.15 + Math.sin(elapsed * 2.2 + offset) * 0.28;
        page.rotation.y = pageAngle;
        page.position.y = 0.45 + index * 0.06 + Math.sin(elapsed * 2.2 + offset) * 0.08;
      });

      // Floating Cap orbit & bob
      capGroup.position.y = 3.5 + Math.sin(elapsed * 1.4 + 1.0) * 0.35;
      capGroup.position.x = 4.2 + Math.cos(elapsed * 0.7) * 0.25;
      capGroup.rotation.y = elapsed * 0.35;

      // Rotate Knowledge Rings
      ring1.rotation.z = elapsed * 0.2;
      ring2.rotation.z = -elapsed * 0.15;

      // Slow particle field drift
      particles.rotation.y = elapsed * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 600;
      const h = container.clientHeight || 550;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`w-full h-full relative cursor-grab active:cursor-grabbing ${className}`}
      title="Interactive 3D Academic Book - Move cursor to interact"
    />
  );
};
