<template>
    <div class="content-wrapper">
        <h1 class="h1-header">Изменение профиля</h1>
            <form class="content upload-form" @submit.prevent="formSubmit">
                <div class="form-line">
                    <div class="form-block">
                        <label for="email">
                            <svg class="profile-icon"><use :xlink:href="svgSprite + '#email'"></use></svg>
                            email
                        </label>
                        <input id="email" type="text" placeholder="email@mail.ru" v-model="email">
                    </div>
                </div>
                <div class="form-line">
                    <div class="form-block">
                        <label for="phone">
                            <svg class="profile-icon"><use :xlink:href="svgSprite + '#phone'"></use></svg>
                            Телефон
                        </label>
                        <input id="phone" type="text" placeholder="88003002079" v-model="phone">
                    </div>
                </div>
                <div class="form-line">
                    <div class="form-block">
                        <label for="whatsapp">
                            <svg class="profile-icon"><use :xlink:href="svgSprite + '#whatsapp'"></use></svg>
                            whatsApp
                        </label>
                        <input id="whatsapp" type="text" placeholder="88003002079" v-model="whatsapp">
                    </div>
                </div>
                <div class="form-line">
                    <input class="button" type="submit" value="Сохранить">
                </div>
            </form>

    </div>
</template>

<script>
    import svgSprite from './../../assets/sprite.svg'
    export default {
        name: "profile_change",
        data: () => ({
            email:'',
            phone:'',
            whatsapp:'',

            svgSprite
        }),
        computed:{
          user(){
              return this.$store.getters['user/user']
          }
        },
        methods:{
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

</style>