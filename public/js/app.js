console.log('client side javascript loaded')

// fetch('http://localhost:3000/weather?address=mumbai').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log('Error - ' + data.error)
//         }
//         else{
//             console.log(data)
//         }
//     })
   
// })

const weatherform = document.querySelector('form')
const search = document.querySelector('input')

const messageone = document.querySelector('#msg1')
const messagetwo = document.querySelector('#msg2')
messageone.textContent = ''
messagetwo.textContent = ''

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    messageone.textContent = 'Loading.....'
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log('Error - ' + data.error)
                messageone.textContent = data.error
            }
            else{
                console.log(data)
                messageone.textContent = data.place
                messagetwo.textContent = data.forecase
            }
        })
    
    })
})