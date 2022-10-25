import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'

interface Componente{
  icon:string;
  name:string;
  redirecTo:string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
	constructor(private http: HttpClient) {}
	title = 'api-angular';

  ngOnInit() {
let headers = new HttpHeaders({
	'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
	'x-rapidapi-key': '1197c97735msh96c0431ff5601b7p14e4acjsn6ccd073580d7'
});
this.http.get<any>('https://rapidapi.com/apidojo/api/shazam', {
		headers: headers
	})
	.subscribe(data => {
		console.log(data);
	});
}

  componentes : Componente[] = [

    {
      icon: 'person-outline',
      name: 'Perfil',
      redirecTo: '/perfil'
    },
    {
      icon: 'calendar-number-outline',
      name: 'Ver Asistencia',
      redirecTo: '/horario'
    },
    {
      icon: 'build-outline',
      name: 'Modificar Asistencia',
      redirecTo: '/modificar-asistencia'
    },
    {
      icon: 'eye-outline',
      name: 'Noticias',
      redirecTo:'/noticias',
    },
    {
      icon: 'log-out-outline',
      name: 'Cerrar sesion',
      redirecTo: '/inicio'
    },
   

  ]

}
