import { IonText } from '@ionic/react';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import { OrbitControls } from 'three-stdlib';

const PlaneScene: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.up.set(0, -1, 0);

        const renderer = new THREE.WebGLRenderer({ antialias: true });

        // Set renderer size and append it to the DOM
        renderer.setSize(window.innerWidth * .7, window.innerHeight * .7);
        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }

        // Add multiple lights for a well-lit scene
        // Directional Light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 50); // Increase intensity
        directionalLight.position.set(10, -10, -5);
        scene.add(directionalLight);

        // Ambient Light for overall scene brightness
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Softer ambient light
        scene.add(ambientLight);

        // Point Light for focused lighting from a specific position
        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        // Load the airplane model with textures
        const loader = new GLTFLoader();
        loader.load('/models/ww_plane_gltf/scene.gltf', (gltf) => {
            const model = gltf.scene;
            model.scale.set(0.5, 0.5, 0.5); // Adjust scale if necessary
            scene.add(model);

            // Animate the airplane model
            const animate = () => {
                requestAnimationFrame(animate);
                controls.update(); // OrbitControls need to be updated on each frame
                renderer.render(scene, camera);
            };
            animate();
        }, undefined, (error) => {
            console.error('An error occurred while loading the airplane model:', error);
        });

        // Set the camera position
        camera.position.z = 10;

        // Add OrbitControls for panning, zooming, and rotating
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // Smooth motion
        controls.dampingFactor = 0.25;
        controls.screenSpacePanning = false;
        controls.maxPolarAngle = Math.PI / 2;

        // Handle window resizing
        const handleResize = () => {
            const width = window.innerWidth * .7;
            const height = window.innerHeight * .7;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', handleResize);

        // Clean up on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            controls.dispose(); // Clean up controls
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div>
            <div style={{ padding: '10px', textAlign: 'center' }}>
                <IonText>
                    <p style={{ color: '#fff' }}>
                        "WW Plane" (https://www.fab.com/listings/4d9445be-9c5f-426c-9ce7-ba6271eb65c6) by Alejo is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
                    </p>
                </IonText>
            </div>
            <div ref={mountRef} />
        </div>
    );
};

export default PlaneScene;
