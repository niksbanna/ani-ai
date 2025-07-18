// This file is at 'src/components/Avatar.tsx'

import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber/native';
// NEW: Drei is a helper library for react-three-fiber
import { useGLTF, useAnimations } from '@react-three/drei/native';
import { Mesh, Group } from 'three';

// This component loads and displays our animated 3D model.
const Model = () => {
  const group = useRef<Group>(null!);
  
  // Load the 3D model and its animations.
  // Replace the URL with the path to your own model when it's ready.
  const { scene, animations } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/silly-dance/model.gltf');
  
  // Get the animation actions
  const { actions } = useAnimations(animations, group);

  // Play the default animation when the model loads.
  useEffect(() => {
    if (actions && actions.dance) {
      actions.dance.play();
    }
  }, [actions]);

  return (
    // Scale and position the model appropriately in the scene
    <primitive 
      ref={group} 
      object={scene} 
      scale={2} 
      position={[0, -1.5, 0]} 
    />
  );
};


// The main Avatar component that sets up the 3D scene.
const Avatar = () => {
  return (
    <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }}>
      {/* Use a brighter ambient light to see the model clearly */}
      <ambientLight intensity={1.5} />
      {/* Add a point light for better highlights */}
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <Model />
    </Canvas>
  );
};

// Preload the model to avoid a delay when the component mounts
useGLTF.preload('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/silly-dance/model.gltf');

export default Avatar;
