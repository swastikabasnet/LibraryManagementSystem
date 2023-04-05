const form = document.querySelector('#form')

if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = {}
    formData.forEach((value, key) => {
      data[key] = value
    })
    console.log(data);
    const { id, ...rest } = data
    try {
      const response = await fetch(`http://localhost:3000/books/${data.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rest),
      })
      alert('Books updated')
    } catch (error) {
      alert(error.message)
    }
  })
}