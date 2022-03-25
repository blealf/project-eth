<template>
  <div class="main">
    <h1>Contract Web3</h1>
    <div class="balance">
      <p>Balance: {{ balance }}</p>
      <p>Default Block: {{ defaultBlock }}</p>
    </div>
    <TransactionForm
      :message="message"
      :address-error="addressError"
      @send-transfer="makeTransfer"
      @close-status="message = ''"
    />
  </div>
</template>

<script setup>
import TransactionForm from "./TransactionForm.vue";
import Web3 from "web3";
import abi from "../utils/abi.json";
import { ref } from "vue";

const addressError = ref(false);
const message = ref("");
const balance = ref("");
const defaultBlock = ref("");

// const web3 = new Web3(process.env.VUE_WEB3_URL);
// web3.eth.accounts.wallet.add(process.env.VUE_WEB3_PK);
const web3 = new Web3(
  "https://ropsten.infura.io/v3/71e3648d0d194f3db44a3427bbbef61e"
);
web3.eth.accounts.wallet.add(
  "0x55d0380decced82a2198582e541a129e8b86937c30a1c51bbb5327b9f00c6aa4"
);
web3.eth
  .getBalance("0x86C12A724340f3F4F6142789808874d0A55Bd01f")
  .then((value) => (balance.value = Number(value)));

let contract = new web3.eth.Contract(
  abi,
  "0x86C12A724340f3F4F6142789808874d0A55Bd01f"
);

defaultBlock.value = contract.defaultBlock;

const makeTransfer = async (data) => {
  if (data.fromAddress === "") {
    addressError.value = true;
    return;
  }
  addressError.value = false;
  try {
    let transfer = null;
    if (data.toAddress !== "") {
      contract = new web3.eth.Contract(abi, data.toAddress);
      transfer = await contract.methods
        .transferFrom(data.fromAddress, data.toAddress, data.amount)
        .call();
    } else {
      transfer = await contract.methods
        .transfer(data.fromAddress, data.amount)
        .call();
    }
    message.value = transfer === true ? "Success" : "Error";
    defaultBlock.value = contract.defaultBlock;
    balance.value += Number(data.amount);
  } catch (error) {
    console.log({ error });
    message.value = error.reason?.split("(")[0] || error.message;
  }
  message.value === "Success" ? setTimeout(resetMessage, 3000) : null;
};

const resetMessage = () => {
  message.value = "";
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.main {
  padding: 8px;
}
.balance {
  background: purple;
  width: 250px;
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 0;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 10px;
  p {
    margin: 0;
  }
}
</style>
