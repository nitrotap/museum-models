import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
const { dialog } = require('electron').remote;



const ModelLoader: React.FC = () => {
    const [scene, setScene] = useState<THREE.Scene | null>(null);
    const mountRef = useRef<HTMLDivElement>(null);

    // Initialize Three.js scene and renderer
    React.useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }

        setScene(scene);
        camera.position.z = 5;

        // Render loop
        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();
    }, []);

    // Handle file upload
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;

        if (file && scene) {
            const reader = new FileReader();
            reader.onload = () => {
                const fileUrl = reader.result as string;
                if (file.name.endsWith('.glb') || file.name.endsWith('.gltf')) {
                    const loader = new GLTFLoader();
                    loader.load(fileUrl, (gltf) => {
                        scene.add(gltf.scene);
                    });
                } else if (file.name.endsWith('.obj')) {
                    const loader = new OBJLoader();
                    loader.load(fileUrl, (obj) => {
                        scene.add(obj);
                    });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <div ref={mountRef} style={{ width: '100%', height: '500px' }} />
            <input type="file" onChange={handleFileUpload} accept=".glb,.gltf,.obj" />
        </div>
    );
};

export default ModelLoader;
