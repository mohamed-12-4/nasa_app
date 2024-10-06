import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const Asteroid = () => {
  const asteroidRef = useRef();
  const texture = useLoader(THREE.TextureLoader, '/asteroid.png');

  useFrame(() => {
    if (asteroidRef.current) {
      asteroidRef.current.rotation.y += 0.001; // Rotate asteroid
    }
  });

  return (
    <mesh ref={asteroidRef} scale={2}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export default Asteroid;