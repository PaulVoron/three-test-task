import React, { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

const initialStateForLids = [];
const boxesQty = 7;
for (let i = 0; i < boxesQty; i++) {
  initialStateForLids.i = false;
}

const Box = () => {
  const [isLidsOpen, setIsLidsOpen] = useState(initialStateForLids);
  const { nodes } = useLoader(GLTFLoader, './src/assets/BOX.glb');
 
  const group = useRef();
  
  const boxes = [];
  const springs = [];
  const lids = [];
  const largeButton = [];

  for (let i = 0; i < boxesQty; i++) {
    boxes[i] = nodes[`BOX${i+1}`];
    springs[i] = nodes[`BOX_Detail${i}`];
    lids[i] = nodes[`BOX_Top${i}`];

    lids[i].material.transparent = true;
    lids[i].material.opacity = 0.6;

    largeButton[i] = new THREE.Mesh(
      new THREE.BoxGeometry(2.6, 1, 1),
      new THREE.MeshBasicMaterial({ visible: false })
    );
  
    largeButton[i].position.set(0.4 + 3.65 * i, 1.5, 3);
  }

  const animateLid = (i) => {
    if (!isLidsOpen[i]) {
      if (lids[i].rotation.x < 0) {
        lids[i].rotation.x += 0.05;
        lids[i].position.z += 13;
        lids[i].position.y += 0.6;
        springs[i].rotation.x += 0.05;
        springs[i].position.z += 12;
        springs[i].position.y += 1.25;
      }
    } else {
      if (lids[i].rotation.x > -(Math.PI / 2)) {
        lids[i].rotation.x -= 0.05;
        lids[i].position.z -= 13;
        lids[i].position.y -= 0.6;
        springs[i].rotation.x -= 0.05;
        springs[i].position.z -= 12;
        springs[i].position.y -= 1.25;
      }
    }
  };

  useFrame(() => {
    for (let i = 0; i < boxesQty; i++) {
      animateLid(i);
    }
  });

  const onButtonClick = (i) => {
    setIsLidsOpen((prevValues) => ({ ...prevValues, [i]: !prevValues[i] }));
  };

  return (
    <>
      <group ref={group} position={[-11.3, 0, 0]}>
        {boxes.map((box, index) => (
          <React.Fragment key={index}>
            <primitive object={box} />
            <primitive object={largeButton[index]} onClick={() => onButtonClick(index)} />
          </React.Fragment>
        ))}
      </group>
    </>
  );
};

export default Box;
