<template>
    <div class="table-wrapper">
        <table class="fp-table">
            <thead>
            <tr>
                <th v-for="header in headers" :key="header.value">
                  {{header.name}}
                </th>
            </tr>
            </thead>
            <tbody>
            <router-link :class="{'no-check':check && !item.checked, 'td-link':routerName}"  tag="tr"
                         :to="routerName ? {name:routerName, params:{id:item.id,page}} : {}"
                         v-for="(item, key) in data" :key="item.id ? item.id : key">

                <td v-for="header in headers" :key="header.value">
                    <slot :name="'item.'+ [header.value]" :item="item[header.value]" :iteration="key">{{item[header.value]}}</slot>
                </td>

            </router-link>
            </tbody>
        </table>
        <div class="table-footer">

            <div v-if="count>15" class="pagination">
                <span @click="prevPage" :class="{active:page!==1}" class="prev">назад</span>
                <span @click="nextPage" :class="{active:page!==allPage}" class="next">вперед</span>
            </div>
            <div class="count">Всего: {{count}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SimpleTable",
        props:['headers','data','count','changePage','routerName','startPage','check'],
        data:() => ({
            page:1,
        }),
        computed:{
            allPage(){
                return Math.ceil(this.count/15)
            },

        },
        methods:{
            nextPage(){
                if(this.page<this.allPage){
                    this.page += 1
                    this.changePage(this.page)
                }
            },
            prevPage(){
                if(this.page>1){
                    this.page -= 1
                    this.changePage(this.page)
                }
            }
        },
        created() {
            if(this.startPage)
                this.page = this.startPage
        }

    }
</script>

<style scoped lang="scss">

    .table-wrapper{
        color: #4f4f4f;
    }

    .fp-table{
        width: 100%;
        border-collapse: collapse;
        background-color: #fff;
        border: 1px solid #f2f2f2;

        th{
            text-align: left;
            padding: 16px 14px;
            color: #304d93;
        }
        tr{
            border-bottom: 1px solid #f2f2f2;

        }
        td{
            padding: 10px 14px;
        }
        .td-link{
            cursor: pointer;
            &:hover{
                background-color: #f3f2fb;
                color: #3b5aa2;
            }
        }
    }
    .table-footer{
        border: 1px solid #f2f2f2;
        border-top: none;
        font-size: 0.85rem;
        text-transform: uppercase;
        background-color: #fff;
        padding: 8px 14px;
        display: flex;
        justify-content: space-between;
        .pagination{
            .next, .prev{
                margin-right: 10px;
                &.active{
                    color:#2e44bb;
                    cursor:pointer;
                    text-decoration: underline;
                    &:hover{
                        text-decoration: none;
                    }
                }
            }

        }
    }

    .no-check{
        color: #2593D5;
    }


</style>