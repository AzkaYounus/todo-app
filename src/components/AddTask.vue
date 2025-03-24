<template>

  <div class="taskapp">
    <div class="left">
      <form @submit.prevent="addtask" class="add-task"> 
        <label> Add Your Task</label>
        <input type="text" v-model="text" placeholder="Add your Task"/>
        <!--<p>{{ text }}</p>-->
         <button @click="setCalendar = true">Select date</button>
          <CalenderModel v-if="setCalendar" @close="setCalendar = false" @date="setDate" />
          <p v-if="selectedDate">Selected Date: {{ selectedDate }}</p>
         <p v-else>Schedule your Task</p>
        <button type="submit" @click="addTask()">Add Task</button>
        

      </form>
    </div>

    <div class="right">
      <div class="edit-task">
        <h1>Manage your task</h1>
        <Test :foo="selectedDate" />

        <!--<p>{{ newtask }}</p>-->

        <div v-if="newtask.length > 0" class="newtask">
          <ul>
            <li v-for="(task, index) in newtask" :key="index">
              <div>
                  <p v-if="!task.isEditing" :class="{ completed: task.isComplete}">
                   Task {{ task.text }} <br>
                   Schedule on: {{task.date}}
                  </p>
                    <input type="text" v-else v-model="task.text" />
                  <div class="buttons">
                    <!-- editTask toggle the isEditing mode-->
                  <button @click="editTask(index)">
                  <i :class="task.isEditing ? 'fas fa-save' : 'fas fa-edit'"></i>
                  </button>
                    <button @click="deleteTask(index)"> <i class="fas fa-trash"></i> </button>
                    <button @click="compeleteTask(index)"> <i class="fas fa-check"></i> </button>
                    <button @click="openCalendar(index)" ><i class="fas fa-calendar"></i></button>
                  </div>
                    
                    <!-- CalenderModel will listen (date) and apply method (updateDate)  -->
                   <CalenderModel v-if="task.updateCalendar" @close="task.updateCalendar = false" @date="updateDate"/>
                    <!--<CalenderModel v-if="updateCalendar" @close="updateCalendar = false" @date="updateDate" />-->
              </div>
            </li>
                
          </ul>
          
        </div>
        <div v-else class="newtask">
          <h1>Task list is empty!!</h1>
        </div>
         <div v-if="newtask.length > 0" class="btn">
          <button @click="deleteAll()"> Delete all  </button>
          <button @click="completeAll()">Complete All</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>

import CalenderModel from './CalenderModel.vue';
import Test from './Test';
export default {
  
  name: "AddTask",
  components:{
    CalenderModel, Test
  },
  data() {
    return {
      text: "",
      newtask: [], 
      selectedDate: null,
      selectedTaskIndex:null,
      setCalendar:false,
    };
  },
   mounted() {
    this.loadTasks(); 
  },

  methods: {
    
    addTask() {
      if (this.text.trim() === "") {
        alert("Add your Task!!!");
        return;
      }

      if (!this.selectedDate || this.selectedDate.trim() === "") {
        alert("Schedule your Task!!!!!");
        return;
      }


      const task = { text: this.text, date: this.selectedDate, isEditing: false , updateCalendar: false};


      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

   
      tasks.push(task);

   
      localStorage.setItem("tasks", JSON.stringify(tasks));


      this.newtask.push(task);
      console.log("Your task is added!!")
      this.text = "";
      this.selectedDate = "";
    },


    loadTasks() {
      this.newtask = JSON.parse(localStorage.getItem("tasks")) || [];
    },

  editTask(index) {
    this.newtask[index].isEditing = !this.newtask[index].isEditing;
     localStorage.setItem("tasks", JSON.stringify(this.newtask));
  },
  deleteTask(index) {
    this.newtask.splice(index, 1);
     localStorage.setItem("tasks", JSON.stringify(this.newtask));
  },
  compeleteTask(index){
    this.newtask[index].isComplete = !this.newtask[index].isComplete;
  },
   deleteAll() {
    this.newtask = [];//reset the array
     localStorage.setItem("tasks", JSON.stringify(this.newtask));
},//to mark all task as complete
  completeAll() {
    const status=this.newtask.every(task=>task.isComplete)
    this.newtask.forEach(task => {
        task.isComplete = !status;
    });  
},

setDate(date) {
  console.log("Received date:", date); 

  if (!date) {
    alert("No date selected!");
    return;
  }

  this.selectedDate = date;
  console.log("Updated selectedDate:", this.selectedDate); 

  this.setCalendar = false;
},

openCalendar(index)
{
  console.log("updateCalendar",this.updateCalendar)
  this.selectedTaskIndex=index;
  this.newtask[index].updateCalendar = true;
  
},
updateDate(date){
  if (this.selectedTaskIndex !== null) {
    this.newtask[this.selectedTaskIndex].date = date;
    this.updateCalendar = false;
    this.selectedTaskIndex = null; 
    localStorage.setItem("tasks", JSON.stringify(this.newtask));
  }
},
  }
};
</script>

<style scoped>
.taskapp{
    display: flex;
    flex-direction: row;
    gap:10px;
}
.add-task {
  width: 500px;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f9ebf1;
  padding: 20px;
  border-radius: 8px;
  border: #0f0b0d solid 3px;
}

.add-task label {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #e64a90;
}

.add-task input {
  width: 100%;
  max-width: 400px;
  height: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: none;
  font-size:18px;
  color:#0f0b0d;
}

.add-task  button {
  margin-top: 20px;
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

.add-task  button:hover {
  background: #e64a90;
}
.edit-task{
  width: 500px;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f9ebf1;
  padding: 20px;
  border-radius: 8px;
  border: #0f0b0d solid 3px;
}
h1{
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #e64a90;
}
.newtask {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 400px; 
  overflow-y: auto; 
  width: 100%; 
  padding: 10px;
}

.newtask ul {
  width: 100%;
  padding: 0;
  margin:0;
  
}

.newtask li {

  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  width: 90%;
  gap:10px;
  margin-bottom: 5px;
  text-align: left;
}

.newtask p{
  width: 100%;
  max-width: 350px;
  font-size: 16px;
  color: #0f0b0d;
  border-radius: 8px;
  height: auto;
  font-weight: 400px;
  
}
.newtask input {
  width: 65%;
  max-width: 350px;
  font-size: 16px;
  color: #0f0b0d;
  padding: 10px;
  border-radius: 8px;
  height: 70px;
}

.newtask p {
  background:none;
}

.newtask textarea {
  resize: none;
  background: #fff;
}

.newtask .buttons {
  display: flex;
  gap: 10px;
}

.newtask button {
  background: #f58aba;
  color: white;
  width: 50px;
  height: 30px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
}

.newtask button:hover {
  background: #e64a90;
}
.newtask .completed {
  text-decoration: line-through;
  color: rgb(149, 145, 145);
}
.btn button{
  margin-top: 20px;
  background: #f58aba;
  color: white;
  width: 170px;
  height: 50px;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
  margin:5px;
}
.btn  button:hover {
  background: #e64a90;
}
</style>