<script setup>
import { ref, onMounted } from 'vue';
import { db, auth } from '../firebase/index.js'
import { collection, addDoc, serverTimestamp, getDocs, query, where} from 'firebase/firestore'
import router from '../router';
import { onAuthStateChanged } from '@firebase/auth';

onMounted(() => {
    
    onAuthStateChanged(auth, async (user) => {
        const querySnapshot = await getDocs(query(collection(db, "authors"), where("uid", "==", user.uid)));

        querySnapshot.forEach((doc) => {
            // console.log(doc.data())
            userId.value = doc.data().user_id
        })

        console.log(userId.value)
    })
})

const userId = ref('')
const title = ref('')
const text = ref('')
const category = ref('')
const isShown = ref(false)
const isPublished = ref(false)

const createPost = () => {

    if(title.value != '' && text.value != '' && category.value != '') {

        addDoc(collection(db, 'posts'), {
            user_id: userId.value,
            title: title.value,
            text: text.value,
            category: category.value,
            created_at: serverTimestamp()
        })

        isShown.value = !isShown.value

        setTimeout(()=>{
            isShown.value = !isShown.value
            isPublished.value = !isPublished.value
            setTimeout(() => {
                isPublished.value = !isPublished.value
            }, 1000)

            title.value = ''
            text.value = ''
            category.value = ''
            router.push('/')
        }, 2000)
    }
}
</script>

<template>
    <div class="w-2/5 mx-auto mt-3 p-4 h-auto">
        <h1 class="text-xl text-gray-300">Create a post</h1>
        <hr class="mt-3 mb-3">
        <div class="w-full bg-slate-800 p-4 rounded-lg">
            <input v-model="title" class="w-full py-1 px-1.5 rounded-sm bg-slate-800 border border-gray-600 hover:border-gray-300 text-white text-sm" type="text" placeholder="Title">
            <textarea v-model="text" class="w-full py-1 px-1.5 rounded-sm bg-slate-800 border border-gray-600 hover:border-gray-300 text-white text-sm mt-3" name="" id="" cols="30" rows="10" placeholder="Text"></textarea>
            <div class="flex items-center space-x-2 mt-2">
                <p class="text-sm text-white">Category: </p>
                <div class="grid grid-cols-5 gap-2">
                    <input v-model="category" class="hidden" name="category" type="radio" value="Adventure" id="adventure" >
                    <label for="adventure" :class="{ 'bg-blue-600 border-none' : category === 'Adventure', 'border border-gray-100' : category !== 'Adventure'}" class="px-2 py-1 text-white text-sm rounded-xl select-none" id="adventureLabel">
                        <i class="fa-solid" :class="{ 'fa-check' : category === 'Adventure', 'fa-plus' : category !== 'Adventure'}" id="icon1"></i> Adventure
                    </label>
                    <input v-model="category" class="hidden" name="category" type="radio" value="Business" id="business" >
                    <label for="business"  :class="{ 'bg-orange-600 border-none' : category === 'Business', 'border border-gray-100' : category !== 'Business'}" class="px-2 py-1 text-white text-sm rounded-xl select-none" id="businessLabel">
                        <i class="fa-solid" :class="{ 'fa-check' : category === 'Business', 'fa-plus' : category !== 'Business'}"  id="icon2"></i> Business
                    </label>
                    <input v-model="category" class="hidden" name="category" type="radio" value="Comedy" id="comedy" >
                    <label for="comedy"  :class="{ 'bg-green-600 border-none' : category === 'Comedy', 'border border-gray-100' : category !== 'Comedy'}" class="px-2 py-1 text-white text-sm rounded-xl select-none" id="comedyLabel">
                        <i class="fa-solid" :class="{ 'fa-check' : category === 'Comedy', 'fa-plus' : category !== 'Comedy'}"  id="icon2"></i> Comedy
                    </label>
                    <input v-model="category" class="hidden" name="category" type="radio" value="Drama" id="drama" >
                    <label for="drama"  :class="{ 'bg-purple-600 border-none' : category === 'Drama', 'border border-gray-100' : category !== 'Drama'}" class="px-2 py-1 text-white text-sm rounded-xl select-none" id="dramaLabel">
                        <i class="fa-solid" :class="{ 'fa-check' : category === 'Drama', 'fa-plus' : category !== 'Drama'}"  id="icon2"></i> Drama
                    </label>
                    <input v-model="category" class="hidden" name="category" type="radio" value="Horror" id="horror" >
                    <label for="horror"  :class="{ 'bg-red-600 border-none' : category === 'Horror', 'border border-gray-100' : category !== 'Horror'}" class="px-2 py-1 text-white text-sm rounded-xl select-none" id="horrorLabel">
                        <i class="fa-solid" :class="{ 'fa-check' : category === 'Horror', 'fa-plus' : category !== 'Horror'}"  id="icon2"></i> Horror
                    </label>
                    <input v-model="category" class="hidden" name="category" type="radio" value="Politics" id="politics" >
                    <label for="politics"  :class="{ 'bg-fuchsia-600 border-none' : category === 'Politics', 'border border-gray-100' : category !== 'Politics'}" class="px-2 py-1 text-white text-sm rounded-xl select-none" id="politicsLabel">
                        <i class="fa-solid" :class="{ 'fa-check' : category === 'Politics', 'fa-plus' : category !== 'Politics'}"  id="icon2"></i> Politics
                    </label>
                    <input v-model="category" class="hidden" name="category" type="radio" value="Religion" id="religion" >
                    <label for="religion"  :class="{ 'bg-fuchsia-600 border-none' : category === 'Religion', 'border border-gray-100' : category !== 'Religion'}" class="px-2 py-1 text-white text-sm rounded-xl select-none" id="religionLabel">
                        <i class="fa-solid" :class="{ 'fa-check' : category === 'Religion', 'fa-plus' : category !== 'Religion'}"  id="icon2"></i> Religion
                    </label>
                    <input v-model="category" class="hidden" name="category" type="radio" value="Romance" id="romance" >
                    <label for="romance"  :class="{ 'bg-pink-600 border-none' : category === 'Romance', 'border border-gray-100' : category !== 'Romance'}" class="px-2 py-1 text-white text-sm rounded-xl select-none" id="romanceLabel">
                        <i class="fa-solid" :class="{ 'fa-check' : category === 'Romance', 'fa-plus' : category !== 'Romance'}"  id="icon2"></i> Romance
                    </label>
                </div>
            </div>
            <hr class="mt-3 mb-3" style="border-style: solid 1px; border-color: #475569;">
            <div class="flex flex-row-reverse">
                <button @click="createPost" class="px-4 py-1 text-white text-base rounded-xl bg-gray-600 hover:bg-gray-500">
                    <div v-if="!isPublished">
                        <span v-if="isShown"><i class="animate-spin fa-solid fa-spinner"></i> Publishing...</span>
                        <span v-else>Publish</span>
                    </div>
                    <span class="text-sm" v-if="isPublished">Published <i class="fa-solid fa-check"></i></span>
                </button>
            </div>
        </div>
    </div>
</template>

<style>
.select-none {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>