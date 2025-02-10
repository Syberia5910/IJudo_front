<script lang="ts">

import draggable from 'vuedraggable';

export default {
    components: {
            draggable,
        },
    data() {
        return {
            maleColor: "l-bg-blue-dark",
            femaleColor: "l-bg-cherry",
            tableau: [
                {
                    "title": "Poule A",
                    "judokas": [
                        {
                            "id": "62936a60-8c22-4512-8cd3-a7f4f2e5997e",
                            "nom": "Marianne",
                            "prenom": "Mcknight",
                            "club": "JC Trelazeen",
                            "genre": "female",
                            "poid": 25.2
                        },
                        {
                            "id": "63e95616-b266-40fe-b52d-96cc8422e94a",
                            "nom": "Debra",
                            "prenom": "Whitney",
                            "club": "JC Montreuil Jugne",
                            "genre": "female",
                            "poid": 25.9
                        },
                        {
                            "id": "9c1785d0-68bb-47d6-a349-199fa0a5c043",
                            "nom": "Sonia",
                            "prenom": "Ellis",
                            "club": "Angers Judo",
                            "genre": "male",
                            "poid": 26.9
                        }
                    ]
                },
                {
                    "title": "Poule B",
                    "judokas": [
                        {
                            "id": "52ba7080-0a40-407d-bc8b-4cacb476c668",
                            "nom": "Tameka",
                            "prenom": "Shannon",
                            "club": "ASPTT Angers",
                            "genre": "male",
                            "poid": 28.9
                        },
                        {
                            "id": "d12fc47c-f363-46e6-ba76-7a6efcd2e128",
                            "nom": "Sondra",
                            "prenom": "Bean",
                            "club": "JC Maze",
                            "genre": "male",
                            "poid": 28.6
                        },
                        {
                            "id": "ec570798-eabf-4679-ac76-0f24efd65f74",
                            "nom": "Erma",
                            "prenom": "Henry",
                            "club": "ASPTT Angers",
                            "genre": "female",
                            "poid": 30.5
                        },
                        {
                            "id": "2b9a76d5-9ca3-4650-adf9-d11e8861f013",
                            "nom": "Byrd",
                            "prenom": "Salome",
                            "club": "Angers Judo",
                            "genre": "male",
                            "poid": 31.4
                        }
                    ]
                }
            ]
        }
    }
}
</script>



<template>
    <draggable v-model="tableau" tag="div" class="d-flex flex-column">
      <template #item="{ element: poule }">
        <v-row class="bg-danger">
          <v-col cols="12" class="bg-blue">
            <div class="title bg-success">
              {{ poule.title }}
            </div>
            <v-col cols="12" class="bg-secondary">
              <draggable
                v-model="poule.judokas"
                tag="div"
                class="d-flex flex-wrap"
                group="judoka"
                :animation="500"
              >
                <template #item="{ element: judoka }">
                  <v-col cols="2" class="bg-warning">
                    <v-card
                      :class="[judoka.genre == 'male' ? maleColor : femaleColor]"
                      role="button"
                      class="pa-4 text-center"
                    >
                      <v-icon large class="mb-2">mdi-gender-male</v-icon>
                      <v-card-title class="text-h6">
                        {{ judoka.nom }} {{ judoka.prenom }}
                      </v-card-title>
                      <v-card-subtitle>
                        {{ judoka.poid }} kg
                      </v-card-subtitle>
                      <v-card-text class="text-right">
                        <span>{{ judoka.club }}</span>
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