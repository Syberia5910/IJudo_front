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
            pools: [ ] as Pool[],
            snackbar: false,
            snackbarText: "",
            snackbarError: "",
            snackbarColor: ""
        }
    },
    async mounted() {
        try {
            const response = await axios.get(API.poolsUrl + "/6")
            this.pools = response.data
        } catch (error) {
            console.error("Erreur lors de la récupération des tournois", error)
            this.snackbarText = "Erreur lors de la récupération des tournois\n" + error
            this.snackbar = true
            this.snackbarColor = "error"
        }
        this.pools.push({
            id: 55, 
            nom: "Nouvelle poule",
            Registration: [] as RegisteredInscription[]
        })

        console.log(this.pools)
    }
}
</script>



<template>
    <draggable v-model="pools" tag="div" class="d-flex flex-column">
        <template #item="{ element: Pool }">
            <v-row class="bg-danger">
                <v-col cols="12" class="">
                    <div class="title bg-grey ">
                        {{ Pool.nom }}
                    </div>
                    <v-col cols="12" class="bg-secondary">
                        <draggable v-model="Pool.Registrations" tag="div" class="d-flex flex-wrap" group="judoka"
                            :animation="500">
                            <template #item="{ element: registration }">
                                <v-col cols="2" class="bg-warning .bg-warning.bg-gradient shadow">
                                    <v-card :class="[registration.Judoka.sexe == 'M' ? maleColor : femaleColor]" role="button"
                                        class="pa-4 text-center">
                                        <v-icon large class="mb-2">{{ registration.Judoka.sexe == 'M' ? 'mdi-gender-male' : 'mdi-gender-female' }}</v-icon>
                                        <v-card-title class="text-h6">
                                            {{ registration.Judoka.nom }} {{ registration.Judoka.prenom }}
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
</template>


<!-- 
<template>
    <draggable v-model="tableau" tag="div" class="row">
        <template #item="{ element: poule }">
            <div class="row bg-danger">
                <div class="poule col-12 bg-blue">
                    <div class="title row bg-success">{{ poule.title }}</div>
                    <div class="judoka col-12 bg-secondary">
                        <draggable v-model="poule.judokas" tag="div" class="row" group="judoka" :animation="500">
                            <template #item="{ element: judoka }">
                                <div class="col-2 bg-warning ">
                                    <div :class="[judoka.genre == 'male' ? maleColor : femaleColor, 'card']"
                                        role="button">
                                        <div class="card-statistic-3 p-4">
                                            <div class="card-icon card-icon-large"><i class="fas fa-mars"></i></div>
                                            <div class="mb-4">
                                                <h5 class="card-title mb-0">{{ judoka.nom }} {{ judoka.prenom }}</h5>
                                            </div>
                                            <div class="row align-items-center mb-2 d-flex">
                                                <div class="col-12">
                                                    <h2 class="d-flex align-items-center mb-0">
                                                        {{ judoka.poid }} kg
                                                    </h2>
                                                </div>
                                            </div>
                                            <div>
                                                <div class="col-12 text-right">
                                                    <span>{{ judoka.club }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </draggable>
                    </div>
                </div>
            </div>
        </template>
    </draggable> -->
<!-- 
    <div class="row">

        <div class="col-12">

            {{tableau}}
        </div>
        <div class="col-12">

            <rawDisplayer class="col-12" :value="tableau" title="tableau" />

        </div>
    </div>
</template> -->