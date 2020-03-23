import { Component, OnInit} from '@angular/core';
import {customer} from './models/customer'
import { ServiceService } from './service/service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
      Address: string;
      Country: string;
      City: string;
      District: string; 
      First_Name: string;
      Last_Name: string;
      idCustomer: number;
      idListingAndReview: string;
      rentalDate:Date;
      returnDate:Date;
      customers:any;
      casas: any;
      casasR: any;
      pro:any;
      pro2:any;
      finddata:boolean;
      finddata2:boolean;
      deletedate: boolean;
      dato: any;
      dato2: any;
      dato3: any;
      num=0;
      precio:any;
      min:number;
      max:number;
      editcustomer: any;
      id: number;
      filtro:any;
      filtro2: any;
      filtro3: any;
      arrCustomers: Array<any>;
  

  constructor(public service: ServiceService){
  }
  ngOnInit() {
    this.obtenerCustomer();
    this.obtenercasas();
    this.getpro();
    this.obtenercasasR();

  }
  lawealoca(){
    this.service.obtenerporPrecio(this.min, this.max, this.num).then((res: any)=>{
      this.precio=res.resp;
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    });
  }
  guardar(myform: NgForm){ 
    let customer: any = {
      Address: this.Address,
      Country: this.Country,
      City: this.City,
      District: this.District,
      First_Name: this.First_Name,
      Last_Name: this.Last_Name
    };
    console.log();
    this.service.registrarCustomer(customer).then((res)=> {
      console.log(res);
      this.obtenerCustomer();
    }).catch(err => {
      console.log(err);
    });
    myform.reset();
  }
  obtenerCustomer(){
    this.service.obtenerCustomer().then((customers: any) =>{
      this.arrCustomers = customers.customers;
      console.log(customers);
    }).catch(err => {
      console.log(err);
    });
  }
  obtenercasas() {
    this.service.obtenerRentasDisponibles(this.num).then((res: any) =>{
      this.casas = res.resp;
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    });
  }
  obtenercasasR(){

    this.service.obtenerRentasdeCustomers().then((rentas: any) => {
      this.casasR = rentas.resp;
      console.log(rentas);
    }).catch((err)=>{
      console.log(err);
    });
    
  }
  findpro(filtro3: any){
    this.service.obtenerRentasdeCustomers().then((resp: any)=>{
      this.pro =resp.resp;
      console.log(resp);
      this.finddata2=true;
    }).catch((err)=>{
      console.log(err);
      this.finddata2=false;
    });
  }
  getpro(){
    this.service.getProperties().then((pro:any)=>{
      this.pro2=pro.resp;
      console.log(pro);
    }).catch((err) =>{
      console.log(err);
    });
  }

  update(myform: NgForm ) {
    let customer: any = {
      Address: this.Address,
      Country: this.Country,
      City: this.City,
      District: this.District,
      First_Name: this.First_Name,
      Last_Name: this.Last_Name
    };
    this.service.actualizarCustomer( customer, this.id ).then(res => {
      console.log(res);
      this.obtenerCustomer();
      myform.reset();
    }).catch( err => {
      console.log(err);
    });
    this.id = null;
  }
  edit(id: number) {
    this.service.obtenerCustomerId(id).then(( customer: any) => {
      this.editcustomer = customer.Customers;
      console.log(this.editcustomer);
      this.First_Name = this.editcustomer[0].First_Name;
      this.Last_Name = this.editcustomer[0].Last_Name;
      this.Country = this.editcustomer[0].Country;
      this.City = this.editcustomer[0].City;
      this.District = this.editcustomer[0].District;
      this.Address = this.editcustomer[0].Address;
      this.id = this.editcustomer[0]._id;
      console.log();
    }).catch((err) => {
      console.log(err);
    });
  }

  findbyeverything(dato: any) {
    if (dato === '') {
      this.finddata = false;
    } else {
      switch (this.filtro) {
        case 'id':
          this.service.obtenerCustomerId(dato).then((customers: any) => {
            this.customers = customers.Customers;
            this.finddata = true;
          }).catch( (err) => {
            console.log(err);
            this.finddata = false;
          });
          break;
          case 'nombre':
            this.service.obtenerCustomerNombre(dato).then((customers: any) => {
              this.customers = customers.Customers;
              this.finddata = true;
            }).catch((err) => {
              console.log(err);
              this.finddata = false;
            });
            break;
            case 'pais':
              this.service.obtenerCustomerPais(dato).then((customers: any) => {
                this.customers = customers.Customers;
                this.finddata = true;
              }).catch((err) => {
                console.log(err);
                this.finddata = false;
              });
              break;
      }
  }
}
borraridnombre(dato2: any) {
  if (dato2 === '') {
    this.deletedate = false;
  } else {
    switch (this.filtro2) {
      case 'id':
        this.service.borrarCustomerId(dato2).then((resp) => {
          console.log(resp);
          this.deletedate = true;
          this.obtenerCustomer();
          this.dato2 = null;
        }).catch( (err) => {
          console.log(err);
          this.deletedate = false;
        });
        break;
        case 'nombre':
          this.service.borrarCustomerNonbre(dato2).then((resp) => {
            console.log(resp);
            this.deletedate = true;
            this.obtenerCustomer();
            this.dato2 = null;
          }).catch((err) => {
            console.log(err);
            this.deletedate = false;
          });
          break;
    }
}
}
rentar(myform2: NgForm) {
  let renta: any ={
      idCustomer: this.idCustomer,
      idListingAndReview: this.idListingAndReview,
      rentalDate: this.rentalDate,
      returnDate: this.returnDate
  };
  this.service.resgistrarRenta(renta).then((resp)=>{
    console.log(resp);
    this.obtenercasas();
    myform2.reset();
  }).catch((err) => {
    console.log(err);
  });
}

}









// El sistema debe permitir el mostrar datos generales de propiedades basados en rangos de precio. 



// El sistema deberá estar almacenado en el sistema de control de versiones GitHub, deberá enviar la liga que permita clonar el proyecto a las direcciones: betordz@gmail.com y pipegarcia494@gmail.com a más tardar el martes 17 a las 14:00. 
