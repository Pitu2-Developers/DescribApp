<template>
    <q-scroll-area style="width:100%; height:200px;">
    <q-list highlight inset-separator>
        <q-item v-for="notification in getNotifications" :key="notification._id" >
          <q-item-side :avatar="notification.sender.avatar" />
            <q-item-main :label="notification.sender.fullname+' sent a alarm'" label-lines="1" />
          <q-item-side right>
            <q-item-tile stamp>{{notification.createAt}}</q-item-tile>
            <q-item-tile icon="build"/>
            <q-item-tile icon="local_hospital"/>
          </q-item-side>

        </q-item>
      </q-list>

    </q-scroll-area>


</template>

<script>
import { mapGetters } from "vuex";
export default {
  // name: 'ComponentName',
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getNotifications"])
  }
};
</script>

<style>
</style>
