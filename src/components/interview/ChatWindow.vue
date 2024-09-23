<script>
import SelectTechnology from './AddChat.vue';


export default {
  data() {
    return {
      showTechnologies: true,
      text: "",
    }
  },
  components: {
    SelectTechnology,
  },
  methods: {
    resizeTextarea() {
      const height = this.$refs.textarea.scrollHeight;
      this.$refs.textarea.style.height = `${height}px`;
    },
  },
  mounted() {
    // вызываем метод при загрузке компонента
    this.resizeTextarea();
  }
}
</script>

<template>
  <div class="container">
    <!-- <h6>{{ $store.state.currentChat.title }}</h6> -->
    <div class="chat p-4">
      <div class="messages">
        <div class="message p-2 mb-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere id reiciendis similique, dicta ducimus autem
          nesciunt cupiditate quas eaque inventore dolore consequuntur excepturi consequatur commodi tempore error
          soluta labore odit?
        </div>
        <div class="message p-3 mb-4 user-message">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere id reiciendis similique, dicta ducimus autem
          nesciunt cupiditate quas eaque inventore dolore consequuntur excepturi consequatur commodi tempore error
          soluta labore odit?
        </div>
        <div class="message p-3 mb-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere id reiciendis similique, dicta ducimus autem
          nesciunt cupiditate quas eaque inventore dolore consequuntur excepturi consequatur commodi tempore error
          soluta labore odit?
        </div>
        <div class="message p-3 mb-4 user-message">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere id reiciendis similique, dicta ducimus autem
          nesciunt cupiditate quas eaque inventore dolore consequuntur excepturi consequatur commodi tempore error
          soluta labore odit?
        </div>
        <div class="message p-3 mb-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere id reiciendis similique, dicta ducimus autem
          nesciunt cupiditate quas eaque inventore dolore consequuntur excepturi consequatur commodi tempore error
          soluta labore odit?
        </div>
        <div class="message p-3 mb-4 user-message">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere id reiciendis similique, dicta ducimus autem
          nesciunt cupiditate quas eaque inventore dolore consequuntur excepturi consequatur commodi tempore error
          soluta labore odit?
        </div>
        <div class="message p-3 mb-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere id reiciendis similique, dicta ducimus autem
          nesciunt cupiditate quas eaque inventore dolore consequuntur excepturi consequatur commodi tempore error
          soluta labore odit?
        </div>
        <div class="message p-3 mb-4 user-message">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere id reiciendis similique, dicta ducimus autem
          nesciunt cupiditate quas eaque inventore dolore consequuntur excepturi consequatur commodi tempore error
          soluta labore odit?
        </div>
      </div>
    </div>
    <div class="controls">
      <div class="user-message-area row">
        <div class="col-11">
          <textarea name="" id="" style="min-height: 55px; overflow: hidden;" ref="textarea" class="form-control"
            v-model="text" placeholder="Введите свой ответ..." @input="resizeTextarea">
          </textarea>
        </div>
        <div class="col-1 d-flex justify-content-center align-items-center" style="">
          <div class="d-flex justify-content-center align-items-center send-btn" style="">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" class="bi bi-send-fill"
              viewBox="0 0 16 16">
              <path
                d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
            </svg>
          </div>
        </div>
      </div>
      <div style="width: 100%;" class="btn btn-success">следующий вопрос</div>
    </div>
  </div>
</template>