<script setup>
import { onMounted, ref } from 'vue';
import { query, collection, orderBy, onSnapshot, where, getDocs } from 'firebase/firestore'
import { db, auth } from '../firebase/index.js'
import FemaleUserIcon from '../assets/images/female-user.png'
import MaleUserIcon from '../assets/images/male-user.png'
import { RouterLink } from 'vue-router';
import { onAuthStateChanged } from 'firebase/auth';

onMounted(async () => {

    // onAuthStateChanged(auth, async (user) => {
    //     const currentUser = query(collection(db, 'authors'), where('uid', '==', user.uid))

    //     const snapshot = await getDocs(currentUser)

    //     snapshot.docs.map((docs) => {
    //         currentUser.value = docs.data().user_id
    //     })
    // })
    const authors = query(collection(db, 'authors'), orderBy('fname', 'asc'))

    onSnapshot(authors, async (querySnapshot) => {
        
        let authorsTmp = []
        await Promise.all(querySnapshot.docs.map(async(doc) => {

            const id = doc.data().user_id
            // console.log(user_id)
            const postsRef = collection(db, 'posts')
            const q = query(postsRef, where('user_id', '==', id))
            const querySnapshot = await getDocs(q);
            const count = querySnapshot.size

            const author = {
                id: doc.id,
                user_id: doc.data().user_id,
                fname: doc.data().fname,
                lname: doc.data().lname,
                gender: doc.data().gender,
                email: doc.data().email,
                postCount: count
            }

            // console.log(author)

            authorsTmp.push(author)
        }))
        // console.log(authorsTmp)
        authorsObj.value = authorsTmp
        loading.value = false
        console.log(authorsObj.value)
    })
})

// const currentUser = ref('')
const authorsObj = ref([])
const loading = ref(true)

</script>

<template>
    <div class="w-1/2 mx-auto mt-5 p-4 h-auto">
        <h1 class="text-2xl text-white">All Authors ({{ authorsObj.length }})</h1>
        <hr class="mt-3 mb-5">
        <div v-if="!loading.value" >
            <div v-if="authorsObj" class="grid grid-cols-3 gap-4">
                <div v-for="(author, index) in authorsObj " :key="index" class="rounded-md bg-white h-auto">
                    <div class="relative flex w-full rounded-t-md h-[100px]" :class="{'bg-pink-300' : author.gender === 'Female', 'bg-blue-300' : author.gender !== 'Female'}">
                        <img v-if="author.gender === 'Female'" :src="FemaleUserIcon" class="absolute w-24 top-10 left-[100px] border-4 border-white outline outline-pink-300 rounded-full" alt="FemaleUserIcon">
                        <img v-else :src="MaleUserIcon" alt="" class="absolute w-24 top-10 left-[100px] border-4 border-white outline outline-blue-300 rounded-full">
                    </div>

                    <h1 class="text-base text-center font-semibold mt-10">{{ author.fname }} {{ author.lname }}</h1>
                    <p class="mt-2 text-2xl font-bold text-center">
                        <span v-if="author.postCount > 1">{{ author.postCount}} posts</span>
                        <span v-else>{{ author.postCount}} post</span>
                    </p>
                    <div class="flex justify-center mb-4">
                        <!-- <RouterLink v-if="author.user_id === currentUser" to="/my-posts" class="text-sm"><i class="fa-solid fa-eye"></i> &nbsp;View</RouterLink> -->
                        <RouterLink :to="`/${author.user_id}/view-author`" class="text-sm hover:text-blue-400"><i class="fa-solid fa-eye"></i>&nbsp;View</RouterLink>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="text-white text-xl">Loading...</div>
    </div>
</template>