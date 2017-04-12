if (!'serviceWorker' in navigator) // Caso o browser dê suporte a service workers
  navigator.serviceWorker         // o registro e deixo ele lidar com o browser.
    .register('./service-worker.js')

document.querySelector('#button-add').addEventListener('click', addBook)

/**
 * @param {Event} event
 */
function addBook(event) {
  const book = {
    name: document.querySelector('#book-name').value || '',
    year: +(document.querySelector('#book-year').value) || 0,
    author: document.querySelector('#book-author').value || ''
  }

  const owner = {
    name: document.querySelector('#owner-name').value || '',
    email: document.querySelector('#owner-email').value || '',
    phone: document.querySelector('#owner-phone').value || ''
  }

  fetch('/book', {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ book, owner })
  })
    .then(() => alert('Aê, parabéns!'))
    .catch(error => alert('Se fodeu!'))

  event.preventDefault()
  event.stopPropagation()
}
