<template>
  <v-card class="mx-auto" max-width="344" flat>
    <v-img class="mx-auto rounded-card" src="/My_photo_master.jpg"></v-img>

    <v-card-text>
      <p class="display-1 text--primary">Лапутьев Станислав Альбертович</p>
      <p class="text--primary">Автор и разработчик проекта</p>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="primary" @click="reveal = true"> подробно </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <v-card
        v-if="reveal"
        class="transition-fast-in-fast-out v-card--reveal"
        style="height: 100%"
      >
        <v-card-text class="pb-0">
          <p class="text--primary">
            Врач нейрохирург, невролог, к. м. н., веб-разработчик программ для
            медиков.
          </p>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-btn text color="primary" @click="reveal = false"> закрыть </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    reveal: false,
  }),
}
</script>
<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
