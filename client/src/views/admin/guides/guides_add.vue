<template>

        <form class="content upload-form" @submit.prevent="formSubmit">
            <router-link class="back_admin_button" :to="{name:'admin_guides_all'}">Вернуться на основную страницу</router-link>
            <div class="form-line">
                <div class="form-block">
                    <label for="name">Название</label>
                    <input id="name" type="text" placeholder="Название" v-model="name">
                </div>
            </div>
            <div class="form-line">
                <div class="form-block">
                    <label for="text">Текст</label>
                    <textarea id="text" type="text" placeholder="Текст" v-model="text"></textarea>
                </div>
            </div>

            <div class="form-line">
                <input class="admin_button save m10" type="submit" value="Сохранить">
            </div>
        </form>

</template>

<script>

    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "admin_guides_add",

        data:() => ({
            name:'',
            text:'',
        }),
        computed:{

        },
        methods:{
            formSubmit(){
                this.$store.dispatch('guides/addGuide',
                    {name:this.name, text:this.text}).then(() => {
                        this.$router.push({name:'admin_guides_all'})
                })
            }
        },
        async created() {

        }
    }
</script>

<style scoped>

</style>