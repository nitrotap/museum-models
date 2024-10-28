import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon
} from '@ionic/react';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SharedScene from '../components/SharedScene';
import './Home.css';
import appIcon from '../../public/assets/icon.svg';


export const Scene = class {
  name: string;
  label: string;
  image: string;
  modelPath: string;
  attribution: string;
  cameraPosition: Array<number>;
  lightIntensity: number;

  constructor(name: string, label: string, image: string, modelPath: string, attribution: string, cameraPosition: Array<number>, lightIntensity: number) {
    this.name = name;
    this.label = label;
    this.image = image;
    this.modelPath = modelPath
    this.attribution = attribution
    this.cameraPosition = cameraPosition
    this.lightIntensity = lightIntensity
  }
}


const Home: React.FC = () => {
  const [activeScene, setActiveScene] = useState<string>('plane');

  const BeechcraftC18SInfo = () => {
    return (
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', maxWidth: '500px' }}>
        <div>
          <section>
            <h3><strong>General Information</strong></h3>
            <p><strong>Manufacturer:</strong> Beech Aircraft Corporation</p>
            <p><strong>First Introduced:</strong> 1937</p>
            <p><strong>Primary Use:</strong> Originally designed as a light transport aircraft, often used for cargo, passenger transport, and military roles</p>
          </section>
          <br></br>


          <section>
            <h3><strong>Specifications</strong></h3>
            <p><strong>Crew:</strong> 2 (Pilot and co-pilot)</p>
            <p><strong>Capacity:</strong> Up to 6 passengers</p>
            <p><strong>Length:</strong> 32 feet 9 inches (9.98 meters)</p>
            <p><strong>Wingspan:</strong> 47 feet 8 inches (14.53 meters)</p>
            <p><strong>Height:</strong> 9 feet 8 inches (2.95 meters)</p>
            <p><strong>Wing Area:</strong> 353 square feet (32.8 square meters)</p>
          </section>
          <br></br>


          <section>
            <h3><strong>Performance</strong></h3>
            <p><strong>Maximum Speed:</strong> 225 mph (362 km/h)</p>
            <p><strong>Cruising Speed:</strong> 190 mph (305 km/h)</p>
            <p><strong>Range:</strong> Approximately 1,200 miles (1,931 km)</p>
            <p><strong>Service Ceiling:</strong> 20,000 feet (6,096 meters)</p>
          </section>
          <br></br>


          <section>
            <h3><strong>Engine and Propulsion</strong></h3>
            <p><strong>Engine:</strong> Two Pratt & Whitney R-985 radial engines</p>
            <p><strong>Horsepower:</strong> 450 hp per engine</p>
            <p><strong>Propellers:</strong> 2-bladed variable-pitch propellers</p>
          </section>
          <br></br>


          <section>
            <h3><strong>Weight</strong></h3>
            <p><strong>Empty Weight:</strong> 5,350 lbs (2,427 kg)</p>
            <p><strong>Maximum Takeoff Weight:</strong> 8,725 lbs (3,957 kg)</p>
          </section>
          <br></br>


          <section>
            <h3><strong>Special Features</strong></h3>
            <p><strong>Construction:</strong> Metal skin with a low-wing, twin-engine layout</p>
            <p><strong>Landing Gear:</strong> Retractable tailwheel-type</p>
          </section>
          <br></br>


          <section>
            <h3><strong>Notable Uses</strong></h3>
            <p>Extensively used during WWII for military transport, light bomber roles, and training.</p>
            <p>Known for its durability and versatility, used in post-war years for cargo and passenger services.</p>
          </section>
        </div>
      </div>
    );
  };


  const DiamondDA4_Twin_Star = () => {
    return (
      <div>
        <section>
          <h3>General Information</h3>
          <p><strong>Manufacturer:</strong> Diamond Aircraft Industries</p>
          <p><strong>First Introduced:</strong> 2004</p>
          <p><strong>Primary Use:</strong> Light twin-engine utility aircraft, often used for flight training, personal use, and reconnaissance</p>
        </section>

        <section>
          <h3>Specifications</h3>
          <p><strong>Crew:</strong> 1 or 2 (Pilot and optional co-pilot)</p>
          <p><strong>Capacity:</strong> Up to 3 passengers</p>
          <p><strong>Length:</strong> 28 feet 1 inch (8.56 meters)</p>
          <p><strong>Wingspan:</strong> 44 feet (13.42 meters)</p>
          <p><strong>Height:</strong> 8 feet 2 inches (2.49 meters)</p>
          <p><strong>Wing Area:</strong> 177.5 square feet (16.5 square meters)</p>
        </section>

        <section>
          <h3>Performance</h3>
          <p><strong>Maximum Speed:</strong> 226 mph (364 km/h)</p>
          <p><strong>Cruising Speed:</strong> 180 mph (290 km/h)</p>
          <p><strong>Range:</strong> Approximately 1,250 miles (2,012 km)</p>
          <p><strong>Service Ceiling:</strong> 18,000 feet (5,486 meters)</p>
        </section>

        <section>
          <h3>Engine and Propulsion</h3>
          <p><strong>Engine:</strong> Two Austro AE300 diesel engines (or Thielert TAE 125 in older models)</p>
          <p><strong>Horsepower:</strong> 168 hp per engine (Austro AE300)</p>
          <p><strong>Propellers:</strong> 3-bladed constant-speed propellers</p>
        </section>

        <section>
          <h3>Weight</h3>
          <p><strong>Empty Weight:</strong> 3,104 lbs (1,408 kg)</p>
          <p><strong>Maximum Takeoff Weight:</strong> 4,407 lbs (2,000 kg)</p>
        </section>

        <section>
          <h3>Special Features</h3>
          <p><strong>Construction:</strong> Composite airframe for durability and reduced weight</p>
          <p><strong>Avionics:</strong> Garmin G1000 integrated flight deck</p>
          <p><strong>Fuel Efficiency:</strong> Diesel engines with high fuel efficiency, suitable for long-distance flights</p>
        </section>

        <section>
          <h3>Notable Uses</h3>
          <p>Widely used for advanced flight training, surveillance, and as a personal aircraft. Known for its fuel efficiency and modern avionics.</p>
        </section>
      </div>

    );
  }

  // Define the Scene type
  interface Scene {
    name: string;
    label: string;
    image: string;
    modelPath: string;
    attribution: string;
    cameraPosition: number[]; // Array of numbers
    lightIntensity: number;
    jsx: any;
  }

  // Define the scenes array with the Scene type
  const scenes: Scene[] = [
    {
      name: 'plane',
      label: 'Beechcraft C18 S',
      image: '/assets/thumbnails/plane.png',
      modelPath: '/models/airplane/scene.gltf',
      attribution: '"Beechcraft C18 S Floats version" by helijah',
      cameraPosition: [],
      lightIntensity: 5,
      jsx: BeechcraftC18SInfo()
    },
    {
      name: 'diamond',
      label: 'Diamond Da42',
      image: '/assets/thumbnails/plane_diamond.png',
      modelPath: '/models/diamond_da42_twin_star_gltf/scene.gltf',
      attribution: 'Diamond Da42 "Twin Star" by helijah',
      cameraPosition: [],
      lightIntensity: 5,
      jsx: DiamondDA4_Twin_Star()
    }
  ];

  const activeSceneData = scenes.find(scene => scene.name === activeScene);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div style={{ display: 'flex' }}>
            <IonIcon icon={appIcon} size='large' style={{ marginLeft: '10px' }}></IonIcon>
            <IonTitle>Museum Kiosk</IonTitle>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Museum Kiosk</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Thumbnail Slider at the top */}
        <div className="thumbnail-slider">
          <Swiper spaceBetween={10} slidesPerView={scenes.length} centeredSlides modules={[Navigation, Pagination, Scrollbar]}
            navigation pagination={{ clickable: true }} scrollbar={{ draggable: true }}>
            {scenes.map((scene, index) => (
              <SwiperSlide key={index} onClick={() => setActiveScene(scene.name)}>
                <div className={`thumbnail ${activeScene === scene.name ? 'active' : ''}`}>
                  <img src={scene.image} alt={scene.label} />
                  <IonText color="light"><p>{scene.label}</p></IonText>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Content Container with Text and Model */}
        <div className="content-container">
          <div className="text-area">
            <IonText className='model-text'>{activeSceneData?.jsx}</IonText>
          </div>
          <div className="model-container">
            {scenes.map(scene =>
              activeScene === scene.name && (
                <SharedScene
                  key={scene.name}
                  modelPath={scene.modelPath}
                  attribution={scene.attribution}
                  cameraPosition={scene.cameraPosition}
                  lightIntensity={scene.lightIntensity} />
              )
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
