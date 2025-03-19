<template>
  <div class="modal">
    <div class="modal-content">
      <h2>Select a Date</h2>
      <input type="date" v-model="selectedDate" />
      <p>Selected Date: {{ selectedDate }}</p>

      <button @click="ConfirmDate">Confirm</button>
      <button @click="closeCalender">Close</button>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedDate: null
    };
  },
  methods:{
     //just to close calendar 
  closeCalender(){

    this.$emit('close')
    },

  ConfirmDate() {
    if(!this.selectedDate){
      alert("select date!!!!!!!!")
      return
    }
  const selected = new Date(this.selectedDate);
  const today = new Date();
  
  // Set time to midnight for accurate comparison
  today.setHours(0, 0, 0, 0);
  selected.setHours(0, 0, 0, 0);

  if (selected < today) {
    alert("Selected date cannot be in the past!");
    return;
  }

  this.$emit("date", this.selectedDate);
  this.$emit("close");
}
  },
};
</script>

<style>

.modal {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex; 
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white; 
  padding: 20px; 
  border-radius: 8px;
  width:400px;
  height: 500;
}
.modal-content h2{
font-size: 30px;
color: black;

}
.modal-content input{
  padding: 5px;
  border: 1px solid #e64a90;
  border-radius: 3px;
  font-size: 14px;
  color: #333;
  outline: none;
}
.modal-content p{
font-size: 24px;
color: rgb(36, 36, 36);
}
.modal-content button{
  margin: 10px;
  background: #f58aba; 
  color: white;
  width: 170px;
  height: 50px;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
}
button:hover {
  background: #e64a90; 

}
</style>

