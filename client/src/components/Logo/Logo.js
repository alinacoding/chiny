import React from 'react';
import Tilt from 'react-tilt';
import language from './language.png';


const Logo = () => {
  return (
    <div className='ma4 mt0'>
      <Tilt className="Tilt br5 shadow-3" options={{ max : 25 }} style={{ height: 200, width: 200 }} >
        <div className="Tilt-inner pa3">
          <img style={{paddingTop: '40px'}} alt='' src={language}/>
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;