<template>
  <AppHeader/>
  <TemperatureBoard :item="item" />
</template>

<script>
import axios from 'axios';
import TemperatureBoard from '@/components/TemperatureBoard.vue';
import AppHeader from '@/components/AppHeader.vue';

export default {
  name: "Home",
  components: { TemperatureBoard, AppHeader },
  data() {
    return {
      items: [],
      item: null // "item" 속성을 선언하고 초기값을 지정합니다.
    };
  },
  mounted() {
    axios.get("/api/items").then(({ data }) => {
      this.items = data;
    });
  }
};
</script>

<style scoped>
</style>