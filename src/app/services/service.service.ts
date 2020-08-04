import { Injectable } from '@angular/core';
import { Tarea } from '../models/tarea';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  public tareas: Tarea[];

 tareasUrl = 'http://127.0.0.1:5000';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('Access-Control-Allow-Headers', 'Content-Type')
    .append('Access-Control-Allow-Methods', ['GET', 'POST', 'PUT','DELETE'])
    .append('Access-Control-Allow-Origin', 'http://localhost:5000')
    
  };

  constructor(private http: HttpClient) {
    // this.tareas = [];
    this.tareas = new Array<Tarea>();
  }


  /** GET tareas from the server */
  getTareas(): Observable<any> {
    return this.http.get<any>(`${this.tareasUrl}/listaTarea`)
      .pipe(
        tap(tarea => {
          const tareas = tarea.tareas;
          tareas.map(t => {
            const nTarea: Tarea = {
              id: t[0],
              usuario: t[3],
              descripcion: t[1],
              fecha: new Date(t[2]),
              estado: t[4]
            };
            this.tareas.push(nTarea);
          });
        }),
        catchError(this.handleError<Tarea[]>('getTareas', []))
      );
  }


  /**PUT: update the Tareason the server. Return the update tarea upon success */

  updateTarea(tarea: Tarea): Observable<Tarea> {
    return this.http.put<Tarea>( `${this.tareasUrl}/actualizarTarea`,tarea, this.httpOptions)
      .pipe(
        catchError(this.handleError('updateTarea', tarea))
      );
  }

  //////// Save methods //////////

  /** POST: add a new tarea to the server */
  addTarea(tareaAdd: Tarea): Observable<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Headers', 'Content-Type')
      .append('Access-Control-Allow-Methods', 'POST')
      .append('Access-Control-Allow-Origin', '*');
    return this.http.post<HttpResponse<any>>(`${this.tareasUrl}/guardarTarea`, tareaAdd, {headers}).pipe(
      tap((newTarea: any) => {
        const { tarea, message } = newTarea;

        console.log(newTarea);

        var numero = newTarea.tareas.length;

        const id = newTarea.tareas[numero-1][0];

        console.log(id);
        
        tareaAdd.id = id;
        this.tareas.push(tareaAdd);
      }),
      catchError(this.handleError<Tarea>('addTarea'))
    );
  }

  /** DELETE: delete the tarea from the server */
  deleteTarea(tarea: Tarea | number): Observable<Tarea> {
    const id = typeof tarea === 'number' ? tarea : tarea.id;
    const url = `${this.tareasUrl}/borrarTarea/${id}`;
    return this.http.delete<any>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted tarea id=${id}`)),
      catchError(this.handleError<Tarea>('deleteTarea'))
    );
  }

  
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }

}