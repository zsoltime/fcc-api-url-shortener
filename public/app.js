'use strict';

function handleFormSubmit() {
  const form = document.querySelector('.form');
  const button = document.querySelector('.form__btn');
  const response = document.querySelector('#response');
  const shorturl = document.querySelector('#shorturl');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const url = form.elements.url.value;

    if (!url) {
      return;
    }

    button.classList.add('form__btn--loading');
    button.setAttribute('disabled', true);

    fetch('api/shorturl/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ url }),
    })
      .then(res => res.json())
      .then((res) => {
        if (res.error) {
          return;
        }

        button.classList.remove('form__btn--loading');
        button.removeAttribute('disabled');
        response.textContent = JSON.stringify(res, null, 2);
        shorturl.textContent = res.short_url;
      })
      .catch((err) => {
        button.classList.remove('form__btn--loading');
        button.removeAttribute('disabled');
        response.textContent = err;
        shorturl.textContent = 'An error occurred';
      });
  });
}

document.addEventListener('DOMContentLoaded', handleFormSubmit);
