import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '@dev/environment';
import { first, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  name = 'Angular';

  private source = interval(3000);
  title: any;
  constructor(
    private http: HttpClient
  ) { 
  }
    

}
