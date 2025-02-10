<script lang="ts">
import axios from 'axios'
import moment from 'moment'
import * as API from '../../constants/api'
import type { Category } from '../../interfaces/category'
import type { Tournament } from '../../interfaces/tournament'

export default {
  data() {
    return {
      nom: "" as String,
      dateTournoi: "",
      minDate: "",
      tournament: null as Tournament | null,
      categories: [] as Category[],
      editedCategory: {} as Category,

      stepItems: ['Tournoi', 'Catégories', 'Validation'],
      step: 1,

      editDialog: false, // Contrôle de la fenêtre modale
      snackbar: false,
      snackbarText: "",
      snackbarError: "",
      snackbarColor: ""
    }
  },
  computed: {
    validateTournamentForm() {
      return this.nom !== "" && this.dateTournoi !== ""
    }
  },
  methods: {
    async nextStep1() {
      let data = {
        "nom": this.nom,
        "date": moment(String(this.dateTournoi)).format("YYYY-MM-DDThh:mm:00Z"),
      }
      axios.post(API.tournamentUrl, data)
        .then(response => {
          this.tournament = response.data
          this.snackbarText = "Enregistrement réalisé avec succés"
          this.snackbarError = ""
          this.snackbarColor = "success"
          this.snackbar = true

          this.updateCategories()

          this.step++
        })
        .catch(error => {
          this.snackbarText = "Problème lors de l'enregistrement \n "
          this.snackbarError = error
          this.snackbarColor = "error"
          this.snackbar = true
        });
    },
    updateCategories() {
      console.log(this.tournament)
      if (this.tournament != null) {
        axios.get(API.categoriesUrl + '/' + this.tournament.id).then(response => {
          this.categories = response.data
        });
      }
    },
    openEditModal(category: Category) {
      this.editedCategory = { ...category }; // Copier les valeurs de la catégorie
      this.editDialog = true; // Ouvrir le modal
    },
    // Fermer le modal
    closeEditModal() {
      this.editDialog = false;
    },
    // Sauvegarder les modifications
    saveCategory() {
      axios.put(`${API.categoriesUrl}/${this.editedCategory.id}`, this.editedCategory)
        .then(() => {
          // Mettre à jour la liste des catégories
          const index = this.categories.findIndex(c => c.id === this.editedCategory.id);
          if (index !== -1) {
            this.categories[index] = { ...this.editedCategory };
          }
          this.snackbarText = "Catégorie mise à jour avec succès";
          this.snackbarColor = "success";
          this.snackbar = true;
          this.closeEditModal(); // Fermer le modal après la sauvegarde
        })
        .catch(error => {
          this.snackbarText = "Erreur lors de la mise à jour de la catégorie";
          this.snackbarError = error;
          this.snackbarColor = "error";
          this.snackbar = true;
        });
    },
    // Méthode pour supprimer une catégorie
    deleteCategory(index: number) {
      const category = this.categories[index];
      axios.delete(`${API.categoriesUrl}/${category.id}`)
        .then(() => {
          this.categories.splice(index, 1); // Supprimer de la liste
          this.snackbarText = "Catégorie supprimée avec succès";
          this.snackbarColor = "success";
          this.snackbar = true;
        })
        .catch(error => {
          this.snackbarText = "Erreur lors de la suppression de la catégorie";
          this.snackbarError = error;
          this.snackbarColor = "error";
          this.snackbar = true;
        });
    },
    // Donne l'année pour l'affichage des dates
    giveYear(date: string): string {
      return moment(date).format('YYYY');
    },
    // Donne l'heure pour l'affichage des horaires
    giveHour(date: string): string {
      return moment(date).format('hh:mm');
    },
    created() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0"); // +1 car les mois commencent à 0
      const day = String(today.getDate()).padStart(2, "0"); // Formatage du jour
      this.minDate = `${year}-${month}-${day}`; // Format YYYY-MM-DD
    }
  }
}
</script>

<template>
  <v-container cols="12">
    <v-row>
      <v-col cols="3"></v-col>
      <v-col cols="12" class="align-center" :elevation="10">
        <v-stepper :items="stepItems" v-model="step" editable alt-labels hide-actions cols="6">
          <template v-slot:item.1>
            <v-row>
              <v-col cols="12" class="px-8">
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
                              <v-text-field label="Nom du Tournoi" v-model="nom" variant="underlined"
                                clear-icon="mdi-close-circle" clearable prepend-icon="mdi-map-marker" required />
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <v-text-field label="Date" v-model="dateTournoi" variant="underlined"
                                type="date" :min="minDate" clear-icon="mdi-close-circle" clearable
                                prepend-icon="mdi-calendar-account" required />
                            </v-col>
                          </v-row>
                        </v-form>
                      </v-container>
                    </v-main>
                  </v-layout>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn disabled prepend-icon="mdi-chevron-left" :elevation="4" class="mb-5">
                  Précédent
                </v-btn>
              </v-col>
              <v-col>
                <v-btn @click="nextStep1" :disable="!validateTournamentForm" append-icon="mdi-chevron-right" :elevation="7" class="mb-5">
                  Suivant
                </v-btn>
              </v-col>
            </v-row>
          </template>

          <template v-slot:item.2>
            <v-row>
              <v-col cols="12" class="px-8">
                <v-table>
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Sexe</th>
                      <th>Naissance</th>
                      <th>Horaire</th>
                    </tr>
                  </thead>
                  <tbody> 
                    <tr v-for="(category, index) in categories" :key="category.id">
                      <td>{{ category.nom }}</td>
                      <td>{{ category.sexe }}</td>
                      <td>{{ giveYear(category.date_naissance_min) }} - {{ giveYear(category.date_naissance_max) }}</td>
                      <td>{{ giveHour(category.date_ouverture) }} - {{ giveHour(category.date_cloture) }}</td>
                      <td>
                        <v-btn @click="openEditModal(category)" icon color="#8d9def" :elevation="2">
                          <v-icon>mdi-account-edit</v-icon>
                        </v-btn>
                        <v-btn @click="deleteCategory(index)" icon color="#f26767" :elevation="2">
                          <v-icon>mdi-delete-variant</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-col>
            </v-row>

            <v-dialog v-model="editDialog" max-width="600px">
              <v-card>
                <v-card-title class="headline">Modifier Catégorie</v-card-title>
                <v-card-text>
                  <v-form>
                    <v-text-field v-model="editedCategory.nom" label="Nom" required />
                    <v-select v-model="editedCategory.sexe" :items="['M', 'F']" label="Sexe" required />
                    <v-text-field v-model="editedCategory.date_naissance_min" label="Date de naissance min" type="date" required />
                    <v-text-field v-model="editedCategory.date_naissance_max" label="Date de naissance max" type="date" required />
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn @click="closeEditModal">Annuler</v-btn>
                  <v-btn color="green" @click="saveCategory">Sauvegarder</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>

          <template v-slot:item.3>
            <v-card flat>
              <v-card>
                <v-row>
                  <!-- <v-col>
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
                    </v-col> -->
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