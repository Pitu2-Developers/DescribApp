<template>
  <q-page padding>
      <q-list highlight>
        <q-list-header>Extra Services</q-list-header>
        
        <q-item>
          <q-item-side>
            <q-item-tile >
              <q-checkbox color="green"  v-model="services[0]" />
            </q-item-tile>
          </q-item-side>
          <q-item-main label="Mechanic service" />
          <q-item-side right>
            <q-item-tile icon="build" color="green" />
          </q-item-side>
        </q-item>


        <q-item>
            <q-item-side>
              <q-item-tile >
                <q-checkbox color="red"  v-model="services[1]" />
              </q-item-tile>
            </q-item-side>
            <q-item-main label="Medical service" />
            <q-item-side right>
              <q-item-tile icon="local_hospital" color="red" />
            </q-item-side>
        </q-item>

        <q-item-separator />

        <q-list-header>Adjuster Information</q-list-header>
        
        <q-item>
          <q-item-side :avatar="getAdjusterAttr('avatar')" />
          <q-item-main :label="getAdjusterAttr('fullname')" />
           <q-item-side right>
              <q-item-tile icon="near_me" color="primary" />
            </q-item-side>
        </q-item>

      </q-list>
      <div class="btn_con flex flex-center">
          <q-btn
            @click="startConversation"
            icon="send"
            color="positive"
            size="lg"
            label="Start conversation "
          />
      </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  // name: 'PageName',
  data() {
    return {
      services: [false, false]
    };
  },
  methods: {
    startConversation() {
      this.$store.dispatch("startConversation", {
        $router: this.$router,
        accidentID: this.$route.params.id,
        services: this.services,
        _id: this.getID,
        adjusterID: this.getAdjusterAttr("_id")
      });
    }
  },
  computed: {
    ...mapGetters(["getID", "getAdjusterAttr"])
  }
};
</script>

<style lang="stylus">
.btn_con {
  height: 25vh;
}
</style>
