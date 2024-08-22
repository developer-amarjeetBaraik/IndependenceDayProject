const checkBoxes = document.querySelectorAll('.checkbox')
const contentBox = document.getElementById('content')
const btn = document.getElementById('btn')
const deshbhaktBox = document.getElementById('deshbhakt')
const certificateBtn = document.getElementById('certificateBtn')
const nameInput = document.getElementById('nameInput')
const certificate = document.getElementById('certificate')
const certificateImg = document.getElementById('certificateImg')
const loader = document.getElementById('loader')

let trueCount = 0;
let topNumber
let leftNumber
checkBoxes.forEach(e=>{
    e.addEventListener('input',()=>{
        if (e.checked === true) {
            trueCount++
            (trueCount === 8)?btn.style.position = 'static':''
        }
        else{
            trueCount--
        }
    })
})

btn.style.position = 'relative'

btn.addEventListener('mouseover', ()=>{
    if (trueCount != 8) {
        btn.style.position = 'absolute'
        topNumber = Math.floor(Math.random()*600)
        leftNumber = Math.floor(Math.random()*1400)
        console.log(topNumber,leftNumber)
        if (trueCount < 8) {
            btn.style.setProperty('--top', `${topNumber}px`)
            btn.style.setProperty('--left', `${leftNumber}px`)
        }
        else{
            console.log('you are a deshbhakt')
        }  
    }
})
btn.addEventListener('click', ()=>{
    deshbhaktBox.style.visibility = 'visible'
    contentBox.style.display = 'none'
})


certificateBtn.addEventListener('click', ()=>{
    console.log(nameInput.value)
    console.log(nameInput.value.length)
    console.log(trueCount)
    if(trueCount < 8){
        alert('Something went wrong')
    }
    else if(trueCount === 8 && nameInput.value.length > 3){
        console.log('fine')
        console.log(nameInput.value)
        let username = nameInput.value
        loader.style.display = 'block'
        fetch('/generatePDF',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username : username })
        }).then(response => response.json())
        .then(data=>{
            console.log(data)
            loader.style.display = 'none'
            deshbhaktBox.style.display = 'none'
            certificate.style.display = 'flex'
            let pdfPath = data.base64string.slice(0,-1)
            certificateImg.src = `data:application/pdf;base64,${data.base64string}`
        })
    }
    else{
        alert("Enter valid name")
    }
})