<template>
    <div class="alert">
      <span class="closebtn" @click="closeAlert"
        >&times;</span
      >
      <strong>Uyarı!</strong>
      {{alert}} 
    </div>
</template>
<script>
export default {
    name:"Alert",
    props:["alert"],
    methods: {
        closeAlert(){
            document.getElementsByClassName()
        }
    },
};
</script>
<style>
.alert {
  padding: 20px;
  background-color: #f44336;
  color: white;
}

.closebtn {
  margin-left: 15px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.closebtn:hover {
  color: black;
}
</style>