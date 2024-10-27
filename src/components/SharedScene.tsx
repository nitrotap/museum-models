import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import { OrbitControls } from 'three-stdlib';

interface SharedSceneProps {
  modelPath: string;
  attribution: string;
  cameraPosition: number[];
  lightIntensity: number;
}

const SharedScene: React.FC<SharedSceneProps> = ({ modelPath, attribution, cameraPosition, lightIntensity }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;

    if (cameraPosition.length > 0) {
      const cameraPositionX = cameraPosition[0]
      const cameraPositionY = cameraPosition[1]
      const cameraPositionZ = cameraPosition[2]
      camera.up.set(cameraPositionX, cameraPositionY, cameraPositionZ);
    }


    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth * 0.7, window.innerHeight * 0.7);
    mountRef.current?.appendChild(renderer.domElement);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, lightIntensity);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const loader = new GLTFLoader();
    loader.load(modelPath, (gltf) => {
      const model = gltf.scene;
      model.scale.set(0.5, 0.5, 0.5);
      scene.add(model);
    });

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const width = window.innerWidth * 0.7;
      const height = window.innerHeight * 0.7;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [modelPath]);

  return (
    <div>
      <div ref={mountRef} style={{ padding: '10px', textAlign: 'center' }} />
      <p style={{ color: '#fff', textAlign: 'center' }}>{attribution}</p>
    </div>
  );
};

export default SharedScene;
