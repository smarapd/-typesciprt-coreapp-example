import { Operacao } from "./Domain/EnumOperacao";
import { Calculo } from "./Domain/Calculo";

export class CalculoAppService {

    constructor() {

    }

    calcular(valorA: number, valorB: number, operacao: Operacao): number {
        let calculo = new Calculo(valorA, valorB, operacao);
        calculo.validate();
        calculo.calcular();
        return calculo.getResultado();
    }

    getDefaultOperator() : Operacao {
        return Operacao.ADD;
    }

    getOperators () : Array<any> {
        let operators = [
            { value: Operacao.ADD, text: 'Adição' },
            { value: Operacao.SUB, text: 'Subtração' },
            { value: Operacao.MULT, text: 'Multiplicação' },
            { value: Operacao.DIV, text: 'Divisão' }            
        ];
        return operators;
    }

}