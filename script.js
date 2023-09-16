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

var src = ``;
const iframe_container = document.getElementById('iframe-container');

//construct divs with frames
var iframes = '<div class="frames">';

for (let index = 0; index < config.sheets.length; index++) {

    console.log('sheet id: ', config.sheets[index]);

    src = `https://${config.tenant}/single/?appid=${config.appId}&sheet=${config.sheets[index]}&theme=breeze&opt=nointeraction,noselections`;

    iframes += `<div class="iframe_box iframe_box_${index}" style="display:${(index == 0) ? 'block' : 'none'}"  id-frame=${index}>`;
    //iframes += `<h1>Iframe ${index}</h1>`;
    iframes += `<iframe src = "${src}"></iframe></div>`
}

iframes +=`</div>`

iframe_container.innerHTML = iframes; 

//change between iframes
let ind = 0;

setInterval(() => {

    if(ind >= config.sheets.length) {
        ind= 0;
    }

    document.querySelectorAll('.iframe_box').forEach(framebox => {
        framebox.style.display="none";
    });
    document.querySelector('.iframe_box_' + ind).style.display="block";

    console.log('index', ind);

    ind++;

}, config.period * 1000);


