<template>
    <div>
        <div class="admin-content-desc">
            <p>Управление правами пользователей</p>
        </div>

        <div class="search">
            <input @keypress.enter="startSearch" type="text" v-model="search" placeholder="Поиск...">
            <button class="s-b" @click="startSearch">Поиск</button>
            <button class="r-b" @click="resetSearch">Сброс</button>
        </div>

        <SimpleTable
                :headers="headers"
                :data="users"
                :count="usersCount"
                :changePage="changePage"
        >

            <template v-slot:item.role="{ item, iteration }">
                <simple-selector :start-value="roles[item]"
                                 :items="roles"
                                 @changeValue="changeSelector(iteration, $event)"
                ></simple-selector>
            </template>
            <template v-slot:item.changed="{ item, iteration }">
                <button v-if="item" class="save" @click="saveUser(iteration)">Сохранить</button>
                <span v-else></span>
            </template>
        </SimpleTable>
    </div>
</template>

<script>
    import {mapActions,mapGetters, mapMutations} from 'vuex'
    import SimpleTable from "../../../components/SimpleTable";
    import SimpleSelector from "../../../components/app/SimpleSelector";

    export default {
        name: "settings_users",
        data:()=>({
            search:'',
            roles:{
              user:'Пользователь',
              admin:'Администратор',
            },
            headers:[
                {value:'id', name:'Индентефикатор'},
                {value:'login', name:'Логин'},
                {value:'fio', name:'ФИО'},
                {value:'role', name:'Роль'},
                {value:'changed', name:''},
            ],
        }),
        components:{
            SimpleTable,
            SimpleSelector
        },
        computed:{
            ...mapGetters('settings',['users','usersCount'])
        },
        methods:{
            ...mapActions('settings',['getUsers','getUsersCount','updateUser','getUsersSearch']),
            ...mapMutations('settings',['changeUserRole']),
            changeSelector(index, role){
                this.changeUserRole({index, role})
            },
            saveUser( index){
                this.updateUser(index)
            },
            async changePage(page){
                if(this.search){
                    this.getUsersSearch({search:this.search,page})
                } else {
                    await this.getUsers(page)
                }

            },
            startSearch(){
                this.getUsersSearch({search:this.search,page:1})
            },
            resetSearch(){
                this.search = ''
                this.getUsers()
                this.getUsersCount()
            }
        },
        created() {
            this.getUsers()
            this.getUsersCount()
        }
    }
</script>

<style scoped lang="scss">
    .search{
        display: flex;
        input{
            padding: 15px 20px;
            font-size: 1rem;
            border: 1px solid rgba(18, 18, 18, 0.2);
            width: 100%;
        }
        button{
            padding: 0 30px;
            border: none;
            margin-left: 10px;
            background-color: #333;
            color: #f2f2f2;
            text-transform: uppercase;
            cursor: pointer;
        }
        .s-b{
            background-color: #76C880;
            &:hover{
                background-color: darken(#76C880,10);
            }
        }
        .r-b{
            background-color: #717171;
            &:hover{
                background-color: darken(#717171,10);
            }
        }
        margin-bottom: 10px;
    }
    .save{
        background: #76C880;
        border: none;
        color: #FFFFFF;
        font-size: 1rem;
        letter-spacing: 1px;
        padding: 5px 15px;
        cursor: pointer;
        &:hover{
            background-color: darken(#76C880,10);
        }
    }
</style>

