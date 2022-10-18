var init = 20;
var jsonObj = {};
var imagesLoading = "images.json"



window.onload = () => {
  staticLoadImages(imagesLoading);


  document.querySelector("#nextSphere").addEventListener("click", (e) => {
    if (init < jsonObj.length) {
      init++;
      console.log(init);
      renderSky(jsonObj, init);
    }
  });

  document.querySelector("#prevSphere").addEventListener("click", (e) => {
    if (init > 0) {
      init--;
      console.log(init);
      renderSky(jsonObj, init);
    }
  });
};

function staticLoadImages(json="") {
  fetch(json)
    .then((response) => response.json())
    .then((json) => {
      renderSky(json, (init = init));
      jsonObj = json;
    });
}

function renderSky(places, index) {

  let initial = places[index];

  setNavigatorsLineal(index, places.length)

  refreshSky(initial.img_src)//swap images
  replaceDescription(initial.desc)//swap text

}


//Decide si poner una bola inicial o final para navegar
function setNavigatorsLineal(index, limit){
  let enablePrev = true
  let enableNext = true
  if(index == 0){
    enablePrev = false
  }

  if(index == limit-1){
    enableNext = false
  }

    //Prev Sphere
  document.querySelector("#prevSphere").setAttribute("visible", enablePrev)
  document.querySelector("#prevText").setAttribute("visible", enablePrev)
  document.querySelector("#prevTextShadow").setAttribute("visible", enablePrev)
    //Next Sphere
  document.querySelector("#nextSphere").setAttribute("visible", enableNext)
  document.querySelector("#nextText").setAttribute("visible", enableNext)
  document.querySelector("#nextTextShadow").setAttribute("visible", enableNext)
}

//Elimina la esfera de textura que rodea
function refreshSky(image_src){


  let old_sky = document.querySelector("a-sky");
  if (old_sky != null) {//Only first time is null
    old_sky.setAttribute("src", image_src);
  }else{
    const sky = document.createElement("a-sky");
    sky.setAttribute("src", image_src);
  
    let scene = document.querySelector("a-scene");
    scene.appendChild(sky);
  }
}

//Remplaza el contenido de texto de texto de las decripciones
function replaceDescription(text){



  let old_text = document.querySelector("#modularText");

  if (old_text != null) {
    old_text.setAttribute("value", text);
  } else {
    const entity = document.createElement("a-text");
    entity.id = "modularText";
    entity.setAttribute("value", text);
    entity.setAttribute("width", "3");
    entity.setAttribute("position", "0 .25 -3");
    
    let scene = document.querySelector("a-scene");
    scene.appendChild(entity);
  }
}
