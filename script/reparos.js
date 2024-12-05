document.addEventListener('DOMContentLoaded', () => {
   const purchaseForm = document.getElementById('purchaseForm');

   purchaseForm.addEventListener('submit', async function (event) {
        event.preventDefaut();
        console.log("Formulário submetido");

        const descricao = document.getElementById('descricao').value;
        const valor = document.getElementById('valor').value;
        const data = document.getElementById('data').value;
        const imagem = document.getElementById('imagem').files[0];

        if(!descricao || !valor || !data || !imagem) {
            alert("Por favor, preencha todos os campos e selecione uma imagem.");
            return;
        }

        const formData = new FormData();
        formData.append('descricao', descricao);
        formData.append('valor', valor);
        formData.append('data', data);
        formData.append('imagem', imagem);


        try {
            const response = await fetch('/reparo', {
                method: 'POST',
                body: formData
            });
        const contentType = response.headers.get("content-type");

        if (response.ok) {
            if(contentType && contentType.includes("application/json")) {
                const data = await response.json();
                console.log("Resposda do servidor (JSON):", data);
                alert("Reparo registrado com sucesso!");
            } else {
                const text = await response.text();
                console.log("Resposta do servidor (Texto):", text);
                alert("Reparo registrado com sucesso!");
            }

            purchaseForm.reset();

            window.location.href = "/vamoEntrega";

            } else {
                throw new Error ('Erro ao registrar reparo.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao registrar o reparo. Por favor, tente novamente.');
        }
    });
});

