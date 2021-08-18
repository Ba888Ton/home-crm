<template>
  <td>
    <input
      v-if="!isEditing"
      type="button"
      :value="currency"
      class="btn btn-small"
      @click="isEditing = !isEditing"
    />
    <input
      v-else
      type="text"
      class="currency"
      :value="currency"
      @blur="setNewValue($event)"
      @keypress.enter="setNewValue($event)"
    />
  </td>
</template>

<script>
export default {
  name: "EditableInput",
  props: ["currency"],
  data() {
    return {
      isEditing: false,
    };
  },
  methods: {
    setNewValue(evt) {
      this.$emit("new-currency-value", evt.target.value);
      this.isEditing = false;
    },
  },
};
</script>

<style lang="scss" scoped>
  .btn.btn-small {
    min-width: 100px;
    height: 33px;
  }
  input.currency {
    width: 100px;
    height: 33px;
    margin: 0;
    text-align: center;
  }
</style>
