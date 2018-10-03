<template>
  <q-page>
    <q-scroll-area style="width=100vw; height:60vh;">
        <div class="profile ">
              <header class="q-pa-md flex flex-center profile__header">
                  <div class="flex flex-center column">
                    <img class="profile__avatar" :src="getAvatar" alt="">
                    <span class="white">{{getFullName}}</span>
                  </div>
              </header>

                <q-tabs inverted position="top">
                  <q-tab default  slot="title" name="tab-1" icon="notification_important" />
                  <q-tab slot="title" name="tab-2" icon="person" />

                  <!-- Targets -->
                  <q-tab-pane name="tab-1">
                    <alert-list/>
                  </q-tab-pane>
                  <q-tab-pane name="tab-2">            
                    <info-client/>
                  </q-tab-pane>
              
                </q-tabs>
            </div>

    </q-scroll-area>    
  </q-page>
</template>


<script>
import { mapGetters } from "vuex";
import InfoClient from "../components/client-info";
import AlertList from "../components/alert-list";

export default {
  components: { InfoClient, AlertList },
  computed: {
    ...mapGetters([
      "getAvatar",
      // "getUserAttr",
      "getFullName",
      "getRole",
      "getID"
    ])
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
