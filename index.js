// Dados dos investimentos passados na documentação;
const investimentos = [
    { nome: 'Ações de Empresa X', custo: 30000, retorno: 40000 },
    { nome: 'Ações de Empresa Y', custo: 50000, retorno: 60000 },
    { nome: 'Imóvel Z', custo: 40000, retorno: 45000 },
    { nome: 'Títulos públicos P', custo: 10000, retorno: 15000 },
    { nome: 'Fundo de investimento F', custo: 20000, retorno: 25000 }
];

//Valor do orçamento enviado na documentaçao;
const ORCAMENTO = 100000;

// Função para encontrar a melhor combinação de investimentos
function melhorInvestimento(investimentos, orcamento) {
    let melhorRetorno = 0;
    let melhorSelecao = [];

    // Número de combinações possíveis: 2^n (onde n é o número de investimentos)
    const numComb = Math.pow(2, investimentos.length);

    // Iterar sobre todas as combinações de investimentos
    for (let i = 0; i < numComb; i++) {
        let custoTotal = 0;
        let retornoTotal = 0;
        let selecaoAtual = [];

        // Verificar se o investimento faz parte da combinação (bit a bit)
        for (let j = 0; j < investimentos.length; j++) {
            if (i & (1 << j)) {
                custoTotal += investimentos[j].custo;
                retornoTotal += investimentos[j].retorno;
                selecaoAtual.push(investimentos[j].nome);
            }
        }

        // Verificar se a combinação atual é válida e se o retorno é o melhor
        if (custoTotal <= orcamento && retornoTotal > melhorRetorno) {
            melhorRetorno = retornoTotal;
            melhorSelecao = selecaoAtual;
        }
    }

    return { melhorSelecao, melhorRetorno };
}

// Função que será chamada ao clicar no botão
function calcularInvestimento() {
    const resultado = melhorInvestimento(investimentos, ORCAMENTO);

    // Exibir o resultado na página
    document.getElementById('melhor-selecao').innerText = resultado.melhorSelecao.join(', ');
    document.getElementById('melhor-retorno').innerText = resultado.melhorRetorno;

    // Exibir a div de resultados
    document.getElementById('result').classList.remove('hidden');
}
