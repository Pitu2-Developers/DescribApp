<template>
  <q-layout> <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-layout-header>
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="leftDrawer = !leftDrawer"
        />
        <q-toolbar-title>
          Contacts
          <span slot="subtitle">1.5.6</span>
        </q-toolbar-title>
      </q-toolbar>

    </q-layout-header>

    <!-- (Optional) The Footer -->
    <q-layout-footer>

       <q-tabs>
        <q-route-tab
          slot="title"
          icon="home"
          :to="getUserAttr('role') ==='client' ? '/dashboard/client':'/dashboard/adjuster'" 
          replace
          label="Home"
        />
          <q-route-tab
          slot="title"
          icon="mail"
          to="/chat"
          alert
          label="Messages"
        />
        <q-route-tab
          slot="title"
          icon="phone"
          to="/contacts"
          replace
          label="Contacts"
        />
      </q-tabs>
    </q-layout-footer>

    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
   <q-layout-drawer
      side="left"
      v-model="leftDrawer"
    >
      <div class="menu">
        <header class="q-pa-md flex items-center menu__header">
          <img class="menu__avatar q-mr-md" :src="getUserAttr('avatar')" alt="">
          <span>{{getUserAttr('fullname')}}</span>
        </header>

        <main>
          <q-list highlight link>
            <q-list-header>Info</q-list-header>
            <q-item @click.native="handleHome">
              <q-item-side>
                <q-item-tile icon="home" color="primary" />
              </q-item-side>
              <q-item-main label="Home" />
            </q-item> 
            <q-item>
              <q-item-side>
                <q-item-tile icon="settings" color="primary" />
              </q-item-side>
              <q-item-main label="Settings" />
            </q-item> 

            <q-item @click.native="logout">
              <q-item-side >
                <q-item-tile icon="power_settings_new" color="red" />
              </q-item-side>
              <q-item-main  label="Logout" />
            </q-item> 
          </q-list>
        </main>    
      </div>

    </q-layout-drawer>

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  // name: 'LayoutName',
  data() {
    return {
      leftDrawer: true
    };
  },
  computed: {
    ...mapGetters(["getUserAttr"])
  },
  methods: {
    logout() {
      this.$store.dispatch("logout", {
        $router: this.$router,
        $socket: this.$socket,
        _id: this.getID
      });
    }
  }
};
</script>

<style>
</style>
