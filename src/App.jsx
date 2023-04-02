import './App.css'
import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'
import Box from './components/Box';

const App = () => {
  const group = useRef();

  return (
    <>
      <h1>Storage box in 3D</h1>
      <p>Use your mouse to drag, rotate, zoom the box. Click on the buttons to open the clasters. Just try it! </p>

      <div className="canvas">
        <Canvas camera={{ position: [-1, 18, 5] }}>
          <OrbitControls />
          <directionalLight position={[5, 12, 5]} intensity={1} />
          <ambientLight intensity={0.2} />
          <group ref={group}>
            <Box />
          </group>
        </Canvas>
      </div>

      <p>Developed by Pavlo Voronin, 2023</p>
    </>
  );
};

export default App;
