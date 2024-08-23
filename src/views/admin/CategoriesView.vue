<script lang="ts">
import axios from 'axios'
import moment from 'moment'
import * as API from '../../constants/api'
import type { Tournament } from '../../interfaces/tournament'
import type { Category } from '../../interfaces/category'

const date = new Date();

export default {
  data() {
    return {
      tournaments: [] as Tournament[],
      tournamentID: null as number | null,
      selectedTournament: null,
      name: "",
      genre: "",
      dateNaissanceMin: "00/00/000 00:00",
      dateNaissanceMax: "00/00/000 23:59",
      anneeNaissanceMin: "",
      anneeNaissanceMax: "",
      categories: []as Category[],
      snackbar: false,
      snackbarText: "",
      snackbarError: "",
      snackbarColor: ""
    }
  },
  methods: {
    submit() {
      let data = {
        "name": this.name,
        "genre": this.genre,
        "date_naissance_min": moment("01/01/" + this.anneeNaissanceMin).format("YYYY-MM-DDT00:00:00Z"),
        "date_naissance_max": moment("12/31/" + this.anneeNaissanceMax).format("YYYY-MM-DDT23:59:00Z"),
        "poid_min": 0,
        "poid_max": 0,
        "tournament_ID": this.tournamentID,
        "date_ouverture": moment("01/01/1970 00:00").format("YYYY-MM-DDT00:00:00Z"),
        "date_cloture": moment("01/01/1970 00:00").format("YYYY-MM-DDT00:00:00Z"),
      }

      axios.post(API.categoryUrl, data)
        .then(reponse => {
          this.snackbarText = "Enregistrement réalisé avec succés"
          this.snackbarError = ""
          this.snackbarColor = "success"
          this.snackbar = true
          this.dateNaissanceMin = moment(date.toISOString().slice(0, 11) + "00:00").format("YYYY-MM-DDT00:00:00Z")
          this.dateNaissanceMax = moment(date.toISOString().slice(0, 11) + "23:59").format("YYYY-MM-DDT00:00:00Z")
          this.name = ""
          this.anneeNaissanceMax = ""
          this.anneeNaissanceMin = ""
          this.genre = ""
          this.updateCategories()
        })
        .catch(error => {
          this.snackbarText = "Problème lors de l'enregistrement \n "
          this.snackbarError = error
          this.snackbarColor = "error"
          this.snackbar = true
        });
    },
    updateCategories() {
      this.categories = []
      if (this.tournamentID != null) {
        axios.get(API.categoriesUrl + '/' + this.tournamentID).then(response => {
          this.categories = response.data
        });
      }
    }
  },
  mounted() {
    axios.get(API.tournamentsUrl).then(response => {
      this.tournaments = response.data
    });
  }
}
</script>


<template>
  <v-row>
    <v-col cols="6" class="px-8">
      <v-card :elevation="8" class="mx-auto" max-width="648">
        <v-layout>
          <v-app-bar :elevation="6" rounded class="bg-grey-lighten-1">
            <v-app-bar-title>Ajout d'une catégorie</v-app-bar-title>
          </v-app-bar>

          <v-main>
            <v-container fluid>
              <v-form @submit.prevent>
                <v-row>
                  <v-col>
                    <v-autocomplete label="Tournoi" v-model="tournamentID" :items="tournaments" item-title="nom" item-text="nom"
                  item-value="id" variant="underlined" clear-icon="mdi-close-circle" clearable
                  prepend-icon="mdi-tournament" required @update:modelValue="updateCategories" />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field v-model="name" label="name" variant="underlined" clear-icon="mdi-close-circle" clearable
                      prepend-icon="mdi-rename" required />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field label="Date naissance min" v-model="anneeNaissanceMin" variant="underlined" type="text"
                      clear-icon="mdi-close-circle" clearable prepend-icon="mdi-calendar-account" required />
                  </v-col>
                  <v-col>
                    <v-text-field label="Date naissance max" v-model="anneeNaissanceMax" variant="underlined" type="text"
                      clear-icon="mdi-close-circle" clearable prepend-icon="mdi-calendar-account" required />
                  </v-col>
                </v-row>
                <v-radio-group v-model="genre" inline>
                  <v-row>
                    <v-col class="cols-6">
                      <v-radio label="Fille" value="F" color="purple-accent-3" />
                    </v-col>
                    <v-col class="cols-6">
                      <v-radio label="Garçon" value="M" color="indigo-darken-3" />
                    </v-col>
                  </v-row>
                </v-radio-group>
                <v-row>
                  <v-col>
                    <v-btn @click="submit" class="bg-teal-lighten-2" :elevation="6">Enregistrer</v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-main>
        </v-layout>
      </v-card>
    </v-col>
    <v-col cols="6" class="px-8">
      <v-data-table :items="categories" :items-per-page="10" />
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