import React, {useEffect, useRef} from 'react';
import {TimelineMax, Power2, Elastic, TimelineLite} from 'gsap';

//local
import LightBulbImg from '../../assets/images/light.svg';
import './Header.css';

const Header = () => {
  const lightBulbEl = useRef(null);
  const subtitleEl = useRef(null);
  const githubBtnEl = useRef(null);

  const runLightBulbAnimation = () => {
    const element = lightBulbEl.current;
    const tl = new TimelineMax({repeat: -1});

    tl.to(element, 0.3, {
      opacity: 0.15,
      ease: Power2.easeOut,
    })
      .to(element, 0.3, {
        opacity: 0.1,
        ease: Power2.easeOut,
      })
      .to(element, 0.3, {
        opacity: 0.15,
        ease: Power2.easeOut,
      })
      .to(element, 0.3, {
        opacity: 0.1,
        ease: Power2.easeOut,
      })
      .to(element, 0.1, {
        opacity: 0.15,
        ease: Power2.easeOut,
      })
      .to(element, 0.1, {
        opacity: 0.1,
        ease: Power2.easeOut,
      })
      .to(element, 0.1, {
        opacity: 0.15,
        ease: Power2.easeOut,
      });
  };

  const runHeaderAnimation = () => {
    const navbarEl = document.querySelector('nav.MainNavbar');
    const regularTitle = document.querySelectorAll('.MainHeader .MainHeader__title');
    const tl = new TimelineMax();

    tl.staggerFromTo(
      regularTitle,
      0.45,
      {
        y: -40,
        opacity: 0,
        rotationX: '-90deg',
        transformOrigin: 'center center',
        skewType: 'simple',
        skewY: -10,
        skewX: -50,
      },
      {
        opacity: 1,
        y: 0,
        rotationX: '0deg',
        skewY: 0,
        skewX: 0,
        ease: Elastic.easeOut.config(0.4, 0.5),
      },
      0.07,
    ).to(
      [navbarEl, githubBtnEl.current, subtitleEl.current],
      1,
      {
        opacity: 1,
        ease: Power2.easeIn,
        onComplete: () => {
          runLightBulbAnimation();
        },
      },
      '-=1.5',
    );
  };

  useEffect(() => {
    runHeaderAnimation();
  }, []);

  return (
    <header className="MainHeader">
      <div className="MainHeader__lightImgContainer" ref={lightBulbEl}>
        <img src={LightBulbImg} alt="" className="MainHeader__lightImg" />
      </div>
      <div className="container MainHeader__container">
        <div className="MainHeader__titleWrapper">
          <div className="MainHeader__titleContainer">
            {'React Native'.split('').map((item, index) => (
              <p className="MainHeader__title" key={index}>
                {item}
              </p>
            ))}
          </div>
          <div className="MainHeader__titleContainer">
            {'Modern Datepicker'.split('').map((item, index) => (
              <p className="MainHeader__title -bold" key={index}>
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="MainHeader__subtitleContainer" ref={subtitleEl}>
          <span className="MainHeader__subtitle">
            A customizable calendar, time & month picker for React Native (including Persian Jalaali
            calendar & locale)
          </span>
        </div>
        <a
          href="https://github.com/HosseinShabani/react-native-modern-datepicker"
          target="_blank"
          rel="noopener noreferrer">
          <div className="MainHeader__buttonContainer" ref={githubBtnEl}>
            <i className="icon-github MainHeader__buttonIcon"></i>
            <span className="MainHeader__buttonText">View on Github</span>
          </div>
        </a>
        <i className="icon-mouse MainHeader__scrollDownIcon"></i>
      </div>
    </header>
  );
};

export {Header};
