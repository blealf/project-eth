<template>
  <div class="form">
    <h2>Make the transfer</h2>
    <div class="form-group">
      <label>From Address: </label>
      <div>
        <div class="input-group">
          <svg-icon
            :fa-icon="faEthereum"
            :size="25"
            flip="horizontal"
            class="icon"
          ></svg-icon>
          <input
            type="text"
            v-model="fromAddress"
            :style="{
              borderColor: props.addressError ? 'crimson' : '#433f56',
            }"
          />
        </div>
        <span v-if="props.addressError" class="error"
          >Please enter an address</span
        >
      </div>
    </div>
    <div class="form-group">
      <label>To Address: </label>
      <div>
        <div class="input-group">
          <svg-icon
            :fa-icon="faEthereum"
            :size="25"
            flip="horizontal"
            class="icon"
          ></svg-icon>
          <input
            type="text"
            v-model="toAddress"
            placeholder="Leave blank for default"
            :style="{
              borderColor: '#433f56',
            }"
          />
        </div>
      </div>
    </div>
    <div class="form-group">
      <label>Amount: </label>
      <div class="input-group amount">
        <svg-icon
          :fa-icon="faDollarSign"
          :size="25"
          flip="horizontal"
          class="icon"
        ></svg-icon>
        <input type="number" v-model="amount" />
      </div>
    </div>
    <hr />
    <button
      class="btn"
      :style="{
        'animation-name': props.message === 'Error' ? 'animatebtn' : 'none',
      }"
      @click="transfer"
    >
      Transfer
    </button>
    <div
      :class="[props.message === 'Success' ? 'success' : 'error', 'status']"
      :style="{ opacity: props.message === '' ? 0 : 1 }"
    >
      <div class="close" @click="$emit('close-status')">
        <svg-icon
          :fa-icon="faXmark"
          :size="25"
          flip="horizontal"
          class="icon"
        ></svg-icon>
      </div>
      {{ props.message }}
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { faDollarSign, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import SvgIcon from "vue3-icon";

const fromAddress = ref("");
const toAddress = ref("");
const amount = ref(0);
const props = defineProps(["message", "addressError"]);
const emit = defineEmits(["send-transfer"]);

const transfer = () => {
  emit("send-transfer", {
    fromAddress: fromAddress.value,
    toAddress: toAddress.value,
    amount: amount.value,
  });
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/transaction_form.scss";
</style>
