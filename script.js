const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArrays = [];
let initialLoad = true;

// Unsplash API
let count = 10;
let query = 'animal and nature';
let orientation = '';
const apiKey = 'FlfzKo1uEkXxvQxveaFhC3P8Sh721oujqBnUG13XA7M';
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&query=${query}&orientation=${orientation}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    // loader.hidden = true;
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
    if (initialLoad) {
      initialLoad = false;
      count = 30;
      apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
    }
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