import * as React from 'react';

import './About.css';

function About() {
  return (
    <div>
      <img className="me" src="/img/me3.jpg" />
      <h2>About me</h2>
      <p>Hey there. My name is Elia Karagiannis and I live in Seattle, Washington.</p>

      <h2>Professional</h2>
      <p>I'm a software developer at Pinterest working on advertiser partner experiences.
        I've previously worked at Microsoft for 10 years until 2017.
        Before that I worked in the bay area as a developer and before that in Springfield, MO.
      </p>

      <h2>Hobbies</h2>
      <p><a href="http://github.com/eliakaris">programming</a>, 
      <a href="http://www.bing.com/search?q=rams+football">sports</a></p>
    </div>
  );
}

export default About;