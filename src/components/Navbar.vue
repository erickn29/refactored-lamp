<script>
export default {
  name: "Navbar",
  methods: {
    toggleLeftSlider() {
      let slider = document.getElementById("leftSlider")
      console.log(slider.style.left)
      if (slider.style.left == "0px") {
        slider.style.left = "-333px"
      } else {
        slider.style.left = "0px"
      }
    },
  }
}
</script>

<template>
  <nav class="sticky-top d-flex">
    <div id="burger-button" @click="toggleLeftSlider">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-list"
        viewBox="0 0 16 16">
        <path fill-rule="evenodd"
          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
      </svg>
    </div>
    <div class="container" style="margin-left: 0; padding-left: 0px;">
      <div class="navbar">
        <div class="col-lg-3" style="padding: 6px 6px">
          <div class="logo">
            IT-RADAR
          </div>
        </div>
        <div class="col-lg-9 d-flex gap-4 align-items-center justify-content-center">
          <div v-if="$store.state.user.email">
            <div class="nav-links">
              {{ $store.state.user.email }}
            </div>
          </div>
          <div v-else class="d-flex gap-4">
            <div class="nav-links">
              <router-link to="/login">
                <text>Вход</text>
              </router-link>
            </div>
            <div class="nav-links">
              <router-link to="/registration">
                <text>Регистрация</text>
              </router-link>
            </div>
          </div>
        </div>
      </div>

    </div>
  </nav>
</template>

<style>
/* nav {
  width: 100%;
  background: #ffffffa8;
  color: #000;
  backdrop-filter: blur(20px);
  font-family: "Montserrat", sans-serif !important;
  box-shadow: 0 0 20px #0000001a;
} */

.logo {
  font-weight: 800;
  color: #ddd;
  font-size: 1.5rem;
}

.nav-links {
  font-weight: 900;
}
</style>