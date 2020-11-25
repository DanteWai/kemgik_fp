<template>
  <div class="content-wrapper">
    <form class="content upload-form" @submit.prevent="submitHandler" action="/" enctype="multipart/form-data" novalidate>

      <div class="form-line">
        <div class="form-block">
          <label for="name">Рубрика</label>
          <input v-model="form.name" id="name" type="text" placeholder="Например: новость, ппс, расписание...">
        </div>
        <div class="form-block">
          <label for="link">Ссылка </label>
          <input v-model="form.link" id="link" type="text" placeholder="Например: http://kemguki.ru/science/nii/">
        </div>
      </div>

      <div class="form-line">
        <div class="form-block">
          <file-uploader></file-uploader>
        </div>
      </div>


      <div class="form-line">
        <div class="form-block">
          <label for="comment">Комментарий</label>
          <textarea v-model="form.comment" id="comment" placeholder="Дополнительная информация (если есть)"></textarea>
        </div>
      </div>
      <div class="form-line">
        <div class="form-block">
          <label for="contacts">Контактные данные</label>
          <span class="form-block-desc">Если оставить пустым, будут использованы контактные данные из  <router-link :to="{name:'profile_change'}">профиля</router-link></span>
          <input v-model="form.contacts" id="contacts" type="text" placeholder="email, телефон">
        </div>
      </div>

      <div class="form-line">
        <div class="feedback">
          <input type="checkbox" class="custom-checkbox" id="feedback"  v-model="form.feedback">
          <label for="feedback">Сообщить о публикации материала</label>
        </div>
      </div>

      <div class="form-line">
          <input class="button w100" :disabled="!valid || !filesValid" type="submit" value="Отправить">
      </div>


        <div class="error-text">{{errorText}}</div>


    </form>

    <contact-us></contact-us>

    <contact-validate v-if="showContactMessages" v-model="showContactMessages">
      <template v-slot:text>
        <p>Заявка отправлена, но вашем профиле не указаны контактные данные для связи, в таком случае выставление материала не гарантировано.</p>
      </template>
    </contact-validate>

    <guides-list></guides-list>


  </div>
</template>

<script>
  import FileUploader from "@/components/FileUploader.vue";
  import svgSprite from "../assets/sprite.svg";
  import ContactUs from "../components/app/ContactUs";
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import ContactValidate from "../components/app/ContactValidate";
  import GuidesList from "../components/app/GuidesList";


export default {
  name: 'Home',
  components:{
    FileUploader,
    ContactUs,
    ContactValidate,
    GuidesList
  },
  data:() => ({
    showContactMessages:false,
    form:{name:'', link:'', comment:'', contacts:'', feedback:false},
    svgSprite
  }),
  computed: {
    ...mapGetters('files',["filesValid",'abstractFiles','timestamp']),
    ...mapGetters('user',["user","isContacts"]),
    valid(){
      return Object.values(this.form).some(el => {
        if(el !== true && el !== false) return el
      })
    },
    errorText(){
      if(this.filesValid !== true) return 'Необходимо дождаться загрузки файлов'
      if(this.valid !== true) return 'Необходимо заполнить хотя-бы одно поле'
      return ''
    }
  },
  methods:{
    ...mapActions('order',{orderAdd:'add'}),
    ...mapMutations('files',['setTimestamp','filesClear']),
    //Отправка формы на сервер
    async submitHandler(){
      await this.orderAdd({
        data:this.form,
        options: {timestamp:this.timestamp},
        user_id:this.user.id,
        files:this.abstractFiles
      })

      this.setTimestamp(Date.now())
      if(!this.isContacts) this.showContactMessages = true
    },
    clear(){
      this.form = { name:'', link:'', comment:'', contacts:'', feedback:false}
    }
  },

  watch:{
    timestamp(){
      this.clear()
      this.filesClear()
    }
  },
  created() {
    this.$store.commit('files/setTimestamp',Date.now())

  }


}
</script>

<style lang="scss" >


  .custom-checkbox {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }

  .custom-checkbox+label {
    display: inline-flex;
    align-items: center;
    user-select: none;
    @include sm-block(){
      font-size: 0.9rem;
    }
  }
  .custom-checkbox+label::before {
    content: '';
    display: inline-block;
    width: 1em;
    height: 1em;
    flex-shrink: 0;
    flex-grow: 0;
    border: 1px solid #adb5bd;
    //border-radius: 0.25em;
    margin-right: 0.5em;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 50% 50%;
  }

  .custom-checkbox:checked+label::before {
    border-color: #6f90dd;
    background-color: #6f90dd;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
  }

  /* стили при наведении курсора на checkbox */
  .custom-checkbox:not(:disabled):not(:checked)+label:hover::before {
    border-color: #6f90dd;
  }
  /* стили для активного состояния чекбокса (при нажатии на него) */
  .custom-checkbox:not(:disabled):active+label::before {
    background-color: #b3d7ff;
    border-color: #6f90dd;
  }
  /* стили для чекбокса, находящегося в фокусе */
  .custom-checkbox:focus+label::before {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
  /* стили для чекбокса, находящегося в фокусе и не находящегося в состоянии checked */
  .custom-checkbox:focus:not(:checked)+label::before {
    border-color: #6f90dd;
  }
  /* стили для чекбокса, находящегося в состоянии disabled */
  .custom-checkbox:disabled+label::before {
    background-color: #e9ecef;
  }


  .content-wrapper{
    max-width: 1600px;
    margin:50px auto;
    padding: 0 10px;
    @include sm-block(){
      margin:10px auto;
    }
  }

  .content{
    padding: 40px;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    box-shadow: 0px 1px 25px rgba(0, 0, 0, 0.1);
    @include sm-block(){
      padding: 5px;
    }
  }


  .upload-form{
    .form-line{
      display: flex;
      @include sm-block(){
        flex-direction: column;
      }
      .feedback{
        margin-left: 10px;
        color:rgb(117, 117, 117);
        margin-right: 10px;
      }
      .form-block{
        margin:10px;
        flex:1;
        display: flex;
        flex-direction: column;
        &-desc{
          color:#575757;
          font-size:0.9rem;
          margin-bottom:5px;
        }
        label{
          color:#212121;
          font-size: 1.2rem;
          margin-bottom: 5px;
          @include md-block(){
            font-size: 1rem;
          }
        }
        input[type=text], textarea{
          padding: 15px 20px;
          font-size: 1rem;
          border:1px solid rgba(18, 18, 18, 0.2);
          &:focus{
            border-color: rgb(111, 144, 221);
          }
          @include sm-block(){
            padding: 6px 10px;
            font-size: 0.9rem;
          }
        }
        textarea{
          font-family: 'Roboto', sans-serif;
        }
      }
    }
    .button {
      @include sm-block(){
        margin:10px 0;
      }
      background: #76C880;
      border:none;
      color: #FFFFFF;
      text-transform: uppercase;
      padding: 15px 20px;
      font-size: 1rem;
      letter-spacing: 1px;
      margin:10px;
      cursor:pointer;
      &:hover{
        background: darken(#76C880, 10);
      }
      &:disabled{
        background:#bbb;
      }
    }

    .error-text{
      color: #bf1919;
      text-align: center;
    }
  }


</style>
