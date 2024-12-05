function redirecionar(url) {
    window.location.href = url;
}

document.addEventListener('DOMContentLoaded', () => {
    const contratoForm = document.querySelector('#carPopup form');
    const custoFixoForm = document.querySelector('#custPopup form');
    const infoCarForm = document.querySelector('#infoPopup form');
    const acessoForm = document.querySelector('#acessoPopup form');


//----------------------------------------------------------Contrato--------------------------------------------------
contratoForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        console.log("Form submitted contract");

        const dataInicio = document.getElementById("dataInicio").value;
        const dataTermino = document.getElementById("dataTermino").value;
        const usuarioResponsavel = document.getElementById("usuarioResponsavel").value;
        const codigoReserva = document.getElementById("codigoReserva").value;
        const codigoAluguel = document.getElementById("codigoAluguel").value;
        const tarifaContrato = document.getElementById("tarifaContrato").value;
        const kmExcedente = document.getElementById("kmExcedente").value;
        const franquia = document.getElementById("distanciaDia").value;

        const formData = { dataInicio, dataTermino, usuarioResponsavel, codigoReserva, codigoAluguel, tarifaContrato, kmExcedente, franquia };

        try {
            const response = await fetch('/contratoCarro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const formattedDate = formatDateToBrazilian(dataInicio, dataTermino);
                const reportBody = document.getElementById("reportBody");
                const newRow = reportBody.insertRow();
                newRow.insertCell(0).textContent = dataInicio;
                newRow.insertCell(1).textContent = dataTermino;
                newRow.insertCell(2).textContent = usuarioResponsavel;
                newRow.insertCell(3).textContent = codigoReserva;
                newRow.insertCell(4).textContent = codigoAluguel;
                newRow.insertCell(5).textContent = tarifaContrato;
                newRow.insertCell(6).textContent = kmExcedente;
                newRow.insertCell(7).textContent = franquia;

                window.location.href = '/vamoGerencia';

            } else {
                console.error("Falha ao salvar o contrato do formulário:", response.statusText);
            }

            const result = await response.json();
            alert(result.message);
            contratoForm.reset();
            closePopup('carPopup');

        } catch (error) {
            console.error("Error storing form data:", error);
            alert(`Falha ao cadastrar contrato de carro: ${error.message}`);
        }
    });


//--------------------------------------Custo Carro----------------------------------------------------------------
custoFixoForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        console.log("Form submitted cost");

        const limiteReparos = document.getElementById("damageLimit").value;
        const danosTerceiros = document.getElementById("otherDamage").value;
        const perdaTotal = document.getElementById("totalLoss").value;
        const inicioSeguro = document.getElementById("insurancePeriod").value;
        const terminoSeguro = document.getElementById("endOfInsurance").value;
        const kmAluguel = document.getElementById("initialKm").value;

        const formData = { limiteReparos, danosTerceiros, perdaTotal, inicioSeguro, terminoSeguro, kmAluguel };

        try {
            const response = await fetch('/custoFixo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Erro ao cadastrar custo fixo: ${errorMessage}`);  12593253770
            }

            const result = await response.json();
            alert(result.message);
            custoFixoForm.reset();
            closePopup('custPopup');

        } catch (error) {
            console.error("Erro:", error);
            alert(`Falha ao cadastrar custo fixo: ${error.message}`);
        }
    });

//------------------------------------------------Info Car --------------------------------------------------------------------
infoCarForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        console.log("Form submitted info");

        const modelo = document.getElementById("nomeCarro").value;
        const placa = document.getElementById("placa").value;
        const ano = document.getElementById("anoFabricacao").value;
        const capacidade = document.getElementById("capacidadeTanque").value;
        const consumo = document.getElementById("mediaConsumo").value;

        const formData = { modelo, placa, ano, capacidade, consumo };

        try {
            const response = await fetch('/carro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Erro ao cadastrar informações de carro: ${errorMessage}`);
            }

            const result = await response.json();
            alert(result.message);
            infoCarForm.reset();
            closePopup('infoPopup');

        } catch (error) {
            console.error("Erro:", error);
            alert(`Falha ao cadastrar informações de carro: ${error.message}`);
        }
    });

//-----------------------------------------------------------Acesso-----------------------------------------------------------
acessoForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(acessoForm);

        try {
            const response = await fetch('/acesso', {
                method: 'POST',
                body: formData
            });

            const contentType = response.headers.get('content-type');
            if (!response.ok) {
                if (contentType && contentType.indexOf('application/json') !== -1) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Erro ao salvar o acesso');
                } else {
                    throw new Error('Erro inesperado ao salvar o acesso');
                }
            }

            const result = await response.json();
            alert(result.message);
            acessoForm.reset();
            closePopup('acessoPopup');

        } catch (error) {
            console.error('Erro:', error);
            alert(`Falha ao salvar o acesso: ${error.message}`);
        }
    });


   
    function populateTable(values) {
        const tableBody = document.getElementById("globalValuesPopup");
        tableBody.innerHTML = "";
        values.forEach(value => {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = value.period;
            row.insertCell(1).textContent = value.days;
            row.insertCell(2).textContent = value.km;
            row.insertCell(3).textContent = value.fuelCost;
            row.insertCell(4).textContent = value.fuelAcquired;
            row.insertCell(5).textContent = value.fuelUsed;
            row.insertCell(6).textContent = value.repairCost;
            row.insertCell(7).textContent = value.foodCost;
            row.insertCell(8).textContent = value.hoursScheduled;
            row.insertCell(9).textContent = value.hoursNotScheduled;
        });
    }
    populateTable(globalValues);
});


