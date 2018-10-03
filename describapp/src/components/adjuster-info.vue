<template>
    <nav class="info">
    <info-field :text="getAdjusterAttr('fullname') " icon="account_box" field="Full name"/>
    <info-field :text="getAdjusterAttr('genter') =='M'? 'Male' :'Female' " icon="rowing" field="Gender"/>
    <info-field :text="getAdjusterAttr('nationality') ? 'Mexicana':'Extranjera'  " icon="terrain" field="Nationality"/>
    <info-field :text="getAdjusterAttr('contact').mobile " icon="phone" field="Mobile"/>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import InfoField from "./info-field";

export default {
  components: { InfoField },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getAdjusterAttr"])
  }
};
</script>

<style lang="stylus">
</style>
