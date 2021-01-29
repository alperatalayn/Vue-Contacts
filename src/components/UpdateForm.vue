<template>
  <div class="container">
   <div class="row">
      <div class="col-md-5 mx-auto">
         <div id="first">
            <div class="myform form ">
               <form @submit="updateContact" name="create">
                  <div class="form-group">
                     <label for="first-name">İsim</label>
                     <input type="text" v-model=first_name class="form-control" id="first-name" placeholder="İsim Girin" required>
                  </div>
                  <div class="form-group">
                     <label for="last-name">Soyisim</label>
                     <input type="text" v-model=last_name class="form-control" id="last-name" placeholder="Soyisim Girin" required>
                  </div>
                  <div class="form-group">
                     <label for="phone">Telefon Numarası</label>
                     <input type="number" id="phone" v-model=phone class="form-control" placeholder="Telefon Numarası Girin" required>
                  </div>
                  <div class="col-md-12 text-center ">
                     <button type="submit" class=" btn btn-block mybtn btn-primary tx-tfm">Kaydet</button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   </div>
</div>
</template>

<script>
export default {
   
  name: "UpdateForm",
  methods: {
    updateContact(e) {
      e.preventDefault();
      const newContact={
         id:this.contact.id,
         first_name:this.first_name,
         last_name:this.last_name,
         phone: this.phone
      }
      
      console.log(newContact,"new")
      this.$emit('update-contact',newContact)
    },
  },
  data(){
     return{
        first_name:this.contact.first_name,
        last_name:this.contact.last_name,
        phone:this.contact.phone
      }
  },
  props:["contact"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body{
      padding-top:4.2rem;
      padding-bottom:4.2rem;
      background:rgba(0, 0, 0, 0.76);
    }
    a{
      text-decoration:none !important;
      }
      h1,h2,h3{
      font-family: 'Kaushan Script', cursive;
      }
      .myform{
    position: relative;
    display: -ms-flexbox;
    display: block;
    padding: 1rem;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 250px;
    pointer-events: auto;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,.2);
    border-radius: 1.1rem;
    outline: 0;
    max-width: 500px;
    }
    .tx-tfm{
    text-transform:uppercase;
    }
    .mybtn{
    border-radius:50px;
    }
  
    .login-or {
    position: relative;
    color: #aaa;
    margin-top: 10px;
    margin-bottom: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    }
    .span-or {
    display: block;
    position: absolute;
    left: 50%;
    top: -2px;
    margin-left: -25px;
    background-color: #fff;
    width: 50px;
    text-align: center;
    }
    .hr-or {
    height: 1px;
    margin-top: 0px !important;
    margin-bottom: 0px !important;
    }
    .google {
    color:#666;
    width:100%;
    height:40px;
    text-align:center;
    outline:none;
    border: 1px solid lightgrey;
    }
    form .error {
    color: #ff0000;
    }
    #second{display:none;}
</style>
