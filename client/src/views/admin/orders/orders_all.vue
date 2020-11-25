<template>
    <div>

        <div class="content">
           <div v-if="elements.length === 0">Элементов нет</div>
            <simple-table v-else
                          :headers="headers"
                          :data="elements"
                          :changePage="changePage"
                          :count="elementsCount"
                          routerName="admin_orders_edit"
                          :startPage="this.$route.params.page"
                          :check="true"
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
                {name:'№ Заявки', value:'id'},
                {name:'Статус', value:'status'},
                {name:'Дата обращения', value:'created_at'},
            ],
        }),
        computed:{
            ...mapGetters('order',{elements:'elements', elementsCount:'elementsCount'}),
        },
        methods:{
            ...mapActions('order',{getElements:'getElements', getElementsCount:'getElementsCount'}),
            changePage(page){
                this.getElements(page)
            }
        },
        async created() {
            let page = this.$route.params.page || 1
            await this.getElements(page)
            await this.getElementsCount()
        }
    }
</script>

<style scoped lang="scss">

</style>