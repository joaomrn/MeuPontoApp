import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { ServicoService } from '../servico.service';

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.page.html',
  styleUrls: ['./solicitacao.page.scss'],
  providers: [ServicoService]
})
export class SolicitacaoPage implements OnInit {

  data: any
  HorarioBatida: any
  descricao: any
  situacaoPonto: any

  constructor(private navCtrl: NavController,
    private alertController: AlertController,
    private servicoService: ServicoService) { }

  ngOnInit() {

  }

  Enviar(): any {
    var opt = document.getElementById("inputGroupSelect").getElementsByTagName("option");

    for (let index = 0; index < opt.length; index++) {
      if (opt[index].selected) {
        this.situacaoPonto = opt[index].value
      }
    }

    this.servicoService.getSalvarSolicitacap(this.data,
      this.HorarioBatida,
      this.descricao,
      this.situacaoPonto,
      6)

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
