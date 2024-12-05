let map;
let directionsService;
let directionsRenderer;
let marker; // Para armazenar o marcador de destino

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(-20.758579817596832, -41.534791575265274), // Localização inicial
        zoom: 15
    });
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    getUserLocation(); // Obter localização do usuário e marcar no mapa

    // Adicionar listener para clique no mapa que permite a seleção do destino clicando no mapa
    map.addListener('click', function(event) {
        placeMarker(event.latLng);
    });

    document.getElementById("routeForm").addEventListener("submit", calculateRoute);
}


document.addEventListener('DOMContentLoaded', function() {
    initMap();
    const calculateRouteBtn = document.getElementById("calculateRouteBtn");

    // Código para manipulação do modal e cálculo de rota
    const openModalBtn = document.getElementById("openModalBtn");
    const modal = document.getElementById("myModal");
    const closeModal = document.getElementsByClassName("close")[0];

    openModalBtn.onclick = function() {
        modal.style.display = "block";
    }

    closeModal.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    calculateRouteBtn.onclick = function() {
        calculateRoute(event);
    }
});


// Função para posicionar marcador no mapa
function placeMarker(location) {
    if (marker) {
        marker.setPosition(location);
    } else {
        marker = new google.maps.Marker({
            position: location,
            map: map
        });
    }
    document.getElementById('destination').value = `${location.lat()},${location.lng()}`;
}

// Função para calcular e mostrar a rota
function calculateRoute(event) {
    event.preventDefault();
    const origin = document.getElementById("origin").value;
    const destination = document.getElementById("destination").value;

    const request = {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(response);
            document.getElementById("myModal").style.display = "none"; // Fechar o modal após calcular a rota
        } else {
            window.alert("Não foi possível calcular a rota. Status: " + status);
        }
    });
}

// Função para obter a localização do usuário
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map.setCenter(pos);
            new google.maps.Marker({
                position: pos,
                map: map,
                title: "Você está aqui!"
            });
        }, function() {
            alert('Erro ao obter localização');
        });
    } else {
        window.alert("Geolocalização não suportada pelo seu navegador.");
    }
}

// Código para manipulação do modal
const openModalBtn = document.getElementById("openModalBtn");
const modal = document.getElementById("myModal");
const closeModal = document.getElementsByClassName("close")[0];

openModalBtn.onclick = function() {
    modal.style.display = "block";
}

closeModal.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', initMap);
