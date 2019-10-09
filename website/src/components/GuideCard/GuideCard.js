import React from 'react';

//local
import './GuideCard.css';
import {Code} from '../';

const GuideCard = ({title, description, code}) => {
  return (
    <section className="GuideCard">
      <h2 className="-title">{title}</h2>
      <h3 className="-description">{description}</h3>
      <Code isInstallation code={code} />
    </section>
  );
};

export {GuideCard};
