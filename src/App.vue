<script>
import VacancyList from "./components/vacancy/VacancyList.vue"
import Filter from "./components/vacancy/Filter.vue"
import Navbar from "./components/Navbar.vue"

export default {
  components: {
    VacancyList,
    Filter,
    Navbar,
  },
}
</script>

<template>
  <Navbar />
  <div class="container">
    <main>
      <VacancyList/>
    </main>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap");

body {
}

main {
  font-family: "Montserrat", sans-serif;
}
.shadow-box {
  box-shadow: 0 0 20px #00000012 !important;
}
.button-accept {
  border-radius: 3px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  padding: 5px 10px;
  background: #8328D1;
  color: white;
  transition: .2s;
  font-weight: 600;
}
.button-accept:hover {
  background: #7825bf;
  transition: .2s;
}
.button-warning {
  border-radius: 3px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  padding: 5px 10px;
  background: #D16028;
  color: white;
  transition: .2s;
  font-weight: 600;
}
.button-warning:hover {
  background: #bb5725;
  transition: .2s;
}
</style>
