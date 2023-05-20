<script setup>
import { ref } from 'vue'
import { db, auth } from '../firebase/index.js'
import { addDoc, collection } from "firebase/firestore";
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { RouterLink } from 'vue-router'
import router from '../router'

const fname = ref('')
const lname = ref('')
const gender = ref('')
const email = ref('')
const password = ref('')
const passwordconfirmation = ref('')

const error = ref('')
const errorMsg = ref('')
const success = ref('')
const successMsg = ref('')

const signUp = async () => {
    if(fname.value != '' && lname.value != '' && gender.value != '' && email.value != '' && passwordconfirmation.value != '' && password.value != ''){
        if(password.value == passwordconfirmation.value) {
            createUserWithEmailAndPassword(auth, email.value, password.value)
            .then(async (cred) => {

                const newUserId = generateUniqueId()

                await addDoc(collection(db, 'authors'), {
                    user_id: newUserId,
                    fname: fname.value,
                    lname: lname.value,
                    gender: gender.value,
                    email: email.value,
                    uid: cred.user.uid
                })

                // await auth.signOut()
                
                fname.value = ''
                lname.value = ''
                gender.value = ''
                email.value = ''
                password.value = ''
                passwordconfirmation.value = ''
                error.value = false
                success.value = true
                successMsg.value = "Registered Successfully"

            })
            .catch((error)=>{
                error.value  = true
                errorMsg.value = error.message
            })
        } else {
            errorMsg.value = 'Error: Password do not match.'
        }
    }
    else{
        error.value = true
        errorMsg.value = "Error: Please fill out all the fields"
    }
}

const generateUniqueId = () => {
  var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var id = '';
  for (var i = 0; i < 10; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}
</script>

<template>
    <div class="flex justify-center min-h-screen w-full bg-gradient-to-br from-slate-50 via-slate-200 to-slate-500 relative overflow-hidden">

        <!-- Loading State -->
        <div class="absolute z-20 -top-[150px] -left-[150px] h-[500px] w-[500px] rounded-full bg-slate-500"></div>
        <div class="absolute z-10 -top-[180px] -left-[180px] h-[600px] w-[600px] rounded-full bg-slate-400 opacity-50"></div>
        <div class="absolute -top-[210px] -left-[210px] h-[700px] w-[700px] rounded-full bg-slate-300 opacity-50"></div>

        <div class="absolute z-20 -bottom-[150px] -right-[150px] h-[500px] w-[500px] rounded-full bg-slate-600"></div>
        <div class="absolute z-10 -bottom-[180px] -right-[180px] h-[600px] w-[600px] rounded-full bg-slate-500"></div>
        <div class="absolute -bottom-[210px] -right-[210px] h-[700px] w-[700px] rounded-full bg-slate-400"></div>

        <div class="block z-30 min-h-screen w-screen backdrop-blur-sm">
            <div class="flex bg-white shadow-lg rounded-xl p-5 w-1/2 mx-auto mt-32">
                <div class="flex flex-col w-1/2">
                    <!-- <h1 class="text-3xl font-semibold text-center text-gray-600">WELCOME TO CHEAPTALKS!</h1> -->
                    <img src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg" alt="" class="w-full">
                    <!-- <RouterLink to="/sign-up" class="text-gray-600 text-sm text-center">Sign Up</RouterLink> -->
                    <p class="text-sm text-center">Already have an account? <RouterLink to="/login" class="text-sm underline">Sign in</RouterLink></p>
                </div>
                <div class="w-1/2">
                    <!-- <h1 class="text-3xl font-semibold text-center text-dark mt-5">WELCOME TO CHEAPTALKS!</h1> -->

                    
                    <div class="flex flex-col px-10">
                        <form @submit.prevent="signUp()">
                            <h4 class="text-xl font-semibold text-center text-dark mb-2">Create an account</h4>
                            <span v-if="errorMsg" class="text-sm font-light text-red-500">{{ errorMsg }}</span>
                            <span v-else>&nbsp;&nbsp;</span>
                            <div class="mb-3">
                                <label for="fname" class="text-sm font-normal">First Name</label>
                                <input v-model="fname" type="fname" class="w-full text-sm py-1 px-2 font-normal border rounded" id="fname">
                            </div>
                            <div class="mb-3">
                                <label for="lname" class="text-sm font-normal">Last Name</label>
                                <input v-model="lname" type="lname" class="w-full text-sm py-1 px-2 font-normal border rounded" id="lname">
                            </div>
                            <div class="mb-3">
                                <label for="gender" class="text-sm font-normal">First Name</label>
                                <select v-model="gender" class="w-full text-sm py-1 px-2 font-normal border rounded" id="gender">
                                    <option value="">Select gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="email" class="text-sm font-normal">Email</label>
                                <input v-model="email" type="email" class="w-full text-sm py-1 px-2 font-normal border rounded" id="email">
                            </div>
                            <div class="mb-3">
                                <label for="password" class="text-sm font-normal">Password</label>
                                <input v-model="password" type="password" class="w-full text-sm py-1 px-2 font-normal border rounded" id="password">
                            </div>
                            <div class="mb-3">
                                <label for="confirm_password" class="text-sm font-normal">Confirm Password</label>
                                <input v-model="passwordconfirmation" type="password" class="w-full text-sm py-1 px-2 font-normal border rounded" id="confirm_password">
                            </div>
                            <button type="submit" class="w-full bg-slate-500 hover:bg-slate-400 text-white text-sm font-normal rounded-md py-1.5">Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="w-1/2 mx-auto mt-10 text-center">
                <a class="flex justify-center items-center text-center text-base">designed by: &nbsp; <h1 class="text-xl text-gray-600">Rosalino Flores</h1></a>
            </div>
        </div>
    </div>
</template>