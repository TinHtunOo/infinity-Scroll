let photoArray = [];
const count = 30;
const apiKey = "EiMgaiskQxfOMtFqYDbl5va57KJl9VVEgEmrQGHVmRs";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
const imgContainer = document.querySelector('.img-container');
const loader = document.querySelector('.loader')
let totalImage = 0;
let loadedImage = 0;
let ready = false;

function imageLoader() {
    loadedImage++;
    if (loadedImage == totalImage) {
        loader.hidden = true;
        ready = true;
    }
}

function setAttributes(element, attributes) {
    for ( let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhoto() {
    loadedImage = 0;
    totalImage = photoArray.length
    photoArray.forEach((photo) => {
        const img = document.createElement('img');
        setAttributes(img,{src: photo.urls.regular, alt: photo.alt_description, title: photo.alt_description } );
        const link = document.createElement('a');
        setAttributes(link,{href: photo.links.html, target: '_blank'});
        link.appendChild(img);
        imgContainer.appendChild(link);
        img.addEventListener('load', imageLoader)
    })
}

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        photoArray = data;
        console.log(photoArray);
        
        displayPhoto()
    } catch (error) {
        
    }
}

window.addEventListener('scroll', ()=>{
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 && ready){
        ready = false
        getPhotos()
    }
})

getPhotos()