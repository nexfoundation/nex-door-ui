<template lang="">
    <div>
        <div class="">
            <!-- <VueMultiselect
            :options="availableTags"
            :multiple="true"
            :close-on-select="false"
            placeholder="選擇你感興趣的諮詢項目"
          /> -->

          <!-- <button> -->
                Filter tags:
                <!-- <select v-model="selectedTags"> -->
                  <!-- TODO: after clicked, blackout -->
                <button class="btn btn-outline mr-2 hover:bg-blue-900 focus:shadow-outline"
                v-for="option in availableTags"  :key="option" @click="selectOption(option)">{{ option }} </button>
                <!-- </select> -->
            <!-- </button> -->
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      selectedTags: '',
      // selectedAttribute2: '',
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
      ],
    }
  },
  // TODO: toggle and untoggle
  methods: {
    selectOption(option) {
      this.selectedTags = option;
      // state.filters.tag = option
      // this.$store.state.filters.tags = option;
      this.$emit('selectedTags-updated', this.selectedTags);

    },
  },
  // computed: {
  //   filteredTags() {
  //     if (this.selectedTags === '') {
  //       return this.availableTags;
  //     } else {
  //       return this.availableTags.filter(tag => this.selectedTags.includes(tag));
  //     }
  //   }
  // }
}
</script>
<style lang="">
    
</style>