<template>
     <li class="info__field">
      <p class="info__text">
        <span class="q-mr-xs info__span"><q-icon class="q-mr-sm" size="2rem" :name="icon"/>{{field}}:</span> 
        {{text}}
      </p>
    </li>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: ["icon", "text", "field"],
  data() {
    return {};
  }
};
</script>

<style lang="stylus">
.info__text {
  font-size: 0.9rem;
}

.info__span {
  color: #ccc;
}
</style>
