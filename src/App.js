import React, { Component } from 'react';
import { render } from 'react-dom';
import parser from 'ua-parser-js';
import { createGlobalStyle } from 'styled-components';
import MediaQuery from 'react-responsive';
import WideScreenHero from './Slides/WideScreen/HeroSlide/Hero';
import WideScreenWork from './Slides/WideScreen/WorkSlide/Work';
import WideScreenSkills from './Slides/WideScreen/Skills';
import WideScreenContact from './Slides/WideScreen/ContactSlide/Contact';
import MobileHero from './Slides/Mobile/HeroSlide/Hero';
import MobileWork from './Slides/Mobile/WorkSlide/Work';
import MobileSkills from './Slides/Mobile/Skills';
import MobileContact from './Slides/Mobile/ContactSlide/Contact';
import './Assets/index.css';

const GlobalStyle = createGlobalStyle`
html, body { margin: 0;}
*, *:before, *:after { box-sizing: border-box; }
`;

class App extends Component {
  componentDidMount() {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    fetch(process.env.IPINFO_URL)
      .then(data => data.json())
      .then((ipInfo) => {
        const ua = parser(navigator.userAgent);
        const message = `${ipInfo.region}, ${ipInfo.city}
         • ${ua.browser.name} ${ua.browser.version}
         • ${ua.os.name} ${ua.os.version}
         • ${ipInfo.org}`;
        fetch(process.env.SLACK_URL, {
          credentials: 'omit',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          body: JSON.stringify({ text: message }),
        });
      });
  }

  render() {
    return (
      <React.Fragment>
        <MediaQuery query="(min-device-width: 1224px)">
          <WideScreenHero />
          <WideScreenWork />
          <WideScreenSkills />
          <WideScreenContact />
        </MediaQuery>
        <MediaQuery query="(max-device-width: 1224px)">
          <MobileHero />
          <MobileWork />
          <MobileSkills />
          <MobileContact />
        </MediaQuery>
        <GlobalStyle />
      </React.Fragment>
    );
  }
}

render(React.createElement(App), document.getElementById('root'));
