<script setup>
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { onMounted, ref } from 'vue'
import { auth } from '../firebase/index.js'
import router from '../router'

const email = ref('')
const password = ref('')
const error = ref('')
const errorMsg = ref('')

const login = () => {
  if(email.value != '' && password.value != ''){
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((cred)=>{
      console.log('logged in successfully')
      router.push('/')
    })
    .catch((err)=>{
      error.value = true
      errorMsg.value = err.message
    })
  } else {
    console.log('Error: Email and password fields cannot be empty!')
    errorMsg.value = 'Error: Email and password fields cannot be empty!'
  }
}
</script>

<template>
    <div class="flex justify-center min-h-screen w-full bg-gradient-to-br from-slate-50 via-slate-200 to-slate-500 relative overflow-hidden">
        <div class="absolute z-20 -top-[150px] -left-[150px] h-[500px] w-[500px] rounded-full bg-slate-500"></div>
        <div class="absolute z-10 -top-[180px] -left-[180px] h-[600px] w-[600px] rounded-full bg-slate-400 opacity-50"></div>
        <div class="absolute -top-[210px] -left-[210px] h-[700px] w-[700px] rounded-full bg-slate-300 opacity-50"></div>

        <div class="absolute z-20 -bottom-[150px] -right-[150px] h-[500px] w-[500px] rounded-full bg-slate-600"></div>
        <div class="absolute z-10 -bottom-[180px] -right-[180px] h-[600px] w-[600px] rounded-full bg-slate-500"></div>
        <div class="absolute -bottom-[210px] -right-[210px] h-[700px] w-[700px] rounded-full bg-slate-400"></div>

        <div class="block z-30 min-h-screen w-screen backdrop-blur-sm">
            <div class="flex bg-white shadow-lg rounded-xl p-4 w-1/2 mx-auto mt-32">
                <div class="flex flex-col w-1/2">
                    <!-- <h1 class="text-3xl font-semibold text-center text-gray-600">WELCOME TO CHEAPTALKS!</h1> -->
                    <img src="https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7863.jpg" alt="" class="w-full">
                    <!-- <RouterLink to="/sign-up" class="text-gray-600 text-sm text-center">Sign Up</RouterLink> -->
                </div>
                <div class="w-1/2">
                    <h1 class="text-3xl font-semibold text-center text-dark mt-5">WELCOME TO CHEAPTALKS</h1>

                    
                    <div class="flex flex-col px-10 mt-5">
                        <form @submit.prevent="login()">
                            <h4 class="text-lg font-semibold text-center text-dark mb-2">Login to you account</h4>
                            <span v-if="errorMsg" class="text-sm font-light text-red-500">{{ errorMsg }}</span>
                            <span v-else>&nbsp;&nbsp;</span>
                            <div class="mb-3">
                                <label for="email" class="text-sm">Email</label>
                                <input v-model="email" type="email" class="w-full text-sm py-1 px-2 font-normal border rounded" id="email">
                            </div>
                            <div class="mb-3">
                                <label for="password" class="text-sm">Password</label>
                                <input v-model="password" type="password" class="w-full text-sm py-1 px-2 font-normal border rounded" id="password">
                            </div>
                            <button type="submit" class="w-full bg-slate-500 hover:bg-slate-400 text-white rounded-md py-1">Login</button>
                        </form>
                    </div>
                    <p class="text-sm text-center mt-3">Don't have an account? <RouterLink to="/sign-up" class="text-sm underline">Sign up</RouterLink></p>
                </div>
            </div>
            <div class="w-1/2 mx-auto mt-10 text-center">
                <a class="flex justify-center items-center text-center text-base">designed by: &nbsp; <h1 class="text-xl text-gray-600">Rosalino Flores</h1></a>
            </div>
        </div>
    </div>
</template>