async function main() {
    const response = await fetch('http://localhost:3000/books/')
    const books = await response.json()
    document.querySelector('#view-books').innerHTML = books.map(
        i => `
      <tr class="active-row">
          <td>${i.id}</td>
          <td>${i.authorName}</td>
          <td>${i.bookTitle}</td>
          <td>${i.quantity}</td>
          <td>${i.category}</td>
          <td>${i.bookDesc}</td>
          <td>${i.bookpublished}</td>
      </tr>`
      )
      .join('')
  }
  main()