import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'appWebTechMini';
    coll = document.getElementsByClassName("collapsible");

    constructor(){
    
    var i = 0;

   /* for (let i = 0; i < this.coll.length; i++){
      this.coll[i].addEventListener("click",function (){

      }
      
    
  }*/


}
}