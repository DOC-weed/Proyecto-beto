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
      customers:any;
      finddata:boolean;
      deletedate: boolean;
      dato: any;
      dato2: any;
      editcustomer: any;
      id: number;
      filtro:any;
      filtro2: any;
  arrCustomers: Array<any>;

  constructor(public service: ServiceService){
  }
  ngOnInit() {
    this.obtenerCustomer();

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

}

// Agregar una colección llamada Customers con los siguientes atributos obligatorios que deben ser validados mediante un objeto validator.



// El sistema debe permitir realizar rentas de propiedades, un Cliente puede rentar varias propiedades en diferente momentos. Seleccione el modelo de relación que mejor le convenga (embedido o relación).
// El sistema debe permitir obtener el reporte de propiedades rentadas por los clientes.
// El sistema debe permitir obtener el reporte de propiedades en base al tipo de propiedad
// El sistema debe permitir el mostrar datos generales de propiedades basados en rangos de precio. 
// El sistema debe permitir el borrado lógico de Clientes. Lo clientes no se borrarán, sólo se marcan como activos o inactivos. 
// El sistema deberá permitir generar respaldos en demanda de todas las colecciones de la base de datos.
// El sistema deberá estar almacenado en el sistema de control de versiones GitHub, deberá enviar la liga que permita clonar el proyecto a las direcciones: betordz@gmail.com y pipegarcia494@gmail.com a más tardar el martes 17 a las 14:00. 
