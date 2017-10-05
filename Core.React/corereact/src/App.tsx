import * as React from 'react';
import { CalculoAppService } from './coreapp/App.Core/CalculoAppService'
import { Operacao } from './coreapp/App.Core/Domain/EnumOperacao'
import './App.css';

let appService = new CalculoAppService();

interface Props {

}

interface Calculo {
  valorA?: number;
  valorB?: number;
  resultado?: Number;
  operacao: Operacao;
  error?: string;
  itens: Array<any>;
}

class App extends React.Component<Props, Calculo> {


  constructor() {
    super();

    this.state = {
      itens: appService.getOperators(),
      operacao: appService.getDefaultOperator()
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e: any) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(event: any) {
    try {
      let resultado = appService.calcular(Number(this.state.valorA), Number(this.state.valorB), Number(this.state.operacao));
      this.setState({ resultado: resultado, error: undefined });
    } catch (ex) {
      this.setState({ resultado: undefined, error: ex.toString() });
    }
  }


  render() {

    let listItems = this.state.itens.map((item) => {
      return (
        <span>
          <input type="radio" id={item.value} value={item.value} name="operacao" onChange={this.handleChange} checked={this.state.operacao == item.value ? true : false} ></input>
          <label htmlFor={item.value}>&nbsp;{item.text}</label>
          <br />
        </span>
      );
    });


    let errorBox = this.state.error != undefined ? (<div className="alert alert-danger" role="alert">
                    {this.state.error}
                   </div> ) : undefined;


    let resultBox = this.state.resultado != undefined ? (<div className="alert alert-success" role="alert">
                O resultado é: {this.state.resultado}
              </div> ) : undefined;


    return (
      <div className="container">
        <h2>Criado com React do Facebruiks</h2>
        <div className="row">
          <div className="form-group">
            <input className="form-control" placeholder="Valor 1" value={this.state.valorA} name="valorA" onChange={this.handleChange}></input>
          </div>
          <div className="form-group">
            <input className="form-control" placeholder="Valor 2" value={this.state.valorB} name="valorB" onChange={this.handleChange} ></input>
          </div>
          {listItems}
          <div className="form-group">
            <button className="btn btn-primary pull-right" onClick={this.handleSubmit} >Calcular</button>
          </div>
          <hr />
          { errorBox }
          { resultBox }
        </div>
      </div>
    );
  }
}

export default App;
