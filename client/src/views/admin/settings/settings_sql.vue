<template>
    <div class="upload-form">
        <div class="admin-content-desc">
            <p>sql</p>
        </div>

        <div class="form-line">

          <div class="form-block">
            <p class="desc">Введенные тут sql-запросы будут направлены к базе данных. Используется только для специфичных или крайних случаев.</p>
            <textarea v-model="query" id="comment" placeholder=""></textarea>
          </div>
        </div>
      <div class="form-line">
        <input class="admin_button save m10" type="submit" @click="send" value="Отправить">
      </div>


      <table v-if="data && data.rows">
        <thead></thead>
        <tbody>
          <tr v-for="row in data.rows">
            <td v-for="(colValue, colName) in row">{{colValue}}</td>
          </tr>
        </tbody>
      </table>

      <div>
        {{data}}
      </div>

    </div>
</template>

<script>
    import {mapActions,mapGetters} from 'vuex'
    import SimpleTable from "@/components/SimpleTable";

    export default {
        name: "settings_emails",
        components:{
            SimpleTable
        },
        data:() => ({
          query:'',
          data:''
        }),
        computed:{
        },
        methods:{
          send(){
            this.$store.dispatch('settings/execQuery', this.query).then((data) => this.data = data)
          }
        }
    }
</script>

<style scoped lang="scss">
.desc{
  color:#848484;
  font-size: 0.9rem;
}
table{
  border-collapse: collapse;
  td{
    padding:3px;
    border:1px solid #ccc;
  }
}


</style>