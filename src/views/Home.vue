<template>
  <div class="home">
    <h1>{{test}}</h1>
    <button id="button" class="add-btn btn-primary rounded-circle border-0" @click="openForm"><i class="fas fa-plus"/></button>
    <CreateForm v-on:add-contact="addContact" v-bind:class="{'active': isFormActive}" class="input-form"/>
    <Contacts v-on:del-contact="deleteContact" v-on:update-contact="updateContact" v-bind:contacts="contacts" class="pt-30"/>
    <button id="button" class="add-btn btn-primary rounded-circle border-0" @click="getPdf"><i class="fas fa-file-pdf"/></button>
  </div>
</template>

<script>
// @ is an alias to /src
import CreateForm from "../components/CreateForm"
import Contacts from "../components/Contacts"
import {deleteContactById,createContact, updateContactById, getContacts, getReport} from "../api"

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
    async deleteContact(id){
      await deleteContactById(id)
      this.contacts.splice(this.contacts.findIndex(x=> x.id===id),1);
    },
    async addContact(contact){
      if (this.contacts.some(e => e.first_name === contact.first_name && e.last_name === contact.last_name && e.phone === contact.phone)) {
        alert("aynı isimde bir kayıt zaten var")
      }else{
        const newContact = await createContact(contact)
        this.contacts=[...this.contacts,newContact]
      }
    },
    async updateContact(contact){
        const updatedContact =  await updateContactById(contact)
        console.log(updatedContact)
        this.contacts.splice(this.contacts.findIndex(x=> x.id===updatedContact.id),1);
        this.contacts=[...this.contacts,updatedContact]
    },
    async getPdf(){
      await getReport();
    }
  },
    async created () {
      this.contacts =  await getContacts()
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
