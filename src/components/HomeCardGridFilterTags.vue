<template lang="">
  <div>
    <div class="flex  overflow-hidden text-lg text-center md:space-x-3 md:space-y-2 gap-3">
      <button class="flex btn btn-outline px-3 py-4 hover:bg-secondary hover:text-[#000000DE] focus:shadow-outline border-[#C6CBD3] text-[#00000099]"
      v-for="option in availableTags"  :key="option" @click="selectOption(option)"
      :class="{ 'bg-blue-500': selectedTag === option }"
      >{{ option }}</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedTag: '',
      availableTags: [
        '稅務簽證',
        '職涯發展',
        '商業創業',
        '租屋買房',
        '旅行生活',
        '人生相談',
        '興趣分享',
        '設計美學',
        '海外婚姻',
        '海外留學',
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
