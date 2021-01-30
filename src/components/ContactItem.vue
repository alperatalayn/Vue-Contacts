<template>
  <div>
    <div class="contact-box center-version">
      <a>
        <img
          alt="image"
          class="img-circle"
          src="https://bootdey.com/img/Content/avatar/avatar1.png"
        />
        <h3 class="m-b-xs">
          <strong>{{ contact.first_name }} {{ contact.last_name }}</strong>
        </h3>
        <address class="m-t-md">
          <abbr title="Phone">Tel:</abbr> {{ contact.phone }}
        </address>
        <address class="m-t-md">
          <abbr title="Phone">İş:</abbr> {{ contact.job }}
        </address>
        <address class="m-t-md">
          <abbr title="Phone">Adres:</abbr>
          <div v-bind:key="adress.id" v-for="adress in contact.adresses">
            {{ adress.title }}
            {{ adress.content }}
          </div>
        </address>
      </a>
      <div class="contact-box-footer">
        <div class="m-t-xs btn-group align-items-center">
          <button @click="openForm" class="btn rounded small-btn btn-primary">
            <i class="fas fa-pen"></i>
          </button>
          <button class="btn rounded medium-btn btn-success">
            <i class="fa fa-phone"></i>
          </button>
          <button
            @click="$emit('del-contact', contact.id)"
            class="btn rounded small-btn btn-danger"
          >
            <i class="fa fa-trash-alt"></i>
          </button>
        </div>
      </div>
      <UpdateForm
        v-on:update-contact="updateContact"
        v-bind:class="{ active: isFormActive }"
        class="input-form"
        v-bind:contact="contact"
      />
    </div>
  </div>
</template>
<script>
import UpdateForm from "./UpdateForm";
export default {
  name: "contact-item",
  methods: {
    openForm() {
      let forms = document.getElementsByClassName("active");
      forms = Array.from(forms);
      if (forms.length !== 0) {
        forms.forEach((element) => {
          element.classList.remove("active");
          element.classList.add("input-form");
        });
      }

      this.isFormActive = !this.isFormActive;
    },
    updateContact(contact) {
      this.$emit("update-contact", contact);
    },
  },
  components: { UpdateForm },
  props: ["contact"],
  data() {
    return {
      isFormActive: false,
    };
  },
};
</script>
<style scoped>
body {
  margin-top: 20px;
  background: #eee;
}
.medium-btn {
  width: 50px;
  height: 50px;
  border-radius: 50% !important;
  text-align: center !important;
  margin: 10px;
}
.small-btn {
  width: 30px;
  height: 30px;
  border-radius: 50% !important;
  text-align: center !important;
  margin: 10px;
  font-size: 12px;
}
.contact-box {
  background-color: #ffffff;
  border: 1px solid #e7eaec;
  padding: 20px;
  margin-bottom: 20px;
}
.contact-box > a {
  color: inherit;
}
.contact-box.center-version {
  border: 1px solid #e7eaec;
  padding: 0;
}
.contact-box.center-version > a {
  display: block;
  background-color: #ffffff;
  padding: 20px;
  text-align: left;
}
.contact-box.center-version > a img {
  width: 80px;
  height: 80px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.contact-box.center-version address {
  margin-bottom: 0;
}
.contact-box .contact-box-footer {
  background-color: #ffffff;
  border-top: 1px solid #e7eaec;
}
a {
  text-decoration: none !important;
}
.input-form {
  display: none;
  z-index: 999;
}
.active {
  display: block;
}
</style>