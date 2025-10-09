"use client";

import React from 'react';

const backgrounds = {
  Clear: 'url(/images/clear.jpg)',
  Clouds: 'url(/images/clouds.jpg)',
  Rain: 'url(/images/rain.jpg)',
  Snow: 'url(/images/snow.jpg)',
  Thunderstorm: 'url(/images/thunderstorm.jpg)',
  default: 'url(/images/default.jpg)',
};

const Background = ({ condition, children }) => {
  const style = {
    backgroundImage: backgrounds[condition] || backgrounds.default,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    padding: '2rem',
  };

  return <div style={style}>{children}</div>;
};

export default Background;