<template >
    <div class="continer">
        <div class="row">
            <div class="col-md-2" v-bind:key="contact.id" v-for="contact in contacts">
                <ContactItem v-on:del-contact="$emit('del-contact' , contact.id)" v-on:update-contact="updateContact" v-bind:contact="contact"/>
            </div>
        </div>    
    </div>
</template>
<script>
import ContactItem from "./ContactItem"
export default {
    name:"contacts",
    components:{
        ContactItem
    },
    props:["contacts"]
    ,methods:{
         updateContact(contact){
            this.$emit('update-contact',contact)
        }
    }
}
</script>
<style>
    
</style>