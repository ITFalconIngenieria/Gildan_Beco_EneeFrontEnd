import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { EndPointGobalService } from '@shared/services/end-point-gobal.service';
import { NotificationService } from '@shared/services/notification.service';
import { CookieService } from 'ngx-cookie-service';

const userList = ['Lucy', 'U', 'Tom', 'Edward'];
const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

interface user {
  id:number,
  ad: string,
  apellido: string,
  correo: string,
  nombre:string,
  observacion:string,
  rolid: number,
  telefono: string,
  tipoUsuario: number,
  estado: boolean,


}
@Component({
  selector: 'app-menu-layout',
  templateUrl: './menu-layout.component.html',
  styleUrls: ['./menu-layout.component.css']
})
export class MenuLayoutComponent implements OnInit {
  isCollapsed = true;
  user: user = JSON.parse(JSON.stringify(localStorage.getItem('user')));
  rol: number = Number(localStorage.getItem('rol'));

  deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
  constructor(
    private router: Router,
    private coockie: CookieService,
    private globalService: EndPointGobalService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
  }
  notify(): void {
    //console.log('notify');
  }
  endSession(){
    this.coockie.deleteAll('tokensession');
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  color: string = colorList[3];

}
