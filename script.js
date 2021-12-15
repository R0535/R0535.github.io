window.onload = () => {
  staticLoadPlaces();

  const button = document.querySelector('button[data-action="change"]');
  button.innerText = "📸";
};

function staticLoadPlaces() {
  fetch("places.json")
    .then((response) => response.json())
    .then((json) => renderPlaces(json));
}

function renderPlaces(places) {
  let scene = document.querySelector("a-scene");

  places.forEach((place) => {
    let latitude = place.location.lat;
    let longitude = place.location.lng;

    const entity = document.createElement("a-text");
    entity.setAttribute("look-at", "[gps-projected-camera]");
    entity.setAttribute("value", place.name);
    entity.setAttribute('gps-projected-entity-place', {
        latitude: latitude,
        longitude: longitude
    });
    entity.setAttribute("scale", "50 50 50");
    entity.setAttribute("position", "0 10 0");
    scene.appendChild(entity);

    const model = document.createElement("a-entity");
    model.setAttribute(
      "gps-projected-entity-place",
      `latitude: ${latitude}; longitude: ${longitude};`
    );
    model.setAttribute("gltf-model", "#locator");
    model.setAttribute("animation-mixer", "");
    model.setAttribute("scale", "10 10 10");

    model.addEventListener("loaded", () => {
      console.log("loaded " + place.name);
      window.dispatchEvent(new CustomEvent("gps-entity-place-loaded"));
    });

    scene.appendChild(model);
  });
}
