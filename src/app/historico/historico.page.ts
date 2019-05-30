import { Component, OnInit } from '@angular/core';
import { Ponto } from '../shared/ponto.model';
import { ServicoService } from '../servico.service';
declare var google;

declare var google;

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
  providers: [ServicoService]
})
export class HistoricoPage implements OnInit {

  // public historicos2: Array<Ponto> = [
  //   {
  //     "id": 1,
  //     "funcionarioId": 1,
  //     "entrada": "08:00",
  //     "idaAlmoco": "12:10",
  //     "voltaAlmoco": "13:11",
  //     "saida": "18:00",
  //     "diaSemana": "06/05/2019",
  //     "latitude": -19.9216515,
  //     "longitude": -43.9484378
  //   },
  //   {
  //     "id": 2,
  //     "funcionarioId": 1,
  //     "entrada": "08:10",
  //     "idaAlmoco": "11:52",
  //     "voltaAlmoco": "12:52",
  //     "saida": "17:40",
  //     "diaSemana": "07/05/2019",
  //     "latitude": 0,
  //     "longitude": 0
  //   },
  //   {
  //     "id": 3,
  //     "funcionarioId": 1,
  //     "entrada": "07:32",
  //     "idaAlmoco": "12:15",
  //     "voltaAlmoco": "13:15",
  //     "saida": "17:33",
  //     "diaSemana": "08/05/2019",
  //     "latitude": 0,
  //     "longitude": 0
  //   },
  //   {
  //     "id": 4,
  //     "funcionarioId": 1,
  //     "entrada": "08:40",
  //     "idaAlmoco": "12:20",
  //     "voltaAlmoco": "13:19",
  //     "saida": "18:38",
  //     "diaSemana": "09/05/2019",
  //     "latitude": 0,
  //     "longitude": 0
  //   },
  //   {
  //     "id": 5,
  //     "funcionarioId": 1,
  //     "entrada": "08:09",
  //     "idaAlmoco": "12:36",
  //     "voltaAlmoco": "13:35",
  //     "saida": "18:09",
  //     "diaSemana": "10/05/2019",
  //     "latitude": 0,
  //     "longitude": 0
  //   },
  //   {
  //     "id": 6,
  //     "funcionarioId": 1,
  //     "entrada": "08:27",
  //     "idaAlmoco": "12:40",
  //     "voltaAlmoco": "13:41",
  //     "saida": "18:27",
  //     "diaSemana": "11/05/2019",
  //     "latitude": 0,
  //     "longitude": 0
  //   }	
  // ]

  public historicos: Array<Ponto>
  public historico: Ponto
  public alerta: boolean = false
  public testo: string = ''
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  map: any;
  startPosition: any;
  originPosition: string;
  destinationPosition: string;

  constructor(private servicoService: ServicoService) {

  }

  ngOnInit() {
    this.servicoService.getHistorico().
      then((historicos: Array<Ponto>) => {
        this.historicos = historicos
        console.log(this.historicos[0].Latitude + ' = ' + this.historicos[0].Longitude)
      })
  }

  dataHistorico(): any {

    var opt = document.getElementById("inputGroupSelect").getElementsByTagName("option");

    this.historicos.forEach(historico => {
      for (let index = 0; index < opt.length; index++) {
        this.testo = opt[index].text;
        if (opt[index].selected && historico.DiaSemana == this.testo) {
          this.historico = historico
          this.initializeMap(this.historico.Latitude, this.historico.Longitude)
        } else {
        }
      }
    });
  }

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




  //=============== Código para usar Json-Server ========================================



  // dataHistorico(): any {

  //   var opt = document.getElementById("inputGroupSelect01").getElementsByTagName("option");

  //   this.historicos.forEach(historico => {

  //     // console.log(opt[this.posicao])
  //     for (let index = 0; index < opt.length; index++) {
  //       this.testo = opt[index].text;
  //       if (opt[index].selected && historico.diaSemana == this.testo) {
  //         this.historico = historico
  //       } else {
  //         console.log("Não é: " + this.testo)
  //       }
  //     }
  //   });
  // }









}
