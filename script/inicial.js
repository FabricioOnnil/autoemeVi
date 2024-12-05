document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById('introVideo');
    const imageSection = document.getElementById('imageSection');

    // Atrasar a reprodução do vídeo por 2 segundos
    setTimeout(() => {
        video.play().catch(error => {
            console.error("Erro ao iniciar o vídeo:", error);
        });
    }, 2000);

    // Quando o vídeo terminar, ocultar o vídeo e mostrar a imagem
    video.addEventListener('ended', () => {
        video.classList.add('hidden');
        imageSection.classList.remove('hidden');
    });
});
