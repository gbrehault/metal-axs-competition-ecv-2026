'use client';

import { useEffect, useState, type MutableRefObject } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

type Props = {
  materialRef?: MutableRefObject<THREE.MeshPhysicalMaterial | null>;
};

export default function Model({ materialRef }: Props) {
  const { scene } = useGLTF('/METAL_LOGO_3D.glb');
  const [modelScene] = useState(() => scene.clone());

  useEffect(() => {
    const chromeMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#d9e7f3'),
      metalness: 1,
      roughness: 0.1,
      clearcoat: 0.9,
      clearcoatRoughness: 0.12,
      envMapIntensity: 2,
      reflectivity: 1,
      transparent: true,
      opacity: 1,
    });

    const originalMaterials = new Map<THREE.Mesh, THREE.Material | THREE.Material[]>();
    const originalChildPositions = new Map<THREE.Object3D, THREE.Vector3>();

    modelScene.position.set(0, 0, 0);
    modelScene.scale.setScalar(1);

    if (materialRef) {
      materialRef.current = chromeMaterial;
    }

    modelScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        originalMaterials.set(child, child.material);
        child.material = chromeMaterial;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    const box = new THREE.Box3().setFromObject(modelScene);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();

    box.getCenter(center);
    box.getSize(size);

    const maxDimension = Math.max(size.x, size.y, size.z) || 1;

    modelScene.children.forEach((child) => {
      originalChildPositions.set(child, child.position.clone());
      child.position.sub(center);
    });

    modelScene.scale.setScalar(1.7 / maxDimension);

    return () => {
      originalMaterials.forEach((material, mesh) => {
        mesh.material = material;
      });

      originalChildPositions.forEach((position, child) => {
        child.position.copy(position);
      });

      if (materialRef) {
        materialRef.current = null;
      }

      chromeMaterial.dispose();
    };
  }, [materialRef, modelScene]);

  return <primitive object={modelScene} />;
}

useGLTF.preload('/METAL_LOGO_3D.glb');
