<template>
  <router-view></router-view>
</template>

<script>
import libraryResultMain from './libraryResultMain'
import LibraryReservation from './LibraryReservation'
export default {
  name: 'LibraryReservationMain.vue',
  components: {libraryResultMain, LibraryReservation}
}
</script>

<style scoped>

</style>
