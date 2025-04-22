<template>

  <div class="taskapp">
    <div class="left">
      <form @submit.prevent="addtask" class="add-task"> 
        <label> Add Your Task</label>


        <input  type="text" v-model="text" placeholder="Add your Task"/>

       

        <!--<p>{{ text }}</p>-->
         <button @click="setCalender = true">Select date</button>
          <CalenderModel v-if="setCalender" @close="setCalender = false"  @date="setDate" />
          <p v-if="selectedDate">Selected Date: {{ selectedDate }}</p>
          <p v-else>Schedule your Task</p>

      <button type="submit" @click="addTask()">Add Task</button> 
     
        

      </form>
    </div>

    <div class="right">
      <div class="edit-task">
        <h1>Manage your task</h1>


        <!--<p>{{ newtask }}</p>-->

        <div v-if="newtask.length > 0" class="newtask">
          <ul>
            <li v-for="(task, index) in newtask" :key="index">
              <div>
                  <p v-if="!task.isEditing" :class="{ completed:task.is_complete}">
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
                    <button @click="completeTask(index)"> <i class="fas fa-check"></i> </button>
                    <button @click="openCalender(index)" ><i class="fas fa-calendar"></i></button>
                  </div>
                    
                    <!-- CalenderModel will listen (date) and apply method (updateDate)  -->
                   <CalenderModel v-if="task.updateCalender" :displaydate="selectedDate" @date="updateDate" @close="task.updateCalender = false"/>        
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

import CalenderModel from './CalenderModel.vue'
import axios from 'axios'
export default {
  
  name: "AddTask",
  components:{
    CalenderModel
  },
  data() {
    return {
      text: "",
      newtask: [], 
      selectedDate: null,
      selectedTaskIndex:null,
      setCalender:false,
      updateCalender:false,
    };
  },
   mounted() {
    this.fetchTasks(); 
  },

  methods: {


    /*********  add task **************/
    
    
    async addTask() {
  
      if (this.text.trim() === "") {
        alert("Add your Task!!!");
        return;
      }

      if (!this.selectedDate || this.selectedDate.trim() === "") {
        alert("Schedule your Task!!!!!");
        return;
      }
  
    try {
    const payload = {
      text: this.text,
      date: this.selectedDate
    };

    const response = await axios.post('http://localhost:8000/api/tasks', payload);

    this.newtask.push(response.data);
    this.text = "";
    this.selectedDate = "";

  } catch (error) {
    console.error("Error adding task:", error);
    this.error = "Failed to add task. Try again.";
  }

    },


/***************  loading all tasks  ***************/


async fetchTasks() {
      try {
        const response = await axios.get('http://localhost:8000/api/tasks');
        this.newtask = response.data;
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },


/*********  edit task  ***************/


async editTask(index) {
  const task = this.newtask[index];

  // If currently in edit mode, save changes
  if (task.isEditing) {
    // Client-side validation
    if (!task.text || task.text.trim() === "") {
      this.error = "Add your Task!";
      return;
    }

    this.error = "";

    try {
      const payload = {
        text: task.text
      };

      const response = await axios.put(`http://localhost:8000/api/tasks/${task.id}`, payload);

      // Update local task with response data and exit edit mode
      this.newtask[index] = {
        ...response.data,
        isEditing: false
      };

    } catch (error) {
      console.error("Error editing task:", error);
      this.error = "Failed to edit task. Try again.";
    }
  } else {
    // Enter edit mode
    this.newtask[index].isEditing = true;
  }
},


/********** delete specific task */

async deleteTask(index) {
  const task = this.newtask[index];

  try {
    await axios.delete(`http://localhost:8000/api/tasks/${task.id}`);
    this.newtask.splice(index, 1); // Remove task from local array
  } catch (error) {
    console.error("Error deleting task:", error);
    this.error = "Failed to delete task. Try again.";
  }
},


/*************** complete task  ***************/


async completeTask(index) {
  const task = this.newtask[index];
  const newStatus = !task.is_complete;

  try {
    const payload = {
      is_complete: newStatus
    };

    const response = await axios.put(`http://localhost:8000/api/tasks/${task.id}`, payload);

    // Update local task with response data and new status
    this.newtask[index] = {
      ...response.data,
      is_complete: newStatus
    };

  } catch (error) {
    console.error("Error editing task:", error);
    this.error = "Failed to edit task. Try again.";
  }
},

/********* delete all  ***************/
 

async deleteAll() {
  if (!confirm("Are you sure you want to delete all tasks?")) {
    return;
  }

  try {
    await axios.delete('http://localhost:8000/api/delete-all');
    this.newtask = [];
  } catch (error) {
    console.error("Error deleting all tasks:", error);
    this.error = "Failed to delete all tasks. Please try again.";
  }
},


/******** complete all  ***************/


async completeAll() {
  const allComplete = this.newtask.every(task => task.is_complete);
  const newStatus = !allComplete;

  try {
    await axios.put('http://localhost:8000/api/complete-all', {
      is_complete: newStatus
    });

    // Update local task list
    this.newtask = this.newtask.map(task => ({
      ...task,
      is_complete: newStatus
    }));

  } catch (error) {
    console.error("Error updating all tasks:", error);
    this.error = "Failed to update all tasks. Please try again.";
  }
},
// just to set (setCalender=false) , and some console.log 
setDate(date) {
  console.log("Received date:", date); 

  if (!date) {
    alert("No date selected!");
    return;
  }

  this.selectedDate = date;
  console.log("Updated selectedDate:", this.selectedDate); 

  this.setCalender = false;
},

openCalender(index)
{
  this.selectedTaskIndex=index;
 
  this.newtask[index].updateCalender = true;

  this.selectedDate = this.newtask[index].date;
 
},

async updateDate(date) {
  if (this.selectedTaskIndex !== null) {
    const task = this.newtask[this.selectedTaskIndex];

    try {
      const response = await axios.put(`http://localhost:8000/api/tasks/${task.id}`, payload);

      this.newtask[this.selectedTaskIndex].date = response.data.date;
      this.newtask[this.selectedTaskIndex].updateCalender = false;

      this.selectedTaskIndex = null;

    } catch (error) {
      console.error("Error updating task date:", error);
      this.error = "Failed to update task date. Try again.";
    }
  }
}
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