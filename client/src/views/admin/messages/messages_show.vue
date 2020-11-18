<template>

        <form class="content upload-form" @submit.prevent="formSubmit">
            <router-link class="back_admin_button" :to="{name:'admin_messages_all', params:{page}}">Вернуться на основную страницу</router-link>
            <div class="form-line">
                <div class="form-block">
                    <label for="name">Название</label>
                    <input :disabled="true" id="name" type="text" placeholder="Название" v-model="element.theme">
                </div>
            </div>
            <div class="form-line">
                <div class="form-block">
                    <label for="text">Текст</label>
                    <textarea :disabled="true" id="text" type="text" placeholder="Текст" v-model="element.text"></textarea>
                </div>
            </div>

        </form>

</template>

<script>
    export default {

        data:() => ({
            element:{theme:'', text:''},
            page:1,
        }),
        computed:{},

        async created() {
            this.element = await this.$store.dispatch('messages/getMessage',this.$route.params.id)
            this.page = this.$route.params.page || 1
        }
    }
</script>
