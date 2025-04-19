<script>
import { ref } from 'vue';

export default {
  setup() {
    const user = ref({
      firstName: '',
      lastName: '',
      gender: '',
      password: '',
      confirmPassword: '',
    });
    const showPassword = ref(false);

    const onSubmit = () => {
      console.log('Текущие значения полей:', user.value);
    };

    return {
      user,
      showPassword,
      onSubmit,
    };
  },
};
</script>

<template>
  <div>
    <h2>Форма регистрации</h2>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="firstName">Имя пользователя:</label>
        <input type="text" id="firstName" v-model="user.firstName" required />
      </div>
      <div>
        <label for="lastName">Фамилия пользователя:</label>
        <input type="text" id="lastName" v-model="user.lastName" required />
      </div>
      <div>
        <label>Пол:</label>
        <label>
          <input
            type="radio"
            id="male"
            value="Мужской"
            v-model="user.gender"
            required
          />
          Мужчина
        </label>
        <label>
          <input
            type="radio"
            id="female"
            value="Женский"
            v-model="user.gender"
            required
          />
          Женщина
        </label>
      </div>
      <div>
        <label for="password">Пароль:</label>
        <input
          :type="showPassword ? 'text' : 'password'"
          id="password"
          v-model="user.password"
          required
        />
      </div>
      <div>
        <label for="confirmPassword">Подтверждение пароля:</label>
        <input
          :type="showPassword ? 'text' : 'password'"
          id="confirmPassword"
          v-model="user.confirmPassword"
          required
        />
      </div>
      <button type="submit" :disabled="user.password !== user.confirmPassword">
        Зарегистрироваться
      </button>
      <button
        @mousedown="showPassword = true"
        @mouseup="showPassword = false"
        @mouseleave="showPassword = false"
      >
        Показать пароль
      </button>
    </form>
    <p>
      Пользователь: {{ user.firstName }} {{ user.lastName }}.
      {{ user.gender === 'Мужской' ? 'Мужского' : 'Женского' }} пола.
    </p>
  </div>
</template>

<style scoped>
form {
  display: grid;
  gap: 10px;
}

label {
  font-weight: bold;
}

input {
  padding: 5px;
  margin-bottom: 5px;
}

button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
