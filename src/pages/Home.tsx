import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonTextarea, IonText, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon } from '@ionic/react';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import PlaneScene from '../components/PlaneScene';
import CustomScene from '../components/CustomScene';
import './Home.css';
import appIcon from '../../public/assets/icon.svg'

const Home: React.FC = () => {
  const [activeScene, setActiveScene] = useState<string>('plane');

  // const text = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem vitae nemo voluptas error atque, rem qui numquam? Perferendis labore placeat quaerat, reiciendis, perspiciatis maiores temporibus laudantium fugit nulla rem dicta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel modi animi totam ipsum ad reprehenderit delectus facilis quasi repellat expedita, et officiis libero doloribus necessitatibus recusandae quia maiores tenetur amet. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum ipsa deleniti perspiciatis. Illum quis cupiditate placeat beatae. Repellat, velit ipsum eius, ipsam nihil illo non quaerat dolor numquam debitis beatae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto qui suscipit accusamus temporibus, cumque non quam laboriosam quo eos quis fuga laudantium aperiam quas nemo quod eius vel et animi?'

  const BeechcraftC18SInfo = () => {
    return (
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', maxWidth: '500px', margin: 'auto' }}>
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


  const text =
    <>
      <IonCard color="primary">
        <IonCardHeader>
          <IonCardTitle>Beechcraft C18 S</IonCardTitle>
        </IonCardHeader>

        <IonCardContent style={{ border: 'none' }}>{BeechcraftC18SInfo()}</IonCardContent>
      </IonCard>
    </>


  const scenes = [
    { name: 'plane', label: 'Plane Model', image: '/assets/thumbnails/plane.png' },
    { name: 'custom', label: 'Custom Model', image: '/assets/thumbnails/plane_2.png' },
    { name: 'plane', label: 'Plane Model', image: '/assets/thumbnails/plane.png' },
    { name: 'custom', label: 'Custom Model', image: '/assets/thumbnails/plane_2.png' },
    { name: 'plane', label: 'Plane Model', image: '/assets/thumbnails/plane.png' },

  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div style={{ display: 'flex' }}>
            <IonIcon icon={appIcon} size='large'></IonIcon>
            <IonTitle>Museum Kiosk</IonTitle>

          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Museum Kiosk</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Layout with text area and model container side by side */}
        <div className="content-container">
          <div className="text-area">
            <IonText className='model-text'>{text}</IonText>
          </div>
          <div className="model-container">
            {activeScene === 'plane' && <PlaneScene />}
            {activeScene === 'custom' && <CustomScene />}
          </div>
        </div>

        {/* Sliding Thumbnails overlayed on top of the model */}
        <div className="thumbnail-slider">
          <Swiper spaceBetween={10} slidesPerView={scenes.length} centeredSlides={true} modules={[Navigation, Pagination, Scrollbar]}
            navigation={true}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
          >
            {scenes.map((scene, index) => (
              <SwiperSlide key={index} onClick={() => setActiveScene(scene.name)}>
                <div className={`thumbnail ${activeScene === scene.name ? 'active' : ''}`}>
                  <img src={scene.image} alt={scene.label} />
                  <IonText color={'light'}>
                    <p>{scene.label}</p>
                  </IonText>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
