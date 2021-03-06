import React from 'react';

function About() {
  return (
    <div>
      <img className="me" src="/img/me.png" alt="" />
      <h2>About me</h2>
      <p>Hi there. My name is Elia Karagiannis and I live in Seattle, Washington.</p>

      <h2>Professional</h2>
      <p>I'm a software development manager at Pinterest Seattle.  My team works on content creation for web and mobile.
      I previously worked at Microsoft for 10 years until 2017.
      Before that I worked in the bay area as a developer and before that in Springfield, MO.
      </p>

      <h2>Hobbies</h2>
      <p><a href="http://github.com/eliakaris">programming</a>,
      <a href="http://www.bing.com/search?q=rams+football">sports</a></p>
    </div>
  );
}

export default About;
