// esercizio 1

const image = document.querySelector ('.necklace')

image.addEventListener('click',() => {

if (image.style.border) {
    image.style.border = null;
}

else {
image.style.border = '2px solid red'
}

})


// esercizio 2

const input1 = document.querySelector ('#inputid1')
const input2 = document.querySelector ('#inputid2')
const input3 = document.querySelector ('#inputid3')
const primoBtn = document.querySelector ('.buttontwo')
const totale = document.querySelector('#totale')

primoBtn.addEventListener ('click', () => {
    const val1 = Number(input1.value)
    const val2 = Number(input2.value)
    const val3 = Number(input3.value)
    const quantity = val1 + val2 + val3

if (quantity > 10) {
    totale.innerHTML = 'Not so many!'
} else {
    totale.innerHTML = `You selected ${quantity} pieces`;
}

})

// esercizio 3

const select1 = document.querySelector ('#first')
const select2 = document.querySelector ('#second')
const select3 = document.querySelector ('#third')
const response = document.querySelector ('#response')
const passBtn = document.querySelector ('.button')

passBtn.addEventListener('click', () => {

const pass = select1.value + select2.value + select3.value
if (pass === '911') {
    response.innerHTML = 'Password 1 accepted'
} else if (pass === '714') {
    response.innerHTML = 'Password 2 accepted'
} else {
     response.innerHTML = 'Wrong password'
}
} )






