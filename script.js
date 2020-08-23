const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArrays = [];

// Unsplash API
const count = 30;
const apiKey = 'FlfzKo1uEkXxvQxveaFhC3P8Sh721oujqBnUG13XA7M';

const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    loader.hidden = true;
    ready = true;
  }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements For Link & Photos, Add to DOM
function displayPhoto() {
  totalImages += photoArrays.length;
  photoArrays.forEach((photo) => {
    // Create <a> to link to Unsplash
    const link = document.createElement('a');
    setAttributes(link, {
      'href': photo.links.html,
      'target': '_blank'
    })
    // Create <img/> for image
    const img = document.createElement('img');
    setAttributes(img, {
      'src': photo.urls.regular,
      'alt': photo.description,
      'title': photo.description
    });
    // Add Event Listener to check if each image is finished loading
    img.addEventListener('load', imageLoaded)

    // Put <img/> inside <a>, then put both inside imageContainer Element
    link.appendChild(img);
    imageContainer.appendChild(link);
  });
}

// Get photo from Unsplash API
async function getPhotos() {
  loader.hidden = false;
  try {
    const response = await fetch(apiUrl);
    photoArrays = await response.json();
    displayPhoto();
  } catch (error) {

  }
}

// Check to see if scrolling is near bottom of page, Load more photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
})

// On Load
getPhotos();