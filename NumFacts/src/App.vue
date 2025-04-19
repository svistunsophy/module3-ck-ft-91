<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      number: '',
      category: 'trivia',
      loading: false,
      fact: {},
    };
  },
  computed: {
    notFoundMessage() {
      if (!this.fact.found && this.category === 'year') {
        return `${this.number} is a boring year.`;
      }
      return `${this.number} is a boring number.`;
    },
  },
  methods: {
    async fetchFact() {
      if (!this.number) return;

      try {
        this.loading = true;
        const response = await axios.get(
          `http://numbersapi.com/${this.number}/${this.category}?json`
        );

        this.fact = response.data;
      } catch (error) {
        console.error('Error fetching facts:', error);
        alert('An error occurred while fetching the facts.');
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<template>
  <div id="app">
    <h1>Random Number Facts</h1>
    <form @submit.prevent="fetchFact">
      <input v-model.number="number" placeholder="Enter a number" />
      <select v-model="category">
        <option value="trivia">Trivia</option>
        <option value="math">Math</option>
        <option value="year">Year</option>
      </select>
      <button type="submit">Search</button>
    </form>
    <p v-if="loading">Loading...</p>
    <p v-else-if="fact.text">{{ fact.text }}</p>
    <p v-else>{{ notFoundMessage }}</p>
  </div>
</template>

<style scoped>
#app {
  text-align: center;
}

input,
select,
button {
  margin-right: 10px;
}

p {
  font-size: 18px;
  color: #333;
}
</style>
