import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController} from '@ionic/angular';
import { RegistroServiceService, Usuario } from '../../services/registro-service.service';
import { 
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  MinLengthValidator
} from '@angular/forms';
@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
  usuarios: Usuario[]=[];
  formularioLogin : FormGroup;

  constructor(private alertController: AlertController,
              private navController: NavController,
              private registroService: RegistroServiceService,
              private fb: FormBuilder){
                this.formularioLogin = this.fb.group({ 
                  'correo' : new FormControl("", Validators.required,),
                  //revisar minlenght
                  'contraseña' : new FormControl ("", Validators.required)                
                })
              }
 

  ngOnInit() {
    
  }
  
  async Ingresar(){
    var f = this.formularioLogin.value;
    var a= 0;
    this.registroService.getUsuarios().then(datos=>{
      this.usuarios=datos;
      if (!datos || datos.length==0){
        return null;
      }
      for (let obj of this.usuarios){
        if(f.correo == obj.correo && f.contraseña==obj.contraseña  && f.correo.slice(-10) == '@duocuc.cl'){
          
          a=1;
      
          console.log(f.correo);
          console.log('usuario',f.correo.split('@')[1])
          localStorage.setItem('ingresado','true');
          this.navController.navigateRoot('estudiante');
        }
        else if(f.correo == obj.correo && f.contraseña==obj.contraseña && f.correo.slice(-17) =='@profesor.duoc.cl'){
          
          a=1;
          console.log(f.correo.slice(-16));
          console.log('ingresado');
          localStorage.setItem('Usuario', f.correo);
          this.navController.navigateRoot('docente');
        }
      }
      // borrar
      console.log (a);
      if (a==0){
        this.alertMsg();
      }

    });
  }
  async alertMsg(){
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Datos ingresados son incorrectos',
      buttons: ['Aceptar'],

    })
    await alert.present();
    return;
  }
}
