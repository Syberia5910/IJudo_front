<template>
  <v-container align-center >
    <v-row>
      <v-col class="align-center text-center text-h6 text-md-h5 text-lg-h4">
        Bienvenue sur la page d'inscription à l'interclub du Judo Club Mazé

        <hr />

      </v-col>
    </v-row>
    <v-row >
      <v-col class="text-center ">
        <p class=" py-8 font-weight-medium">Actuellement ? tournoi ouvert</p>
        <p class="font-weight-medium">??? Judokas inscrit sur la journée</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
  hr {
    display: block;
    /*pour être sûr que les navigateurs vont bien l'afficher en block*/
    height: 0;
    background-color: transparent;
    /*optionnel mais c'est plus propre*/
  }
</style>