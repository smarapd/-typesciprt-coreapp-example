<template>
  <div class="container">
    <h2>Criado com Vue.js do hu3</h2>
    <div class="row">
      <div class="form-group">
        <input class="form-control" placeholder="Valor 1" v-model.number="valorA"></input>
      </div>
      <div class="form-group">
        <input class="form-control" placeholder="Valor 2" v-model.number="valorB"></input>
      </div>
      <span v-for="(item, index) in items">
        <input type="radio" id="one" v-bind:value="item.value" v-model="operacao">
        <label for="one">{{item.text}}</label>
        <br>
      </span>
      <div class="form-group">
        <button class="btn btn-primary pull-right" v-on:click="calc">Calcular</button>
      </div>
      <hr>
      <div class="alert alert-danger" role="alert" v-show="error">
        {{error}}
      </div>
      <div class="alert alert-success" role="alert" v-show="resultado != undefined">
        O resultado é: {{resultado}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import Vue from "vue";
import { CalculoAppService } from '../../../Core/src/App.Core/CalculoAppService'
import { Operacao } from '../../../Core/src/App.Core/Domain/EnumOperacao'

let appService = new CalculoAppService();

interface Calculo extends Vue {
  valorA: number;
  valorB: number;
  resultado?: number;
  operacao: Operacao;
  error?: string;
  itens: Array<any>;
}

export default {
  name: "calculo",
  data() {
    return {
      valorA: undefined,
      valorB: undefined,
      resultado: undefined,
      error: undefined,
      operacao: appService.getDefaultOperator(),
      items: appService.getOperators()
    };
  },
  methods: {
    calc: function(event) {
      try {
        this.resultado = appService.calcular(this.valorA, this.valorB, this.operacao);
        this.error = undefined;
      } catch (ex) {
        this.resultado = undefined;
        this.error = ex.toString();
      }
    }
  }
} as Vue.ComponentOptions<Calculo>;
</script>

<style scoped>

</style>
