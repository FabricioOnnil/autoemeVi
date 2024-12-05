function goToSchedule() {
    // Redirecionar para a página agenda.html
    window.location.href = "/vamoAgenda";
     }
function goToDeliver() {
    // Redirecionar para a página entrega.html
    window.location.href = "/vamoEntrega";
     }
function goToDiary() {

    const popupContainer = document.createElement('div');
    popupContainer.className = 'popup-container';
    popupContainer.style.display = 'block';

    const popupContent = document.createElement('div');
    popupContent.className = 'popup-content';
    popupContent.innerHTML = `
        <span class="close-popup">&times;</span>
        <h2>Diário</h2>
        <div id="diaryContent">Carregando...</div>
    `;
    popupContainer.appendChild(popupContent);
    document.body.appendChild(popupContainer);

    popupContent.querySelector('.close-popup').addEventListener('click', function() {
        document.body.removeChild(popupContainer);
    });

    fetch('/vamoDiario')
    .then(response => response.text())
    .then(html => {
        document.getElementById('diaryContent').innerHTML = html;    
    })
    .catch(error => {
        console.error('Erro ao carregar o coneúdo do diário:', error);
        document.getElementById('diaryContent').innerHTML = '<p>Erro ao carregar conteúdo.</p>';
    });

    }     
function goToLocation() {
    // Redirecionar para a página mapa.html
    window.location.href = "/vamoCalendario";
     }

