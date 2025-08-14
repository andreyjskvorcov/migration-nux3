<template>
  <slot name="loading" v-if="loading">
    <div class="fetch-component-loading">
      <span>Loading...</span>
    </div>
  </slot>

  <slot :data="data" v-if="data"></slot>

  <slot name="error" :error="error" v-if="error">
    <div class="fetch-component-error">
      <p>Oops! Something went wrong</p>

      <span>Technical problem</span>
    </div>
  </slot>
</template>

<script setup lang="ts">
import { ref } from "vue";

const data = ref<unknown>();
const error = ref<Error | undefined>();
const loading = ref<boolean>(false);

const props = defineProps<{
  method: keyof typeof import("src/api"); // Указываем тип для метода
}>();

async function fetchData() {
  error.value = undefined;

  try {
    const api = await import("src/api");
    const method = api[props.method];

    loading.value = true;

    const response = await method();
    data.value = response.data;
  } catch (err) {
    error.value = err as Error;
  } finally {
    loading.value = false;
  }
}

fetchData();
</script>

<style lang="scss">
.fetch-component-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: $gap-4;
  padding: $spacing-8;
  text-align: center;
  min-height: 200px;
  margin-top: $spacing-8;

  span {
    font: $text-base;
  }
}

.fetch-component-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: $gap-4;
  padding: $spacing-8;
  text-align: center;
  min-height: 200px;
  margin-top: $spacing-8;

  p {
    font: $text-lg;
  }

  span {
    font: $text-base;
    color: var(--q-color-grey-6);
  }
}
</style>
