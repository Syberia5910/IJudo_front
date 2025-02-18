<script lang="ts">

import axios from 'axios'
import draggable from 'vuedraggable'
import * as API from '@/constants/api'
import type { Pool } from '@/interfaces/pool'
import type { RegisteredInscription } from '@/interfaces/inscription'


export default {
    components: {
        draggable,
    },
    data() {
        return {
            maleColor: "l-bg-blue-dark",
            femaleColor: "l-bg-cherry",
            pools: [] as Pool[],
            snackbar: false,
            snackbarText: "",
            snackbarError: "",
            snackbarColor: ""
        }
    },
    async mounted() {
        try {
            const response = await axios.get(API.poolsUrl + "/3")
            this.pools = response.data
        } catch (error) {
            console.error("Erreur lors de la récupération des tournois", error)
            this.snackbarText = "Erreur lors de la récupération des tournois\n" + error
            this.snackbar = true
            this.snackbarColor = "error"
        }
        console.log(this.pools)
    },
    methods: {
        addPool() {
            this.pools.push({
                id: this.pools[0].id, 
                nom: this.pools[this.pools.length - 1].nom.split(" ")[0] + " " + (this.pools.length + 1),
                Registrations: []
            })
            this.snackbarText = "Poule ajoutée correctement"
            this.snackbar = true
            this.snackbarColor = "success"
        },
        printPool() {
            var validate = 0
            for (let i = this.pools.length - 1; i >= 0; i--) {
                const pool = this.pools[i];
                
                if ( pool.Registrations.length == 0 ) {
                    this.pools.splice(i, 1);
                } else if ( pool.Registrations.length < 2 || pool.Registrations.length > 5 ) {
                    validate++;
                }
            }
            if (validate == 0) {
                const response = axios({
                    url: API.pdfUrl,
                    method: 'POST',
                    data: this.pools,
                    responseType: 'blob', // important
                }).then((response) => {
                    const fileURL = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
                    window.open(fileURL); // Ouvre le PDF dans un nouvel onglet
                });
            } else {
                this.snackbarText = "Les poules ne sont pas correctement créé\n"
                this.snackbarText += "Nombre de participant doit être compris entre 2 et 5\n"
                this.snackbarText += "Poule avec des filles et des garçons mélangés"
                this.snackbar = true
                this.snackbarColor = "error"
            }
        }
    }
}
</script>

<template>
    <v-app-bar class="pa-2 pb-0">
        <v-row >
            <v-spacer />
            <v-col cols="auto">
                <v-btn  variant="tonal" append-icon="mdi-plus-circle" v-on:click="addPool()">Ajouter une poule</v-btn>
            </v-col>
            <v-col cols="auto">
                <v-btn  variant="tonal" append-icon="mdi-printer" v-on:click="printPool()">Imprimer les poules</v-btn>
            </v-col>
        </v-row>
     </v-app-bar>
    <div id="pools">
        <draggable
            v-model="pools"
            group="item"
            tag="div"
            :itemKey="'id'"
            class="d-flex flex-column">
            <template #item="{ element: Pool }">
                <v-row class="bg-danger">
                    <v-col cols="12">
                        <div class="title bg-grey pa-2">
                            {{ Pool.nom }}
                        </div>
                        <v-col cols="12" class="bg-secondary">
                            <draggable
                                v-model="Pool.Registrations"
                                tag="div"
                                class="d-flex flex-wrap"
                                :itemKey="'id'"
                                group="judoka"
                                :animation="500">
                                <template #item="{ element: registration }">
                                    <v-col cols="2" class="bg-warning .bg-warning.bg-gradient shadow">
                                        <v-card :class="[registration.Judoka.sexe == 'M' ? maleColor : femaleColor]" role="button"
                                            class="pa-4 text-center">
                                            <v-icon large class="mb-2">{{ registration.Judoka.sexe == 'M' ? 'mdi-gender-male' : 'mdi-gender-female' }}</v-icon>
                                            <v-card-title class="text-h6">
                                                {{ registration.Judoka.prenom }} {{ registration.Judoka.nom }}
                                            </v-card-title>
                                            <v-card-subtitle>
                                                {{ registration.poid }} kg
                                            </v-card-subtitle>
                                            <v-card-text class="text-right">
                                                <span>{{ registration.Club.nom }}</span>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                </template>
                            </draggable>
                        </v-col>
                    </v-col>
                </v-row>
            </template>
        </draggable>
    </div>

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