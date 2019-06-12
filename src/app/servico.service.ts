import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { Ponto } from '../app/shared/ponto.model'
import { Localizacao } from './shared/localizacao.model';
import { _createDefaultCookieXSRFStrategy } from '@angular/http/src/http_module';
import { Solicitacao } from './shared/solicitacao.model';

@Injectable()
export class ServicoService {

    private API_URL = '/api'

    public token: string
    public dataJSON: string
    public localizacao: Localizacao

    constructor(private http: Http) {
        this.localizacao = new Localizacao()
    }

    //Retorna uma promise com os registros no banco
    public getHistorico(): Promise<Ponto[]> {
        return this.http.get(`${this.API_URL}/ListaRegistroPonto/6`)
            .toPromise()
            .then((resposta: any) => resposta.json())
    }

    //Retorna uma promise com os registros no banco
    public getLocalizacaoPorData(data: string): Promise<Localizacao[]> {

        return this.http.get(`${this.API_URL}/ListaLocalizacaoPorData/${data}`)
            .toPromise()
            .then((resposta: any) => resposta.json())
    }

    //Retorna uma promise com todos os registros no banco
    public getLocalizacao(): Promise<Localizacao[]> {

        return this.http.get(`${this.API_URL}/ListaLocalizacao/1`)
            .toPromise()
            .then((resposta: any) => resposta.json())
    }

    public getSalvarPonto(latitude: number, longitude: number): Promise<boolean> {
        console.log('SalvarHistorico na classe servico.service: ' + latitude)

        return this.http.get(`${this.API_URL}/CadastrarPontoFuncionario/${latitude}/${longitude}`)
            .toPromise()
            .then((resposta: any) => resposta.json)

    }

    //Retorna uma promise com os registros no banco
    public getSolicitacao(): Promise<Solicitacao[]> {
        return this.http.get(`${this.API_URL}/ObterRegistroSolicitacao/6`)
            .toPromise()
            .then((resposta: any) => resposta.json())
    }

    public getSalvarSolicitacap(data: string, horarioBatida: string, descricao: string, situacao: string, funcionarioId: number): Promise<boolean> {
        return this.http.get(`${this.API_URL}/RegistrarSolicitacaoFuncionario/${data}/${horarioBatida}/${descricao}/${situacao}/${funcionarioId}`)
            .toPromise()
            .then((resposta: any) => resposta.json)

    }

}


