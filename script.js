const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photoArrays = [];

// Unsplash API
const count = 10;
const apiKey = 'FlfzKo1uEkXxvQxveaFhC3P8Sh721oujqBnUG13XA7M';

const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Create Elements For Link & Photos, Add to DOM
function displayPhoto() {
  photoArrays.forEach((photo) => {
    // Create <a> to link to Unsplash
    const link = document.createElement('a');
    link.setAttribute('href', photo.links.html);
    link.setAttribute('target', '_blank');
    // Create <img/> for image
    const img = document.createElement('img');
    img.setAttribute('src', photo.urls.regular);
    img.setAttribute('alt', photo.description);
    img.setAttribute('title', photo.description);
    // Put <img/> inside <a>, then put both inside imageContainer Element
    link.appendChild(img);
    imageContainer.appendChild(link);
  });
}

// Get photo from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photoArrays = await response.json();
    console.log("getPhotos -> photoArrays", photoArrays)
    displayPhoto();
  } catch (error) {

  }
}

// On Load
getPhotos();