<template>
    <Navigation/>
    <section class="container">
        <div class="container mt-4 mb-4 p-3 d-flex justify-content-center"> 
            <div class="profile_card p-4"> 
                <div class=" image d-flex flex-column justify-content-center align-items-center"> 
                    <button class="btn btn-secondary"> 
                        <img src="../assets/images/img_1.png" height="100" width="100" /></button> 
                        <span :class="username">{{storeUser.username}}</span> <span :class="email">{{storeUser.email}}</span> 
                        <div class="d-flex flex-row justify-content-center align-items-center gap-2"> 
                        </div> <div class="d-flex flex-row justify-content-center align-items-center mt-3"> 
                            <span class="number">10 mill <span class="follow">Followers</span></span> </div> 
                            <div class=" d-flex mt-2"> <button class="btn1 btn-dark">Edit Profile</button> </div> 
                            <div class="text mt-3"> <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, expedita?<br><br>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, autem?</span> </div> <div class="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center"> <span><i class="fa fa-twitter"></i></span> <span><i class="fa fa-facebook-f"></i></span> <span><i class="fa fa-instagram"></i></span> <span><i class="fa fa-linkedin"></i></span> </div> <div class=" px-2 rounded mt-4 date "> 
                                <span class="join">Joined in jan 2023</span> </div> </div> </div>
</div>
    </section>
</template>
<script setup>
    import Navigation from '../components/Navigation.vue';
    
    import { computed } from 'vue';
 import { useUserStore } from '@/stores/user.js';
/*  import { onAuthStateChanged, signOut} from "firebase/auth";
 */




const storeUser = useUserStore();


const username = computed(() => {
  return storeUser.username
})

const email = computed(() => {
  return storeUser.email
})


</script>
<style>
* {
    margin: 0;
    padding: 0
}

body {
    background-color: #000
}

.profile_card {
    width: 350px;
    background-color: #f5f5f5;
    border: none;
    cursor: pointer;
    transition: all 0.5s;
    
}

.image img {
    transition: all 0.5s;
    border-radius: 50%;
}

.card:hover .image img {
    transform: scale(1.5)
}

.btn {
    height: 140px;
    width: 140px;
    border-radius: 50%
}

.name {
    font-size: 22px;
    font-weight: bold
}

.idd {
    font-size: 14px;
    font-weight: 600
}

.idd1 {
    font-size: 12px
}

.number {
    font-size: 22px;
    font-weight: bold
}

.follow {
    font-size: 12px;
    font-weight: 500;
    color: #444444
}

.btn1 {
    height: 40px;
    width: 150px;
    border: none;
    background-color: #000;
    color: #aeaeae;
    font-size: 15px
}

.text span {
    font-size: 13px;
    color: #545454;
    font-weight: 500
}

.icons i {
    font-size: 19px
}

hr .new1 {
    border: 1px solid
}

.join {
    font-size: 14px;
    color: #a0a0a0;
    font-weight: bold
}

.date {
    background-color: #ccc
}
</style>
   