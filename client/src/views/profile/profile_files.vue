<template>
    <div>
            <div class="content" v-if="orders && orders.length ===0">Загруженных файлов пока нет</div>
            <div class="shadow" v-else>
                <simple-table
                    :headers="headers"
                    :data="orders"
                    :count="ordersCount"
                    :changePage="changePage"
                >
                </simple-table>
            </div>
    </div>
</template>

<script>
    import SimpleTable from "../../components/SimpleTable";
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "profile_files",
        components:{
            SimpleTable
        },
        data:() => ({
           headers:[
               {name:'№ Заявки', value:'id'},
               {name:'Статус', value:'status'},
               {name:'Дата обращения', value:'created_at'},
           ],
        }),
        computed:{
            ...mapGetters('order',{orders:'elements', ordersCount:'elementsCount'}),
            ...mapGetters('user',['user'])
        },
        methods:{
            ...mapActions('order',{getForUser:'getForUser'}),
          async changePage(page){
              await this.getForUser({user_id:this.user.id, page})
          }
        },
        async created() {
            await this.getForUser({user_id:this.user.id, page:1})
        }
    }
</script>

<style scoped lang="scss">

</style>