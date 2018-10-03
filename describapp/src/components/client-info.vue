<template>
  <nav class="info">
    <info-field :text="getUserAttr('fullname')" icon="account_box" field="Full name"/>
    <info-field :text="getUserAttr('gender') =='M'? 'Male' :'Female' " icon="rowing" field="Gender"/>
    <info-field :text="getUserAttr('nationality') ? 'Mexicana':'Extranjera'  " icon="terrain" field="Nationality"/>
    <info-field v-if="getUserAttr('role')==='client'"  :text="getUserAttr('address').street.name" icon="place" field="Address"/>
    <info-field :text="getUserAttr('contact').mobile" icon="phone_android" field="Mobile"/>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import InfoField from "./info-field";
export default {
  components: { InfoField },
  // name: 'ComponentName',
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getUserAttr", "getFullName", "getGender"])
  }
};
</script>

<style lang="stylus">
.info {
  font-size: 1.2rem;
}
</style>
