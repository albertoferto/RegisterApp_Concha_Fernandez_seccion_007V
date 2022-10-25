import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RegistroServiceService, Usuario} from '../../services/registro-Service.service';
import { ToastController} from '@ionic/angular';
import { 
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;
  newUsuario: Usuario = <Usuario>{};


  constructor(private alertController:  AlertController,
              private registroService: RegistroServiceService,
              private toast: ToastController,
              private fb:FormBuilder) {
                this.formularioRegistro = this.fb.group({
                  'nombres': new FormControl("", Validators.required),
                  'apellidos': new FormControl("", Validators.required),
                  'telefono': new FormControl("", Validators.required),
                  'correo': new FormControl("",Validators.required),
                  'contraseña': new FormControl("", Validators.required),
                  'confirmarContraseña': new FormControl("", Validators.required)
                });
               }

  ngOnInit() {
  }
 async CrearUsuario(){
  var form= this.formularioRegistro.value;
  if (this.formularioRegistro.invalid){
    this.alertError();
    }
    else{
    this.newUsuario.nombres = form.nombres,
    this.newUsuario.apellidos= form.apellidos,
    this.newUsuario.telefono = form.telefono,
    this.newUsuario.correo= form.correo,
    this.newUsuario.contraseña= form.contraseña,
    this.newUsuario.confirmarContraseña= form.confirmarContraseña
    this.registroService.addUsuario(this.newUsuario).then(dato =>{
      this.newUsuario = <Usuario>{};
      this.showToast('Usuario Registrado existosamente!');
    });
    this.formularioRegistro.reset();
 }
}
async alertError(){
  const alert = await this.alertController.create({ 
    header: 'Error..',
    message: 'Debe completar todos los datos',
    buttons: ['Aceptar']
  })
  await alert.present();
}
 async showToast(msg){
  const toast= await this.toast.create({
    message: msg,
    duration: 2000
  })
  await toast.present();
 }

}
