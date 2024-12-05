document.addEventListener('DOMContentLoaded', () => {

    const carSelect = document.getElementById('carSelect');

    fetch('/carro') 
        .then(response => response.json())
        .then(data => {
            data.forEach(carro => {
                const option = document.createElement('option');
                option.value = carro.i_carro_idcar;  
                option.textContent = `${carro.s_carro_model} - ${carro.s_carro_plate}`;  
                carSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar os carros:', error);
        });
    const purchaseForm = document.getElementById('purchaseForm');

    purchaseForm.addEventListener('submit', async function (event) {
        event.preventDefault(); 
        console.log("Formulário submetido");

        const descricao = document.getElementById('descricao').value;
        const carro = document.getElementById('carSelect').value;
        const valor = document.getElementById('valor').value;
        const pLitro = document.getElementById('pLitro').value;
        const data = document.getElementById('data').value;
        const imagem = document.getElementById('imagem').files[0];

        console.log({ descricao, carro, valor, pLitro, data, imagem });


        if (!descricao || !carro || !valor || !pLitro || !data || !imagem) {
            alert("Por favor, preencha todos os campos e selecione uma imagem.");
            return;
        }

     
        const formData = new FormData();
        formData.append('descricao', descricao);
        formData.append('carro', carro);
        formData.append('valor', valor);
        formData.append('pLitro', pLitro);
        formData.append('data', data);
        formData.append('imagem', imagem);
        
        try {
            const response = await fetch('/abastecimento', {
                method: 'POST',
                body: formData
            });
            const contentType = response.headers.get("Content-Type");
            
            if (!response.ok) {
                const errorData = await response.text();
                console.error('Erro detalhado:', errorData);
                throw new Error('Erro ao registrar o abastecimento: ' + errorData);
            }

            if (response.ok) {
                if(contentType && contentType.includes("application/json")) {
                const data = await response.json();
                console.log("Resposta do servidor:", data);
                alert("Abastecimento registrado com sucesso!");
                } else {
                    const text = await response.text();
                    console.log("Resposta do servidor (JSON):", text);
                    alert("Abastecimento registrado com sucesso!");
                }

                purchaseForm.reset();
                } else {
                    throw new Error('Erro ao registrar o abastecimento.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao registrar o abastecimento. Por favor, tente novamente.');
        }
    });
});

