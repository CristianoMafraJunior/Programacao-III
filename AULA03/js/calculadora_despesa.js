class CalculaDespesa {
    constructor() {
        const despesasSalvas = localStorage.getItem('despesas');
        if (despesasSalvas) {
            this.despesas = JSON.parse(despesasSalvas);
        } else {
            this.despesas = [];
        }
    
        this.configurarEventos();
    }

    configurarEventos() {
        document.getElementById("btnAdicionarDespesa").addEventListener("click", () => this.adicionarDespesa());
        document.getElementById("btnApagarDespesas").addEventListener("click", () => this.apagarDespesas());
        document.getElementById("btnMostrarTodasAsDespesas").addEventListener("click", () => this.exibirDespesas());
    }

    adicionarDespesa() {
        const nome = document.getElementById("nome").value;
        const valor = parseFloat(document.getElementById("valor").value);
        const quantidade = parseInt(document.getElementById("quantidade").value);
        const descricao = document.getElementById("descricao").value;
        const data = document.getElementById("data").value;

        if (nome.trim() === '' || isNaN(valor) || isNaN(quantidade) || descricao.trim() === '' || data.trim() === '') {
            alert("Por favor, preencha todos os campos corretamente.");
            return;
        }
        const novaDespesa = {
            nome: nome,
            valor: valor,
            quantidade: quantidade,
            descricao: descricao,
            data: data
        };

        
        this.despesas.push(novaDespesa);
        localStorage.setItem('despesas', JSON.stringify(this.despesas));
        this.calcularTotal();
        this.calcularMedia();
        this.encontrarDespesaMaisAlta();
        this.exibirDespesas();
    }

    calcularTotal() {
        let total = 0;
        for (let despesa of this.despesas) {
            total += despesa.valor * despesa.quantidade;
        }
        document.getElementById("despesa_total").textContent = total.toFixed(2);
    }

    calcularMedia() {
        if (this.despesas.length === 0) {
            document.getElementById("media_total").textContent = '0.00';
            return;
        }
        const total = parseFloat(document.getElementById("despesa_total").textContent);
        const media = total / this.despesas.length;
        document.getElementById("media_total").textContent = media.toFixed(2);
    }

    encontrarDespesaMaisAlta() {
        if (this.despesas.length === 0) {
            document.getElementById("despesa_alta").textContent = 'N/A';
            return;
        }
        let despesaMaisAlta = this.despesas[0];
        for (let i = 1; i < this.despesas.length; i++) {
            if (this.despesas[i].valor * this.despesas[i].quantidade > despesaMaisAlta.valor * despesaMaisAlta.quantidade) {
                despesaMaisAlta = this.despesas[i];
            }
        }
        document.getElementById("despesa_alta").textContent = `${despesaMaisAlta.nome}: R$${(despesaMaisAlta.valor * despesaMaisAlta.quantidade).toFixed(2)}`;
    }

    exibirDespesas() {
        const listaDespesas = document.getElementById("lista_despesas");
        listaDespesas.innerHTML = '';
        for (let despesa of this.despesas) {
            const itemLista = document.createElement("li");
            itemLista.textContent = `${despesa.nome}: R$${(despesa.valor * despesa.quantidade).toFixed(2)} - ${despesa.descricao} (${despesa.data})`;
            listaDespesas.appendChild(itemLista);
        }
    }

    recuperarDespesasSalvas() {
        const despesasSalvas = localStorage.getItem('despesas');
        if (despesasSalvas) {
            this.despesas = JSON.parse(despesasSalvas);
        } else {
            this.despesas = [];
        }
    }

    apagarDespesas() {
        this.despesas = [];
        localStorage.removeItem('despesas');
        document.getElementById("despesa_total").textContent = '0.00';
        document.getElementById("media_total").textContent = '0.00';
        document.getElementById("despesa_alta").textContent = 'N/A';
        document.getElementById("lista_despesas").innerHTML = '';
    }
}
window.onload = () => {
    const calculadoraDespesa = new CalculaDespesa();
    calculadoraDespesa.recuperarDespesasSalvas();
};
