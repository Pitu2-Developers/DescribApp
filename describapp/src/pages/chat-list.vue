<template>
  <q-page padding>
    <!-- content -->
    <div class="loading flex flex-center column" v-if="isLoading">
      <p class="loading_text">Loading conversations...</p>
      <q-spinner-comment color="primary" :size="100" />    
    </div>


    <div v-if="!isLoading">
      <q-list highlight>
        <q-list-header>Recent chats</q-list-header>
        
        
        <q-item  v-for="conversation in getConversations" :key="conversation._id" @click.native="$router.push(`/chat-room/${conversation._id}`)">
          <q-item-side>
            <q-item-tile avatar>
              <img :src="getRole =='client'? conversation.adjuster.avatar:conversation.client.avatar">
            </q-item-tile>


          </q-item-side>
          <q-item-main :label="getRole =='client'? conversation.adjuster.fullname:conversation.client.fullname" />
          <q-item-side right>
                <q-btn round dense color="primary" icon="message">
                  <q-chip floating color="red">2</q-chip>
               </q-btn>
          </q-item-side>
        </q-item>


        <!-- <q-item>
          <q-item-side avatar="statics/linux-avatar.png" />
          <q-item-main label="Jim Doe" />
            <q-item-side right>
                <q-btn round dense color="primary" icon="message">
                  <q-chip floating round color="red">1</q-chip>
               </q-btn>
          </q-item-side>
        </q-item> -->


        <!-- <q-item-separator /> -->
        <!-- <q-list-header>Previous chats</q-list-header> -->
        <!-- <q-item>
          <q-item-side avatar="statics/guy-avatar.png" />
          <q-item-main label="Jack Doe" />
        </q-item> -->
      </q-list>

    </div>
    <!-- <p>CHAT LIST</p> -->
  </q-page>
</template>


<script>
import { mapGetters } from "vuex";
import { CHAT_ROOM } from "../store/mutationTypes";
export default {
  // name: 'PageName',
  mounted() {
    this.$store.dispatch("chat/getConversations");
  },
  computed: {
    ...mapGetters({
      getConversations: "chat/getConversations",
      isLoading: "chat/getIsLoading",
      getID: "getID",
      getRole: "getRole"
    })
  },
  methods: {
    handleClick(_id) {
      this.$store.commit(CHAT_ROOM);
      this.$router.push(`/chat/${_id}`);
    }
  }
};
</script>

<style lang="stylus">
.loading {
  height: 60vh;
  // background: red;
}

.loading_text {
  color: rgba(gray, 0.5);
  font-size: 1rem;
}
</style>
