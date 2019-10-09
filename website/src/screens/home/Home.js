import React from 'react';

//local
import {Header, Footer, SEO, GuideSection} from '../../components';
import {FeaturesSection, PropsSection} from './components';

const Home = () => {
  return (
    <>
      <SEO title="React Native Modern Datepicker" />
      <Header />
      <GuideSection type="installation" />
      <FeaturesSection />
      <PropsSection />
      <GuideSection type="utils" />
      <Footer />
    </>
  );
};

export default Home;
