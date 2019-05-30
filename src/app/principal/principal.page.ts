import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Usuario } from '../model/usuario';
import { ActivatedRoute } from '@angular/router';
import { ServicoService } from '../servico.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  providers: [ServicoService]
})
export class PrincipalPage implements OnInit {

  public usuario: Usuario

  public usuarios: Array<Usuario> = [
    {
      "Id": 1,
      "Nome": "João Magalães",
      "Matricula": 31624397,
      "Senha": "123"
    },
    {
      "Id": 2,
      "Nome": "Diego Silva",
      "Matricula": 32345678,
      "Senha": "321"
    }
  ]

  constructor(private navCtrl: NavController, private route: ActivatedRoute, private servico: ServicoService) { }

  ngOnInit() {
    this.usuarios.forEach(usuario => {
      if (usuario.Senha == '123') {
        this.usuario = usuario
      }
    })

  }

  registrarPonto() {
    this.navCtrl.navigateForward(['/camera/'])
  }

  consultarHistorico() {
    this.navCtrl.navigateForward(['/historico/'])
  }

  abrirSolicitacao() {
    this.navCtrl.navigateForward(['/solicitacao/'])
  }

}
