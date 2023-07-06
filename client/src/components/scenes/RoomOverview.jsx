import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import React from 'react'
import { useFrame } from '@react-three/fiber';

export default function RoomOverview() {

  
  const gltf = useLoader(GLTFLoader, '../../../public/models/miniroom.glb');
   // 将模型缩放到指定大小
  gltf.scene.scale.set(0.1, 0.1, 0.1)
  
  useFrame(() => {
    gltf.scene.rotation.y+= 0.01
  });

  return (
    <primitive object={gltf.scene} />
  );
}
