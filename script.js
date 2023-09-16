//main js file

import { config } from "./settings.js";

console.log('config', config);

const webIntegrationId = config.webIntegrationId;

/* Login function  */
function login() {
  function isLoggedIn() {
    return fetch("https://qisrael.eu.qlikcloud.com/api/v1/users/me", {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'qlik-web-integration-id': webIntegrationId,
      },
    }).then(response => {
      return response.status === 200;
    });
  }
  return isLoggedIn().then(loggedIn => {
    if (!loggedIn) {
      // check login
        window.top.location.href = "https://qisrael.eu.qlikcloud.com/login?qlik-web-integration-id=" + webIntegrationId + "&returnto=" + top.location.href;
      throw new Error('not logged in');
    }
  });
}

login();

/*  Main functions */

//Get iframe link
//default link
var src = `https://${config.tenant}/single/?appid=${config.appId}&sheet=${config.sheets[0]}&theme=breeze&opt=nointeraction,noselections`;
var iframe = `<iframe src = "${src}"></iframe>`;

const iframe_container = document.getElementById('iframe-container');

iframe_container.innerHTML = iframe;

let index = 0;

setInterval(() => {
    if(index > config.sheets.length) {
        index = 0;
    }

    src = `https://${config.tenant}/single/?appid=${config.appId}&sheet=${config.sheets[index]}&theme=breeze&opt=nointeraction,noselections`;
    iframe = `<iframe src = "${src}"></iframe>`;
    iframe_container.innerHTML = iframe;

    console.log('index', index);
    index++;
}, 20000);


