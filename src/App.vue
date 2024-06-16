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
  font-family: "Montserrat", sans-serif !important;
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
.button-accept-outline {
  border-radius: 3px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  padding: 5px 10px;
  background: white;
  color: #8328D1;
  transition: .2s;
  font-weight: 600;
  border: 1px solid #8328D1;
}
.button-accept-outline:hover {
  color: white;
  background: #7825bf;
  transition: .2s;
}
.button-warning {
  border-radius: 3px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  padding: 5px 10px;
  background: #ed601a;
  color: white;
  transition: .2s;
  font-weight: 600;
}
.button-warning:hover {
  background: #d75818;
  transition: .2s;
}
</style>
