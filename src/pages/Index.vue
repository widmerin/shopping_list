<template>
  <div id="app" class="container">
      <div v-if="!currentUser" >
        <div class="login">
          <h1>The List</h1>
          <p>
            <button class="waves-effect waves-light btn" @click="triggerNetlifyIdentityAction('login')">Log In</button>
          </p>
        </div>
      </div>
      <div v-else>
        <list @logout="triggerNetlifyIdentityAction"></list>
      </div>
    </div>
  </div>
</template>
<script>

import List from '~/components/List.vue'

export default {
  components: {
    List
  },
  mounted() {
    window.netlifyIdentity = require('netlify-identity-widget')
    netlifyIdentity.init({
      APIUrl: "https://jovial-mccarthy-2c45ae.netlify.app/.netlify/identity"
    })
    this.currentUser = netlifyIdentity.currentUser()
  },
  metaInfo: {
    title: 'The List'
  },
  data() {
    return {
      currentUser: null,
    }
  },

  methods: {
    triggerNetlifyIdentityAction(action) {
      if (action == "login" || action == "signup") {
        netlifyIdentity.open(action);
        netlifyIdentity.on(action, user => {
          this.currentUser = {
            username: user.user_metadata.full_name,
            email: user.email,
            access_token: user.token.access_token,
            expires_at: user.token.expires_at,
            refresh_token: user.token.refresh_token,
            token_type: user.token.token_type
          };
          netlifyIdentity.close();
        });
      } else if (action == "logout") {
        this.currentUser = null;
        netlifyIdentity.logout();
      }
    }
  }
};
</script>
<style lang='scss'>
* {
  box-sizing: border-box;
}
.container {
  max-width: 600px;
  margin: 0 auto;
}

body {
  background-color: #48426d;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #424242;
  font-size: 18px;
  min-height: 350px;
  width: 100%;
  padding-bottom: 50px;
}
.login {
  color: #FFF;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 300px;
}
</style>
