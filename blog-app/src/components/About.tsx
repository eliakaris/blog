import * as React from 'react';

function About() {
  return (
    <div>
      <img className="me" src="/img/me.jpg" width="432" height="432" />
      <h2>About me</h2>
      <p>Hey there. My name is Elia Karagiannis and I live in Seattle, Washington.</p>

      <h2>Professional</h2>
      <p>I'm a software developer at Pinterest working on advertiser partner experiences.
        I've previously worked at Microsoft for 10 years until 2017.
        Before that I worked in the bay area as a developer and before that in Springfield, MO.
      </p>

      <h2>Hobbies</h2>
      <p><a href="http://github.com/eliakaris">programming</a>, 
      <a href="http://www.bing.com/search?q=rams+football">sports</a>, cleaning.</p>

      <h2>Contact</h2>
      <a href="mailto:eliakaris@hotmail.com" rel="author">eliakaris@hotmail.com</a>,
        <a href="http://twitter.com/eliakaris">@eliakaris</a>,
        <a href="http://www.linkedin.com/in/eliakaris">LinkedIn</a>,
        <a href="http://www.facebook.com/eliakaris">Facebook</a>
      <p>
        <a
          href="https://twitter.com/eliakaris"
          className="twitter-follow-button"
          data-show-count="true"
          data-lang="en"
          data-show-screen-name="true"
          data-size="large"
        >Follow @eliakaris
        </a>
      </p>

    </div>
  );
}

export default About;