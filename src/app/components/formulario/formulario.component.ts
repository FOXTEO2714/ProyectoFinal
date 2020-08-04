import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Tarea } from 'src/app/models/tarea';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  public descripcion: string; // Mantiene la descripcion de la tarea
  public usuario: string;
  constructor(private tareaSvc: ServiceService) { }

  ngOnInit(): void {
  }

// Este metodo se ejecuta cada vez que el usuario hace click en el boton
  procesar(): void{
    //console.log(this.descripcion)
    // UNDEFINED "VALOR" ""
    if (this.descripcion  && this.descripcion !== '') {
      console.log(this.descripcion);
      const tarea = new Tarea();
      tarea.descripcion = this.descripcion;
      tarea.fecha = new Date();
      tarea.usuario = this.usuario;
      tarea.estado = 'A';
      console.log(tarea);
      this.tareaSvc.addTarea(tarea).subscribe((resp) => console.log('RESPONSE', resp));
    }

  }

  
}
