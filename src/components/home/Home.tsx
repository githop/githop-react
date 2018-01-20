import './home.css';
import * as React from 'react';
import profilePic from './githopProf-300x300.jpg';

const Home: React.StatelessComponent<{}> = () => {
  return (
      <div className="page-root container gth-home">
        <h3>Welcome</h3>
        <p>My name is Tom Hopkins. I live and work in Boulder, CO.</p>
        <div>
          <img className="prof-pic" src={profilePic} alt="profile pic"/>
        </div>
        <p>I enjoy learning new things, coding, and all of the outdoor fun that Colorado has to offer.</p>
      </div>
  );
};

export default Home;