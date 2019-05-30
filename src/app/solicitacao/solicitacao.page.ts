import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.page.html',
  styleUrls: ['./solicitacao.page.scss'],
})
export class SolicitacaoPage implements OnInit {

  constructor(private navCtrl: NavController, private alertController: AlertController) { }

  ngOnInit() {

  }

  Enviar():any{
    this.presentAlert()
    this.navCtrl.navigateForward(['/principal/'])
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: 'Solicitação enviada com sucesso!!!',
      buttons: ['OK']
    });

    await alert.present();
  }

}
