import { Operacao } from "./EnumOperacao";

export class Calculo {

    public ValorA: number;
    public ValorB: number;
    public Operacao: Operacao;
    private Resultado: number;

    constructor(valorA: number, valorB: number, operacao: Operacao) {
        this.ValorA = valorA;
        this.ValorB = valorB;
        this.Operacao = operacao;
    }

    validate() {
        switch (this.Operacao) {
            case Operacao.DIV:
                if (this.ValorB == 0)
                    throw new Error('Não é possivel realizar uma divisão por 0. ');
                break;            
            default:                     
                break;
        }
    }

    calcular() {        
        switch (this.Operacao) {
            case Operacao.ADD:
                this.Resultado = this.ValorA + this.ValorB;
                break;
            case Operacao.SUB:
                this.Resultado = this.ValorA - this.ValorB;
                break;
            case Operacao.MULT:
                this.Resultado = this.ValorA * this.ValorB;
                break;
            case Operacao.DIV:
                this.Resultado = this.ValorA / this.ValorB;
                break;
            default:
                this.Resultado = 0;
                break;
        }
    }

    getResultado(): number {
        return this.Resultado;
    }

}