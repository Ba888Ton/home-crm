<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">
    <router-link
      v-for="link in links"
      :key="link.title"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
      v-slot={navigate}
      custom
    >
      <li @click="navigate" @keypress.enter="navigate"><a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a></li>
    </router-link>

  </ul>
</template>
<script>
export default {
  props: ['value'],
  data:() => ({
    links: [
      {title: 'Счёт', url: '/', exact: true},
      {title: 'История', url: '/history'},
      {title: 'Планирование', url: '/planning'},
      {title: 'Новая запись', url: '/record'},
      {title: 'Категории', url: '/categories'},
    ]
  }),
}
</script>
