import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { environment } from "src/environments/environment";
import { first, interval } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class EndPointGobalService {
  name = 'Angular';

  private source = interval(3000);

  constructor(private http: HttpClient,
      private coockie: CookieService,
    ) {
    // this.source.subscribe(() => {
    //   this.http
    //     .get('https://www.google.com', { observe: 'response' })
    //     .pipe(first())
    //     .subscribe(  
    //       resp => {
    //         if (resp.status === 200) {
    //           console.log(true);
    //         } else {
    //           console.log(false);
    //         }
    //       },
    //       err => console.log(err)
    //     );
    // });
  }

  Get(url: string){
    return this.http.get(`${environment.api}${url}`);
  }
  GetId(url: string, Id: number){
    return this.http.get(`${environment.api }${url}/${Id}`);
  }
  GetIdString(url: string, Id: string){
    return this.http.get(`${environment.api }${url}/${Id}`);
  }
  Post(url: string, body: any){
    return this.http.post(`${environment.api }${url}`, body);
  }
  PutId(url: string, Id: number, body: any){
    return this.http.put(`${environment.api }${url}/${Id}`, body);
  }
  Delete(url: string, Id:number){
    return this.http.delete(`${environment.api }/${url}/${Id}`);
  }
  Patch(url: string, Id:number, body: any){
    return this.http.patch(`${environment.api }${url}/${Id}`, body);
  }
}
