let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function addTransaction() {
  const type = document.getElementById("type").value;
  const title = document.getElementById("title").value;
  const amount = document.getElementById("amount").value;
  const date = document.getElementById("date").value;

  if (title === "" || amount === "" || date === "") {
    alert("সব ঘর পূরণ করো");
    return;
  }

  const transaction = {
    type: type,
    title: title,
    amount: Number(amount),
    date: date
  };

  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));

  document.getElementById("title").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("date").value = "";

  render();
}

function render() {
  const list = document.getElementById("list");
  const incomeEl = document.getElementById("income");
  const expenseEl = document.getElementById("expense");
  const balanceEl = document.getElementById("balance");

  list.innerHTML = "";

  let income = 0;
  let expense = 0;

  transactions.forEach((t, index) => {
    if (t.type === "income") {
      income += t.amount;
    } else {
      expense += t.amount;
    }

    list.innerHTML += `
      <li class="${t.type}">
        <div>
          <strong>${t.title}</strong> - ৳${t.amount}<br>
          <small>${t.date}</small>
        </div>
        <button onclick="deleteTransaction(${index})">X</button>
      </li>
    `;
  });

  incomeEl.innerText = income;
  expenseEl.innerText = expense;
  balanceEl.innerText = income - expense;
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  render();
}

render();
