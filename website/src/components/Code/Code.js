import React, {useEffect} from 'react';
import Prism from 'prismjs';

//local
import './Code.css';

const Code = ({isInstallation, code}) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  if (isInstallation) {
    return (
      <div className="Code">
        <pre>
          <code className="language-js">{code.trim()}</code>
        </pre>
      </div>
    );
  }
};

export {Code};
