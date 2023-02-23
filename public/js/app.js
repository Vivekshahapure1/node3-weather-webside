const weatherForm=document.querySelector('form')
const search=document.querySelector('input')

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location=search.value
    // console.log('testing!')
    document.getElementById('gettemp').innerText="Loading..."
    fetch('http://localhost:3030/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            document.getElementById('gettemp').innerText=data.error
            document.getElementById('forecast').innerText=' '
            console.log(data.error)
        }
        else{
            document.getElementById('gettemp').innerText=data.location
            document.getElementById('forecast').innerText=data.forecastdata
        console.log(data.location)
        console.log(data.forecastdata)
        }
    })
})
})

// fetch('https://puzzle.mead.io/puzzle').then((response)=>{
//         response.json().then((data)=>{
//             console.log(data) 
//         })
// })

