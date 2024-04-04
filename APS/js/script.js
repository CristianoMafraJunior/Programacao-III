class ConsultaCEP {
    constructor() {
      this.botaoConsultar = document.getElementById('consultarBtn');
      this.botaoConsultar.addEventListener('click', this.consultarCEP.bind(this));
    }
  
    async consultarCEP() {
      const cep = this.obterCEP();
      if (!cep) {
        this.exibirAlerta('Por favor, digite um CEP válido.');
        return;
      }
  
      this.desabilitarBotao();
  
      try {
        const cepData = this.obterCEPDoLocalStorage(cep);
        if (cepData) {
          this.exibirResultado(cepData);
        } else {
          const data = await this.buscarCEPNaAPI(cep);
          this.salvarCEPNoLocalStorage(cep, data);
          this.exibirResultado(data);
        }
      } catch (error) {
        this.exibirErro('Erro ao consultar o CEP:', error);
      } finally {
        this.habilitarBotao();
      }
    }
  
    obterCEP() {
      return document.getElementById('cepInput').value.trim();
    }
  
    exibirAlerta(mensagem) {
      alert(mensagem);
    }
  
    desabilitarBotao() {
      this.botaoConsultar.disabled = true;
    }
  
    obterCEPDoLocalStorage(cep) {
      const cepData = localStorage.getItem(cep);
      return cepData ? JSON.parse(cepData) : null;
    }
  
    async buscarCEPNaAPI(cep) {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) {
        throw new Error('Erro ao buscar o CEP');
      }
      return response.json();
    }
  
    salvarCEPNoLocalStorage(cep, data) {
      localStorage.setItem(cep, JSON.stringify(data));
    }
  
    exibirResultado(data) {
      const { cep, logradouro, bairro, localidade, uf, ddd } = data;
      const resultadoDiv = document.getElementById('resultado');
      resultadoDiv.innerHTML = `
        <h2>Resultado:</h2>
        <p><strong>CEP:</strong> ${cep}</p>
        <p><strong>Logradouro:</strong> ${logradouro}</p>
        <p><strong>Bairro:</strong> ${bairro}</p>
        <p><strong>Localidade:</strong> ${localidade}</p>
        <p><strong>UF:</strong> ${uf}</p>
        <p><strong>DDD:</strong> ${ddd}</p>
      `;
    }
  
    exibirErro(mensagem, error) {
      console.error(mensagem, error);
    }
  
    habilitarBotao() {
      this.botaoConsultar.disabled = false;
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    new ConsultaCEP();
  });
  