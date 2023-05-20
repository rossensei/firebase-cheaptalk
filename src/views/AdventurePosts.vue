<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { db } from '../firebase/index.js'
import { collection, deleteDoc, addDoc, onSnapshot, doc, getDoc, query, orderBy, QuerySnapshot, where } from 'firebase/firestore'

onMounted(() => {

  //fetch all posts
  const q = query(collection(db, 'posts'), where('category', '==', 'Adventure'));

  onSnapshot(q, (querySnapshot) => {
    let postsTmp = []
    querySnapshot.forEach((doc) => {

      const timestamp = doc.data().created_at;
      const date = timestamp.toDate();
      
      //format the date to date & time separately
      const dateOptions = { month: 'short', day: 'numeric', year: 'numeric' };
      const timeOptions = { hour: 'numeric', minute: 'numeric' };
      const formattedDate = date.toLocaleDateString('en-US', dateOptions);
      const formattedTime = date.toLocaleTimeString('en-US', timeOptions);

      const post = {
        id: doc.id,
        title: doc.data().title,
        content: doc.data().content,
        category: doc.data().category,
        created_at: formattedDate + ' at ' + formattedTime
      }
      postsTmp.push(post)
    })
    setTimeout(()=>{
      isShown.value = !isShown.value
    }, 1500)
    
    posts.value = postsTmp
  })

  
})

const posts = ref([])
const isShown = ref(false)

const toggleActionBtn = (index) => {
  //toggle edit and delete button
  const icon = document.getElementById(index)
  const actionPane = document.getElementById('actionPane' + index)

  icon.classList.toggle('fa-chevron-right')


  if(actionPane.classList.contains('opacity-0')){
    actionPane.classList.remove('opacity-0')
    // actionPane.classList.remove('translate-x-4')
    actionPane.classList.add('translate-x-10')
  } else {
    actionPane.classList.remove('translate-x-10')
    actionPane.classList.add('opacity-0')
    // actionPane.classList.add('translate-x-4')
  }
}
</script>

<template>
    <div class="w-2/5 mx-auto mt-3 p-4 h-auto">
        <div class="grid grid-cols-1 gap-4">
          <div class="flex bg-slate-800 p-3 space-x-2 border border-gray-500 rounded-sm">
            <RouterLink to="/profile" class="rounded-full">
              <img class="w-8" src="../assets/images/clipart2582267.png" alt="">
            </RouterLink>
            <RouterLink to="/create-post" class="flex h-auto w-full">
              <input class="w-full py-1 px-1.5 rounded-sm bg-slate-700 hover:bg-transparent border border-gray-600 hover:border-gray-300" type="text" placeholder="Create post">
            </RouterLink>
          </div>
    
          <div class="flex items-center justify-between">
            <hr class="w-1/3">
            <h1 class="text-xl text-white">Just For You</h1>
            <hr class="w-1/3">
          </div>
    
          <div v-if="isShown" class="space-y-2">
            <div v-for="(post, index) in posts" :key="index" class="bg-slate-800 px-3 py-1.5 border border-gray-500 hover:border-gray-300 rounded-sm">
              <div class="relative flex justify-between items-center">
                <p class="text-gray-50 text-sm font-light">Posted by <a class="text-blue-300" href="">Rosalino Flores</a> &#9679; {{ post.created_at }} &#9679; {{ post.category }}</p>
                <div class="flex overflow-hidden">
                  <div :id="'actionPane'+ index" class="w-auto bg-slate-600 transition-opacity duration-700 ease-in-out translate-x-4 opacity-0 pl-3 pr-5 space-x-3 rounded-s-full">
                    <button class="text-white text-sm rounded-full px-2.5 py-1 bg-blue-600"><i class="fa-solid fa-pen"></i></button>
                    <button class="text-white text-sm rounded-full px-2.5 py-1 bg-red-600"><i class="fa-solid fa-trash"></i></button>
                  </div>
                  <button @click="toggleActionBtn(index)" class="z-0 px-2.5 py-1 bg-slate-600 text-white text-sm rounded-full" id="toggleAction"><i class="fa-sharp fa-solid fa-chevron-left" :id="index"></i></button>
                </div>
              </div>
              <h1 class="text-xl text-gray-50">{{ post.title }}</h1>
              <p class="text-sm text-gray-50 font-light">{{ post.content}}</p>
            </div>
          </div>
          <div v-else class="space-y-2">
            <div class="animate-pulse bg-slate-800 space-y-2 py-9 px-5 border border-gray-500 rounded-sm">
              <div class="flex justify-between items-center">
                <div class="h-2 bg-slate-200 rounded-full col-span-2 w-44"></div>
      
              </div>
              <div class="invisible h-3 bg-slate-200 rounded-full mt-10 w-44"></div>
              <div class="space-y-3">
                <div class="grid grid-cols-3 gap-4">
                  <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                  <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                </div>
                <div class="h-2 bg-slate-200 rounded"></div>
              </div>
            </div>
            <div class="animate-pulse bg-slate-800 space-y-2 py-9 px-5 border border-gray-500 rounded-sm">
              <div class="flex justify-between items-center">
                <div class="h-2 bg-slate-200 rounded-full col-span-2 w-44"></div>
      
              </div>
              <div class="invisible h-3 bg-slate-200 rounded-full mt-10 w-44"></div>
              <div class="space-y-3">
                <div class="grid grid-cols-3 gap-4">
                  <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                  <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                </div>
                <div class="h-2 bg-slate-200 rounded"></div>
              </div>
            </div>
            <div class="animate-pulse bg-slate-800 space-y-2 py-9 px-5 border border-gray-500 rounded-sm">
              <div class="flex justify-between items-center">
                <div class="h-2 bg-slate-200 rounded-full col-span-2 w-44"></div>
      
              </div>
              <div class="invisible h-3 bg-slate-200 rounded-full mt-10 w-44"></div>
              <div class="space-y-3">
                <div class="grid grid-cols-3 gap-4">
                  <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                  <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                </div>
                <div class="h-2 bg-slate-200 rounded"></div>
              </div>
            </div>
            <div class="animate-pulse bg-slate-800 space-y-2 py-9 px-5 border border-gray-500 rounded-sm">
              <div class="flex justify-between items-center">
                <div class="h-2 bg-slate-200 rounded-full col-span-2 w-44"></div>
      
              </div>
              <div class="invisible h-3 bg-slate-200 rounded-full mt-10 w-44"></div>
              <div class="space-y-3">
                <div class="grid grid-cols-3 gap-4">
                  <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                  <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                </div>
                <div class="h-2 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>