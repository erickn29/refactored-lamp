<template>
  <div class="row my-4 d-flex justify-content-center">
    <div class="col-xl-8 py-4">
      <div class="block">
      <div class="message user-message p-3 mb-4">
        Что это за сервис?
      </div>
      <div class="message p-3 mb-4">
        Наш сервис создан для помощи в прохождении технических собеседований для ИТ специалистов
      </div>
    </div>
    <div class="block">
      <div class="message user-message p-3 mb-4">
        Как именно он помогает в прохождении собеседований?
      </div>
      <div class="message p-3 mb-4">
        С помощью нашего сервиса вы можете пройти мок-интервью по одной из технологий (сейчас их более 20) или выбрать несколько технлологий, образовав таким образом целый стек. <br><br>Отвечая на вопросы вы готовите себя к реальному собеседованию, изучаете новое, узнаете свои сильные и слабые стороны в той или иной технологии
      </div>
    </div>
    <div class="block">
      <div class="message user-message p-3 mb-4">
        Кто проводит собеседование?
      </div>
      <div class="message p-3 mb-4">
        Собеседование проводит дообученная языковая модель. В фидбеке от модели вы получаете развернутое заключение по вашему ответу. Что было сказано верно, на что следует обратить внимание
      </div>
    </div>
    <div class="block">
      <div class="message user-message p-3 mb-4">
        Насколько большая база вопросов?
      </div>
      <div class="message p-3 mb-4">
        База вопросов насчитывает более 200 вопросов по каждой технологии и постоянно пополняется
      </div>
    </div>
    <div class="block">
      <div class="message user-message p-3 mb-4">
        Какие технологии сейчас есть?
      </div>
      <div class="message p-3 mb-4">
        На данный момент есть вопросы по наиболее популярным языкам программирования (Python, JavaScript, PHP, C# и т.д.). Есть вопросы по git, SQL, docker. Так же есть вопросы по популярным библиотекам и фреймворкам 
      </div>
    </div>
    </div>
  </div>
</template>

<style>
.user-message {
  background: linear-gradient(45deg, #8320f5, #008074);
}
.block .message {
  font-weight: 600;
}
</style>