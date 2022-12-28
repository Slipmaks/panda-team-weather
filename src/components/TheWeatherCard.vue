<template>
  <div class="main default">
    <div class="default">
      <input
        v-debounce:1000ms.cancelonempty="myFunc"
        type="text"
        options="options"
      />
      <button>В избранное</button>
    </div>

    <div class="default">
      <div>
        <button>День</button>
        <button>Неделя</button>
      </div>
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          culpa voluptate repellat. Provident nostrum sed a velit dicta tempora
          dolore, aspernatur fugit iste, ratione repellat assumenda magnam ullam
          repudiandae porro.
        </p>
      </div>
    </div>

    <div class="default">
      <p>График</p>
    </div>
  </div>
</template>

<script setup>
const API_WEATHER = "63681b42bf0cf1ef874d7bbd33c652a5";
const API_GEO = "74908b3243msh2d06d3bf0c24ebep108da1jsn4c0212c9701d";

const myFunc = () => {
  alert("hello");
};
</script>

<style scoped>
.main {
  background-color: hsl(0, 0%, 99%);
}
.default {
  border: 1px solid gray;
  border-radius: 1rem;
  padding: 0.5rem;
  margin: 0.5rem;
}
.weather {
}
.day {
}
.week {
}
.chart {
}
</style>
