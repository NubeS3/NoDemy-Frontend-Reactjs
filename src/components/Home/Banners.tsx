/* eslint-disable jsx-a11y/anchor-has-content */
import '../../styles/components/Home/Banners.scss';

import banner1 from '../../assets/banners/1.banner.jpg';
import banner2 from '../../assets/banners/2.banner.jpg';
import banner3 from '../../assets/banners/3.banner.jpg';
import banner4 from '../../assets/banners/4.banner.jpg';
import banner5 from '../../assets/banners/5.banner.jpg';
import banner6 from '../../assets/banners/6.banner.jpg';
import banner7 from '../../assets/banners/7.banner.jpg';
import banner8 from '../../assets/banners/8.banner.jpg';
import { useEffect, useState, useRef } from 'react';

const Banners = () => {
  const [position, setPosition] = useState(1);
  const imageContainerRef = useRef(null);

  useEffect(() => {
    let bannerInterval: NodeJS.Timeout = null;
    if (imageContainerRef && imageContainerRef.current) {
      bannerInterval = setInterval(() => {
        setPosition((prev) => prev >= 8 ? 1 : prev + 1);
      }, 5000);
    }

    return () => {
      clearInterval(bannerInterval);
      bannerInterval = null;
    };
  }, []);

  return (
    <>
      <div className="Banners">
        <div className={`Banners__image-container Banners__image-container--${position}`} ref={imageContainerRef}>
          <img src={banner1} alt="Banner" className="Banners__image-container__image"/>
          <img src={banner2} alt="Banner" className="Banners__image-container__image" />
          <img src={banner3} alt="Banner" className="Banners__image-container__image" />
          <img src={banner4} alt="Banner" className="Banners__image-container__image" />
          <img src={banner5} alt="Banner" className="Banners__image-container__image" />
          <img src={banner6} alt="Banner" className="Banners__image-container__image" />
          <img src={banner7} alt="Banner" className="Banners__image-container__image" />
          <img src={banner8} alt="Banner" className="Banners__image-container__image" />
        </div>
      </div>
    </>
  );
};

export default Banners;
