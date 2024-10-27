import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import { OrbitControls } from 'three-stdlib';
import { IonIcon } from '@ionic/react';
import { add, remove, refresh, arrowBack, arrowForward } from 'ionicons/icons';

interface SharedSceneProps {
  modelPath: string;
  attribution: string;
  cameraPosition: number[];
  lightIntensity: number;
}

const ControlButton: React.FC<{ icon: string; onClick: () => void }> = ({ icon, onClick }) => (
  <button onClick={onClick} style={{ margin: '0 5px' }}>
    <IonIcon icon={icon} />
  </button>
);

const SharedScene: React.FC<SharedSceneProps> = ({ modelPath, attribution, cameraPosition, lightIntensity }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  const resizeRendererToContainer = (renderer: THREE.WebGLRenderer) => {
    const container = mountRef.current;
    if (container) {
      const { clientWidth, clientHeight } = container;
      renderer.setSize(clientWidth, clientHeight);
      if (cameraRef.current) {
        cameraRef.current.aspect = clientWidth / clientHeight;
        cameraRef.current.updateProjectionMatrix();
      }
    }
  };

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(cameraPosition[0] || 0, cameraPosition[1] || 0, cameraPosition[2] || 10);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.domElement.style.cursor = 'grab';
    mountRef.current?.appendChild(renderer.domElement);

    const directionalLight = new THREE.DirectionalLight(0xffffff, lightIntensity);
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, lightIntensity);
    scene.add(ambientLight);

    const loader = new GLTFLoader();
    loader.load(modelPath, (gltf) => {
      const model = gltf.scene;
      model.scale.set(0.5, 0.5, 0.5);
      scene.add(model);
    });

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI;
    controlsRef.current = controls;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => resizeRendererToContainer(renderer);
    window.addEventListener('resize', handleResize);
    resizeRendererToContainer(renderer); // Initial resize to container dimensions

    return () => {
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [modelPath, lightIntensity, cameraPosition]);

  const zoomIn = () => {
    if (cameraRef.current) {
      cameraRef.current.position.z = Math.max(1, cameraRef.current.position.z - 1);
    }
  };

  const zoomOut = () => {
    if (cameraRef.current) {
      cameraRef.current.position.z += 1;
    }
  };

  const rotateLeft = () => {
    if (controlsRef.current) {
      const angle = controlsRef.current.getAzimuthalAngle();
      controlsRef.current.setAzimuthalAngle(angle + 0.1);
      controlsRef.current.update();
    }
  };

  const rotateRight = () => {
    if (controlsRef.current) {
      const angle = controlsRef.current.getAzimuthalAngle();
      controlsRef.current.setAzimuthalAngle(angle - 0.1);
      controlsRef.current.update();
    }
  };

  const recenter = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(cameraPosition[0] || 0, cameraPosition[1] || 0, cameraPosition[2] || 10);
      cameraRef.current.rotation.set(0, 0, 0);
      controlsRef.current.reset();
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', width: '100%' }}>
      <p style={{ color: '#fff' }}>{attribution}</p>
      <p style={{ color: '#ddd', marginTop: '10px' }}>
        Use the controls below, or click anywhere on the scene to zoom, rotate, and recenter the model.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '10px', flexWrap: 'wrap' }}>
        <ControlButton icon={add} onClick={zoomIn} />
        <ControlButton icon={remove} onClick={zoomOut} />
        <ControlButton icon={arrowBack} onClick={rotateLeft} />
        <ControlButton icon={arrowForward} onClick={rotateRight} />
        <ControlButton icon={refresh} onClick={recenter} />
      </div>
      <div
        ref={mountRef}
        style={{
          padding: '10px',
          border: '1px solid #666',
          width: '90%',
          // maxWidth: '700px',
          margin: 'auto',
          marginTop: '10px',
          marginBottom: '5vw',
          height: '50vh',
          overflow: 'hidden' // Prevents graphical overflow
        }}
      />
    </div>
  );
};

export default SharedScene;
