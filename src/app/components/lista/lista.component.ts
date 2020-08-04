import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  constructor(public service: ServiceService) {
    
  }

    ngOnInit(): void {
      this.service.getTareas().subscribe(resp => {
    });
  }
}
