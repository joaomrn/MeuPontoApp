import { Component, OnInit } from '@angular/core';
import { Ponto } from '../shared/ponto.model';
import { ServicoService } from '../servico.service';
import { Localizacao } from '../shared/localizacao.model';
declare var google;

declare var google;

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
  providers: [ServicoService]
})
export class HistoricoPage implements OnInit {

  public historicos: Array<Ponto>
  public historico: Ponto
  public localizacao: Array<Localizacao>
  public alerta: boolean = false
  public testo: string = ''
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  map: any;
  startPosition: any;
  originPosition: string;
  destinationPosition: string;
  public dataFormatada: string

  constructor(private servicoService: ServicoService) { }

  ngOnInit() {
    this.servicoService.getHistorico().
      then((historicos: Array<Ponto>) => {
        this.historicos = historicos
      })
  }

  //Armazena o objeto da data escolhida pelo usuário
  dataHistorico(): any {

    var opt = document.getElementById("inputGroupSelect").getElementsByTagName("option");

    this.historicos.forEach(historico => {
      for (let index = 0; index < opt.length; index++) {
        this.testo = opt[index].text;
        if (opt[index].selected && historico.DiaSemana == this.testo) {
          this.historico = historico
          this.ObterLocalizacao(this.historico.DiaSemana)
        } else {
        }
      }
    });
  }

  //Retorna a localização de acordo com a data escolhida pelo usuario
  public ObterLocalizacao(diaSemana: string): any {
    var RegExp = /[/"]/g;

    this.servicoService.getLocalizacaoPorData(diaSemana.replace(RegExp, "-"))
      .then((localizacao: Array<Localizacao>) => {
        this.localizacao = localizacao
      })
  }

  public ExibirLocalizacao(registroPonto: string): any {
    //console.log(this.localizacao)
    this.localizacao.forEach(localizacao => {
      if (localizacao.RegistroPonto == registroPonto) {
        this.initializeMap(localizacao.Latitude, localizacao.Longitude)
      }
    })
  }

  //Mostra o google maps com a locatização atravez da latitude e longitude
  initializeMap(latitude: number, longitude: number) {

    console.log(latitude + ' = ' + longitude)

    this.startPosition = new google.maps.LatLng(latitude, longitude);

    const mapOptions = {
      zoom: 18,
      center: this.startPosition,
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    this.directionsDisplay.setMap(this.map);

    const marker = new google.maps.Marker({
      position: this.startPosition,
      map: this.map,
    });
  }

  duvida(): any {
    if (this.alerta) {
      return this.alerta = false
    } else {
      return this.alerta = true
    }
  }


}
