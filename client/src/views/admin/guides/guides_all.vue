<template>
    <div>

        <div class="content">
            <div>
                <router-link class="admin_button save mb10" :to="{name:'admin_guides_add'}">Добавить элемент</router-link>
            </div>
           <div v-if="guides.length === 0">Элементов нет</div>
            <simple-table v-else
                          :headers="headers"
                          :data="guides"
                          :changePage="changePage"
                          :count="guidesCount"
                          routerName="admin_guides_edit"
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
                {name:'Название', value:'name'},
                {name:'Дата обновления', value:'updated_at'},
                {name:'Дата создания', value:'created_at'},
            ],
        }),
        computed:{
            ...mapGetters('guides',['guides','guidesCount']),
        },
        methods:{
            ...mapActions('guides',['getGuides','getGuidesCount']),
            changePage(page){
                this.getGuides(page)
            }
        },
        async created() {
            let page = this.$route.params.page || 1
            await this.getGuides(page)
            await this.getGuidesCount()
        }
    }
</script>

<style scoped lang="scss">

</style>