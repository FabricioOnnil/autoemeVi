function abrirPopup(popupId) {
    document.getElementById(popupId).style.display = 'flex';
}

function fecharPopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

document.getElementById('longTextForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const longText = document.getElementById('longText').value;
    const message = document.getElementById('message');

    if (longText.length > 0) {
        
        if (longText.length >= 10) {
            message.textContent = 'Texto enviado com sucesso!';
            message.style.color = 'green';
            
        } else {
            message.textContent = 'O texto deve ter pelo menos 10 caracteres.';
            message.style.color = 'red';
        }
    } else {
        message.textContent = 'O campo não pode estar vazio.';
        message.style.color = 'red';
    }
});


