import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private Url: string = 'http://localhost:3000/';

  constructor(public http: HttpClient) { }
  // API´s Customers 
  registrarCustomer(customer: any){
    return this.http.post(`${this.Url}customer/guardar`,customer).toPromise();
  }

  obtenerCustomer(){
    return this.http.get(this.Url + 'customer/obtenertodos').toPromise();
  }

  obtenerCustomerId(id: any){
    return this.http.get(`${this.Url}customer/obtener/${id}`).toPromise();
  }
  obtenerCustomerNombre(nombre: any){
    return this.http.get(`${this.Url}customer/obtenername/${nombre}`).toPromise();
  }

  obtenerCustomerPais(pais: any){
    return this.http.get(`${this.Url}customer/obtenercountry/${pais}`).toPromise();
  }

  borrarCustomerId(id: any){
    return this.http.delete(`${this.Url}customer/eliminar/${id}`).toPromise();
  }
  borrarCustomerNonbre(nombre: any){
    return this.http.delete(`${this.Url}customer/eliminarname/${nombre}`).toPromise();
  }
  actualizarCustomer(customer: any, id: Number){
    return this.http.put(`${this.Url}customer/update/${id}`,customer).toPromise();
  }
  //API's Rentals
  resgistrarRenta(renta:any){
    return this.http.post(`${this.Url}rentals/guardar`,renta).toPromise();
  }
  removerRenta(idCasa: any, idRenta: any){
    return this.http.delete(`${this.Url}rentals/deleteRenta/${idCasa}/${idRenta}`).toPromise();
  }
  obtenerRentasDisponibles(num: Number){
   return this.http.get(`${this.Url}rentals/get/${num}`).toPromise();
  }

 obtenerRentasRentadas(desde: Number){
    return this.http.get(`${this.Url}rentals/get/rentadas/${desde}`).toPromise();
  }
  obtenerTypoPropiedad(propiedad: any){
    return this.http.get(`${this.Url}rentals/getproperty/${propiedad}`).toPromise();
  }

  obtenerporPrecio(minimo: Number, maximo: Number, num: Number){
    return this.http.get(`${this.Url}rentals/getprice/${minimo}/${maximo}/${num}`).toPromise();
  }

  obtenerRentasdeCustomers(){
    return this.http.get(`${this.Url}rentals/mostrar`).toPromise();
  }
  getProperties(){
    return this.http.get(`${this.Url}rentals/propiedades`).toPromise();
  }
  

  

}
