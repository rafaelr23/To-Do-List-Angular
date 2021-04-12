import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/models/list-models';
import { ListServicesService } from '../../services/list-services.service';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public lists:List[] = [];
  public newList:List

  constructor( public listServices:ListServicesService) {
  
    this.newList = new List('','',false);
   }

  ngOnInit(): void {
    this.cargarLista()
  }
 

  cargarLista(){
    this.listServices.cargarList().subscribe( (lst:any) =>{
       console.log(lst.resultado);
       this.lists = lst.resultado;
       console.log(this.lists);
    });
  }


  onSubmit(form:FormControl){
    console.log(this.newList);
    if( this.newList.termino == null){
        return;
    }
    if(this.newList.termino !=""  ){

      this.listServices.saveList(this.newList).subscribe( resp =>{
        console.log("nueva tarea creada correctamente");
      });
      form.reset();
      this.cargarLista();
    }else{
      return;
    }
  }

  modificar(list:List){
    Swal.fire({
      title: 'Update Task',
      input: 'text',
      inputValue: list.termino,
      showCancelButton: true,
      
    }).then((update) =>{
      console.log(update.value);
      if( update.value ==""){
        Swal.fire({
          title:'Warning',
          text:'No se permiten valores vacios',
          icon:'error'});
      }
      if(update.value){
        list.termino = update.value;
        this.listServices.updateList(list).subscribe( resp =>{
          console.log(resp);
          Swal.fire({
            title:'Success',
            text:'Modificacion correcta',
            icon:'success'});
        })
      }
    })
  }

  borrar(list:List){
      console.log(list);
  

      Swal.fire({
        title: '¿Esta seguro?',
        text: "Esta a punto de borrar la tarea "+list.termino,
        icon: "error",
        showCancelButton:true
      })
      .then((borrar) => {
        
     
         this.listServices.borrarLista(list._id).subscribe( resp =>{
            Swal.fire({
              title:'Success',
              text:'La eliminacion se realizo con exito',
              icon:'success'
            });
            console.log(resp);
            this.cargarLista();
          });
        
      })
    
  }
}
