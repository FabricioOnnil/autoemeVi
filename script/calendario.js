document.addEventListener("DOMContentLoaded", function() {
    const calendarBody = document.getElementById('calendarioBody');
    const currentMonthSpan = document.getElementById('currentMonth');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const popupContainer = document.getElementById('popup-containerTwo');
    const closeButton = document.querySelector('.close-popup');
    const eventDetails = document.getElementById('eventDetails');

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();

    closeButton.addEventListener('click', function() {
        popupContainer.style.display = 'none';
    });

    function updateMonthYearDisplay() {
        currentMonthSpan.textContent = `${currentDate.toLocaleString('pt-BR', { month: 'long' })} ${currentYear}`;
    }

    async function getEventsForDay(day, month, year) {
        try {
            const response = await fetch('/agenda');
            const agenda = await response.json();
            console.log('Agendamentos recebidos:', agenda);

            if (Array.isArray(agenda)) {
                const eventsForDay = agenda.filter(agendamento => {
                    const agendamentoDate = new Date(agendamento.d_agenda_deliverEndDate);
                    return (
                        agendamentoDate.getDate() === day &&
                        agendamentoDate.getMonth() === month &&
                        agendamentoDate.getFullYear() === year
                    );
                });

                console.log(`Eventos para ${day}/${month + 1}/${year}:`, eventsForDay);
                return eventsForDay;
            }
        } catch (error) {
            console.error('Erro ao buscar agenda:', error);
            return [];
        }
    }

    async function showPopup(day, month, year) {
        popupContainer.style.display = 'block';
        const events = await getEventsForDay(day, month, year);

        if (events.length > 0) {
            eventDetails.innerHTML = events.map(event =>
                `<p>
                 <strong>Nome:</strong> ${event.s_agenda_nameSchedule}<br>
                 <strong>Rota:</strong> ${event.s_agenda_scheduleCar}<br>
                 <strong>Data de Entrega:</strong> ${new Date(event.d_agenda_deliverEndDate).toLocaleDateString()} 
                 </p>`
            ).join('');
        } else {
            eventDetails.innerHTML = "<p>Não há eventos para este dia.</p>";
        }
    }

    async function fillCalendar(month, year) {
        calendarBody.innerHTML = '';
        const today = new Date();
        const currentDay = today.getDate();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let row = calendarBody.insertRow();
        for (let i = 0; i < firstDayOfMonth; i++) {
            row.insertCell();
        }

        for (let day = 1; day <= daysInMonth; day++) {
            if (row.cells.length === 7) {
                row = calendarBody.insertRow();
            }
            const cell = row.insertCell();
            cell.textContent = day;

            const events = await getEventsForDay(day, month, year); // Usar await para eventos assíncronos
            if (events.length > 0) {
                cell.classList.add('has-event');
                cell.addEventListener('click', () => showPopup(day, month, year));
            }

            if (day === currentDay && month === currentMonth && year === currentYear) {
                cell.classList.add('today');
            }
        }

        updateMonthYearDisplay();
    }

    prevMonthBtn.addEventListener('click', function() {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        currentDate = new Date(currentYear, currentMonth, 1);
        fillCalendar(currentMonth, currentYear);
    });

    nextMonthBtn.addEventListener('click', function() {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        currentDate = new Date(currentYear, currentMonth, 1);
        fillCalendar(currentMonth, currentYear);
    });

    fillCalendar(currentMonth, currentYear); 
});
