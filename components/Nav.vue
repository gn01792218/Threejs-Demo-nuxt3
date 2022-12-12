<template>
    <nav class="flex">
        <ul class="h-full flex items-center px-10 py-5">
            <li class="mr-2" v-for="nav in navList" :key="nav.title" @click="nav.clickHandler ?? null">
                <NuxtLink :to="nav.routeName ? `${nav.routeName}` : '#'">{{ nav.title }}</NuxtLink>
            </li>
        </ul>
    </nav>
</template>
<script lang="ts" setup>
    const { navList } = useHeader();
</script>