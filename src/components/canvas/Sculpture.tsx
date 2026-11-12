"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function Sculpture() {
  const masterGroupRef = useRef<THREE.Group>(null);
  const primaryMeshRef = useRef<THREE.Mesh>(null);
  const secondaryMeshRef = useRef<THREE.Mesh>(null);

  const { viewport } = useThree();
  const isMobile = viewport.width < 8;

  // Track prefers-reduced-motion
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // Mouse tilt tracking
  const mouseTarget = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseTarget.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseTarget.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Procedural micro-surface normal map for authentic brushed metal & fine grain
  const normalMapTexture = useMemo(() => {
    if (typeof document === "undefined") return null;

    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const imgData = ctx.createImageData(size, size);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const idx = (y * size + x) * 4;
        // Fine anisotropic micro-grooves along y, subtle noise along x
        const striation = Math.sin(y * 1.5) * 12;
        const noise = (Math.random() - 0.5) * 16;
        const bump = striation + noise;

        imgData.data[idx] = Math.min(255, Math.max(0, 128 + bump)); // normal X
        imgData.data[idx + 1] = Math.min(255, Math.max(0, 128 + noise * 0.5)); // normal Y
        imgData.data[idx + 2] = 250; // normal Z (mostly pointing outward)
        imgData.data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 28);
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Materials
  const materials = useMemo(() => {
    // 1. Primary Folded Ribbon: Dark metallic obsidian with controlled emerald sheen
    const primaryMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#0a0e0c"),
      roughness: 0.24,
      metalness: 0.88,
      clearcoat: 0.65,
      clearcoatRoughness: 0.2,
      reflectivity: 0.9,
      sheen: 0.5,
      sheenColor: new THREE.Color("#10b981"),
      sheenRoughness: 0.35,
      normalMap: normalMapTexture,
      normalScale: new THREE.Vector2(0.12, 0.12),
    });

    // 2. Secondary Interwoven Ribbon: Matte dark slate-emerald metal
    const secondaryMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#07120d"),
      roughness: 0.42,
      metalness: 0.72,
      clearcoat: 0.3,
      clearcoatRoughness: 0.3,
      sheen: 0.3,
      sheenColor: new THREE.Color("#059669"),
      normalMap: normalMapTexture,
      normalScale: new THREE.Vector2(0.08, 0.08),
    });

    return { primaryMaterial, secondaryMaterial };
  }, [normalMapTexture]);

  // Geometries: Substantial, folded, interwoven forms (Smooth, continuous curvature)
  const { primaryGeo, secondaryGeo } = useMemo(() => {
    // Primary substantial mathematical ribbon (Trefoil knot with deep sweeping folds)
    const primary = new THREE.TorusKnotGeometry(1.5, 0.42, 280, 64, 2, 3);

    // Complementary interwoven harmonic knot threading through the negative spaces
    const secondary = new THREE.TorusKnotGeometry(1.32, 0.22, 240, 48, 3, 4);

    return { primaryGeo: primary, secondaryGeo: secondary };
  }, []);

  // Frame animation loop
  useFrame((state, delta) => {
    if (!masterGroupRef.current) return;

    if (!reducedMotion) {
      const time = state.clock.getElapsedTime();

      // Smooth, deliberate mouse parallax tilt
      const targetRotX = mouseTarget.current.y * 0.18;
      const targetRotY = mouseTarget.current.x * 0.24;
      masterGroupRef.current.rotation.x +=
        (targetRotX - masterGroupRef.current.rotation.x) * 0.04;
      masterGroupRef.current.rotation.y +=
        (targetRotY - masterGroupRef.current.rotation.y) * 0.04;

      // Heavy, subtle vertical breathing hover
      const baseY = isMobile ? -0.4 : 0;
      masterGroupRef.current.position.y = baseY + Math.sin(time * 0.6) * 0.07;

      // Primary ribbon rotation - calm, heavy and majestic
      if (primaryMeshRef.current) {
        primaryMeshRef.current.rotation.y += delta * 0.08;
        primaryMeshRef.current.rotation.x += delta * 0.04;
      }

      // Secondary interwoven ribbon - counter-precession
      if (secondaryMeshRef.current) {
        secondaryMeshRef.current.rotation.y -= delta * 0.06;
        secondaryMeshRef.current.rotation.z += delta * 0.05;
      }
    } else {
      masterGroupRef.current.position.y = isMobile ? -0.4 : 0;
    }
  });

  // Responsive placement:
  // Desktop: Positioned on the right to balance the editorial text on the left
  // Mobile: Centered, scaled down slightly
  const positionX = isMobile ? 0 : viewport.width > 12 ? 2.6 : 2.0;
  const positionY = isMobile ? -0.5 : 0;
  const positionZ = isMobile ? -0.5 : 0;
  const scale = isMobile ? 0.95 : viewport.width > 12 ? 1.35 : 1.15;

  return (
    <group
      ref={masterGroupRef}
      position={[positionX, positionY, positionZ]}
      scale={scale}
      dispose={null}
    >
      {/* Primary Sweeping Folded Ribbon */}
      <mesh
        ref={primaryMeshRef}
        geometry={primaryGeo}
        material={materials.primaryMaterial}
        castShadow
        receiveShadow
      />

      {/* Interwoven Complementary Folded Ribbon */}
      <mesh
        ref={secondaryMeshRef}
        geometry={secondaryGeo}
        material={materials.secondaryMaterial}
        rotation={[Math.PI / 3, Math.PI / 4, Math.PI / 6]}
        castShadow
        receiveShadow
      />
    </group>
  );
}
