import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@dev/environment';
import { Observable } from 'rxjs'; // Importa Observable
import { ReportData } from 'src/Core/interfaces/report.interface'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private url = `${environment.api}`;
  constructor(private http: HttpClient) {}

  getDataMedidores(fechaInicial:string, fechaFinal:string):Observable<ReportData>{
    return this.http.get<ReportData>(`${this.url}/get-dataMedidores/${fechaInicial}/${fechaFinal}/`)
  }

}
