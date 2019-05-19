"use strict";

const dogApiURL = "https://api.thecatapi.com/v1/images/search"; // copy the correct endpoint URL from https://dog.ceo/dog-api/

const DOM = {
  resultsContainer: document.querySelector(".images"),
  searchBtn: document.querySelector(".buttoncontainer")
}

const resultsModel = {
  init: function (data) {
    this.breeds = data.breeds;
    this.id = data.id;
    this.width = data.width;
    this.height = data.height;
  }
};

DOM.searchBtn.addEventListener("click", e => {
    console.log("dfhgdshsd");
  fetchData(dogApiURL)
//can not make this .then part work here. It is coppied in fetch function below  
/*
  .then(res => {
      console.log("TEST");
      res.status && res.status === "success" ? processResponse(res) : processError();
    }
);
*/
});

function fetchData(url) {
  fetch(url).then(function(response) {
  if(response.ok) {
    console.log("RESponse: " + response);
    //console.log(response.json());
    
    return response.json();
  }
  throw new Error('Network response was not ok.');
  })
  /*.then(res => {
      //console.log(res[0].url);
      return res[0].url;
  })*/
  .then(res => {
      console.log(res);
      //console.log("RES: " + res);
      //console.log("RES2: " + res[0].url);
      //res[0].url
        //res.status && res.status === "success" ? processResponse(res) : processError();
        processResponse(res[0].url);
      }
      )
  .catch(function(error) {
    console.log('There has been a problem with your fetch operation: ', error.message);
    processError();
  });

};

function processResponse(response) {
  const dog = Object.create(resultsModel);
  dog.init(response);
  generateImg(response);
};

function processError() {
  DOM.resultsContainer.innerHTML = `<h2>An error occured while fetching the data</h2>`
}

function generateImg(url) {
  DOM.resultsContainer.innerHTML = `<img src="${url}" alt="Random dog image">`
};