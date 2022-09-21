var init = 0;
var jsonObj = {};

window.onload = () => {
  staticLoadImages();

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
  });

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

  const sky = document.createElement("a-sky");
  sky.setAttribute("src", `${initial.image_id}`);

  scene.appendChild(sky);
}
