const checkBoxes = document.querySelectorAll('.checkbox')
const btn = document.getElementById('btn')

let trueCount = 0;
let topNumber
let leftNumber
checkBoxes.forEach(e=>{
    e.addEventListener('input',()=>{
        
        if (e.checked === true) {
            trueCount++
            console.log('added'),
            (trueCount === 8)?btn.style.position = 'static':console.log('not entered')
        }
        else{
            trueCount--
            console.log('dedected')
        }
        console.log(trueCount)
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
btn.addEventListener('mouseout', ()=>{
    console.log('mouse out')
})