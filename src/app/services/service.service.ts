import { Injectable } from '@angular/core';
import { Tarea } from '../models/tarea';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  public tareas: Tarea[];

  constructor() { }
}
