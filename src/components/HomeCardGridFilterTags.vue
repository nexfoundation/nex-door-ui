<template lang="">
  <div>
    <div class="flex overflow-hidden text-lg text-center gap-3">
      <button
        v-for="option in availableTags"
        :key="option" class="flex btn btn-outline px-3 py-4 hover:bg-secondary hover:text-[black] hover:border-secondary-green focus:shadow-outline border-[#C6CBD3] text-[#00000099]" :class="{ 'bg-blue-500': selectedTag === option }"
        @click="selectOption(option)"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedTag: '',
      availableTags: [
        '海外留學',
        '求職瓶頸',
        '職涯發展',
        '稅務簽證',
        '人生相談',
        '興趣分享',
      ],
    }
  },
  methods: {
    selectOption(option) {
      // ?adhoc: fix empty data from cognito 
      if (this.selectedTag == option) {
        this.selectedTag = ''
        this.$emit('selectedTags-updated', []);
      }
      else {
        this.selectedTag = option;
        this.$emit('selectedTags-updated', this.selectedTag);
      }
    },
  },
}
</script>
