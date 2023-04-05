async function main() {
    document
      .querySelector('#del-traffic-form')
      .addEventListener('submit', async function (event) {
        event.preventDefault()
        const ID = event.target.querySelector('#id').value
        await fetch('http://localhost:3000/books/' + ID, {
          method: 'delete',
        })
      })
  }
  main()
  