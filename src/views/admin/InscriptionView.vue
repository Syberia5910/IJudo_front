<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import type { Inscription } from '../../interfaces/inscription'

export default defineComponent({
  setup() {
    const inscriptions = ref<Inscription[]>([]);

    onMounted(async () => {
      try {
        const response = await axios.get('/api/inscriptions');
        inscriptions.value = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des inscriptions', error);
      }
    });

    return {
      inscriptions,
    };
  },
});
</script>

<template>
  <v-container>
    <v-table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Sexe</th>
          <th>Date de Naissance</th>
          <th>Club</th>
          <th>Catégorie</th>
          <th>Poids</th>
          <th>Ceinture</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="inscription in inscriptions" :key="inscription.id">
          <td>{{ inscription.id }}</td>
          <td>{{ inscription.Judoka.nom }}</td>
          <td>{{ inscription.Judoka.prenom }}</td>
          <td>{{ inscription.Judoka.sexe }}</td>
          <td>{{ inscription.Judoka.date_naissance }}</td>
          <td>{{ inscription.Judoka.Club.nom }}</td>
          <td>{{ inscription.Category.nom }}</td>
          <td>{{ inscription.poid }}</td>
          <td>{{ inscription.ceinture }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>
