document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, password })
            });

            const result = await response.json();

            if (response.ok) {
                // Redireciona para o dashboard
                window.location.href = '/vamoDashboard';
            } else {
                if (result && result.message) {
                    errorMessage.textContent = result.message;
                } else {
                    errorMessage.textContent = 'Erro desconhecido. Por favor, tente novamente.';
                }
                form.reset();
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            errorMessage.textContent = 'Algo deu errado. Por favor, tente novamente..';
        }
    });
});
