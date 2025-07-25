import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';


import { FormBuilder, FormGroup, ReactiveFormsModule, Validators , } from '@angular/forms';
import { Task } from '../../Model/task/task';


@Component({
  selector: 'app-todo',
  imports: [CommonModule,MatCardModule ,MatFormFieldModule,MatIconModule , MatInputModule  ,ReactiveFormsModule ,MatButtonModule,CdkDropList, CdkDrag],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {

  updatedIndex:any;
  isEditEnable=false;

  toDoForm !: FormGroup;
  tasks:Task[]=[];
  inProgress:Task[]=[];
  done :Task []=[];


   constructor (private fb:FormBuilder){}

   ngOnInit():void{
    this.toDoForm=this.fb.group({
      item:['' ,Validators.required]
    })
   }

   
   addTask() {
    this.tasks.push({
      Tittle: this.toDoForm.value.item,
      Completed:false 
    }); 
    this.toDoForm.reset();
   }

   upDate() {
    this.tasks[this.updatedIndex].Tittle=this.toDoForm.value.item;
    this.tasks[this.updatedIndex].Completed=false;
    this.toDoForm.reset()
    this.updatedIndex=undefined;
    this.isEditEnable=false;
   }
   
   
   onEditTask(task:Task , taskId:number){
     this.toDoForm.controls['item'].setValue(task.Tittle);
     this.updatedIndex=taskId;
      this.isEditEnable=true;
  }
 
   deleteTask(taskId: number, list: 'tasks' | 'inProgress' | 'done') {
    switch(list) {
      case 'tasks':
        this.tasks.splice(taskId, 1);
        break;
      case 'inProgress':
        this.inProgress.splice(taskId, 1);
        break;
      case 'done':
        this.done.splice(taskId, 1);
        break;
    }
   }

    drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
