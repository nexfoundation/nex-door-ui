<template>
  <div class="flex flex-row space-x-1" :class="{ hidden: !props.countryCode }">
    <svg
      class="h-6 w-6 text-gray-500"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
        fill="#666666"
      />
    </svg>
    <!-- alt icon -->
    <!-- <svg class="h-4 w-4 text-gray-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />  <circle cx="12" cy="10" r="3" /></svg> -->
    <span class="font-medium"> {{ getCountryByCode(props.countryCode) }} </span>
  </div>
</template>

<script setup>
const props = defineProps(["countryCode"]);

import countryCodeJson from "../../assets/country-iso-code-tw.json";

// process country list
const countryOptions = JSON.parse(JSON.stringify(countryCodeJson));

function getCountryByCode(code) {
  return countryOptions.countries[code] || "Country not found";
}
</script>
