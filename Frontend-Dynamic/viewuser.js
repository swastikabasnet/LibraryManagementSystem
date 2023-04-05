async function main() {
    const response = await fetch('http://localhost:3000/users/')
    const user = await response.json()
    document.querySelector('#view-user').innerHTML = user.map(
        i => `
      <tr class="active-row">
          <td>${i.id}</td>
          <td>${i.Name}</td>
          <td>${i.email}</td>
          <td>${i.Phonenumber}</td>
          
      </tr>`
      )
      .join('')
  }
  main()