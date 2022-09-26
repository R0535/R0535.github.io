var init = 0;
var jsonObj = {};

window.onload = () => {
  staticLoadImages();

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

  /*
  document.querySelector("#next").addEventListener("click", (e) => {
    if (init < jsonObj.length) {
      init++;
      console.log(init);
      renderSky(jsonObj, init);
    }
  });
  document.querySelector("#prev").addEventListener("click", (e) => {
    if (init > 0) {
      init--;
      console.log(init);
      renderSky(jsonObj, init);
    }
  });*/
};

function staticLoadImages() {
  fetch("images.json")
    .then((response) => response.json())
    .then((json) => {
      renderSky(json, (init = 0));
      jsonObj = json;
    });
}

function renderSky(places, index) {
  /***
   * Los eventos
   */

  let scene = document.querySelector("a-scene");
  let initial = places[index];
  console.log(initial);

  /*Delete all old elements*/
  let old_sky = document.querySelector("a-sky");
  if (old_sky != null) {
    old_sky.remove;
  }
  //delete text
  let old_text = document.querySelector("#modularText");

  if (old_text != null) {
    old_text.setAttribute("value", initial.desc);

  } else {
    //Text
    const entity = document.createElement("a-text");
    entity.id = "modularText";
    //entity.setAttribute("id", "modularText");
    entity.setAttribute("value", initial.desc);
    entity.setAttribute("width", "3");
    entity.setAttribute("position", "0 .25 -3");
    scene.appendChild(entity);
  }

  /*Create new elements*/
  //SKY
  const sky = document.createElement("a-sky");
  sky.setAttribute("src", `${initial.image_id}`);

  scene.appendChild(sky);
}
