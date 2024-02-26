class Calculadora {
    constructor() {
        this.resultadoElement = document.getElementById('resultado');
        this.vlr1Element = document.getElementById('vlr1');
        this.vlr2Element = document.getElementById('vlr2');
    }

    calcular(operacao) {
        const vlr1 = parseFloat(this.vlr1Element.value);
        const vlr2 = parseFloat(this.vlr2Element.value);
        let resultado;

        switch (operacao) {
            case 'soma':
                resultado = vlr1 + vlr2;
                break;
            case 'divisao':
                resultado = vlr1 / vlr2;
                break;
            case 'subtracao':
                resultado = vlr1 - vlr2;
                break;
            case 'multiplicacao':
                resultado = vlr1 * vlr2;
                break;
            default:
                return;
        }

        this.resultadoElement.innerHTML = resultado;
    }
}

const calculadora = new Calculadora();
