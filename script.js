window.onload = () => {
    let places = staticLoadPlaces();
    renderPlaces(places);

    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '📸';
};

function staticLoadPlaces() {
   return [
       {
           name: 'Casa_Pepe',
           location: {
               lat: 19.710703,
               lng: -101.179357 // Casa Pepe,
           }
       },
   ];
}

function renderPlaces(places) {
   let scene = document.querySelector('a-scene');

   places.forEach((place) => {
       let latitude = place.location.lat;
       let longitude = place.location.lng;

       let model = document.createElement('a-entity');
       model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
       model.setAttribute('gltf-model', 'url(assets/pyramid/untitled.gltf)');
       model.setAttribute('animation-mixer', '');
       model.setAttribute('scale', '1 1 1');

       model.addEventListener('loaded', () => {
           console.log('loaded');
           window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
       });

       scene.appendChild(model);
   });
}