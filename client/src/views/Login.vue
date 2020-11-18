<template>
    <section class="form animated flipInX">
        <h2>Войти в аккаунт</h2>
        <p class="valid">Успех. Пожалуйста подождите.</p>
        <p class="error">Ошибка. Введите корректный логин &amp; паролт.</p>
        <form @submit.prevent="formHandler" class="loginbox" autocomplete="off">
            <input v-model="login" placeholder="Логин" type="text" id="login"/>
            <input v-model="password" placeholder="Пароль" type="password" id="password"/>
            <button :disabled="!valid" id="submit">Войти</button>
        </form>

    </section>
</template>

<script>
    export default {
        name: "Login",
        data: () => ({
            login:'',
            password:'',
        }),
        computed:{
            valid() {
                return this.login && this.password
            }
        },
        methods:{
            async formHandler(){
                await this.$store.dispatch('user/authUser',{login:this.login, password:this.password})
                if(this.$store.getters['user/isLogin']){
                    this.$router.push({ name: 'Home' });
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .form {
        position: absolute;
        top: 50%;
        left: 50%;
        background: #fff;
        width: 285px;
        margin: -140px 0 0 -182px;
        padding: 40px;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    h2 {
        margin: 0 0 20px;
        line-height: 1;
        color: #635BD6;
        font-size: 18px;
        font-weight: 400;
    }
    input {
        outline: none;
        display: block;
        width: 100%;
        margin: 0 0 20px;
        padding: 10px 15px;
        border: 1px solid #ccc;
        color: #ccc;
        box-sizing: border-box;
        font-size: 14px;

        transition: 0.2s linear;
    &:focus {
         color: #333;
         border: 1px solid #635BD6;
     }
    }
    button {
        cursor: pointer;
        background: #635BD6;
        width: 100%;
        padding: 10px 15px;
        border: 0;
        color: #fff;
        font-size: 14px;
        font-weight: 400;
        &:hover {
             background: darken(#635BD6,10);
        }
        &:disabled{
            background: #cecece;
        }
    }
}

    .error, .valid{display:none;}
</style>