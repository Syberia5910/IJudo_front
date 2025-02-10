<template>
    <v-container>
        <v-row cols="12">
            <v-col cols="4">
              <router-link :to="{ path: '/admin/tournoi'}">
                <v-card
                  title="Tournoi"
                  elevation="12"
                  color="blue"
                  text="..."
                >
                </v-card>
              </router-link>
            </v-col>
            <v-col cols="4">
              <router-link :to="{ path: '/admin/categorie'}" >
                <v-card
                  title="Categorie"
                  text="..."
                  elevation="12"
                  color="teal"
                />
              </router-link>
            </v-col>
        </v-row>
        <v-row cols="12">
            <v-col cols="4">
              <router-link :to="{ path: '/admin/judokas'}">
                <v-card 
                  title="Judoka"
                  text="..."
                  elevation="12"
                  color="purple-darken-1"
                />
              </router-link>
            </v-col>
            <v-col cols="4">
              <router-link :to="{ path: '/admin/pools'}">
                <v-card
                  title="Poule"
                  text="..."
                  elevation="12"
                  color="blue-grey"
                />
              </router-link>
            </v-col>
        </v-row>
    </v-container>
</template>

<style>
  .routerLink{
    text-decoration: none;
  }
  a { text-decoration: none; }
</style>