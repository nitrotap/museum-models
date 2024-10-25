import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonTextarea, IonText } from '@ionic/react';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ThreeScene from '../components/ThreeScene';
import PlaneScene from '../components/PlaneScene';
import CustomScene from '../components/CustomScene';
import './Home.css';

const Home: React.FC = () => {
  const [activeScene, setActiveScene] = useState<string>('cube');

  const text = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem vitae nemo voluptas error atque, rem qui numquam? Perferendis labore placeat quaerat, reiciendis, perspiciatis maiores temporibus laudantium fugit nulla rem dicta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel modi animi totam ipsum ad reprehenderit delectus facilis quasi repellat expedita, et officiis libero doloribus necessitatibus recusandae quia maiores tenetur amet. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum ipsa deleniti perspiciatis. Illum quis cupiditate placeat beatae. Repellat, velit ipsum eius, ipsam nihil illo non quaerat dolor numquam debitis beatae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto qui suscipit accusamus temporibus, cumque non quam laboriosam quo eos quis fuga laudantium aperiam quas nemo quod eius vel et animi?'

  const scenes = [
    { name: 'cube', label: 'Cube Model', image: '/assets/thumbnails/cube.png' },
    { name: 'plane', label: 'Plane Model', image: '/assets/thumbnails/plane.png' },
    { name: 'custom', label: 'Custom Model', image: '/assets/thumbnails/plane_2.png' },
    { name: 'plane', label: 'Plane Model', image: '/assets/thumbnails/plane.png' },
    { name: 'custom', label: 'Custom Model', image: '/assets/thumbnails/plane_2.png' },
  ];

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

        {/* Layout with text area and model container side by side */}
        <div className="content-container">
          <div className="text-area">
            <IonText style={{ height: '70vh', width: '20vw', position: 'absolute', zIndex: 1, color: '#ffffff' }}>{text}</IonText>
          </div>
          <div className="model-container">
            {activeScene === 'cube' && <ThreeScene />}
            {activeScene === 'plane' && <PlaneScene />}
            {activeScene === 'custom' && <CustomScene />}
          </div>
        </div>

        {/* Sliding Thumbnails overlayed on top of the model */}
        <div className="thumbnail-slider">
          <Swiper spaceBetween={10} slidesPerView={5} centeredSlides={true} modules={[Navigation, Pagination, Scrollbar]}
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
