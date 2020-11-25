<template>
    <div class="content-wrapper">
        <h1 class="h1-header">Изменение профиля</h1>
            <form class="content upload-form" @submit.prevent="formSubmit">
                <div class="form-line">
                    <div class="form-block">
                        <label for="email">
                            <svg class="profile-icon"><use :xlink:href="svgSprite + '#email'"></use></svg>
                            Email
                            <span class="error" v-show="!valid.email">Email введен неправильно</span>
                        </label>
                        <input id="email" type="text" placeholder="email@mail.ru" @blur="blurEl(email,'email','email')"  v-model="email">
                    </div>
                </div>
                <div class="form-line">
                    <div class="form-block">
                        <label for="phone">
                            <svg class="profile-icon"><use :xlink:href="svgSprite + '#phone'"></use></svg>
                            Телефон
                          <span class="error" v-show="!valid.phone">Телефон введен неправильно</span>
                        </label>
                        <input id="phone" type="text" placeholder="88003002079"  @blur="blurEl(phone,'phone','phone')" v-model="phone">
                    </div>
                </div>
                <div class="form-line">
                    <div class="form-block">
                        <label for="whatsapp">
                            <svg class="profile-icon"><use :xlink:href="svgSprite + '#whatsapp'"></use></svg>
                            whatsApp
                          <span class="error" v-show="!valid.whatsapp">Телефон введен неправильно</span>
                        </label>
                        <input id="whatsapp" type="text" placeholder="88003002079" @blur="blurEl(whatsapp,'whatsapp','phone')" v-model="whatsapp">
                    </div>
                </div>
                <div class="form-line">
                    <input :disabled="!formValid" class="button" type="submit" value="Сохранить">
                </div>
            </form>

    </div>
</template>

<script>
    import svgSprite from './../../assets/sprite.svg'
    import isEmail from 'validator/lib/isEmail';
    import isMobilePhone from 'validator/lib/isMobilePhone';
    export default {
        name: "profile_change",
        data: () => ({
            email:'',
            phone:'',
            whatsapp:'',
            valid:{
              email:true,
              phone:true,
              whatsapp:true,
            },
            svgSprite
        }),
        computed:{
          user(){
              return this.$store.getters['user/user']
          },
          formValid(){
            return Object.values(this.valid).every(el =>  el)
          }
        },
        methods:{
          blurEl(value,name,valid){
            if(value !== ''){
              if(valid === 'email'){
                this.valid[name] = isEmail(value)
              }
              if(valid === 'phone'){
                this.valid[name] = isMobilePhone(value,'ru-RU')
              }
            } else {
              this.valid[name] = true
            }


          },
            async formSubmit(){
                await this.$store.dispatch('user/changeContacts',{
                    email:this.email,
                    phone:this.phone,
                    whatsapp:this.whatsapp,
                })
            }
        },
        created() {
            this.email = this.user?.contacts?.email || ''
            this.phone = this.user?.contacts?.phone || ''
            this.whatsapp = this.user?.contacts?.whatsapp || ''
        }
    }
</script>

<style scoped>
.profile-icon{
    width: 30px;
    height: 30px;
    margin-right: 3px;
    vertical-align: bottom;
}
.error{
  font-size:0.9rem;
  color:#b32929;
}

</style>