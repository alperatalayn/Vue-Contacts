<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand" to="/">Navbar</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Ana Sayfa</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">Rehber</router-link>
          </li>
        </ul>
        <router-link class="nav-link" to="/login"><i class="fas fa-user"></i></router-link>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: "Navbar",
  methods: {
    showLogin(){

    }
  },
};
</script>
<style lang="">
</style>