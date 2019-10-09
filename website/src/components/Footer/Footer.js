import React from 'react';

//local
import './Footer.css';
import {FOOTER_SOCIAL_MEDIA} from '../../constants';

const Footer = () => {
  return (
    <footer className="Footer">
      <section className="container Footer__container">
        <div className="Footer__socialMedia">
          <h2 className="-description">Social Media: </h2>
          <ul className="Footer__socialMediaList">
            {FOOTER_SOCIAL_MEDIA.map((item, index) => (
              <li className="Footer__socialMediaItem" key={index}>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <i className={item.icon}></i>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="Footer__appreciation">
          <h2 className="-description">Made with</h2>
          <span className="Footer__loveIcon" role="image" aria-label="Love">
            💙
          </span>
          <h2 className="-description">for developers!</h2>
        </div>

        <div className="Footer__starBtnContainer">
          <a
            href="https://github.com/HosseinShabani/react-native-modern-datepicker"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Star HosseinShabani/react-native-modern-datepicker on GitHub"
            className="Footer__starBtn">
            <i className="icon-star Footer__starBtnIcon"></i>
            <h2 className="-title">Star on GitHub</h2>
          </a>
        </div>
      </section>
    </footer>
  );
};

export {Footer};
