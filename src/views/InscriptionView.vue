<script lang="ts">
import axios from 'axios'
import moment from 'moment'
import * as API from '@/constants/api'
import type { Club, RegisteredClub } from '@/interfaces/club'
import type { Category } from '@/interfaces/category'
import type { Tournament } from '@/interfaces/tournament'
import type { Inscription } from '@/interfaces/inscription'
import type { Judoka, RegisteredJudoka } from '@/interfaces/judoka'

export default {
  data() {
    return {
      tournoiID: null as number | null,
      tournoi: null as Tournament | null,
      tournois: [] as Tournament[],
      categoryID: null as number | null,
      category: {} as Category,
      categories: [] as Category[],
      nom: "",
      prenom: "",
      dateNaissance: "",
      club: "" as string | RegisteredClub,
      clubs: [] as RegisteredClub[],
      judoka: {} as RegisteredJudoka,
      dateNaissanceFormated: "",
      ceinture: "",
      poid: null as number | null,
      ceintures: ["Blanc", "Blanc Jaune", "Jaune", "Jaune Orange", "Orange", "Orange Vert", "Vert", "Bleu"],
      sexe: "",
      date_naissance_min: "",
      date_naissance_max: "",
      stepItems: ['Catégorie', 'Judoka', 'Pesée'],
      step: 1,
      snackbar: false,
      snackbarText: "",
      snackbarError: "",
      snackbarColor: ""
    }
  },
  computed: {
    isValidJudokaRegistrationForm() {
      return this.nom !== "" && this.prenom !== "" && this.dateNaissance !== "";
    }
  },
  methods: {
    async submit() {
      this.snackbarText = ""

      if (typeof this.club === "string") {
        try {
          const clubData: Club = { nom: this.club }
          const response = await axios.post(API.clubUrl, clubData)
          this.club = response.data
          this.snackbarText = "Enregistrement nouveau club OK\n"
          this.snackbar = true
          this.snackbarColor = "success"
        }
        catch (error) {
          console.error("Erreur lors de l'enregistrement du nouveau club", error)
          this.snackbarText = "Erreur lors de l'enregistrement du nouveau club\n" + error
          this.snackbar = true
          this.snackbarColor = "error"
          return;
        }
      }

      try {
        const inscrData: Inscription = {
          poid: this.poid !== null ? parseFloat(this.poid.toString()) : 0,
          ceinture: this.ceinture,
          judoka_ID: this.judoka.id,
          category_ID: this.category.id,
          club_ID: (this.club as RegisteredClub).id,
        }

        const response = await axios.post(API.inscriptionUrl, inscrData)
        .then(reponse => {
          this.snackbarText = "Enregistrement réalisé avec succés\n"
          this.snackbarError = ""
          this.snackbarColor = "success"
          this.snackbar = true
          this.step = 1
          this.nom = "",
          this.prenom = "",
          this.dateNaissance = "",
          this.club = "",
          this.ceinture = "",
          this.poid = null 
        })
        this.snackbarText += "Inscription OK\n"
      } catch (error) {
        this.snackbarText = this.snackbarText + "Erreur lors de l'enregistrement\n" + error
        this.snackbar = true
        this.snackbarColor = "error"
        console.error(error)
      }
    },
    async updateCategorie() {
      if (this.tournoiID !== null) {
        try {
          const response = await axios.get(`${API.categoriesUrl}/${this.tournoiID}`)
          this.categories = response.data
        } catch (error) {
          console.error("Erreur lors de la récupération des catégories", error)
        }
      }
    },
    async nextStep1() {
      if (this.categoryID !== null) {
        try {
          const response = await axios.get(`${API.categoryUrl}/${this.categoryID}`)
          this.category = response.data
          this.date_naissance_min = response.data.date_naissance_max.substring(0, 10)
          this.date_naissance_max = response.data.date_naissance_min.substring(0, 10)
          this.sexe = response.data.sexe
        } catch (error) {
          console.error("Erreur lors de la récupération des catégories", error)
          this.snackbarText = "Erreur lors de la récupération des catégories\n" + error
          this.snackbar = true
          this.snackbarColor = "error"
          return;
        }
      }

      this.step++
    },
    async nextStep2() {
      try {
        const registerJudokaData: Judoka = {
          nom: this.nom,
          prenom: this.prenom,
          date_naissance: moment(String(this.dateNaissance)).format("YYYY-MM-DDThh:mm:00Z"),
          sexe: this.sexe
        }
        const response = await axios.post(API.judokaUrl, registerJudokaData)

        this.judoka = response.data
        this.snackbarText = "Enregistrement du judoka OK\n"
        this.snackbar = true
        this.snackbarColor = "success"

        this.step++
      } catch (error) {
        console.error("Erreur lors de l'inscription du judoka", error)
        this.snackbarText = this.snackbarText + "Erreur lors de l'inscription du judoka\n" + error
        this.snackbar = true
        this.snackbarColor = "error"
        return;
      }

      try {
        const response = await axios.get(API.clubsUrl)
        this.clubs = response.data
      } catch (error) {
        console.error("Erreur lors de la récupération des clubs", error)
        this.snackbarText = "Erreur lors de la récupération des clubs\n" + error
        this.snackbar = true
        this.snackbarColor = "error"
        return;
      }
    },
    validateDate() {
      // Convertir les dates pour les comparer
      const date = new Date(this.dateNaissance);
      const minDate = new Date(this.date_naissance_min);
      const maxDate = new Date(this.date_naissance_max);

      if (date < minDate || date > maxDate) {
        this.snackbarText = `La date doit être comprise entre ${this.date_naissance_min} et ${this.date_naissance_max}.`;
        this.dateNaissance = ""; // Réinitialiser la date incorrecte
        this.snackbar = true
        this.snackbarColor = "warning"
      }
    },
  },
  async mounted() {
    try {
      const response = await axios.get(API.tournamentsUrl)
      this.tournois = response.data
    } catch (error) {
      console.error("Erreur lors de la récupération des tournois", error)
      this.snackbarText = "Erreur lors de la récupération des tournois\n" + error
      this.snackbar = true
      this.snackbarColor = "error"
    }
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
                <v-btn @click="nextStep1" :disabled="!categoryID" append-icon="mdi-chevron-right" :elevation="7" class="mb-5">
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
                <v-text-field
                  label="Date Naissance" 
                  v-model="dateNaissance" 
                  variant="underlined"
                  type="date"
                  :min="date_naissance_min"
                  :max="date_naissance_max"
                  clear-icon="mdi-close-circle"
                  clearable
                  prepend-icon="mdi-calendar-account"
                  @blur="validateDate"
                  required
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn @click="step--" prepend-icon="mdi-chevron-left" :elevation="7" class="mb-5 d-flex flex-row">
                  Précédent
                </v-btn>
              </v-col>
              <v-col>
                <v-btn @click="nextStep2" :disabled="!isValidJudokaRegistrationForm" append-icon="mdi-chevron-right" :elevation="7" class="mb-5">
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
