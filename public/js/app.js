fetch('https://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})

// dom selection
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.getElementById('message-1')
const msgTwo = document.getElementById('message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    msgOne.textContent = 'Loading...'
    msgTwo.textContent = ''
    fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        
        if (data.error) {
        msgOne.textContent = 'Error: ' + data.error
          
          
        } else {
            msgOne.textContent = `Location: ${data.location}`
            msgTwo.textContent = data.forecast

        }

    })
})

})