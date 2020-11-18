<template>

        <form class="content upload-form" @submit.prevent="formSubmit">
            <router-link class="back_admin_button" :to="{name:'admin_guides_all', params:{page}}">Вернуться на основную страницу</router-link>
            <div class="form-line">
                <div class="form-block">
                    <label for="name">Название</label>
                    <input id="name" type="text" placeholder="Название" v-model="element.name">
                </div>
            </div>
            <div class="form-line">
                <div class="form-block">
                    <label for="text">Текст</label>
                    <textarea id="text" type="text" placeholder="Текст" v-model="element.text"></textarea>
                </div>
            </div>

            <div class="form-line">
                <input class="admin_button save m10" type="submit" value="Сохранить">
                <input @click="deleteElement" class="admin_button delete m10" type="button" value="Удалить">
            </div>
        </form>

</template>

<script>

    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "admin_guides_add",

        data:() => ({
            element:{name:'', text:''},
            page:1,
        }),
        computed:{},
        methods:{
            formSubmit(){
                this.element.updated_at = new Date()
                delete this.element.created_at
                this.updateGuide(this.element)
                this.$router.push({name:'admin_guides_all'})
            },
            deleteElement(){
                this.deleteGuide(this.element.id)
                this.$router.push({name:'admin_guides_all'})
            },
            ...mapActions('guides',['getGuide','updateGuide','deleteGuide'])
        },
        async created() {
            this.element = await this.getGuide(this.$route.params.id)
            this.page = this.$route.params.page || 1
        }
    }
</script>

<style scoped lang="scss">
    .delete{
        margin-left: auto;
    }
</style>