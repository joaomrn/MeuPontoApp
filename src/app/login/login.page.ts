import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
//import { Usuario} from '../../model/usuario';
import { NavController } from '@ionic/angular';
//import { ServicoService } from '../servico.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{
  
public dia: Date

   constructor(private navCtrl: NavController) { 
    //  this.dia = new Date
    // console.log(this.dia.getDate())
    // console.log(this.dia.toJSON())
   }

  Logar() {
    this.navCtrl.navigateForward(['/principal/'])
 }

}



