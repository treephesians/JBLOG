"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, useTexture, Environment, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

function IDBadge() {
  const groupRef = useRef<THREE.Group>(null!);
  const profileTexture = useTexture("/images/me.jpg");

  // 애니메이션(살짝 흔들 + 회전)
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.z = 0.1 * Math.sin(t * 2);
    groupRef.current.rotation.y = 0.3 * Math.sin(t * 0.7);
  });

  return (
    <group ref={groupRef} position={[0, 2, 0]}>
      {/* 줄(밴드) */}
      <mesh position={[0, -1, -0.01]}>
        <boxGeometry args={[0.15, 2, 0.01]} />
        <meshBasicMaterial color="black" />
      </mesh>

      {/* 명찰(카드) - RoundedBox로 모서리를 둥글게 */}
      <group position={[0, -2.2, 0]}>
        <RoundedBox args={[1.0, 1.4, 0.03]} radius={0.03} smoothness={0.9}>
          <meshPhysicalMaterial
            color="#000" // 검정
            metalness={0.5} // 금속성
            roughness={1} // 거칠기 낮춰 반사
            clearcoat={0.5}
            clearcoatRoughness={0.4}
            reflectivity={0.3}
          />
        </RoundedBox>
      </group>

      {/* 프로필 사진(원형) */}
      <mesh position={[0, -2.0, 0.021]}>
        <circleGeometry args={[0.3, 32]} />
        <meshBasicMaterial map={profileTexture} />
      </mesh>

      {/* 텍스트 */}
      <NameText text="Jun Beom" position={[0, -2.45, 0.021]} fontSize={0.12} />
      <NameText
        text="frontend developer"
        position={[0, -2.65, 0.021]}
        fontSize={0.06}
      />
    </group>
  );
}

interface NameTextProps {
  text: string;
  position: [number, number, number];
  fontSize?: number;
}
function NameText({ text, position, fontSize = 0.1 }: NameTextProps) {
  return (
    <Text
      position={position}
      fontSize={fontSize}
      color="white"
      anchorX="center"
      anchorY="middle"
    >
      {text}
    </Text>
  );
}

export default function Home() {
  return (
    <div style={{ height: "800px" }}>
      <Canvas
        gl={{ alpha: true }}
        camera={{ position: [0, 0, 3], fov: 50 }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        <Suspense fallback={null}>
          {/* 환경 맵(반사) */}
          <Environment
            preset="city"
            background={false}
            environmentIntensity={2}
          />

          {/* 광원 (너무 세지 않게) */}
          <directionalLight intensity={3} position={[-4, 1, 4]} />
          <directionalLight intensity={2} position={[4, -2, 5]} />

          <IDBadge />
        </Suspense>
      </Canvas>
    </div>
  );
}
