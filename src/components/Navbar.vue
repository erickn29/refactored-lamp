<script>
export default {
  name: "Navbar"
}
</script>

<template>
  <nav class="sticky-top">
    <div class="container">
      <div class="row">
        <div class="navbar col-lg-3" style="padding: 6px 12px">
          <div class="logo">
            IT-RADAR
          </div>
        </div>
        <div class="col-lg-9 d-flex gap-4 align-items-center">
          <div class="nav-links">
            <a href="/">Вакансии</a>
          </div>
          <div class="nav-links">
            <a href="/stats">Статистика</a>
          </div>
          <div class="nav-links">
            <a href="/interview">Собеседование</a>
          </div>
          <div class="nav-links">
            <a href="/registration">Регистрация</a>
          </div>
          <div class="nav-links">
            <a href="/login">Логин</a>
          </div>
        </div>
      </div>

    </div>
  </nav>
</template>

<style>
nav {
  width: 100%;
  background: #ffffffa8;
  color: #000;
  backdrop-filter: blur(20px);
  font-family: "Montserrat", sans-serif !important;
  box-shadow: 0 0 20px #0000001a;
}

.logo {
  font-weight: 800;
  color: #4b0885;
  font-size: 1.5rem;
}

.nav-links {
  font-weight: 700;
}

</style>