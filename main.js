// Armazenamento de gastos
let expenses = [];
let totalExpenses = 0;

// Função para formatar valores monetários
function formatCurrency(value) {
    return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Função para inicializar a barra de progresso
function initProgressBar() {
    // Cria o elemento da barra de progresso se ainda não existir
    if (!document.querySelector('.progress-bar')) {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        document.body.appendChild(progressBar);
    }
}

// Função para animar a barra de progresso
function animateProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = '0%';
    
    // Anima a barra para 40% rapidamente
    setTimeout(() => {
        progressBar.style.width = '40%';
    }, 100);
    
    // Anima a barra para 80% mais devagar
    setTimeout(() => {
        progressBar.style.width = '80%';
    }, 500);
    
    // Completa a barra
    setTimeout(() => {
        progressBar.style.width = '100%';
        
        // Oculta a barra após completar
        setTimeout(() => {
            progressBar.style.width = '0%';
        }, 700);
    }, 800);
}

// Função para adicionar um gasto
function addExpense() {
    const nameInput = document.getElementById('expense-name');
    const amountInput = document.getElementById('expense-amount');
    const expenseTable = document.getElementById('expense-table');
    const totalExpensesElement = document.getElementById('total-expenses');

    const name = nameInput.value.trim();
    const amount = parseFloat(amountInput.value);

    // Valida os campos de entrada
    if (name === '') {
        showValidationError(nameInput, 'Por favor, insira uma descrição para o gasto');
        return;
    } else {
        clearValidationError(nameInput);
    }

    if (isNaN(amount) || amount <= 0) {
        showValidationError(amountInput, 'Por favor, insira um valor maior que 0');
        return;
    } else {
        clearValidationError(amountInput);
    }

    // Cria um ID único para o gasto
    const id = Date.now().toString();
    
    // Cria um objeto de gasto
    const expense = {
        id: id,
        name: name,
        amount: amount,
        date: new Date()
    };
    
    // Adiciona o gasto ao array
    expenses.push(expense);

    // Atualiza a tabela
    updateExpenseTable();

    // Atualiza o total de gastos
    updateTotalExpenses();

    // Limpa os campos de entrada
    nameInput.value = '';
    amountInput.value = '';
    nameInput.focus();
    
    // Mostra uma animação de sucesso
    showSuccessMessage('Gasto adicionado com sucesso!');
}

// Função para remover um gasto
function removeExpense(id) {
    if (confirm('Tem certeza que deseja remover este gasto?')) {
        // Encontra o índice do gasto no array
        const index = expenses.findIndex(expense => expense.id === id);
        
        if (index !== -1) {
            // Remove o gasto do array
            expenses.splice(index, 1);
            
            // Atualiza a tabela
            updateExpenseTable();
            
            // Atualiza o total de gastos
            updateTotalExpenses();
            
            // Mostra uma mensagem de sucesso
            showSuccessMessage('Gasto removido com sucesso!');
        }
    }
}

// Função para atualizar a tabela de gastos
function updateExpenseTable() {
    const expenseTable = document.getElementById('expense-table');
    
    // Limpa a tabela
    expenseTable.innerHTML = '';
    
    // Se não houver gastos, exibe uma mensagem
    if (expenses.length === 0) {
        expenseTable.innerHTML = `
            <tr>
                <td colspan="3" class="empty-state">
                    <i class="fas fa-receipt"></i>
                    <p>Nenhum gasto registrado</p>
                    <p>Adicione um novo gasto usando o formulário acima.</p>
                </td>
            </tr>
        `;
        return;
    }
    
    // Adiciona os gastos à tabela
    expenses.forEach(expense => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', expense.id);
        row.innerHTML = `
            <td>${expense.name}</td>
            <td>R$ ${formatCurrency(expense.amount)}</td>
            <td>
                <button onclick="removeExpense('${expense.id}')">
                    <i class="fas fa-trash-alt"></i> Remover
                </button>
            </td>
        `;
        expenseTable.appendChild(row);
        
        // Adiciona uma animação à nova linha
        row.style.animation = 'fadeIn 0.5s ease-out';
    });
}

// Função para atualizar o total de gastos
function updateTotalExpenses() {
    const totalExpensesElement = document.getElementById('total-expenses');
    
    // Calcula o total
    totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    
    // Atualiza o elemento HTML
    totalExpensesElement.textContent = formatCurrency(totalExpenses);
    
    // Adiciona uma animação ao total
    totalExpensesElement.style.animation = 'none';
    setTimeout(() => {
        totalExpensesElement.style.animation = 'fadeIn 0.5s ease-out';
    }, 10);
}

// Funções para validação de entrada
function showValidationError(input, message) {
    // Remove qualquer mensagem de erro anterior
    clearValidationError(input);
    
    // Adiciona a classe de erro
    input.classList.add('error');
    
    // Cria o elemento de mensagem de erro
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    // Adiciona o elemento após o input
    input.parentNode.appendChild(errorElement);
}

function clearValidationError(input) {
    // Remove a classe de erro
    input.classList.remove('error');
    
    // Remove a mensagem de erro, se existir
    const errorElement = input.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// Função para mostrar mensagem de sucesso
function showSuccessMessage(message) {
    // Anima a barra de progresso
    animateProgressBar();
    
    // Verifica se já existe uma mensagem
    let successMessage = document.querySelector('.success-message');
    
    // Se não existir, cria uma nova
    if (!successMessage) {
        successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        document.body.appendChild(successMessage);
    }
    
    // Atualiza a mensagem
    successMessage.textContent = message;
    successMessage.style.animation = 'none';
    
    // Mostra a mensagem
    successMessage.classList.add('show');
    
    // Reinicia a animação
    setTimeout(() => {
        successMessage.style.animation = 'fadeIn 0.3s ease-out';
    }, 10);
    
    // Esconde a mensagem após 3 segundos
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 3000);
}

// Adiciona eventos aos elementos
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa a barra de progresso
    initProgressBar();
    
    // Anima a barra de progresso ao carregar a página
    animateProgressBar();
    
    // Adiciona o evento ao botão "Adicionar Gasto"
    document.getElementById('add-expense-btn').addEventListener('click', addExpense);
    
    // Adiciona o evento de tecla Enter aos campos de entrada
    document.getElementById('expense-name').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('expense-amount').focus();
        }
    });
    
    document.getElementById('expense-amount').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addExpense();
        }
    });
    
    // Inicializa a tabela
    updateExpenseTable();
});