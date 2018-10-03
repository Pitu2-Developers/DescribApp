<template>
  <q-page >
    <q-scroll-area style="width=100vw; height:70vh;">
    <div class="profile ">
      <header class="q-pa-md flex flex-center profile__header">
          <div class="flex flex-center column">
            <img class="profile__avatar" :src="getAvatar" alt="">
            <span class="white">{{getFullName}}</span>
          </div>
      </header>

        <q-tabs inverted position="top">
          <q-tab default  slot="title" name="tab-1" icon="face" />
          <q-tab slot="title" name="tab-2" icon="person" />

          <!-- Targets -->
          <q-tab-pane name="tab-1"><info-client/></q-tab-pane>
          <q-tab-pane name="tab-2"><info-adjuster/></q-tab-pane>
       
        </q-tabs>
    </div>

    </q-scroll-area>


  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import InfoClient from "../components/client-info";
import InfoAdjuster from "../components/adjuster-info";
export default {
  // name: 'PageName',
  components: { InfoClient, InfoAdjuster },
  data() {
    return {};
  },
  methods: {
    sendAlert() {
      console.log("ALERT");
      this.$socket.emit("alert", {
        _id: this.getID,
        adjuster: this.getAdjusterID
      });
      this.$router.push("/dashboard/alert");
    }
  },
  computed: {
    ...mapGetters(["getFullName", "getAvatar", "getID", "getAdjusterID"])
  }
};
</script>

<style lang="stylus">
@import '~variables';

.profile {
  width: 100%;

  &__header {
    background: $primary;
    width: 100%;
    height: 200px;
  }

  &__avatar {
    s = 100px;
    width: s;
    height: s;
    border-radius: 50%;
  }
}

.alert-button {
  background: #FF6D6D;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  transition: all ease 0.4s;

  span {
    color: #fff;
    font-size: 1.5rem;
  }

  &:hover {
    background: darken(#FF6D6D, 10%);
  }

  &:active {
    transform: scale(0.9);
  }
}
</style>
