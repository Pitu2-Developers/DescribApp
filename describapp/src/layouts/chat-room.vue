<template>
  <q-layout > <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-layout-header>
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="keyboard_arrow_left"
          @click="$router.go(-1)"
        />
        <q-toolbar-title>
          {{getRole =='client'? getConversationsData(conversationID,'adjuster').fullname : getConversationsData(conversationID,'client').fullname }}
          <span slot="subtitle">1.5.6</span>
        </q-toolbar-title>
        <q-btn :color="mechanicService? 'green':'light' " flat round dense icon="build" />
        <q-btn :color="medicalService?'red':'light'" flat round dense icon="local_hospital" />
      </q-toolbar>
    </q-layout-header>



    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
    <q-layout-drawer
      side="left"
      v-model="leftDrawer"
    >
      <!-- QScrollArea is optional -->
      <q-scroll-area class="fit q-pa-sm">
        <!-- Content here -->
      </q-scroll-area>
    </q-layout-drawer>

    <q-page-container>
     
        <q-page >

           <q-scroll-area style="width:100vw; height:70vh;">

            <q-chat-message
        
          v-if="messages.length>0"
          v-for="message in messages"
          :key="message.text+`${Math.random()*12901248924}` "
          :name="message.name"
          :avatar="message.avatar"
          :text="message.text"
          :stamp="message.stamp"
          :sent="(message.sentBy===1 && getRole==='client') || (message.sentBy===2 && getRole==='adjuster') ?true:false"
          :bg-color="(message.sentBy===1 && getRole==='client') || (message.sentBy===2 && getRole==='adjuster') ? 'blue-1':'blue-2'"
        />
        
        </q-scroll-area>
        </q-page>

        <!-- <q-chat-message
          v-if="messages2.length>0"
          name="Nacho Castillo"
          :avatar="getAvatar"
          :text="messages2"
          stamp="4 minutes ago"
        /> -->
      <!-- This is where pages get injected -->
      <!-- <router-view /> -->
    </q-page-container>

        <!-- (Optional) The Footer -->
    <q-layout-footer>
      <div class="input__send">
               <q-input
            v-model="message"
            type="textarea"
            float-label="Message"
            :after="[
              {
                icon:'send',
                handler: this.handler

              },
            ]"
            :max-height="10"
            rows="1"
          />
      </div>
    </q-layout-footer>

  </q-layout>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  // name: 'LayoutName',0
  mounted() {
    this.messages = this.getConversationsData(this.conversationID, "messages");
    this.medicalService = this.getConversationsData(
      this.conversationID,
      "accident"
    ).medicalService;
    this.mechanicService = this.getConversationsData(
      this.conversationID,
      "accident"
    ).mechanicService;
  },
  data() {
    return {
      leftDrawer: true,
      message: "",
      messages: [],
      allMessages: [],
      messages2: [],
      conversationID: this.$route.params.id,
      medicalService: false,
      mechanicService: false
    };
  },
  computed: {
    ...mapGetters({
      getAvatar: "getAvatar",
      getID: "getID",
      getConversationsByID: "chat/getConversationsByID",
      getConversationsData: "chat/getConversationsByIdAttr",
      getRole: "getRole",
      getFullName: "getFullName"
      // getAdjusterAttr: "getAdjusterAttr"
    })
  },
  sockets: {
    reply(message) {
      console.log("ON MESSAGE");

      if (message.conversation === this.conversationID) {
        this.messages.push(message);
        console.log(message);
      }
    }
  },
  methods: {
    handler() {
      var options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      const message = {
        avatar: this.getAvatar,
        name: this.getFullName,
        text: [this.message],
        sentBy: this.getRole === "client" ? 1 : 2,
        stamp: new Date().toLocaleDateString("en-US", options)
      };

      const socketConfig = {
        _id: this.getID,
        conversation: this.getConversationsByID(this.conversationID),
        message,
        role: this.getRole
      };

      if (this.message.length > 0) {
        console.log("EMITTED!");

        // console.log(this.message);
        this.$socket.emit("message", socketConfig);
        // if(this.isReply)
        this.messages.push(message);
        this.message = "";
        // if(this.messages.)
      }
    }
  }
};
</script>

<style lang="stylus">
.input__send {
  padding: 10px;
}
</style>
