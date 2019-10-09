import React from 'react';

//local
import './FeaturesSection.css';
import {GuideCard} from '../../../../components';
import {FEATURES} from '../../../../constants';

const Feature = ({title, description, code, file, isVideo, poster}) => {
  return (
    <article className="Feature">
      <GuideCard title={title} description={description} code={code} />
      <div className="Feature__fileContainer">
        {isVideo ? (
          <video loop muted playsInline autoPlay poster={poster}>
            <source src={file} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img src={file} alt={title} />
        )}
      </div>
    </article>
  );
};

const GettingStarted = () => {
  return (
    <article className="GettingStarted">
      <h2 className="-title">Getting started</h2>
      <p className="-description">Welcome to react-native-modern-datepicker!</p>
      <ol>
        <li>
          <p className="-description">
            1- The package is both <strong>Android</strong> and <strong>iOS</strong> compatible.
          </p>
        </li>
        <li>
          <p className="-description">
            2- This package uses <strong>React hooks</strong>. Make sure you're running react-native
            >= 0.59.0 version.
          </p>
        </li>
        <li>
          <p className="-description">
            3- By default, this package inherits font-family from your project ('System'). You can
            use your own custom font, See <strong>options</strong> prop.
          </p>
        </li>
        <li>
          <p className="-description">
            4- You might see performance issues in development mode. However, you won't see such
            thing in <strong>production build</strong>.
          </p>
        </li>
      </ol>
    </article>
  );
};

const FeaturesSection = () => {
  return (
    <section className="FeaturesSection">
      <div className="container FeaturesSection__container">
        <GettingStarted />
        {FEATURES.map((item, index) => (
          <Feature {...item} key={index} />
        ))}
      </div>
    </section>
  );
};

export {FeaturesSection};
