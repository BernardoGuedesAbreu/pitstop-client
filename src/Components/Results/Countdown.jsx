import React, { useEffect } from 'react';

const F1CountdownWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://www.f1widget.com/javascript/remote.js';
    script.async = true;
    document.head.appendChild(script);

    (window.f1widgets ||= []).push({ width: 30, height:20, lang: 'en' });

    // Cleanup
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return <div id="f1-widget"></div>;
};

export default F1CountdownWidget;
