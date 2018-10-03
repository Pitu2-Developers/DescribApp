<template>
  <div id="q-app">
    <!-- <component :is='getCurrentLayout'></component> -->
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import IndexLayout from "./layouts/Index.vue";
// import DashboardLayout from "./layouts/dashboard.vue";
export default {
  name: "App",
  computed: {
    // ...mapGetters(["getCurrentLayout"])
  }
  // components: {
  //   indexlayout: IndexLayout,
  //   dashboardLayout: DashboardLayout
  // }
};
</script>

<style>
</style>
