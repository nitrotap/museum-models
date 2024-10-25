import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import ThreeScene from '../components/ThreeScene';
import PlaneScene from '../components/PlaneScene';
import CustomScene from '../components/CustomScene';  // Import your CustomScene component
import './Home.css';

const Home: React.FC = () => {
  const history = useHistory();
  const [activeScene, setActiveScene] = useState<string>('cube'); // Manage the active scene

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Museum Kiosk</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Museum Kiosk</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div style={{ padding: '10px' }}>
          {/* Buttons to switch between scenes */}
          <IonButton expand="full" onClick={() => setActiveScene('cube')}>
            View Cube Model
          </IonButton>
          <IonButton expand="full" onClick={() => setActiveScene('plane')} style={{ marginTop: '10px' }}>
            View Plane Model
          </IonButton>
          <IonButton expand="full" onClick={() => setActiveScene('custom')} style={{ marginTop: '10px' }}>
            View Custom Model
          </IonButton>
        </div>

        {/* Programmatically render the scene based on the activeScene state */}
        {activeScene === 'cube' && <ThreeScene />}
        {activeScene === 'plane' && <PlaneScene />}
        {activeScene === 'custom' && <CustomScene />} {/* Render CustomScene when selected */}
      </IonContent>
    </IonPage>
  );
};

export default Home;
