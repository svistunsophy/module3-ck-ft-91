<script setup lang="ts">
import { ref, computed } from 'vue';

const history = ref([]);
let idCounter = 0;

const title = ref('');
const amount = ref(null);

const addItem = () => {
  if (!title.value || !amount.value) return;

  const newItem = {
    text: title.value,
    amount: Number(amount.value),
    id: ++idCounter,
  };

  history.value.push(newItem);

  title.value = '';
  amount.value = null;
};

const incomeBalance = computed(() =>
  history.value.reduce((acc, curr) => acc + Math.max(curr.amount, 0), 0)
);

const outcomeBalance = computed(() =>
  history.value.reduce((acc, curr) => acc + Math.min(curr.amount, 0), 0)
);

const totalBalance = computed(() => incomeBalance.value + outcomeBalance.value);
</script>

<template>
  <form @submit.prevent="addItem">
    Название: <input type="text" v-model.trim="title" /><br /><br />
    Сумма: <input type="number" v-model.number="amount" /><br /><br />
    <button type="submit">Добавить операцию</button>
  </form>

  <h2>История операций:</h2>
  <ul>
    <li v-for="item in history" :key="item.id">
      {{ item.text }} — {{ item.amount }}
    </li>
  </ul>

  <h2>Балансы:</h2>
  <div v-if="history.length > 0">
    Доход: {{ incomeBalance }} руб.<br />
    Расход: {{ outcomeBalance }} руб.<br />
    Общий баланс: {{ totalBalance }} руб.
  </div>
  <div v-else>Вы не совершали финансовых операций.</div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.form label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form input[type='text'],
.form input[type='number'] {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  margin-bottom: 15px;
}

.form button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
}

.form button:hover {
  background-color: #0056b3;
}

.balance-section p span.income-balance {
  color: green;
  font-weight: bold;
}

.balance-section p span.outcome-balance {
  color: red;
  font-weight: bold;
}

.balance-section p span.total-balance {
  color: blue;
  font-weight: bold;
}

.history-section ul li.positive {
  color: green;
}

.history-section ul li.negative {
  color: red;
}

.history-section ul li {
  list-style-type: circle;
  margin-left: 20px;
  line-height: 1.5em;
}
</style>
