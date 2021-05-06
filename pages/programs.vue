<template>
  <div>
    <v-container fluid>
      <v-row dense>
        <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
          <v-card class="mx-auto" max-width="344" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">SmartMedUI</div>
                <v-list-item-title class="headline mb-1">
                  {{ card.title }}
                </v-list-item-title>
                <v-list-item-subtitle>{{ card.text }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar tile size="80" color="grey">
                <v-img :src="card.src"></v-img>
              </v-list-item-avatar>
            </v-list-item>
            <v-card-actions>
              <v-btn color="primary" class="mr-4 mt-4"> старт </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    src: '/pvp.jpg',

    cards: [
      {
        title: 'SG Adviser',
        src: '/pvp.jpg',
        text: 'оценка агрессивности гемангиом позвоночника',
        flex: 6,
      },
      {
        title: 'VTE Watcher',
        src: '/vte.jpg',
        text: 'оценка риска ВТЭО и их профилактика',
        flex: 6,
      },
    ],
  }),
}
</script>
<style></style>
