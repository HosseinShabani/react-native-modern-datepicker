import React from 'react';

//local
import {GuideCard} from '../';
import {INSTALLATION_CODE, EXAMPLE_PROJECT_CLONE_CODE, UTILS_CODE} from '../../constants';
import './GuideSection.css';

const GuideSection = ({type}) => {
  const GUIDES = {
    installation: (
      <>
        <GuideCard
          title="Installation"
          description="Install it using Yarn or NPM:"
          code={INSTALLATION_CODE}
        />
        <GuideCard
          title="Try it out!"
          description="You can run example module by performing these steps:"
          code={EXAMPLE_PROJECT_CLONE_CODE}
        />
      </>
    ),
    utils: (
      <GuideCard
        title="Utils"
        description="There are quite a few utils that might become handy for you"
        code={UTILS_CODE}
      />
    ),
  };

  return (
    <div className={`GuideSection -${type}`}>
      <div className="container GuideSection__container">{GUIDES[type]}</div>
    </div>
  );
};

export {GuideSection};
