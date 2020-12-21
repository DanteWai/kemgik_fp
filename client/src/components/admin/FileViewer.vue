<template>
  <div class="files" v-if="files.length > 0">
    <div class="file" v-for="file in files">
      <a class="file-link" :href="file.path+file.name+'.'+file.ext">
        <template v-if="!file.isImage">
            <img :src="fileIcon" :alt="file.name">
            <span v-if="file.ext" class="image-ext">{{file.ext}}</span>
        </template>
        <img v-else :src="file.path+file.name+'.'+file.ext" :alt="file.name">
        <div class="file-name" >{{file.name}}</div>
      </a>
    </div>
  </div>
</template>

<script>
import fileIcon from './../../assets/flat-color-icons_file.svg'

export default {
  name: "FileViewer",
  props:['files'],
  data:()=>({
    fileIcon:fileIcon,
  })
}
</script>

<style scoped lang="scss">
  .files{
    @include row-flex();
  }
  .file{
    @include col();
    @include size(3);
    margin-top:15px;
    &-link{
      position:relative;
      display:inline-flex;
      align-items: center;
      width: 100%;
      height: 100%;
      border:1px solid #B7B7B7;
      padding:10px;
      transition: 0.2s;
      &:hover{
        border-color:#6f90dd;
      }
      img{
        height: 60px;
        width:auto;
      }
    }
    &-name{
      margin-left:10px;
      font-size:0.9rem;
    }
    .image-ext{
      position: absolute;
      bottom:0;
      left:0;
      background-color: #333;
      padding: 1px 10px;
      color:#f2f2f2;
      font-size: 0.6rem;
      text-transform: uppercase;
    }
  }
</style>