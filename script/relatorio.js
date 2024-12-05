document.addEventListener('DOMContentLoaded', () => {
    const tableRefeicoesBody = document.getElementById('table-refeicoes').querySelector('tbody');
    const tableReparosBody = document.getElementById('table-reparos').querySelector('tbody');
    const tableAbastecimentoBody = document.getElementById('table-abastecimento').querySelector('tbody');


    function exibirDadosNaTabela(data, tableBody) {
        tableBody.innerHTML = ''; 

        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.descricao}</td>
                <td>R$ ${item.valor.toFixed(2)}</td>
                <td>${item.data}</td>
                <td>${item.nota_fiscal ? `<img src="${item.nota_fiscal}" alt="Nota Fiscal" width="100">` : ''}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Fetch e exibição de refeições (comida) na tabela
    fetch('/api/refeicoes')
        .then(response => response.json())
        .then(data => exibirDadosNaTabela(data, tableRefeicoesBody))
        .catch(error => console.error('Erro ao buscar refeições:', error));

    // Fetch e exibição de reparos na tabela
    fetch('/api/reparos')
        .then(response => response.json())
        .then(data => exibirDadosNaTabela(data, tableReparosBody))
        .catch(error => console.error('Erro ao buscar reparos:', error));

    // Fetch e exibição de abastecimentos na tabela
    fetch('/api/abastecimentos')
        .then(response => response.json())
        .then(data => exibirDadosNaTabela(data, tableAbastecimentoBody))
        .catch(error => console.error('Erro ao buscar abastecimentos:', error));
});

function openTablePopup(tableId) {
    const table = document.getElementById(tableId);    

     if (!table) {
        console.error('Tabela com ID ${tableId} não encontrada.');
        return;
    }

    const tableHead = table.querySelector('thead').outerHTML;
    const tableBody = table.querySelector('tbody').outerHTML;
    // Abre uma nova janela
    const popupWindow = window.open('', '_blank', 'width=800,height=600');

    if (!popupWindow) {
        alert('Popup bloqueado! Por favor, permita popups para este site.');
        return;
    }
    
    // Escreve o conteúdo HTML da tabela na nova janela
    if (popupWindow) {
        popupWindow.document.write(`html>
        <head>
            <title>Tabela de ${tableId}</title>
            <style>
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: center;
                }
                th {
                    background-color: #f2f2f2;
                }
            </style>
        </head>
        <body>
            <h2>Tabela de ${tableId}</h2>
            <table>
                ${tableHead} <!-- Adiciona o cabeçalho -->
                ${tableBody} <!-- Adiciona o corpo da tabela -->
            </table>
        </body>
        </html>
        `);        
        popupWindow.document.close();
    } else {
        alert('Por favor, permita popups para visualizar a tabela.');
    }
}