<template>
    <div>
        <div class="admin-content-desc">
            <p>Установка email адресов для отправки оповещений</p>
        </div>
        <div class="items">
            <div v-for="(email,key) in currentEmails" class="item" :key="email">
                <input type="text" @input="inputHandler(key,$event)" :value="currentEmails[key]">
                <button class="delete" @click="c_delete(key)">Удалить</button>
            </div>
            <div class="item" >
                <input type="text" v-model="newEmail">
                <button @click="save" class="save">Сохранить</button>
            </div>
        </div>
        <p class="desc">Кнопка сохранить отвечает как за добавление элемента так и за сохранение отредактированных данных.</p>
    </div>
</template>

<script>
    import {mapActions,mapGetters} from 'vuex'

    export default {
        name: "settings_emails",
        data:() => ({
            currentEmails:[],
            newEmail:'',
        }),
        computed:{
          ...mapGetters('settings',['emails'])
        },
        methods:{
            ...mapActions('settings',['getEmails','saveEmails']),
            inputHandler(key, e){
                this.currentEmails[key] = e.target.value
            },
            async save(){
                let emails = [...this.currentEmails]
                if(this.newEmail) emails.push(this.newEmail)
                await this.saveEmails(emails)

                this.newEmail = ''
                this.currentEmails = [...this.emails]
            },
            c_delete(key){
                this.$delete(this.currentEmails,key)
            }
        },
        async created() {
            await this.getEmails()
            this.currentEmails = [...this.emails]
        }
    }
</script>

<style scoped lang="scss">
    input{
        padding: 15px 20px;
        font-size: 1rem;
        border: 1px solid rgba(18, 18, 18, 0.2);
        width: 500px;
        color: #333;
    }

    .item{
        display: flex;
    }

    .item + .item{
        margin-top: 10px;
    }

    button{
        padding: 0 20px;
        border:none;
        margin-left: 10px;

        color:#f2f2f2;
        text-transform: uppercase;
        cursor: pointer;
        width: 150px;

        &.delete{
            background-color: #717171;
            &:hover{
                background-color: darken(#717171,10);
            }
        }

        &.save{
            background-color: #76C880;
            &:hover{
                background-color: darken(#76C880,10);
            }
        }

    }

    .desc{
        color:#848484;
        font-size: 0.9rem;
    }

</style>