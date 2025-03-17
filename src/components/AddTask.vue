<template>

  <div class="taskapp">
    <div class="left">
      <form @submit.prevent="addtask" class="add-task"> 
        <label> Add Your Task</label>
        <textarea v-model="text" cols="30" rows="10"></textarea> 
        <!--<p>{{ text }}</p>-->
        <button type="submit">Add Task</button> 
      </form>
    </div>

    <div class="right">
      <div class="edit-task">
        <h1>Manage your task</h1>
        <!--<p>{{ newtask }}</p>-->

        <div v-if="newtask.length > 0" class="newtask">
          <ul>
            <li v-for="(task, index) in newtask" :key="index">
          
                <p v-if="!task.isEditing" :class="{ completed: task.isComplete}">{{ task.text }}</p>
                <textarea v-else v-model="task.text" />
                 
                <div class="buttons">
                <!-- edit task toggle the isEditing mode-->
               <button @click="editTask(index)">
               <i :class="task.isEditing ? 'fas fa-save' : 'fas fa-edit'"></i>
              </button>
                <button @click="deleteTask(index)"> <i class="fas fa-trash"></i> </button>
                <button @click="compeleteTask(index)"> <i class="fas fa-check"></i> </button>
                </div>
            </li>
          </ul>
        </div>

        <div v-else class="newtask">
          <h1>Task list is empty!!</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  
  name: "AddTask",
  data() {
    return {
      text: "",
      newtask: [], 
    };
  },
  methods: {
    addtask() {
    if (this.text.trim() !== "") {
      this.newtask.push({ text: this.text, isEditing: false });
      this.text = "";
    }
  },
  editTask(index) {
    this.newtask[index].isEditing = !this.newtask[index].isEditing;
  },
  deleteTask(index) {
    this.newtask.splice(index, 1);
  },
  compeleteTask(index){
    this.newtask[index].isComplete = !this.newtask[index].isComplete;
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

.add-task textarea {
  width: 100%;
  max-width: 400px;
  height: 400px;
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
  max-height: 500px; 
  overflow-y: auto; 
  width: 100%; 
  padding: 10px;
}

.newtask ul {
  width: 100%;
  padding: 0;
  
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
  width: 65%;
  max-width: 350px;
  font-size: 16px;
  color: #0f0b0d;
  padding: 10px;
  border-radius: 8px;
  height: auto;
  font-weight: 400px;
  
}
.newtask textarea {
  width: 65%;
  max-width: 350px;
  font-size: 16px;
  color: #0f0b0d;
  padding: 10px;
  border-radius: 8px;
  height: 300px;
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
  color: gray;
}
</style>