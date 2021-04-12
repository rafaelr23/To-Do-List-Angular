import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { URL_SERVICIOS } from '../config/config';
import { List } from '../models/list-models';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ListServicesService {

  constructor( public http:HttpClient) { 

 
  }


  //==============================================
  //        Cargar Lista
  //==============================================
  cargarList(){
    let url = URL_SERVICIOS;
    let header = new HttpHeaders().set("Content-Type","application/json");
    
    return this.http.get(url,{headers:header});
  }
  //==============================================
  //        Agregar Lista
  //==============================================

  saveList( list:List):Observable<any>{
    let url = URL_SERVICIOS;
    let params = JSON.stringify(list);
    console.log(params);
    let header = new HttpHeaders().set("Content-Type","application/json");

    return this.http.post(url,params,{headers:header});
  }
  //==============================================
  //        Modificar Lista
  //==============================================

  updateList(list:List){
    let url = URL_SERVICIOS+list._id;
  
   // swal("Usuario Actualizado",'','success');
    return this.http.put(url,list);
  }


  borrarLista( id:string){
    let url= URL_SERVICIOS+id;

    return this.http.delete(url);
  }
}
