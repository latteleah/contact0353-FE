<template>
  <div class="users">

    <!--    search bar-->

    <div class="container-search">
      <div class="search-bar">
        <sui-input fluid action="Search" v-model="search" placeholder="Filter by first/last name" />
      </div>
      <div class="add-button">
        <router-link :to="{path:'adduser'}">
          <sui-button fluid color="orange">+ Add</sui-button>
        </router-link>
      </div>
    </div>

    <!--    body-->

    <div class="container-card">
      <div class="card-box">
        <v-row>
          <v-col cols="4" v-for="auser in filterUsers" v-bind:key="auser.id" class="d-flex">
            <v-card class="elevation-5 flex d-flex flex-column"
                    max-width="374" >
              <v-img
                  :src="getImage(auser.gender)"
                  class="white--text align-end"
                  height="250"
                  width="250"
              ></v-img>
              <v-card-title class="flex-grow-1">{{auser.firstName}}  {{auser.lastName}} </v-card-title>
              <v-card-subtitle class="flex-grow-1">Mobile :{{auser.mobile}}</v-card-subtitle>
              <v-card-subtitle class="flex-grow-1"> Email :{{auser.email}}</v-card-subtitle>
              <v-card-actions>
                <router-link :to="{path:'updateuser' , name: 'updateuser', params: {userId: auser.contactID}}">
                  <button type="button" style="color: white" class="btn btn-primary">Edit</button>
                </router-link>
                <v-spacer></v-spacer>
                <button type="button" style="color: white"  class="btn btn-danger" @click="deleteUser(auser.contactID)">Delete</button>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import Router from "@/router";

export default {
  name: 'Users',
  data() {
    return {
      search: '',
      Users : [],
      maleImages : ["https://nightswinger.github.io/vue-fomantic-ui/images/avatar/large/elliot.jpg",
        "https://nightswinger.github.io/vue-fomantic-ui/images/avatar/large/matthew.png",
        "https://nightswinger.github.io/vue-fomantic-ui/images/avatar/large/steve.jpg"],
      femaleImages : ["https://nightswinger.github.io/vue-fomantic-ui/images/avatar/large/helen.jpg",
        "https://nightswinger.github.io/vue-fomantic-ui/images/avatar/large/stevie.jpg",
        "https://nightswinger.github.io/vue-fomantic-ui/images/avatar/large/molly.png"],
      uid: ''
    }
  },
  mounted() {
    axios.get(process.env.BACKEND_URL+'/users')
        .then((response)=>{
          console.log(response.data)
          this.Users = response.data
        })
        .catch((error)=>{
          console.log(error)
          if(error.response.status === 401){
            window.alert("You are not logged in.")
            this.$router.push('/login')
          }
        })
  },
  computed :{
    filterUsers: function(){
      return this.Users.filter((user)=>{
        let filteredFN = user.firstName.match(new RegExp(this.search, 'i'))
        let filteredLN = user.lastName.match(new RegExp(this.search, 'i'))
        return filteredFN || filteredLN
      })
    }
  },
  methods:{
    deleteUser(UserId) {
      axios.delete(process.env.BACKEND_URL + "/users/"+UserId)
          .then((response)=>{
            console.log('Delete User Id: '+UserId)
            window.location.reload()
          })
          .catch((error)=>{
            console.log(error)
          })
    },
    getImage(gender){
      let arrayIndex = Math.floor(Math.random() * 2);
      console.log(gender)
      console.log(arrayIndex)
      if(gender === 'M'){
        console.log(this.maleImages[arrayIndex])
        return this.maleImages[arrayIndex]
      }
      else{
        return this.femaleImages[arrayIndex]
      }
    }
  }
}
</script>

<style>
.users {
  min-height: 100vh;
  padding-top: 30px;
  display: block;
  align-items: center;
}
.container-search {  display: grid;
  grid-template-columns: 0.2fr 3.4fr 0.2fr 0.2fr;
  grid-template-rows: 0.2fr 2.6fr 0.2fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    ". . . ."
    ". search-bar add-button ."
    ". . . .";
}

.search-bar { grid-area: search-bar; }

.add-button { grid-area: add-button; }


.container-card {  display: grid;
  grid-template-columns: 0.2fr 2.6fr 0.2fr;
  grid-template-rows: 0.2fr 2.6fr 0.2fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    ". . ."
    ". card-box ."
    ". . .";
}

.card-box { grid-area: card-box; }

.card-group {
  padding: 2rem;
}
</style>

