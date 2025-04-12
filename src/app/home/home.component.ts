import { booleanAttribute, Component ,PLATFORM_ID ,Inject} from '@angular/core';
import {FormsModule} from '@angular/forms'
import { CommonModule} from '@angular/common';
import { isPlatformBrowser } from '@angular/common';


export interface TodoItem{
  id:number;
  task : string;
  completed : boolean;
}




@Component({
  selector: 'app-home',
  imports: [FormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'angTodo';

  todoList : TodoItem [] =[];
  newTask:string = '';

  editingIndex:number | null = null;
  editedTask:string = ''

  constructor(@Inject(PLATFORM_ID)private plaformId :object){
    this.loadTasks();
  }

  addTask():void{

      if(this.newTask == ''){
        alert('Input box is Empty !!');
        return;
      }

     let trimmedTask = this.newTask.trim()

    if(trimmedTask !== ""){

      const isDupli = this.todoList.some(
        (item)=>item.task.toLowerCase() === trimmedTask.toLowerCase()
      );

      if(isDupli){
        alert("Task is already there !!!");
        return;
      }

      const newTodoItem : TodoItem={
        id : Date.now(),
        task : this.newTask,
        completed : false
      }
      this.todoList.push(newTodoItem);
      this.newTask = "";
      this.saveTasks();
      
    }
  }


  toggleCompleted(index:number):void{
     this.todoList[index].completed = !this.todoList[index].completed;
    this.saveTasks();
  }


  editTask(index:number):void{
        this.editingIndex = index;
        this.editedTask = this.todoList[index].task;
  }

  saveEditedTask():void{
     if(this.editingIndex !== null && this.editedTask.trim() !== ''){
           this.todoList[this.editingIndex].task = this.editedTask;
           this.editingIndex = null;
           this.editedTask = '';
           this.saveTasks();
     }
  }

  cancelEdit(){
    this.editingIndex = null;
    this.editedTask = '';
  }

  deleteTask(id:number):void{
    this.todoList = this.todoList.filter(item =>item.id !== id);
    this.saveTasks();
  }

  saveTasks():void{
    if (isPlatformBrowser(this.plaformId)) {
      localStorage.setItem('todoList',JSON.stringify(this.todoList));
    }
  }


  loadTasks():void{
    if (isPlatformBrowser(this.plaformId)) {
      const storedTasks = localStorage.getItem('todoList');
      if(storedTasks){
         this.todoList = JSON.parse(storedTasks); 
       }
    }
  }

}
