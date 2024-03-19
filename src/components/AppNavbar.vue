<template>
  <div class="navbar bg-white px-4 py-2 md:px-6 md:py-3 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
    <div class="md:navbar-start">
      <div class="dropdown mr-2 lg:mr-0">
        <label
          tabindex="0"
          class="btn btn-ghost lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h8m-8 6h16"
          /></svg>
        </label>
        <AppNavbarMenu is-mobile />
      </div>
      <router-link to="/" class="flex">
        <img class="w-10" src="../assets/nex-door-logo.svg">
        <div class="pl-2 self-center text-xl font-bold"><span class="font-bold">NEX</span><span class="font-medium"> Door</span></div>
      </router-link>
    </div>
    <div class="navbar-end hidden lg:flex">
      <AppNavbarMenu v-if="$route.path !== '/auth'" />
      <!-- TODO: Hide light/dark toggle for now until color palette defined -->
      <!-- <input
        type="checkbox"
        class="toggle"
        data-toggle-theme="dark,light"
        data-act-class="ACTIVECLASS"
      > -->
    </div>
  </div>
</template>

<script setup>
import AppNavbarMenu from './AppNavbarMenu'
</script>