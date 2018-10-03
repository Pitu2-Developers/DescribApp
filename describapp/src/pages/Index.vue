<template>
  <q-page class="body">
      <header class="flex flex-center header">
        <!-- <h1>HEADER</h1> -->
          <div class="flex flex-center column">
              <img class="logo" src="assets/logo.png" alt="">
              <div class="q-mt-md flex flex-center column">
                  <span class="white title">D E S C R I B A P P</span>
                  <span class="q-mt-xs text-white text-xs">Send emergency messages</span>
              </div>
          </div>
      </header> 

      <main class="main flex flex-center">
        <form class="form form__signin">
          <div class="form__field">
              <input v-model='user.email' class="form__input" placeholder="Email" type="text">
          </div>
          <div class="form__field">
              <input v-model='user.password' class="form__input" placeholder="Password" type="password">
          </div> 
          <div class="q-mt-md flex justify-end form__field">
            <input @click.prevent="signIn" class="form__submit form__submit--white" value="SIGN IN" type="submit">
          </div>     
        </form>
      </main>

      <footer class="footer flex flex-center">
        <span class="text-white text-xs">© 2018 Nacho Castillo Copyright all rights reserved  </span>
      </footer>
  </q-page>
</template>

<style lang="stylus">
@import '~variables';

.body {
  display: grid;
  grid-template-rows: 0.1fr 0.8fr 0.1fr;
  background: $primary;
  min-width: 320px;
}

.header {
  padding: 20px;

  // padding: 30px;
  .logo {
    $s = 100px;
    width: $s;
    height: $s;
  }
}

.main {
  // background: red;
}

.footer {
  // background: red;
  height: 100%;
}
</style>

<script>
export default {
  // name: "P",
  data: () => {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    signIn() {
      this.$store.dispatch("signIn", {
        data: this.user,
        $router: this.$router,
        $socket: this.$socket
      });
      // this.$router.push("/dashboard");
    }
  }
};
</script>
