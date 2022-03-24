<template>
  <div class="main">
    <h1>Contract Web3</h1>
    <div class="balance">
      <p>Balance: {{ balance }}</p>
    </div>
    <div class="form">
      <h2>Make the transfer</h2>
      <div class="form-group">
        <label>Wallet Address: </label>
        <div>
          <div class="input-group">
            <input
              type="text"
              v-model="fromAddress"
              :style="{ borderColor: addressError ? 'crimson' : '#433f56' }"
            />
          </div>
          <span v-if="addressError" class="error">Please enter an address</span>
        </div>
      </div>
      <div class="form-group">
        <label>Amount: </label>
        <div class="input-group amount">
          <input type="number" v-model="amount" />
        </div>
      </div>
      <hr />
      <button
        class="btn"
        :style="{
          'animation-name': message === 'Error' ? 'animatebtn' : 'none',
        }"
        @click="makeTransfer"
      >
        Transfer
      </button>
      <p
        :class="[message === 'Success' ? 'success' : 'error']"
        style="font-weight: 500; letter-spacing: 2px; font-size: 20px"
      >
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script setup>
import Web3 from "web3";
import abi from "../utils/abi.json";
import { ref } from "vue";

const fromAddress = ref("");
const addressError = ref(false);
const amount = ref(0);
const message = ref("");
const balance = ref("");

const web3 = new Web3(
  "https://ropsten.infura.io/v3/71e3648d0d194f3db44a3427bbbef61e"
);
web3.eth.accounts.wallet.add(
  "0x55d0380decced82a2198582e541a129e8b86937c30a1c51bbb5327b9f00c6aa4"
);
web3.eth
  .getBalance("0x86C12A724340f3F4F6142789808874d0A55Bd01f")
  .then((value) => (balance.value = Number(value)));

const contract = new web3.eth.Contract(
  abi,
  "0x86C12A724340f3F4F6142789808874d0A55Bd01f"
);

const makeTransfer = async () => {
  if (fromAddress.value === "") {
    addressError.value = true;
    return;
  }
  addressError.value = false;
  try {
    const transfer = await contract.methods
      .transfer(fromAddress.value, amount.value)
      .call();
    message.value = transfer === true ? "Success" : "Error";
    console.log(transfer);
    balance.value += Number(amount.value);
  } catch (error) {
    console.log({ error });
    message.value = "Error";
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.main {
  padding: 8px;
}
.balance {
  background: purple;
  width: 200px;
  margin: 0 auto;
  padding: 0;
  padding: 10px 20px;
  font-size: 25px;
  font-weight: 600;
  border-radius: 10px;
  p {
    margin: 0;
  }
}
.form {
  background: #e9e9eb;
  max-width: 500px;
  margin: 0 auto;
  padding: 5px 20px 10px 20px;
  border-radius: 10px;
  box-shadow: 1px 1px 6px #eee;
  color: #433f56;
  h2 {
    text-transform: uppercase;
  }
}
.form-group {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 15px;
  label {
    margin-right: auto;
  }
}
.error {
  color: crimson;
  font-size: 16px;
}
.success {
  color: green;
  font-size: 16px;
}
.input-group {
  display: flex;
  input {
    height: 20px;
    width: 300px;
    padding: 10px;
    border-radius: 5px;
    border-color: 433F56;
    border-width: 0;
    border-top-width: 1px;
    border-bottom-width: 1px;
    outline: none;
    font-size: 20px;
    clip-path: polygon(2% 0%, 98% 0%, 100% 50%, 98% 100%, 2% 100%, 0% 50%);
  }
}

.btn {
  padding: 10px 25px;
  font-size: 20px;
  background-color: #433f56;
  color: #eee;
  border: none;
  border-radius: 6px;
  width: 100%;
  margin-top: 20px;
  font-weight: bold;
  margin-left: auto;
  clip-path: polygon(2% 0%, 98% 0%, 100% 50%, 98% 100%, 2% 100%, 0% 50%);
  animation-name: animatebtn;
  animation-duration: 500ms;
  animation-iteration-count: infinite;
  cursor: pointer;
  &:hover {
    animation: none;
  }
}

@keyframes animatebtn {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(0.5deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(-0.5deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
@media only screen and (max-width: 550px) {
  .form-group {
    flex-direction: column;
    label {
      margin: auto;
    }
    input {
      width: 100%;
      margin-top: 5px;
    }
  }
  .btn {
    width: 230px;
  }
}
</style>
