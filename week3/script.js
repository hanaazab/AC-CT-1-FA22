let clrButton = document.getElementById("colorBtn")
console.log(clrButton)
const mnElement = document.getElementById("mainElem")
const txtButton = document.getElementById ("textBtn")
const imgButton = document.getElementById ("imageBtn")

const addSomeText = ()=>{
    let htmlElem = document.createElement("h3")
    let someText = "This is a string of test!"
    htmlElem.innerText = someText
    
    mnElement.appendChild(htmlElem)
}

const addAnImage = ()=>{
    let imgElem = document.createElement("img")
    imgElem.src = "SNice (1).svg"
    imgElem.alt = "smiley face"

    mnElement.appendChild(imgElem)
}

imgButton.addEventListener ("click", addAnImage)
txtButton.addEventListener ("click", addSomeText)
clrButton.addEventListener("click", ()=>{
    let red = Math.random()*255
    let green = Math.random()*255
    let blue = Math.random()*255
    console.log(red)
    console.log(green)
    console.log(blue)
    mnElement.style.backgroundColor = "rgb("+ red + "," + green + "," + blue + ")"
}
)
