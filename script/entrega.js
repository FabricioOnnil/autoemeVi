document.addEventListener("DOMContentLoaded", function() {
    const closePopupButton = document.querySelector('.close-popupDelivery');
    const scheduleForm = document.getElementById('scheduleFormDelivery');
    const carSelect = document.getElementById('carSelect');
    const appointmentsBody = document.getElementById("appointmentsBody");

    function openPopup() {
        const overlay = document.getElementById('overlaySchedule');
        const popupContainer = document.getElementById('calendarPopupDelivery');

        if (overlay && popupContainer) {
            overlay.style.display = 'block';
            popupContainer.style.display = 'block';
        }
    }
    
    function closePopup() {
        const overlay = document.getElementById('overlaySchedule');
        const popupContainer = document.getElementById('calendarPopupDelivery');

        if (overlay && popupContainer) {
            overlay.style.display = 'none';
            popupContainer.style.display = 'none';
        }
    }

    function formatDateToBrazilian(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    function showPopupWithFormData(formData) {

        const nome = document.getElementById("nome");
        const deliverEndDate = document.getElementById("deliverEndDate");
        //const deliveryEndTime = document.getElementById("deliveryEndTime");
        const officeEnd = document.getElementById("officeEnd");
        const km_final = document.getElementById("km_final");
        const carSelect = document.getElementById("carSelect");
        const i_agenda_agendamento = document.getElementById("i_agenda_agendamento");

        if (i_agenda_agendamento) {
            i_agenda_agendamento.value = formData.i_agen_agendamento;
        } else {
            console.error("Campo i_agenda_agendamento não encontrado.");
        }

        if(nome && deliverEndDate && officeEnd && km_final && carSelect && i_agenda_agendamento) {

            nome.value = formData.s_agenda_nameSchedule;
            deliverEndDate.value = formData.d_agenda_deliverEndDate;
            officeEnd.value = formData.s_entrega_destinySelect || "";
            km_final.value = formData.i_agenda_kmInitial || "";
            carSelect.value = formData.s_agenda_scheduleCar;
            i_agenda_agendamento.value = formData.i_entrega_agendamento;
            openPopup();
        } else {
            console.error("um ou mais elementos do formulário de entrega não foram encontrados.");
        }
    }

    function loadAgendamentos() {
        
        fetch('/agendamento')
            .then(response => response.json())
            .then(data => {
                appointmentsBody.innerHTML = ''; 

                data.forEach((agendamento, index) => {
                    const row = appointmentsBody.insertRow();

                    row.insertCell(0).textContent = agendamento.s_agenda_nameSchedule;
                    row.insertCell(1).textContent = formatDateToBrazilian(agendamento.d_agenda_startDate);
                    row.insertCell(2).textContent = formatDateToBrazilian(agendamento.d_agenda_deliverEndDate);
                    row.insertCell(3).textContent = agendamento.s_agenda_originSelect;
                    row.insertCell(4).textContent = agendamento.i_agenda_kmInitial;
                    row.insertCell(5).textContent = agendamento.s_agenda_scheduleCar;

                    const actionCell = row.insertCell(6);
                    actionCell.classList.add("acao");
                    
                    const entregaImage = document.createElement("img");
                    entregaImage.src = "/Imagens/registrarbutton.png"; 
                    entregaImage.alt = "Entregar";
                    entregaImage.style.cursor = "pointer"; 
                    entregaImage.addEventListener("click", () => showPopupWithFormData(agendamento));
                    actionCell.appendChild(entregaImage);
                });
            })
            .catch(error => {
                console.error('Erro ao carregar agendamentos:', error);
            });
    }

    if (closePopupButton) {
        closePopupButton.addEventListener('click', closePopup);
    }
    
    if (scheduleForm) {
        scheduleForm.addEventListener("submit", function(event) {
            event.preventDefault();
            

            const entregaData = {
                s_agenda_nameSchedule: document.getElementById("nome").value,
                d_agenda_deliverEndDate: document.getElementById("deliverEndDate").value,
                d_agenda_deliveryEndTime: document.getElementById("deliveryEndTime").value,
                s_agenda_destinySelect: document.getElementById("officeEnd").value,
                i_agenda_kmFinal: document.getElementById("km_final").value,
                s_agenda_scheduleCar: document.getElementById("carSelect").value,
                d_agenda_createdAt: new Date(),
                i_agenda_agendamento: document.getElementById("i_agenda_agendamento").value,

            };
            alert("Entrega confirmada!");
            console.log("Dados de entrega:", entregaData);
            
            fetch('/entrega', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(entregaData),
            })
            .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        alert("Entrega confirmada!");
                        closePopup();
                        loadAgendamentos();
                    } else {
                        alert("Erro ao confirmar entrega: " + result.message);
                        console.error("Erro do servidor:", result.error);
                    }
                })
                .catch(error => {
                    console.error('Erro ao enviar dados da entrega:', error);
                    alert("Erro ao confirmar entrega.");
                });
        });
    }

            loadAgendamentos();
    


function loadCarros() {
    fetch('/carro')
        .then(response => response.json())
        .then(carros => {
            carSelect.innerHTML = '';
            carros.forEach(carro => {
                const option = document.createElement("option");
                option.value = carro.i_carro_idcar;
                option.textContent = `${carro.s_carro_model} - Placa: ${carro.s_carro_plate}`;;
                carSelect.appendChild(option);
            
            });
        })
        .catch(error => console.error('Erro ao carregar carros:', error.message));
}

loadCarros();
});