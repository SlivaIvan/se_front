/* eslint-disable space-before-function-paren */
/* eslint-disable prefer-template */
const sub = document.querySelector('.subscription');
const subForm = sub.querySelector('.subscribe__form');
const unBtn = sub.querySelector('.un-btn');
const host = 'http://localhost:8000';

class SubscriptionApi {
  constructor(uriApi) {
    this.uriApi = uriApi;
  }

  async add(user) {
    const request = fetch(this.uriApi + '/subscription', {
      method: 'POST',
      body: JSON.stringify(user),
    });

    const result = await request;
    const json = await result.json();
    const { status } = json;

    console.log(status);
  }

  async remove(user) {
    const query = '/?phone=' + user.phone;
    const request = fetch(this.uriApi + '/subscription' + query, {
      method: 'DELETE',
    });

    const result = await request;
    const json = await result.json();
    const { status } = json;

    console.log(status);
  }
}

window.api = new SubscriptionApi(host);

const eventSourse = new EventSource('http://localhost:8000/sse');

eventSourse.addEventListener('open', (e) => {
  console.log(e);

  console.log('sse open');
});

eventSourse.addEventListener('message', (e) => {
  console.log(e);

  console.log('sse message');
});

eventSourse.addEventListener('error', (e) => {
  console.log(e);

  console.log('sse error');
});