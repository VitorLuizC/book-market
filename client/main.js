if ('serviceWorker' in navigator) // Caso o browser dê suporte a service workers
  navigator.serviceWorker         // o registro e deixo ele lidar com o browser.
    .register('./service-worker.js')

document.querySelector('#button-add').addEventListener('click', addBook)

getBooks()

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
    name: document.querySelector('#owner-name').value || 'Anonymous',
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
    .then(() => {
      alert('Aê, parabéns!')
      getBooks()
    })
    .catch(error => alert('Se fodeu!'))

  event.preventDefault()
  event.stopPropagation()
}

/**
 * Obtém do servidor, ou do cache, os livros e os renderiza na tela.
 */
function getBooks() {
  fetch('/book', {
    method: 'get',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      // let cache = null

      // caches
      //   .open('book-market-cache')
      //   .then($cache => {
      //     cache = $cache
      //     return cache.match('./books.json')
      //       .then(matched => matched
      //         ? cache
      //           .delete('./books.json')
      //           .then(() => cache.put('./books.json', response))
      //         : cache.put('./books.json', response))
      //   })
      //   .catch(error => console.error(error))

      return response.json()
    })
    .then(books => renderBooks(books))
    .catch(error => console.error(error))
}

function renderBooks(books) {
  let table = document.querySelector('#books')

  table.innerHTML = '' // Limpa o conteúdo antigo

  books.forEach(book =>
    table.innerHTML += `
      <tr>
        <td>${book.book.name}</td>
        <td>${book.book.year}</td>
        <td>${book.book.author}</td>
        <td>${book.owner.name}</td>
        <td>${book.owner.email}</td>
        <td>${book.owner.phone}</td>
      </tr>
    `
  )
}
