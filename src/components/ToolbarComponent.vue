<template>
  <v-app-bar scroll-behavior="inverted " color="#546665"><!-- Si on veut qu'elle se retracte on ajoutera collapse dans le scroll-behavior -->
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="drawer ? drawer = false : drawer = true" />
    </template>

    <v-app-bar-title>Interclub Judo Club Mazé</v-app-bar-title>

    <template v-slot:append>
      <img src="@/assets/img/logo.jpg" height="50"
              alt="Judo Clud Mazé logo" />
    </template>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer"  temporary height=100%>
    <v-list nav dense>
        <router-link to="/" class="navigation-link">
          <v-list-item prepend-icon="mdi-home" title="Accueil" />
        </router-link>

        <router-link to="/inscription" class="navigation-link">
          <v-list-item prepend-icon="mdi-account-plus-outline" title="Inscrition" />
        </router-link>
    </v-list>
    <template v-slot:append>
      <v-list nav dense>

        <v-divider inset></v-divider>

          <v-list-subheader inset>Admin</v-list-subheader>

          <router-link to="/admin" class="navigation-link">
            <v-list-item prepend-icon="mdi-security" title="Admin" />
          </router-link>

          <router-link to="/admin/tournoi" class="navigation-link">
            <v-list-item prepend-icon="mdi-tournament" title="Tournoi" />
          </router-link>

          <router-link to="/admin/categorie" class="navigation-link">
            <v-list-item prepend-icon="mdi-code-block-brackets" title="Categorie" />
          </router-link>
        </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
export default {
  data: () => ({
    name: "ToolbarComponent",
    drawer: false,
    group: null
  })
}
</script>


<style>
  .navigation-link, .navigation-link:hover
  {
    text-decoration: none;
    color: #000000 !important;
  }
</style>