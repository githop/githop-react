import * as React from 'react';
import profilePic from './githopProf-300x300.jpg';
import './home.css';

const Home: React.StatelessComponent<{}> = () => {
  return (
    <div className="page-root container gth-home">
      <div className="gth-home__content --gth-border --gth-border-radius">
        <h3>
          <span className="--gth-underline">Welcome</span>
        </h3>
        <p>My name is Tom Hopkins. I live and work in Boulder, CO.</p>
        <div>
          <img className="prof-pic" src={profilePic} alt="profile pic" />
        </div>
        <p>
          I enjoy learning new things, coding, and all of the outdoor fun that Colorado
          has to offer.
        </p>
      </div>
    </div>
  );
};

export default Home;
