<template>
    <div class="">
        <Multiselect v-model="state.selected" :options="state.options" :custom-label="customLabel" :show-labels="true"
            placeholder="選擇地區">
        </Multiselect>
    </div>
</template>

<script setup>
import { reactive, watch, } from 'vue';
import Multiselect from 'vue-multiselect';
import jsonData from "../assets/country-iso-code-tw.json";

// @repeat code in ./ProfileForm
// process country list
const countryOptions = Object.entries(jsonData.countries).map(
    ([key, value]) => ({
        value: key,
        text: value,
    })
);

const state = reactive({
    selected: null,
    options: countryOptions || ['Select option', 'options']
});

// custom options(object) label
// {value: 'TW', text: '台灣'} -> 台灣(TW)
function customLabel({ text, value }) {
    return `${text}(${value})`;
}

watch(
    () => state.selected,
    (selected) => {
        emit('selectedTags-updated', selected);
    });
const emit = defineEmits(['selectedTags-updated']);

</script>