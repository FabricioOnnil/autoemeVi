document.addEventListener("DOMContentLoaded", function() {
    const checkboxes = document.querySelectorAll('#check input[type="checkbox"]');
    const longTextForm = document.getElementById("longTextForm");

    // Garantir que apenas um checkbox seja marcado
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                checkboxes.forEach(otherCheckbox => {
                    if (otherCheckbox !== this) {
                        otherCheckbox.checked = false;
                    }
                });
            }
        });
    });

    // Enviar dados para a tabela 'diario' no MySQL
    longTextForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        let motivo = "";
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                motivo = checkbox.id;
            }
        });

        const descricao = document.getElementById("longText").value;

        const data = {
            s_diario_motivo: motivo,
            s_diario_descricao: descricao
        };

        try {
            const response = await fetch("/diario/insert", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert("Dados enviados com sucesso!");
                longTextForm.reset(); // Limpar o formulário após envio
            } else {
                alert("Erro ao enviar os dados.");
            }
        } catch (error) {
            console.error("Erro ao enviar os dados:", error);
        }
    });
});
