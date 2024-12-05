document.addEventListener("DOMContentLoaded", async function() {
    const calendarPopupSchedule = document.getElementById('calendarPopupSchedule');
    const closePopupScheduleButton = document.querySelector('.close-popupSchedule');
    const overlaySchedule = document.getElementById('overlaySchedule');
    const showCalendarButton = document.getElementById('showCalendarSchedule');  
    const showTablePopup = document.getElementById('showTablePopup');       
    const scheduleForm = document.getElementById('scheduleForm');
    const schedulesBody = document.getElementById('schedulesBody');
    const tablePopup = document.getElementById('tablePopup');
    const overlayTable = document.getElementById('overlayTable');

    async function loadCarros() {
        try {
            const response = await fetch('/carro');
            const contentType = response.headers.get('content-type');

            if (response.ok) {
                if (contentType && contentType.includes('application/json')) {
                    const carros = await response.json();
                    console.log("Carros carregados com sucesso:", carros);

                    const carSelect = document.getElementById('carSelect');
                    carSelect.innerHTML = '<option value="">-Selecione um Carro-</option>';

                    carros.forEach(carro => {
                        const option = document.createElement('option');
                        option.value = carro.i_carro_idcar;
                        option.text = `${carro.i_carro_idcar} - ${carro.s_carro_model} - ${carro.s_carro_plate}`;
                        carSelect.appendChild(option);
                    });
                    
                } else {
                    console.error('Resposta inesperada, não é JSON:', await response.text());
                    alert('Erro ao carregar carros. O servidor retornou uma resposta inesperada.');
                }
            } else {
                console.error('Erro na resposta:', await response.text());
                alert('Erro ao carregar carros. Verifique o servidor.');
            }
        } catch (error) {
            console.error('Erro ao carregar carros:', error);
            alert('Erro ao carregar carros. Por favor, tente novamente.');
        }
         
    }

    loadCarros();

    // Função para fechar popups
    function closePopup(popup, overlay) {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    }

    overlayTable.addEventListener('click', () => closePopup(tablePopup, overlayTable));
    overlaySchedule.addEventListener('click', () => closePopup(calendarPopupSchedule, overlaySchedule));

    const closeTableButton = tablePopup ? tablePopup.querySelector('.close-popup') : null;
    if (closeTableButton) {
        closeTableButton.addEventListener('click', () => closePopup(tablePopup, overlayTable));
    }

    if (showCalendarButton) {
        showCalendarButton.addEventListener('click', function() {
            overlaySchedule.style.display = 'block';
            calendarPopupSchedule.style.display = 'block';
        });
    }

    function adjustDateForTimezone(dateString) {
        const date = new Date(dateString);
        const localTimezoneOffset = date.getTimezoneOffset() * 60000; 
        const adjustedDate = new Date(date.getTime() + localTimezoneOffset);
        return adjustedDate.toISOString().split('T')[0]; 
    }
    

    function formatDateToBrazilian(dateString) {
        const date = new Date(dateString + 'T00:00:00-03:00');

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }


   // Submeter formulário de agendamento
if (scheduleForm) {
    scheduleForm.addEventListener ("submit", async function(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const startDate = adjustDateForTimezone(document.getElementById("startDate").value);
        const startTime = document.getElementById("startTime").value;
        const deliverEndDate = adjustDateForTimezone(document.getElementById("deliverEndDate").value);
        const originSelect = document.getElementById("originSelect").value;
        const km_initial = document.getElementById("km_initial").value;
        const carSelectElement = document.getElementById("carSelect");
        const carSelectValue = carSelectElement.value;

        // Verificação de campos obrigatórios
        if (!nome || !startDate || !startTime || !deliverEndDate || !originSelect || !km_initial || !carSelectValue) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const formData = {
            nome,
            startDate,
            startTime,
            deliverEndDate,
            originSelect,
            km_initial,
            carSelect: carSelectValue
        };

        try {
            const response = await fetch('/agenda', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify(formData)
            });


            if (agendaResponse.ok) {
                const result = await agendaResponse.json();
                //const idSchedule = result.i_agenda_idSchedule;
                console.log("agendamento registrado:", result);

                const entregaData = {
                    nome: formData.nome,
                    deliverEndDate: formData.deliverEndDate,
                    carSelect: formData.carSelect,
                    agendaId: result.i_agenda_idSchedule
                };

                    const entregaResponse = await fetch('/entrega', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                            "accept": "application/json"
                        },
                        body: JSON.stringify({ entregaData })
                    });
                    

                    if (entregaResponse.ok) {
                        alert('Agendamento e entrega realizados com sucesso!');
                        closePopup(calendarPopupSchedule, overlaySchedule); 
                        window.history.back();
                    }  else {
                        console.error("Erro na resposta de entrega:", await entregaResponse.text());
                        alert('Erro ao registrar entrega.');
                    }
                } else {
                    console.error("Erro na resposta de agendamento:", await agendaResponse.text());
                    alert('Erro ao registrar agendamento.');
                }
            } catch (error) {
                console.error('Erro ao processar o formulário:', error);
                alert('Erro ao processar o formulário. Tente novamente.');
            }
        });
    }



    // Função para buscar agendamentos
    async function fetchSchedules() {
        try {
            const response = await fetch('/agendamento');

            if(response.ok) {
            const agendamentos = await response.json();
            schedulesBody.innerHTML = '';

            agendamentos.forEach(agendamento => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${agendamento.s_agenda_nameSchedule}</td>
                    <td>${formatDateToBrazilian(agendamento.d_agenda_startDate)}</td>
                    <td>${agendamento.d_agenda_startTime}</td>
                    <td>${formatDateToBrazilian(agendamento.d_agenda_deliverEndDate)}</td>
                    <td>${agendamento.s_agenda_originSelect}</td>
                    <td>${agendamento.i_agenda_kmInitial}</td>
                    <td>${agendamento.s_agenda_scheduleCar}</td>
                `;
                schedulesBody.appendChild(row);
            });
            } else {
                console.error('Erro ao carregar agendamentos:', response.statusText);
                alert('Erro ao carregar agendamentos. Tente novamente.');    
            }
        } catch (error) {
            console.error('Erro ao carregar agendamentos:', error);
            alert('Erro ao carregar agendamentos. Tente novamente.');
        }
    }

    // Exibir popup com a tabela de agendamentos
    if (showTablePopup) {
        showTablePopup.addEventListener('click', () => {
            overlayTable.style.display = 'block';
            tablePopup.style.display = 'block';
            fetchSchedules();
        });
    }

    // Fechar o popup de calendário ao clicar no botão de fechar
    if (closePopupScheduleButton) {
        closePopupScheduleButton.addEventListener('click', () => {
            closePopup(calendarPopupSchedule, overlaySchedule);
        });
    }
});
