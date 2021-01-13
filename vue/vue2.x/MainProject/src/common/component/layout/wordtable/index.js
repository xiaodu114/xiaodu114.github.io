import WordTable from './src/main.vue';

WordTable.install = function (Vue) {
    Vue.component(WordTable.name, WordTable);
};

export default WordTable;