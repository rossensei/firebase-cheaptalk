<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { collection, query, onSnapshot, where, orderBy} from 'firebase/firestore'
import { db } from '../firebase/index.js'
import FemaleUserIcon from '../assets/images/female-user.png'
import MaleUserIcon from '../assets/images/male-user.png'

onMounted(() => {
    const route = useRoute()
    const author_id = route.params.id

    const postsRef = collection(db, 'posts')
    const authorRef = collection(db, 'authors')

    const q1 = query(postsRef, where('user_id', '==', author_id), orderBy('created_at', 'desc'))
    const q2 = query(authorRef, where('user_id', '==', author_id))

    onSnapshot(q2, (querySnapshot) => {
        querySnapshot.docs.map((docs) => {
            currentAuthor.value = docs.data().fname + ' ' + docs.data().lname
            // console.log(currentAuthor.value)
            currentAuthGender.value = docs.data().gender
            currentAuthEmail.value = docs.data().email
        })
    })

    onSnapshot(q1, (querySnapshot) => {
        let postsTmp = []
        querySnapshot.forEach((doc) => {

            const post = {
                user_id: doc.data().user_id,
                title: doc.data().title,
                text: doc.data().text,
                category: doc.data().category,
                created_at: doc.data().created_at,
            }

            postsTmp.push(post)
        })
        console.log(postsTmp)
        posts.value = postsTmp
    })
})

const currentAuthor = ref('')
const currentAuthGender = ref('')
const currentAuthEmail = ref('')
const posts = ref([])

var options = { month: 'long', day: 'numeric', year: 'numeric' };

</script>

<template>
    <div class="w-1/2 mx-auto p-4 h-auto">
        <div class="h-auto bg-white rounded-b-lg pb-4">
            <div class="relative w-full h-[100px]" :class="{'bg-pink-300' : currentAuthGender === 'Female', 'bg-blue-300' : currentAuthGender !== 'Female'}">
                <img v-if="currentAuthGender === 'Female'" :src="FemaleUserIcon" class="absolute w-28 top-16 left-[20px] border-4 border-white outline outline-pink-300 rounded-full" alt="FemaleUserIcon">
                <img v-else :src="MaleUserIcon" alt="" class="absolute w-28 top-16 left-[20px] border-4 border-white outline outline-blue-300 rounded-full">
            </div>
            <div class="ml-[140px]">
                <h1 class="text-2xl text-black font-semibold">{{ currentAuthor }}</h1>
                <p class="text-sm text-black font-light">{{ currentAuthEmail }}</p>
                <p v-if="posts.length > 1" class="text-sm text-black font-light"> {{ posts.length }} posts </p>
                <p v-else class="text-sm text-black font-light"> {{ posts.length }} post</p>
            </div>
        </div>
        <hr class="mt-2 mb-3">
        <div class="grid grid-cols-1 gap-2">
            <h1 class="text-xl font-semibold text-white">Recent posts</h1>
            <div v-for="(post, index) in posts" :key="index" class="p-2 rounded-md bg-slate-800 border border-gray-500 hover:border-gray-300">
                <div class="flex justify-between items-start">
                    <div class="flex space-x-2">
                        <div>
                            <img v-if="currentAuthGender === 'Male'" class="w-12" src="../assets/images/male-user.png" alt="">
                            <img v-else class="w-12" src="../assets/images/female-user.png" alt="">
                        </div>
    
                        <div class="block text-start">
                            <p class="text-md text-white font-semibold flex">{{ currentAuthor }} </p>
                            <p class="text-sm text-white font-light">{{ post.created_at.toDate().toLocaleDateString('en-US', options) }} &#8226; {{ post.category }}</p>
                        </div>
                    </div>

                    <!-- <div class="relative">
                        <button @click="toggleDropdown()" class="px-[6px] py-[2px] rounded-full text-white hover:bg-gray-500"><i class="fa-solid fa-ellipsis"></i></button>

                        post option dropdown
                        <div v-if="showElement" class="absolute p-2 w-32 top-6 right-2 bg-white rounded-md" name="actionDropdown" :id="'optionDropdown' + index">
                            <ul class="text-center ">
                                <li class="hover:bg-gray-300 rounded-sm text-base">Delete</li>
                                <li class="hover:bg-gray-300 rounded-sm text-base">Edit</li>
                            </ul>
                        </div>
                    </div> -->
                </div>
                <p class="text-xl text-white font-normal mt-2">{{ post.title }}</p>
                <p class="text-base text-white font-normal mt-2">{{ post.text }}</p>
            </div>
        </div>
    </div>
</template>