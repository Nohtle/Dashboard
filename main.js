// Inicializa o total de gastos
let totalExpenses = 0;

// Função para adicionar um gasto
function addExpense() {
    const nameInput = document.getElementById('expense-name');
    const amountInput = document.getElementById('expense-amount');
    const expenseTable = document.getElementById('expense-table');
    const totalExpensesElement = document.getElementById('total-expenses');

    const name = nameInput.value.trim();
    const amount = parseFloat(amountInput.value);

    // Valida os campos de entrada
    if (name === '' || isNaN(amount) || amount <= 0) {
        alert('Por favor, insira uma descrição válida e um valor maior que 0.');
        return;
    }

    // Cria uma nova linha na tabela
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${name}</td>
        <td>R$ ${amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
        <td><button onclick="removeExpense(this, ${amount})">Remover</button></td>
    `;
    expenseTable.appendChild(row);

    // Atualiza o total de gastos
    totalExpenses += amount;
    totalExpensesElement.textContent = totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

    // Limpa os campos de entrada
    nameInput.value = '';
    amountInput.value = '';
}

// Função para remover um gasto
function removeExpense(button, amount) {
    const row = button.parentElement.parentElement;
    row.remove();

    // Atualiza o total de gastos
    totalExpenses -= amount;
    document.getElementById('total-expenses').textContent = totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}

// Adiciona o evento ao botão "Adicionar Gasto"
document.getElementById('add-expense-btn').addEventListener('click', addExpense);