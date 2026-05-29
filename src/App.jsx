import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import TravelController from './controllers/TravelController.jsx';

export default function App() {
  const noiseSvg = `data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23n)" opacity="0.038"/></svg>`;

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#faf7ee',
      backgroundImage: `
        radial-gradient(circle at 15% 20%, rgba(180, 83, 9, 0.05) 0%, transparent 45%),
        radial-gradient(circle at 85% 80%, rgba(180, 83, 9, 0.05) 0%, transparent 45%)
      `,
      overflow: 'hidden',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url("${noiseSvg}")`,
        pointerEvents: 'none',
        zIndex: 999,
        mixBlendMode: 'multiply'
      }} />

      <Canvas
        shadows
        camera={{ position: [0, 18.2, 26], fov: 45 }}
      >
        <color attach="background" args={['#faf7ee']} />
        <ambientLight intensity={1.5} color="#fff8e7" />
        <directionalLight
          position={[15, 25, 20]}
          intensity={2.2}
          castShadow
          color="#fff2db"
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <hemisphereLight args={['#fff6df', '#d8cab3', 1.25]} />

        <Suspense fallback={null}>
          <TravelController />
        </Suspense>
      </Canvas>
    </div>
  );
}
