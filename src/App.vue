<script setup>
import { RouterLink, RouterView } from 'vue-router'
import {ref, onMounted} from 'vue'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { query, collection, where, getDocs } from 'firebase/firestore'
import { auth, db } from './firebase/index.js'
import router from './router'

const isSignedIn = ref(false)
const fname = ref('')
const lname = ref('')
const gender = ref('')
const email = ref('')

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if(user){
      // console.log(user)
      isSignedIn.value = true
      console.log('you are now signed in')
      router.push('/')

      const q = query(collection(db, "authors"), where("uid", "==", user.uid));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        fname.value = doc.data().fname
        lname.value = doc.data().lname
        gender.value = doc.data().gender
        email.value = doc.data().email
      });
    }else{
      console.log('you need to log in')
      router.push('/login')
    }
  })
})

const OpenUserMenu = () => {
  // showUserMenu.value = !showUserMenu.value

  const dropdown = document.getElementById('user-dropdown')

  if(dropdown.classList.contains('hidden')) {
    dropdown.classList.remove('hidden')
    dropdown.classList.add('block')
  }else {
    dropdown.classList.remove('block')
    dropdown.classList.add('hidden')
  }
}

const showCategories = () => {
  const categoryDropdown = document.getElementById('category-dropdown')
  const catBtn = document.getElementById('catBtn')
  const dropdownIcon = document.getElementById('dropdownIcon')

  // dropdownIcon.classList.toggle('fa-chevron-down')
  // dropdownIcon.classList.toggle('fa-chevron-up')
  // catBtn.classList.toggle('bg-gray-600')

  // categoryDropdown.classList.toggle('h-0')
  categoryDropdown.classList.toggle('h-72')

}

const logOut = () =>{
  signOut(auth)
  .then(()=>{
    const dropdown = document.getElementById('user-dropdown')
    if(dropdown.classList.contains('hidden')) {
      dropdown.classList.remove('hidden')
      dropdown.classList.add('block')
    } else {
      dropdown.classList.remove('block')
      dropdown.classList.add('hidden')
    }

    isSignedIn.value = false
  })
}


</script>

<template>

  <nav v-if="isSignedIn" class="bg-slate-800 border-gray-600 border-b">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
    <a href="https://flowbite.com/" class="flex items-center">
        <!-- <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="Flowbite Logo" /> -->
        <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">CHEAPTALKS</span>
    </a>
    <div class="flex space-x-2 items-center md:order-2">
        <RouterLink to="/create-post" class="text-white hover:bg-gray-600 px-2.5 py-1 rounded-sm"><i class="fa-solid fa-plus"></i></RouterLink>
        <button @click="OpenUserMenu()" type="button" class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
          <span class="sr-only">Open user menu</span>
          <img v-if="gender == 'Male'" class="w-8 h-8 rounded-full" src="./assets/images/male-user.png" alt="user photo">
          <img v-else class="w-8 h-8 rounded-full" src="./assets/images/female-user.png" alt="user photo">
        </button>
        <!-- Dropdown menu -->
        <div class="z-50 hidden absolute my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow mt-72 mr-42" id="user-dropdown">
          <div class="px-4 py-3">
            <span class="block text-sm text-gray-900 dark:text-white">{{ fname }} {{ lname }}</span>
            <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">{{ email }}</span>
          </div>
          <ul class="py-2" aria-labelledby="user-menu-button">
            <li>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Posts</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile Settings</a>
            </li>
            <li>
              <a href="#" @click="logOut()" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
            </li>
          </ul>
        </div>
        <button data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
      </button>
    </div>
    <div class="items-center justify-evenly hidden w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
      <ul class="flex flex-row items-center font-medium space-x-5 relative">
        <li>
          <RouterLink to="/" class="block py-2 pl-3 pr-4 text-sm text-gray-50 rounded hover:bg-gray-600" id="home">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/authors" class="block py-2 pl-3 pr-4 text-sm text-gray-50 rounded hover:bg-gray-600" id="home">Authors</RouterLink>
        </li>
        <li>
          <!-- <div class="block"> -->
            <button @mouseover="showCategories()" @mouseleave="showCategories()" class="flex items-center py-2 pl-3 pr-4 text-sm text-gray-50 rounded hover:bg-gray-600" id="catBtn">Categories&nbsp;<p class="text-xs text-white"><i class="fa-solid fa-chevron-down" id="dropdownIcon"></i></p></button>
            <div class="h-0 absolute z-50 top-full right-0 bg-gray-600 divide-y divide-gray-100 rounded-b-lg shadow w-[122px] overflow-hidden transition-height duration-300 ease-in-out" id="category-dropdown">
              <ul>
                <li>
                  <RouterLink to="/categories/adventure" @click="showCategories()" class="block px-4 py-2 text-sm text-gray-50 hover:bg-gray-500">Adventure</RouterLink>
                </li>
                <li>
                  <RouterLink to="/categories/business" class="block px-4 py-2 text-sm text-gray-50 hover:bg-gray-500">Business</RouterLink>
                </li>
                <li>
                  <RouterLink to="#" class="block px-4 py-2 text-sm text-gray-50 hover:bg-gray-500">Comedy</RouterLink>
                </li>
                <li>
                  <RouterLink to="#" class="block px-4 py-2 text-sm text-gray-50 hover:bg-gray-500">Drama</RouterLink>
                </li>
                <li>
                  <RouterLink to="#" class="block px-4 py-2 text-sm text-gray-50 hover:bg-gray-500">Horror</RouterLink>
                </li>
                <li>
                  <RouterLink to="#" class="block px-4 py-2 text-sm text-gray-50 hover:bg-gray-500">Politics</RouterLink>
                </li>
                <li>
                  <RouterLink to="#" class="block px-4 py-2 text-sm text-gray-50 hover:bg-gray-500">Religion</RouterLink>
                </li>
                <li>
                  <RouterLink to="#" class="block px-4 py-2 text-sm text-gray-50 hover:bg-gray-500">Romance</RouterLink>
                </li>
              </ul>
            </div>
          <!-- </div>  -->
        </li>
      </ul>
    </div>
    </div>
  </nav>

  <RouterView />
</template>

<style>
.transition-height {
  transition: height;
}
</style>