<template>
  <!-- <div class="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md"> -->
  <h2 class="text-2xl font-semibold mb-4">每周一次的開放時段</h2>

  <!-- Weekday selector -->
  <div class="mb-4">
    <label for="weekday" class="block text-lg font-medium mb-2"
      >在每周的:</label
    >
    <select
      id="weekday"
      v-model="selectedWeekday"
      class="select select-secondary w-full select-bordered"
    >
      <option v-for="(day, index) in weekdays" :key="index" :value="index">
        {{ day }}
      </option>
    </select>
  </div>

  <!-- Time Range Selection -->
  <div class="mb-4">
    <label for="time-range" class="block text-lg font-medium mb-2"
      >開放時段:</label
    >
    <div class="flex items-center space-x-2">
      <input
        id="start-time"
        v-model="startTime"
        type="time"
        class="input input-bordered input-secondary"
      />
      <span>-</span>
      <input
        id="end-time"
        v-model="endTime"
        type="time"
        class="input input-bordered input-secondary"
      />
    </div>
  </div>

  <!-- Duration slider (range component from DaisyUI) -->
  <div class="mb-4">
    <label for="duration" class="block text-lg font-medium mb-2"
      >持續時間(分鐘):</label
    >
    <input
      id="duration"
      v-model="selectedDuration"
      type="range"
      min="30"
      max="120"
      step="30"
      class="range range-secondary w-full"
    />
    <div class="flex justify-between text-sm">
      <span>30</span>
      <span>60</span>
      <span>90</span>
      <span>120 min</span>
    </div>
  </div>

  <!-- Generate Time Slots Button -->
  <div class="mb-4 text-center">
    <button
      type="button"
      class="btn btn-secondary w-full"
      @click="generateTimeSlots"
    >
      預覽開放時段
    </button>
  </div>

  <!-- Display Time Slots -->
  <div v-if="timeSlots.length > 0">
    <h3 class="text-lg font-semibold mb-3">Available Time Slots:</h3>
    <ul class="list-disc pl-5">
      <li v-for="(slot, index) in timeSlots" :key="index" class="mb-2 text-md">
        {{ slot }}
      </li>
    </ul>
  </div>
  <!-- </div> -->
</template>

<script>
import { generateTimeSlots } from "/src/helpers/timeSlotUtils.js";
export default {
  data() {
    return {
      weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      selectedWeekday: 0, // Default to Monday
      startTime: "09:00", // Default start time
      endTime: "17:00", // Default end time (5:00 PM)
      selectedDuration: 60, // Default duration (in minutes)
      timeSlots: [],
    };
  },
  methods: {
    generateTimeSlots() {
      try {
        this.timeSlots = generateTimeSlots(
          this.startTime,
          this.endTime,
          this.selectedDuration,
        );
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>

<style scoped>
/* Scoped styles */
</style>
