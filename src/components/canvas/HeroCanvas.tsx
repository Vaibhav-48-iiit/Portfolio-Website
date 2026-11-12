"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Sculpture from "./Sculpture";

function Lighting() {
  return (
    <>
      {/* Ambient Light - calibrated so the dark sculpture remains clearly defined against pure black */}
      <ambientLight color="#0b1410" intensity={1.5} />

      {/* Primary Key Light - crisp sculptural specular highlights */}
      <directionalLight
        position={[6, 8, 7]}
        intensity={2.6}
        color="#f8fafc"
        castShadow
      />

      {/* Emerald Rim Light - grazes the silhouette from behind-left to reveal form contours */}
      <directionalLight
        position={[-7, 1, -4]}
        intensity={3.8}
        color="#10b981"
      />

      {/* Top Grazing Emerald Accent */}
      <pointLight
        position={[-2, 6, 4]}
        intensity={2.2}
        distance={18}
        decay={2}
        color="#059669"
      />

      {/* Subtle Fill Light from bottom-right to soften dark cavities */}
      <directionalLight
        position={[4, -5, 3]}
        intensity={0.6}
        color="#1e293b"
      />

      {/* Atmospheric depth fog */}
      <fog attach="fog" args={["#050608", 9, 32]} />
    </>
  );
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 44, near: 0.1, far: 50 }}
        dpr={[1, 1.8]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        className="w-full h-full block"
      >
        <Suspense fallback={null}>
          <Lighting />
          <Sculpture />
        </Suspense>
      </Canvas>
    </div>
  );
}
