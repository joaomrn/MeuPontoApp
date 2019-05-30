import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http'
import { Ponto } from '../app/shared/ponto.model'
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ServicoService {

    private API_URL = '/api'

    public historicos2: Promise<Ponto[]>
    public ponto: Ponto
    public token: string


    constructor(private http: Http) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.ponto = new Ponto()
    }

    //Retorna uma promise com os registros no banco
    public getHistorico(): Promise<Ponto[]> {
        return this.http.get(`${this.API_URL}/ListaRegistroPonto/6`)
            .toPromise()
            .then((resposta: any) => resposta.json())
    }



    public SalvarPonto() {

        const httpOptions = {
            headers: new HttpHeaders({
              'Accept': 'application/x-www-form-urlencoded',
              'Content-Type':  'application/json',
              
            })
          };
        console.log(this.ponto)


        return this.http.post(`${this.API_URL}/CadastrarPontoFuncionario/`, this.ponto)


    }

    SalvarHistorico(latitude: number, longitude: number): any {
        this.ponto.Latitude = latitude
        this.ponto.Longitude = longitude

        this.SalvarPonto()
    }


    // public PutSalvaPonto(latitude: number, longitude: number): Promise<Ponto> {
    //     console.log('SalvarHistorico na classe servico.service: ' + latitude)

    //     return this.http.get(`${this.API_URL}/CadastrarPontoFuncionario/${latitude}/${longitude}`)
    //         .toPromise()
    //         .then((resposta: any) => resposta.json)

    // }

    // SalvarHistorico(latitude: number, longitude: number): any {
    //     this.PutSalvaPonto(latitude, longitude)
    // }

}