/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */



document.addEventListener('DOMContentLoaded', () => {
    const forms = {
        contrato: document.querySelector('#carPopup form'),
        custoFixo: document.querySelector('#custPopup form'),
        infoCar: document.querySelector('#infoPopup form'),
        acesso: document.querySelector('#acessoPopup form')
    };

    const handleSubmit = async (formId, endpoint) => {
        const formData = new FormData(forms[formId]);
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }

            const result = await response.json();
            alert(result.message);
            forms[formId].reset();
            closePopup(`${formId}Popup`);

            if (formId === 'contrato') {
                // Atualiza a tabela se o formulário de contrato foi enviado
                const reportBody = document.getElementById("reportBody");
                const newRow = reportBody.insertRow();
                const dataInicio = new Date(formData.get("dataInicio")).toLocaleDateString("pt-BR");
                const dataTermino = new Date(formData.get("dataTermino")).toLocaleDateString("pt-BR");
                const fields = ["dataInicio", "dataTermino", "usuarioResponsavel", "codigoReserva", "codigoAluguel", "tarifaContrato", "kmExcedente", "distanciaDia"];
                fields.forEach(field => {
                    newRow.insertCell().textContent = formData.get(field);
                });
                // Redirecionar após o sucesso
                window.location.href = '/vamoGerencia';
            }

        } catch (error) {
            console.error("Erro:", error);
            alert(`Falha ao processar: ${error.message}`);
        }
    };

    forms.contrato.addEventListener('submit', (event) => {
        event.preventDefault();
        handleSubmit('contrato', '/contratoCarro');
    });

    forms.custoFixo.addEventListener('submit', (event) => {
        event.preventDefault();
        handleSubmit('custoFixo', '/custoFixo');
    });

    forms.infoCar.addEventListener('submit', (event) => {
        event.preventDefault();
        handleSubmit('infoCar', '/carro');
    });

    forms.acesso.addEventListener('submit', (event) => {
        event.preventDefault();
        handleSubmit('acesso', '/login');
    });

    // Dados de exemplo para preencher a tabela de valores globais
    const globalValues = [
        { period: 'Total', days: 0, km: 10000, fuelCost: 5000, fuelAcquired: 2000, fuelUsed: 1800, repairCost: 2000, foodCost: 1000, hoursScheduled: 500, hoursNotScheduled: 300 },
        { period: 'Ano', days: 365, km: 2000, fuelCost: 1000, fuelAcquired: 400, fuelUsed: 360, repairCost: 400, foodCost: 200, hoursScheduled: 100, hoursNotScheduled: 60 },
        { period: 'Mês', days: 30, km: 500, fuelCost: 250, fuelAcquired: 100, fuelUsed: 90, repairCost: 100, foodCost: 50, hoursScheduled: 25, hoursNotScheduled: 15 },
        { period: '15 dias', days: 15, km: 200, fuelCost: 100, fuelAcquired: 40, fuelUsed: 36, repairCost: 40, foodCost: 20, hoursScheduled: 10, hoursNotScheduled: 6 },
    ];
    populateTable(globalValues);

    function populateTable(values) {
        const tableBody = document.getElementById("globalValuesPopup");
        tableBody.innerHTML = "";
        values.forEach(value => {
            const row = tableBody.insertRow();
            Object.values(value).forEach(cellValue => {
                row.insertCell().textContent = cellValue;
            });
        });
    }

    populateTable(globalValues);
});

function openPopup() {
    const popup = document.querySelector('#popup'); 
    popup.style.display = 'block'; // Mostra o popup
}


// Fecha o popup se o usuário clicar fora dele
window.onclick = function(event) {
    const popups = document.getElementsByClassName('popup');
    for (let i = 0; i < popups.length; i++) {
        if (event.target === popups[i]) {
            popups[i].style.display = 'none';
        }
    }
;}

function openPopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = 'block'; 
        popup.classList.add('show'); F
    } else {
        console.error(`Popup com ID ${popupId} não encontrado.`);
    }
}

// Função para fechar o popup
function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = 'none'; // Esconde o popup
        popup.classList.remove('show'); // Remove a classe de visibilidade, se necessário
    } else {
        console.error(`Popup com ID ${popupId} não encontrado.`);
    }
}