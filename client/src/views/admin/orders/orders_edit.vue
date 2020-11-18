<template>
        <div v-if="element" class="content" @submit.prevent="formSubmit">
            <router-link class="back_admin_button" :to="{name:'admin_orders_all', params:{page}}">Вернуться на основную страницу</router-link>
            ордер:{{element}}
            <div class="element">
              <div>
                <span>id: </span><span>{{element.id}}</span>
              </div>
              <div>
                <span>user_id: </span><span>{{element.user_id}}</span>
              </div>
              <div>
                <span>status: </span><span>{{element.status}}</span>
              </div>
              <div><span>name: </span><span>{{element.data.name}}</span></div>
              <div><span>link: </span><span>{{element.data.link}}</span></div>
              <div><span>comment: </span><span>{{element.data.comment}}</span></div>
              <div><span>contacts: </span><span>{{element.data.contacts}}</span></div>
              <div><span>feedback: </span><span>{{element.data.feedback}}</span></div>
              <div><span>created: </span><span>{{element.created_at}}</span></div>

              <div class="files" v-if="element.files.length > 0">
                <div class="file" v-for="file in element.files">
                  <a :href="file.path+file.name+'.'+file.ext">{{file.name}}.{{file.ext}}</a>
                </div>
              </div>
            </div>

            <div class="form-line">
                <input class="admin_button save m10" type="submit" value="Сохранить">
                <!-- <input @click="deleteElement" class="admin_button delete m10" type="button" value="Удалить"> -->
            </div>
        </div>
        <e404 v-else></e404>
</template>

<script>

    import {mapGetters, mapActions} from 'vuex'
    import E404 from "../../../components/E404";

    export default {
        name: "admin_guides_add",
        components:{E404},
        data:() => ({
            element:null,
            page:1,
        }),
        computed:{},
        methods:{
            formSubmit(){
                /*this.element.updated_at = new Date()
                delete this.element.created_at
                this.updateGuide(this.element)
                this.$router.push({name:'admin_guides_all'})*/
            },
            deleteElement(){
                /*this.deleteGuide(this.element.id)
                this.$router.push({name:'admin_guides_all'})*/
            },
            ...mapActions('order',['getElement','update'])
        },
        async created() {
            this.element = await this.getElement(this.$route.params.id)
            this.page = this.$route.params.page || 1
            if(this.element && this.element.checked === false){
              this.update({id:this.element.id, checked:true})
            }
        }
    }
</script>

<style scoped lang="scss">
      .element{
        margin:10px;
      }
      .files{
        margin-top:10px;
      }
</style>