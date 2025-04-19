import './style.css';
import Vue from 'vue';

const { createApp, ref } = Vue;

createApp({
  setup() {
    const user = ref({
      firstName: "",
      lastName: "",
      gender: "",
      password: "",
      confirmPassword: ""
    });
    
    const showPassword = ref(false); 
    
    function toggleShow(value) {
      showPassword.value = value;
    }
    
    function registerUser() {
      console.log("Форма зарегистрирована:", user.value);
    }
  
    return {
      user,
      showPassword,
      toggleShow,
      registerUser,
      
      isValidForm: () => user.value.password === user.value.confirmPassword && user.value.password.length > 0
    };
  }
}).mount("#app");
