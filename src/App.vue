<template>
  <div id="app">
    <OrgChart />
  </div>
</template>

<script>
import OrgChart from "./components/OrgChart.vue";
export default { components: { OrgChart } };
</script>

<style>
body {
  background: #e3e5e9;
  margin: 0;
  font-family: "IBM Plex Sans", sans-serif;
}
</style>
