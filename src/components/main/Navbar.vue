<script>
export default {
  name: "Navbar",
  methods: {
    toggleLeftSlider() {
      let slider = document.getElementById("leftSlider")
      let sliderWrapper = document.getElementById("leftSliderWrapper")
      console.log(slider.style.left)
      if (slider.style.left == "0px") {
        slider.style.left = "-333px"
        sliderWrapper.style.display = "none"
      } else {
        slider.style.left = "0px"
        sliderWrapper.style.display = "block"
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
    <div class="container" style="padding-left: 0px;">
      <div class="navbar">
        <div class="col-xl-3 logo-xl" style="padding: 6px 0px">
          <div class="logo">
            IT-RADAR
          </div>
        </div>
        <div class="col-xl-3 logo-sm" style="padding: 6px 6px">
          <div class="logo">
            O
          </div>
        </div>
        <div class="col-xl-9 d-flex gap-4 align-items-center justify-content-end">
          <div v-if="$store.state.user.email" class="d-flex gap-2">
            <div class="menu-icon d-flex align-items-center gap-2 mx-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-piggy-bank" viewBox="0 0 16 16">
                <path
                  d="M5 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m1.138-1.496A6.6 6.6 0 0 1 7.964 4.5c.666 0 1.303.097 1.893.273a.5.5 0 0 0 .286-.958A7.6 7.6 0 0 0 7.964 3.5c-.734 0-1.441.103-2.102.292a.5.5 0 1 0 .276.962" />
                <path fill-rule="evenodd"
                  d="M7.964 1.527c-2.977 0-5.571 1.704-6.32 4.125h-.55A1 1 0 0 0 .11 6.824l.254 1.46a1.5 1.5 0 0 0 1.478 1.243h.263c.3.513.688.978 1.145 1.382l-.729 2.477a.5.5 0 0 0 .48.641h2a.5.5 0 0 0 .471-.332l.482-1.351c.635.173 1.31.267 2.011.267.707 0 1.388-.095 2.028-.272l.543 1.372a.5.5 0 0 0 .465.316h2a.5.5 0 0 0 .478-.645l-.761-2.506C13.81 9.895 14.5 8.559 14.5 7.069q0-.218-.02-.431c.261-.11.508-.266.705-.444.315.306.815.306.815-.417 0 .223-.5.223-.461-.026a1 1 0 0 0 .09-.255.7.7 0 0 0-.202-.645.58.58 0 0 0-.707-.098.74.74 0 0 0-.375.562c-.024.243.082.48.32.654a2 2 0 0 1-.259.153c-.534-2.664-3.284-4.595-6.442-4.595M2.516 6.26c.455-2.066 2.667-3.733 5.448-3.733 3.146 0 5.536 2.114 5.536 4.542 0 1.254-.624 2.41-1.67 3.248a.5.5 0 0 0-.165.535l.66 2.175h-.985l-.59-1.487a.5.5 0 0 0-.629-.288c-.661.23-1.39.359-2.157.359a6.6 6.6 0 0 1-2.157-.359.5.5 0 0 0-.635.304l-.525 1.471h-.979l.633-2.15a.5.5 0 0 0-.17-.534 4.65 4.65 0 0 1-1.284-1.541.5.5 0 0 0-.446-.275h-.56a.5.5 0 0 1-.492-.414l-.254-1.46h.933a.5.5 0 0 0 .488-.393m12.621-.857a.6.6 0 0 1-.098.21l-.044-.025c-.146-.09-.157-.175-.152-.223a.24.24 0 0 1 .117-.173c.049-.027.08-.021.113.012a.2.2 0 0 1 .064.199" />
              </svg>
              {{ $store.state.user.coin }}
            </div>
            <div class="menu-icon d-flex align-items-center gap-2 mx-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell"
                viewBox="0 0 16 16">
                <path
                  d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
              </svg>
            </div>
            <div class="avatar">
              <router-link to="/me">
                <img src="https://avatar.iran.liara.run/public/boy" />
              </router-link>
            </div>
          </div>
          <div v-else class="d-flex gap-3">
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
  display: flex;
  align-items: center;
}
</style>