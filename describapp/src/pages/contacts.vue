<template>
  <q-page padding>
    <!-- content -->
    <q-list highlight>
      <q-item v-for="contact in contacts" :key="contact.phone">
        <q-item-side :color="contact.color" :icon="contact.icon" left/>
        <q-item-main :sublabel="contact.phone" :label="contact.name" />
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data() {
    return {
      contacts: [
        {
          icon: "phone",
          name: "Cruz Roja",
          phone: "4813810455",
          color: "primary"
        },
        {
          icon: "phone",
          name: "Protección Civil",
          phone: "4813814707",
          color: "primary"
        },
        {
          icon: "phone",
          name: "Bomberos",
          phone: "4813823133",
          color: "primary"
        },
        {
          icon: "phone",
          name: "Policia Municipal",
          phone: "4813820074",
          color: "primary"
        },
        {
          icon: "phone",
          name: "IMSS",
          phone: "4813622590",
          color: "primary"
        },
        {
          icon: "phone",
          name: "Hospital General",
          phone: "4813828170",
          color: "primary"
        }
      ]
    };
  }
};
</script>

<style>
</style>
