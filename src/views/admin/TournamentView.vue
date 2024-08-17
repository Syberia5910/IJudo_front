<script lang="ts">
import axios from 'axios'
import * as API from '../../constants/api'
import moment from 'moment';

const date = new Date();

export default {
  data() {
    return {
      nom: "",
      dateDebut: date.toISOString().slice(0, 11) + "00:00",
      dateFin: date.toISOString().slice(0, 11) + "23:59",
      tournois: [],
      snackbar: false,
      snackbarText: "",
      snackbarError: "",
      snackbarColor: ""
    }
  },
  methods: {
    submit() {
      let data = {
        "nom": this.nom,
        "date_debut": moment(String(this.dateDebut)).format("YYYY-MM-DDThh:mm:00Z"),
        "date_fin": moment(String(this.dateFin)).format("YYYY-MM-DDThh:mm:00Z"),
      }

      
      axios.post(API.tournamentUrl, data)
        .then(reponse => {
          this.updateTournaments()
          this.snackbarText = "Enregistrement réalisé avec succés"
          this.snackbarError = ""
          this.snackbarColor = "success"
          this.snackbar = true
          this.dateDebut = date.toISOString().slice(0, 11) + "00:00"
          this.dateFin = date.toISOString().slice(0, 11) + "23:59"
          this.nom = ""
        })
        .catch(error => {
          this.snackbarText = "Problème lors de l'enregistrement \n "
          this.snackbarError = error
          this.snackbarColor = "error"
          this.snackbar = true
        });
    },
    updateTournaments() {
      axios.get('http://localhost:8080/tournaments').then(response => {
      this.tournois = response.data
    });
    }
  },
  mounted() {
    this.updateTournaments()
  }
}
</script>


<template>
  <v-row>
    <v-col cols="6" class="px-8">
      <v-card :elevation="8" class="mx-auto" max-width="648">
        <v-layout>
          <v-app-bar :elevation="6" rounded class="bg-grey-lighten-1">
            <v-app-bar-title>Enregistrer un nouveau Tournoi</v-app-bar-title>
          </v-app-bar>

          <v-main>
            <v-container fluid>
              <v-form @submit.prevent>
                <v-row>
                  <v-col>
                    <v-text-field label="Nom du Tournoi" v-model="nom" variant="underlined" clear-icon="mdi-close-circle"
                      clearable prepend-icon="mdi-map-marker" required />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field label="Date Début" v-model="dateDebut" variant="underlined" type="datetime-local"
                      clear-icon="mdi-close-circle" clearable prepend-icon="mdi-calendar-account" required />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field label="Date Cloture" v-model="dateFin" variant="underlined" type="datetime-local"
                      clear-icon="mdi-close-circle" clearable prepend-icon="mdi-calendar-account" required />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-btn @click="submit" class="bg-teal-lighten-2">Enregistrer</v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-main>
        </v-layout>
      </v-card>
    </v-col>
    <v-col cols="6" class="px-8">
      <v-data-table :items="tournois" :items-per-page="10" />
    </v-col>
  </v-row>

  <v-snackbar v-model="snackbar" vertical :color="snackbarColor" :timeout="5000">
    <div class="text-h6 pb-2"> {{ snackbarText }} </div>
    <p>{{ snackbarError }}</p>

    <template v-slot:actions>
      <v-btn class="bg-grey-darken-2" color="white" variant="text" @click="snackbar = false" elevation="8">
        Fermer
      </v-btn>
    </template>
  </v-snackbar>
</template>