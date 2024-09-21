<script>
export default {
  name: "Navbar"
}
</script>

<template>
  <nav class="sticky-top">
    <div class="container">
      <div class="navbar">
        <div class="col-lg-3" style="padding: 6px 12px">
          <div class="logo">
            IT-RADAR
          </div>
        </div>
        <div class="col-lg-9 d-flex gap-4 align-items-center justify-content-center">
          <div class="nav-links">
            <router-link to="/">
              <text>Вакансии</text>
            </router-link>
          </div>
          <div class="nav-links">
            <router-link to="/">
              <text>Статистика</text>
            </router-link>
          </div>
          <div class="nav-links">
            <router-link to="/interview">
              <text>Собеседование</text>
            </router-link>
          </div>
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