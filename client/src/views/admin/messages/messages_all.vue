<template>
    <div>

        <div class="content">
            <div v-if="messages.length === 0">Элементов нет</div>
            <simple-table v-else
                          :headers="headers"
                          :data="messages"
                          :changePage="changePage"
                          :count="messagesCount"
                          routerName="admin_messages_show"
                          :startPage="this.$route.params.page"
            >
                <template v-slot:item.name="{item}">
                    <b>{{item}}</b>
                </template>
            </simple-table>
        </div>
    </div>

</template>

<script>

    import {mapGetters, mapActions} from 'vuex'
    import SimpleTable from "../../../components/SimpleTable";

    export default {
        name: "profile_files",
        components:{
            SimpleTable
        },
        data:() => ({
            headers:[
                {name:'Тема', value:'theme'},
                {name:'Кто послал', value:'user'},
                {name:'Дата создания', value:'created_at'},
            ],
        }),
        computed:{
            ...mapGetters('messages',['messages','messagesCount']),
        },
        methods:{
            ...mapActions('messages',['getMessages','getMessagesCount']),
            changePage(page){
                this.getMessages(page)
            }
        },
        async created() {
            let page = this.$route.params.page || 1
            await this.getMessages(page)
            await this.getMessagesCount()
        }
    }
</script>

<style scoped lang="scss">

</style>