<template>
  <div class="content-wrapper">
  <div class="content">
    <router-link :to="{name:'login'}">На страницу авторизации</router-link>

    <p><b>Если у вас нет логина и пароля выдаваемого всем сотрудникам в вузе при устройстве на работу</b></p>
    <p>Напишите письмо на электронную почту: aa502@yandex.ru</p>
    <p>Тема письма: логин</p>
    <p>В письме необходимо указать:</p>
    <ul>
      <li>ФИО</li>
      <li>Должность</li>
      <li>Наименование структурного позразделения</li>
      <li>Сколько вы работаете в вузе</li>
    </ul>

  </div>
  </div>
</template>

<script>
export default {
name: "NoLogin"
}
</script>

