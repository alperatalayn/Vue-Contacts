<template>
  <div class="home">
    <h1>{{test}}</h1>
    <button id="button" class="add-btn btn-primary rounded-circle border-0" @click="openForm"><i class="fas fa-plus"/></button>
    <CreateForm v-on:add-contact="addContact" v-bind:class="{'active': isFormActive}" class="input-form"/>
    <Contacts v-on:del-contact="deleteContact" v-on:update-contact="updateContact" v-bind:contacts="contacts" class="pt-30"/>
  </div>
</template>

<script>
// @ is an alias to /src
import CreateForm from "../components/CreateForm"
import Contacts from "../components/Contacts"
import axios from "axios"

const api_url = "http://127.0.0.1:7000/api/"
export default {
  name: 'Home',
  components: {
    CreateForm,
    Contacts
  },
  methods:{
    openForm(){
      this.isFormActive =!this.isFormActive
      if(this.isFormActive){
        document.getElementById("button").classList.remove("btn-primary")
        document.getElementById("button").classList.add("btn-danger")
        document.getElementById("button").innerHTML=`<i class="fas fa-times"/>`
      }
      else{
        document.getElementById("button").classList.remove("btn-danger")
        document.getElementById("button").classList.add("btn-primary")
        document.getElementById("button").innerHTML=`<i class="fas fa-plus"/>`
      }
    },
    deleteContact(id){
      axios.delete(`${api_url}delete/${id}`)
      .then(res=>{
        this.contacts.splice(this.contacts.findIndex(x=> x.id===id),1);
        console.log(res.data);
        })
      .catch(err=> console.log(err));
    },
    addContact(contact){
      const {first_name,last_name,phone}=contact
      if (this.contacts.some(e => e.first_name === contact.first_name && e.last_name === contact.last_name)) {
        alert("aynı isimde bir kayıt zaten var")
      }else{
      axios.post(`${api_url}create/`,{first_name,last_name,phone})
      .then(res=>this.contacts=[...this.contacts,res.data])
      .catch(err=> console.log(err));
      }
    },
    updateContact(contact){
      
      const {id,first_name,last_name,phone}=contact
      if (this.contacts.some(e => e.first_name === contact.first_name && e.last_name === contact.last_name && e.phone === contact.phone)) {
        alert("aynı isimde bir kayıt zaten var")
      }else{
      
      axios.post(`${api_url}update/${id}`,{first_name,last_name,phone})
      .then(res=>{
        this.contacts.splice(this.contacts.findIndex(x=> x.id===id),1);
        this.contacts=[...this.contacts,res.data]
        })
      .catch(err=> console.log(err));
      }
    },
  },
  created() {
      axios.get(`${api_url}contact-list/`)
      .then(res=>{
          if(res.data !== null)
          this.contacts = res.data
        })
      .catch(err=> console.log(err));
    },
  data(){
    return {
      isFormActive: false,
      contacts:[],
      test :""
      }
  }
}
</script>
<style scoped>
  .add-btn{
    width: 100px;
    height: 100px;
    margin: 50px;
    font-size: 50px;
  }
  .input-form{
    display: none;
  }
  .active{
    display: block;
  }
  .pt-30{
    padding-top: 30px;
  }
</style>
