import { Component, OnInit } from '@angular/core';
import { ServicoService } from '../servico.service';
import { Ponto } from '../shared/ponto.model';
import * as jsPDF from 'jspdf'

@Component({
  selector: 'app-espelho',
  templateUrl: './espelho.page.html',
  styleUrls: ['./espelho.page.scss'],
  providers: [ServicoService]
})
export class EspelhoPage implements OnInit {

  public historicos: Array<Ponto>

  constructor(private servicoService: ServicoService) { }

  ngOnInit() {
    this.servicoService.getHistorico().
      then((historicos: Array<Ponto>) => {
        this.historicos = historicos
      })
  }

  // generateData(amount: number) {
  //   var result = [];

  //   var data =
  //   {
  //     coin: "100",
  //     game_group: "GameGroup",
  //     game_name: "XPTO2",
  //     game_version: "25",
  //     machine: "20485861"
  //   };

  //   for (var i = 0; i < amount; i += 1) {
  //     data.coin = (i + 1).toString();
  //     result.push(Object.assign({}, data));
  //   }
  //   return result;
  // }

  // createHeaders(keys: any) {
  //   var result = [];
  //   for (var i = 0; i < keys.length; i += 1) {
  //     result.push({
  //       'id': keys[i],
  //       'name': keys[i],
  //       'prompt': keys[i],
  //       'width': 65,
  //       'align': 'center',
  //       'padding': 0
  //     });
  //   }
  //   return result;
  // }


  exportarPDF() {
    // var doc = new jsPDF()

    // doc.text('Data' + ' ' +
    //   'Entrada' + ' ' +
    //   'Saída para almoço' + ' ' +
    //   'Volta do almoço' + ' ' +
    //   'Saída',
    //   10, 10)

    // doc.text(this.historicos[0].DiaSemana + ' ' +
    //   this.historicos[0].Entrada + ' ' +
    //   this.historicos[0].IdaAlmoco + ' ' +
    //   this.historicos[0].VoltaAlmoco + ' ' +
    //   this.historicos[0].Saida,
    //   10, 20)

    // doc.text(this.historicos[1].DiaSemana + ' ' +
    //   this.historicos[1].Entrada + ' ' +
    //   this.historicos[1].IdaAlmoco + ' ' +
    //   this.historicos[1].VoltaAlmoco + ' ' +
    //   this.historicos[1].Saida,
    //   10, 30)

    // doc.text(this.historicos[2].DiaSemana + ' ' +
    //   this.historicos[2].Entrada + ' ' +
    //   this.historicos[2].IdaAlmoco + ' ' +
    //   this.historicos[2].VoltaAlmoco + ' ' +
    //   this.historicos[2].Saida,
    //   10, 40)


    // doc.save('a4.pdf')

    var headers = this.createHeaders(["id", "coin", "game_group", "game_name", "game_version", "machine", "vlt"]);

    var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: 'landscape' });
    doc.table(1, 1, this.generateData(100), headers, { autoSize: true });



    // var headers = this.createHeaders(['Data', 'Entrada', 'Saída para almoço', 'Volta do almoço', 'Saída']);

    // var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: 'landscape' });

    // doc.table(1, 1, this.generateData(100), headers, { autoSize: true });

  }


  generateData(amount) {
    var result = [];
    var data =
    {
      coin: "100",
      game_group: "GameGroup",
      game_name: "XPTO2",
      game_version: "25",
      machine: "20485861",
      vlt: "0"
    };
    for (var i = 0; i < amount; i += 1) {
      //data.id = (i + 1).toString();
      result.push(Object.assign({}, data));
    }
    return result;
  };

  createHeaders(keys: Array<string>) {
    var result = [];
    for (var i = 0; i < keys.length; i += 1) {
      result.push({
        'name': keys[i],
        'prompt': keys[i],
        'width': 65,
        'align': 'center',
        'padding': 0
      });
    }
    return result;
  }





}
