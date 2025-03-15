import { booleanAttribute, Component ,PLATFORM_ID ,Inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormsModule} from '@angular/forms'
import { CommonModule} from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

export interface TodoItem{
   id:number;
   task : string;
   completed : boolean;
}


@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'angTodo';

  todoList : TodoItem [] =[];
  newTask:string = '';

  constructor(@Inject(PLATFORM_ID)private plaformId :object){
    this.loadTasks();
  }

  addTask():void{
    if(this.newTask.trim() !== ""){

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
    //  console.log(index)
     this.todoList[index].completed = !this.todoList[index].completed;
    //  console.log(this.todoList)
    this.saveTasks();
  }

  deleteTask(id:number):void{
    this.todoList = this.todoList.filter(item =>item.id !== id);
    // console.log(this.todoList)
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
