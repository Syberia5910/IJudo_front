<script lang="ts">
import axios from 'axios'
import moment from 'moment'
import { Club } from '../classes/club'


const clubApiUrl = import.meta.env.VITE_ROOT_API + "/club/"
const inscriptionApiUrl = import.meta.env.VITE_ROOT_API + "/inscription/"
const categoriesApiUrl = import.meta.env.VITE_ROOT_API + "/categories/"
const categoryApiUrl = import.meta.env.VITE_ROOT_API + "/category/"
const tournamentsApiUrl = import.meta.env.VITE_ROOT_API + "/tournaments/"

export default {
  data() {
    return {
      tournoiID: null,
      tournoi: null,
      tournois: [],
      categoryID: null,
      category: {},
      categories: [],
      nom: "",
      prenom: "",
      dateNaissance: "",
      club: new Club(),
      clubID: 0,
      clubs: [],
      dateNaissanceFormated: "",
      ceinture: "",
      poid: null,
      ceintures: ["Blanc", "Blanc Jaune", " Jaune", "Jaune Orange", "Orange", "Orange Vert", "Vert", "Bleu"],
      sexe: "",
      date_min: "",
      date_max: "",
      stepItems: ['Catégorie', 'Judoka', 'Pesée'],
      step: 1,
      snackbar: false,
      snackbarText: "",
      snackbarError: "",
      snackbarColor: ""
    }
  },
  methods: {
    async submit() {
      this.snackbarText = ""
      if (typeof this.club == "string") {
        let clubData = {
          "nom": this.club
        }

        await axios.post(clubApiUrl, clubData)
          .then(response => {
            this.club = response.data;
            this.snackbarText = "Enregistrement nouveau club OK \n"
            this.snackbar = true
            this.snackbarColor = "success"
          })
          .catch(error => {
            this.snackbarText = "Erreur lors de l'enregistrement du club \n"
            this.snackbarText += error;
            this.snackbar = true
            this.snackbarColor = "error"
          });

        this.clubID = this.club.id

        let inscrData = {
          "nom": this.nom,
          "prenom": this.prenom,
          "date_naissance": this.dateNaissanceFormated,
          "club_ID": this.clubID,
          "sexe": this.sexe,
          "ceinture": this.ceinture,
          "poid": this.poid
        }

        axios.post(inscriptionApiUrl, inscrData)
          .then(response => {
            this.snackbarText += "Inscription OK\n"
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    updateCategorie() {
      this.categories = []
      if (this.tournoiID != null) {
        axios.get(categoriesApiUrl + this.tournoiID).then(response => {
          this.categories = response.data
        });
      }
    },
    nextStep1() {
      if (this.categoryID != null) {
        axios.get(categoryApiUrl + this.categoryID).then(response => {
          this.category = response.data
          this.date_min = response.data.date_naissance_min.substring(0, 10)
          this.date_max = response.data.date_naissance_max.substring(0, 10)
          this.sexe = response.data.sexe
        });
      }
      this.step++
    },
    nextStep2() {
      axios.get(clubApiUrl).then(response => {
        this.clubs = response.data
      });
      this.step++
    }
  },
  mounted() {
    axios.get(tournamentsApiUrl).then(response => {
      this.tournois = response.data
    });
  }
}
</script>

<template>
  <v-container cols="12">
    <v-row>
      <v-col cols="3"></v-col>
      <v-col cols="6" class="align-center" :elevation="10">
        <v-stepper :items="stepItems" v-model="step" editable alt-labels hide-actions cols="6">
          <template v-slot:item.1>
            <v-row>
              <v-col>
                <v-autocomplete label="Tournoi" v-model="tournoiID" :items="tournois" item-title="nom" item-text="nom"
                  item-value="id" variant="underlined" clear-icon="mdi-close-circle" clearable
                  prepend-icon="mdi-tournament" required @update:modelValue="updateCategorie" />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-autocomplete label="Categorie" v-model="categoryID" :items="categories" item-title="nom"
                  item-text="nom" item-value="id" variant="underlined" clear-icon="mdi-close-circle" clearable
                  prepend-icon="mdi-code-block-brackets" required />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn @click="step--" disabled prepend-icon="mdi-chevron-left" :elevation="4" class="mb-5">
                  Précédent
                </v-btn>
              </v-col>
              <v-col>
                <v-btn @click="nextStep1" append-icon="mdi-chevron-right" :elevation="7" class="mb-5">
                  Suivant
                </v-btn>
              </v-col>
            </v-row>
          </template>

          <template v-slot:item.2>
            <v-row>
              <v-col>
                <v-text-field label="Prenom" v-model="prenom" variant="underlined" clear-icon="mdi-close-circle" clearable
                  prepend-icon="mdi-account-edit" required />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field label="Nom" v-model="nom" variant="underlined" clear-icon="mdi-close-circle" clearable
                  prepend-icon="mdi-account-edit" required />
              </v-col>
            </v-row>

            <v-radio-group v-model="sexe" inline disabled>
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
                <v-text-field label="Date Naissance" v-model="dateNaissance" variant="underlined" type="date"
                  :min="date_min" :max="date_max" clear-icon="mdi-close-circle" clearable
                  prepend-icon="mdi-calendar-account" required />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn @click="step--" prepend-icon="mdi-chevron-left" :elevation="7" class="mb-5 d-flex flex-row">
                  Précédent
                </v-btn>
              </v-col>
              <v-col>
                <v-btn @click="nextStep2" append-icon="mdi-chevron-right" :elevation="7" class="mb-5">
                  Suivant
                </v-btn>
              </v-col>
            </v-row>
          </template>

          <template v-slot:item.3>
            <v-card flat>
              <v-card>
                <v-row>
                  <v-col>
                    <v-combobox label="Club" :items="clubs" v-model="club" item-title="nom" item-text="nom"
                      item-value="id" variant="underlined" clear-icon="mdi-close-circle" clearable
                      prepend-icon="mdi-map-marker" required />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-autocomplete label="Ceinture" v-model="ceinture" :items="ceintures" variant="underlined"
                      clear-icon="mdi-close-circle" clearable prepend-icon="mdi-ruler" required />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field label="Poid" v-model="poid" variant="underlined" type="numeric" suffix="kg"
                      clear-icon="mdi-close-circle" clearable prepend-icon="mdi-weight-kilogram" required />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-btn @click="step--" prepend-icon="mdi-chevron-left" :elevation="7" class="mb-5">
                      Précédent
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn @click="submit" append-icon="mdi-content-save-plus-outline" color="green-lighten-3"
                      :elevation="7" class="mb-5">
                      Enregistrer
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </v-card>
          </template>
        </v-stepper>
      </v-col>
      <v-col cols="3"></v-col>
    </v-row>
  </v-container>

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
