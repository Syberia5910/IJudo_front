<template>
    <v-container>
        <v-row>
            <v-col>
                <v-snackbar
                  :timeout="2000"
                  v-model="successSnackbar"
                  absolute
                  center
                  tile
                  top
                  color="#00b894"
                ></v-snackbar>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
  export default {
    data: () => ({
        successSnackbar: false
    })
  }
</script>