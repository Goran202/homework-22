"use strict";

const dogApiURL = "https://api.thecatapi.com/v1/images/search"; // copy the correct endpoint URL from https://dog.ceo/dog-api/

const DOM = {
  resultsContainer: document.querySelector(".images"),
  searchBtn: document.querySelector(".buttoncontainer"),
  imageCount: document.querySelector("#image_count")
}

const resultsModel = {
  init: function (data) {
    this.breeds = data.breeds;
    this.id = data.id;
    this.url = data.url;
    this.width = data.width;
    this.height = data.height;
  }
};

function getImageCount() {
  //return document.querySelector('image_count').value;
  //console.log("kjgkrejgk");
  //DOM.imageCount.value = 44;
  //console.log(DOM.imageCount.value);
  return DOM.imageCount.value;
}

DOM.searchBtn.addEventListener("click", e => {
  //  let i;
  clearImages();
  let count = getImageCount();
  for (let i = 0; i < count; i++) {
    fetchData(dogApiURL)
      .then(res => {
        (res) ? processResponse(res) : processError();
      });
  }
});

function fetchData(url) {
  return fetch(url)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(res => {
      //console.log("RES: " + res);
      //console.log("RES.url: " + res[0].url);
      //    (res[0].url) ? processResponse(res[0].url) : processError();
      //  })
      return res[0].url;
    })


    .catch(function (error) {
      console.log('There has been a problem with your fetch operation: ', error.message);
      processError();
    });

};

function processResponse(response) {
  const dog = Object.create(resultsModel);
  dog.init(response);
  //  let i;
  //  for (i = 0; i < 5; i++) {
  //console.log("test");
  generateImg(response);
  //  }
};

function processError() {
  DOM.resultsContainer.innerHTML = `<h2>An error occured while fetching the data</h2>`
}

function clearImages() {
  DOM.resultsContainer.innerHTML = '';  
}

function generateImg(url) {
  DOM.resultsContainer.innerHTML += `<img src="${url}" alt="Random dog image">`
};