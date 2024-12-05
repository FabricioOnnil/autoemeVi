document.addEventListener('DOMContentLoaded', function() {
    const showCalendarButton = document.getElementById('showCalendarSchedule');
    const overlay = document.getElementById('overlaySchedule');
    const calendarPopup = document.getElementById('calendarPopupSchedule');
    const closePopupButton = document.querySelector('.close-popupSchedule');

    if (showCalendarButton) {
        showCalendarButton.addEventListener('click', function() {
            overlay.style.display = 'block';
            calendarPopup.style.display = 'block';
        });
    } else {
        console.error("showCalendarButton not found");
    }

    if (closePopupButton) {
        closePopupButton.addEventListener('click', function() {
            overlay.style.display = 'none';
            calendarPopup.style.display = 'none';
        });
    } else {
        console.error("closePopupButton not found");
    }

    if (overlay) {
        overlay.addEventListener('click', function() {
            overlay.style.display = 'none';
            calendarPopup.style.display = 'none';
        });
    } else {
        console.error("overlay not found");
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const overlayTable = document.getElementById('overlayTable');
    const tablePopup = document.getElementById('tablePopup');
    const closeTableButton = tablePopup ? tablePopup.querySelector('.close-popup') : null;

    if (overlayTable) {

        overlayTable.addEventListener('click', function() {
            overlayTable.style.display = 'none';
            tablePopup.style.display = 'none';
        });
    }

    if (closeTableButton) {
        closeTableButton.addEventListener('click', function() {
            overlayTable.style.duisplay = 'none';
            tablePopup.style.display = 'none';
        });

    }
});