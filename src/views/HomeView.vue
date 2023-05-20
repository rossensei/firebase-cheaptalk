<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { db, auth } from '../firebase/index.js'
import { collection, deleteDoc, addDoc, onSnapshot, where, getDocs, query, orderBy, QuerySnapshot, Timestamp, collectionGroup } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

onMounted(async () => {

  onAuthStateChanged(auth, async (user) => {
    if(user) {
      const q = query(collection(db, "authors"), where("uid", "==", user.uid));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        fname.value = doc.data().fname
        lname.value = doc.data().lname
        gender.value = doc.data().gender
        email.value = doc.data().email
      });
    } else {

    }
  })

  const q = query(collection(db, 'posts'))

  onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // console.log(doc.data())

        const post_author = query(collection(db, 'authors'), where('user_id', '==', doc.data().user_id))

        onSnapshot(post_author, (querySnapshot) => {
          let postsTmp = []
          querySnapshot.forEach((authorsDoc) => {
            // console.log(authorsDoc.data())

            const timestampObj = doc.data().created_at;
            if(timestampObj) {
              // console.log(timestampObj.toDate())
              const date = timestampObj.toDate()

              const dateOptions = { month: 'short', day: 'numeric', year: 'numeric' };
              const timeOptions = { hour: 'numeric', minute: 'numeric' };
              const dateString = date.toLocaleDateString('en-US', dateOptions);
              const timeString = date.toLocaleTimeString('en-US', timeOptions);

              // console.log(dateString + ' ' + timeString)

              const post = {
                id: doc.id,
                title: doc.data().title,
                text: doc.data().text,
                category: doc.data().category,
                created_at: dateString,
                author: {
                  fname: authorsDoc.data().fname,
                  lname: authorsDoc.data().lname,
                  gender: authorsDoc.data().gender,
                  email: authorsDoc.data().email,
                }
              }

              // console.log(post)
            
              posts.value.push(post)

              // console.log(posts.value )
            } else {
              console.log('timestamp obj is undefined or null')
            }

            // console.log(posts.value )
          })
        })
    })
  })

  setTimeout(()=>{
    isShown.value = !isShown.value
  }, 700)
  
})

const posts = ref([])
const isShown = ref(false)

//current user informations
const fname = ref('')
const lname = ref('')
const gender = ref('')
const email = ref('')


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
  <div class="w-1/2 mx-auto mt-3 p-4 h-auto">
    <div class="grid grid-cols-1 gap-4">
      <div class="flex bg-slate-800 p-3 space-x-2 border border-gray-500 rounded-sm">
        <RouterLink to="/profile" class="rounded-full">
          <img v-if="gender === 'Male'" class="w-8" src="../assets/images/male-user.png" alt="">
          <img v-else class="w-8" src="../assets/images/female-user.png" alt="">
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
        <div v-for="(post, index) in posts" :key="index" class="p-2 rounded-md bg-slate-800 border border-gray-500 hover:border-gray-300">
            <div class="flex justify-between items-start">
                <div class="flex space-x-2">
                    <div>
                        <img v-if="post.author.gender === 'Male'" class="w-12" src="../assets/images/male-user.png" alt="">
                        <img v-else class="w-12" src="../assets/images/female-user.png" alt="">
                    </div>

                    <div class="block text-start">
                        <p class="text-md font-semibold flex" :class="{ 'text-pink-300' : post.author.gender === 'Female', 'text-blue-300' : post.author.gender !== 'Female'}">{{ post.author.fname }} {{ post.author.lname }}</p>
                        <p class="text-sm text-white font-light">{{ post.created_at }} &#8226; {{ post.category }}</p>
                    </div>
                </div>
            </div>
            <p class="text-xl text-white font-normal mt-2">{{ post.title }}</p>
            <p class="text-base text-white font-normal mt-2">{{ post.text }}</p>
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