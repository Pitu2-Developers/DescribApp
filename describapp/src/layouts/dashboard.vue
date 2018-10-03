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
          Home
          <span slot="subtitle">v.1.4</span>
        </q-toolbar-title>
      </q-toolbar>

    </q-layout-header>



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
      <router-view />
    </q-page-container>


    <!-- (Optional) The Footer -->
    <q-layout-footer class="fixed-bottom" v-if="!getIsAlert">
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

    <q-page-sticky v-if="!getIsAlert && getUserAttr('role') ==='client' " position="bottom-right" :offset="[18, 18]">
  <q-btn
    @click="sendAlert"
    round
    color="red"
    icon="gps_fixed"
    size="lg"
  />
</q-page-sticky>
  </q-layout>
</template>

<script>
import { mapGetters } from "vuex";
import { ALERT, CHAT_ROOM, NOTIFICATION } from "../store/mutationTypes";
export default {
  // name: 'LayoutName',
  data() {
    return {
      leftDrawer: true
    };
  },
  sockets: {
    alert_success({ accident, notification }) {
      console.log(accident);
      console.log(notification);

      if (this.getRole === "client") {
        console.log("ACCIDENT TEST EMITED!!");
        this.$store.commit(ALERT.SUCCESS);
        this.$router.push(`/dashboard/alert/${accident._id}`);
      } else {
        const notificationConfig = {
          message: `${notification.sender.fullname} need help!`,
          position: "top-right",
          icon: "notification_important"
        };
        this.$q.notify(notificationConfig);
        this.$store.commit(NOTIFICATION.ADD, notification);
        // alert("YOU HAVE A NEW ACCIDENT");
      }
    },
    alert_failed({ message, type }) {
      this.$store.commit(ALERT.FAILED);
      this.$q.notify({
        message,
        type,
        position: "top-right",
        timeout: 500
      });
    }
  },
  methods: {
    handleHome() {
      this.$store.commit(CHAT_ROOM);
      this.$router.push(`/dashboard/${this.getRole}`);
    },
    logout() {
      this.$store.dispatch("logout", {
        $router: this.$router,
        $socket: this.$socket,
        _id: this.getID
      });
    },
    sendAlert() {
      console.log("A");

      this.$socket.emit("alert", {
        _id: this.getUserAttr("_id"),
        adjuster: this.getUserAttr("adjuster")._id
      });
    }
  },
  computed: {
    ...mapGetters(["getUserAttr", "getIsAlert", "getRole", "getID"])
  }
};
</script>

<style lang='stylus'>
.menu {
  // display: grid;
  // grid-template-rows: repeat(2, 1fr);
  &__avatar {
    display: block;
    border-radius: 50%;
    s = 50px;
    width: s;
    height: s;
  }
}
</style>
