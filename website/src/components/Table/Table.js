import React from 'react';
import classNames from 'classnames';

//local
import './Table.css';

const Table = ({headerData, data}) => {
  const getHeaderTitleIdx = title => headerData.findIndex(item => item === title);

  return (
    <div className="TableWrapper">
      <article className="Table">
        <div className="Table__row -header">
          {headerData.map((item, index) => {
            const descIndex = getHeaderTitleIdx('Description');
            const typeIndex = getHeaderTitleIdx('Type');

            return (
              <div
                className={classNames('Table__field', {
                  '-large': index === descIndex,
                  '-small': index === typeIndex,
                })}
                key={index}>
                <h2 className="Table__fieldText">{item}</h2>
              </div>
            );
          })}
        </div>
        {data.map((item, index) => (
          <div className="Table__row" key={index}>
            <div className="Table__field">
              <span className="Table__fieldText">{item.name}</span>
            </div>
            <div className="Table__field -small">
              <span className="Table__fieldText">{item.type}</span>
            </div>
            <div className="Table__field">
              <span className="Table__fieldText">{item.default}</span>
            </div>
            <div className="Table__field -large">
              <span className="Table__fieldText">{item.description}</span>
            </div>
          </div>
        ))}
      </article>
    </div>
  );
};

export {Table};
