import { Component } from '@angular/core';
import { CalculoAppService } from '../../../Core/src/App.Core/CalculoAppService'
import { Operacao } from '../../../Core/src/App.Core/Domain/EnumOperacao'

let appService = new CalculoAppService();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  valorA?: number = undefined;
  valorB?: number = undefined;
  operacao: number = undefined;  
  error?: string = undefined;
  resultado?: number = undefined;
  itens: Array<any> = undefined;

  constructor() {
    this.itens = appService.getOperators();
    this.operacao = appService.getDefaultOperator();
  }

  calcular() {
    try {
      this.resultado = appService.calcular(Number(this.valorA), Number(this.valorB), this.operacao);
      this.error = undefined;
    } catch (ex) {
      this.resultado = undefined;
      this.error = ex.toString();
    }
  }

}
