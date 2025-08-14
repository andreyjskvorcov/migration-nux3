<template>
  <HomePage />
</template>

<script setup>
// Определяем тему
const theme = import.meta.env.VITE_APP_THEME || "default";

// Создаем функцию для динамического импорта
const getThemeComponent = async () => {
  const mapper = {
    gtbet: await import("@/pages/home/theme/gtbet/HomePage.vue"),
    default: await import("@/pages/home/theme/default/HomePage.vue"),
  };

  return mapper[theme];
};

// Загружаем компонент
const { default: HomePage } = await getThemeComponent();
</script>
