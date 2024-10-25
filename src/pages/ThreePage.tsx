import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonButtons, IonButton } from '@ionic/react';
import ThreeScene from '../components/ThreeScene';
import PlaneScene from '../components/PlaneScene';

const ThreePage: React.FC = () => {
    const [showCube, setShowCube] = useState(true);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" />
                    </IonButtons>
                    <IonTitle>Three.js Scene</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div style={{ padding: '10px' }}>
                    <IonButton expand="full" onClick={() => setShowCube(true)}>
                        View Cube Model
                    </IonButton>
                    <IonButton expand="full" onClick={() => setShowCube(false)} style={{ marginTop: '10px' }}>
                        View Plane Model
                    </IonButton>
                </div>

                {/* Conditionally render either the cube or the plane */}
                {showCube ? <ThreeScene /> : <PlaneScene />}

                <ThreeScene />
            </IonContent>
        </IonPage>
    );
};

export default ThreePage;
