import React from 'react';

//local
import './PropsSection.css';
import {Table} from '../../../../components';
import {PROPS_TABLE_HEADER_CONST, PROPS_CONST} from '../../../../constants';

const PropsSection = () => {
  return (
    <div className="PropsSection">
      <section className="container PropsSection__container">
        <h2 className="-title">Props list</h2>
        <h3 className="-description">Here's the full list of available props</h3>
        <Table headerData={PROPS_TABLE_HEADER_CONST} data={PROPS_CONST} />
      </section>
    </div>
  );
};

export {PropsSection};
