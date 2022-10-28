const imgButton = document.getElementById ("imageBtn")

const addAnImage = ()=>{
    let imgElem = document.createElement("img")
    imgElem.src = "Para-Portrait-Final .png"
    imgElem.alt = "paraportrait"

    mnElement.appendChild(imgElem)
}

imgButton.addEventListener ("click", addAnImage)
