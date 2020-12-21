<template>
        <div class="content">
            <router-link class="back_admin_button" :to="{name:'admin_orders_all', params:{page}}">Вернуться на основную страницу</router-link>
            <div v-if="!isRequest">
              Загрузка...
            </div>
            <template v-else>
              <template v-if="element">
                <div class="element">
                  <div class="info">
                    <span>id: </span><span>{{element.id}} </span>
                    <span>Создан: </span><span>{{element.created_at}}</span>
                  </div>

                  <file-viewer class="files" :files=element.files></file-viewer>

                  <simple-selector class="selector" :start-value="element.status" :items="statuses" view="outline"  label="Статус" @changeValue="changeStatus"/>

                  <div class="line"><span>Рубрика: </span><span>{{element.data.name}}</span></div>
                  <div class="line"><span>Ссылка: </span><span>{{element.data.link}}</span></div>
                  <div class="line"><span>Комментарий: </span><span>{{element.data.comment}}</span></div>
                  <div class="line"><span>Оставленые контакты: </span><span>{{element.data.contacts}}</span></div>
                  <div class="line"><span>Сообщить о выставлении?: </span><span>{{element.data.feedback ? 'Да' : 'Нет'}}</span></div>
                  <template v-if="user">
                    <h4>Данные о пользователе</h4>
                    <div class="line"><span>ФИО: </span><span>{{user.sso_data.fam}} {{user.sso_data.name}} {{user.sso_data.ot}}</span></div>
                    <div class="line"><span>Подразделение: </span><span>{{user.sso_data.depart}}</span></div>
                    <div class="line"><span>Контакты: </span></div>
                    <ul>
                      <li v-for="(cValue,cName) in user.contacts">{{cName}}:{{cValue}}</li>
                    </ul>
                    <div class="line"><span>Логин: </span><span>{{user.sso_data.login}}</span></div>
                  </template>
                </div>

                <div class="form-line">
                  <!--  <input class="admin_button save m10" :disabled="true" type="submit" value="Сохранить"> -->
                   <input v-if="element.files.length > 0" @click="transfer" class="admin_button delete m10" type="button" value="Выгрузить">
                </div>
              </template>

              <e404 v-else></e404>
            </template>





        </div>

</template>

<script>

    import {mapGetters, mapActions} from 'vuex'
    import E404 from "../../../components/E404";
    import FileViewer from "../../../components/admin/FileViewer";
    import statuses from '../../../../../untils/statuses.json';
    import SimpleSelector from "@/components/app/SimpleSelector";

    export default {
        name: "admin_guides_add",
        components:{SimpleSelector, E404,FileViewer},
        data:() => ({
            isRequest:false,
            element:null,
            user:null,
            page:1,
            statuses:statuses
        }),
        computed:{

        },
        methods:{
          changeStatus(value){
            this.update({id:this.element.id, status:value})
          },

            transfer(){
                if(confirm('Выгрузить элемент')){
                  this.transferElement(this.element)
                }
            },
            ...mapActions('order',['getElement','update','transferElement'])
        },
        async created() {
            this.element = await this.getElement(this.$route.params.id)
            this.page = this.$route.params.page || 1
            this.isRequest = true
            if(this.element && this.element.checked === false){
              this.update({id:this.element.id, checked:true})
            }

          if(this.element)
              this.user = await this.$store.dispatch('user/returnUser', this.element.user_id)

        }
    }
</script>

<style scoped lang="scss">
      .info{
        position:absolute;
        right:0;
        top:-10px;
        color:#7e7e7e;
      }
      .element{
        position:relative;
        margin:10px;
        .line{
          margin-top:10px;
        }
      }
      .files{
        margin-bottom:20px;
      }


</style>