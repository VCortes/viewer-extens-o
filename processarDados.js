/**
 * processarDados.js
 *
 * Script para processar dados do arquivo data.json e extrair informações específicas
 * seguindo princípios do paradigma funcional.
 */

const fs = require('fs');
const path = require('path');

/**
 * Constantes para definir os intervalos de ajuste de notas por ano acadêmico
 * Cada intervalo contém limites min, max e flags para indicar se são exclusivos
 */
const INTERVALOS_2025 = [
    { min: 0, max: 0.6, exclusivoMin: false, exclusivoMax: false, valor: 0 },
    { min: 0.6, max: 1.2, exclusivoMin: true, exclusivoMax: true, valor: 1 },
    { min: 1.2, max: 2, exclusivoMin: false, exclusivoMax: false, valor: 2 }
];

const INTERVALOS_2024 = [
    { min: 0, max: 3, exclusivoMin: false, exclusivoMax: false, valor: 0 },
    { min: 3, max: 4, exclusivoMin: true, exclusivoMax: true, valor: 4 },
    { min: 4, max: 6, exclusivoMin: false, exclusivoMax: false, valor: 6 }
];

/**
 * Função pura para ler o conteúdo de um arquivo
 * @param {string} caminhoArquivo - Caminho para o arquivo a ser lido
 * @returns {Promise<string>} - Conteúdo do arquivo como string
 */
const lerArquivo = (caminhoArquivo) => {
    return new Promise((resolver, rejeitar) => {
        fs.readFile(caminhoArquivo, 'utf8', (erro, dados) => {
            if (erro) {
                rejeitar(erro);
                return;
            }
            resolver(dados);
        });
    });
};

/**
 * Função pura para escrever conteúdo em um arquivo
 * @param {string} caminhoArquivo - Caminho para o arquivo a ser escrito
 * @param {string} conteudo - Conteúdo a ser escrito no arquivo
 * @returns {Promise<void>}
 */
const escreverArquivo = (caminhoArquivo, conteudo) => {
    return new Promise((resolver, rejeitar) => {
        fs.writeFile(caminhoArquivo, conteudo, 'utf8', (erro) => {
            if (erro) {
                rejeitar(erro);
                return;
            }
            resolver();
        });
    });
};

/**
 * Função pura para converter string JSON para objeto JavaScript
 * @param {string} dadosJson - String contendo JSON
 * @returns {Array|Object} - Objeto JavaScript representando o JSON
 */
const converterJsonParaObjeto = (dadosJson) => JSON.parse(dadosJson);

/**
 * Função pura para filtrar trabalhos não deletados
 * @param {Array} trabalhos - Lista de trabalhos
 * @returns {Array} - Lista de trabalhos não deletados
 */
const filtrarTrabalhosDeletados = (trabalhos) =>
    trabalhos.filter((trabalho) => trabalho.is_deleted !== true);

/**
 * Função pura para verificar se uma nota está em um intervalo
 * @param {number} nota - Nota a ser verificada
 * @param {Object} intervalo - Intervalo com min, max, exclusivoMin, exclusivoMax
 * @returns {boolean} - Verdadeiro se a nota estiver no intervalo
 */
const estaNoIntervalo = (nota, intervalo) => {
    const { min, max, exclusivoMin, exclusivoMax } = intervalo;

    // Verificar limite inferior (min)
    const acimaDeLimiteInferior = exclusivoMin ? nota > min : nota >= min;

    // Verificar limite superior (max)
    const abaixoDeLimiteSuperior = exclusivoMax ? nota < max : nota <= max;

    // Retorna verdadeiro se a nota estiver dentro do intervalo
    return acimaDeLimiteInferior && abaixoDeLimiteSuperior;
};

/**
 * Função pura para ajustar uma nota com base nos intervalos fornecidos
 * @param {number|null} nota - Nota a ser ajustada
 * @param {Array<Object>} intervalos - Intervalos de ajuste
 * @returns {number|null} - Nota ajustada ou null se a nota original for null
 */
const ajustarNota = (nota, intervalos) => {
    if (nota === null) return null;

    // Encontrar o intervalo correspondente e retornar o valor ajustado
    const intervaloEncontrado = intervalos.find((intervalo) => estaNoIntervalo(nota, intervalo));

    return intervaloEncontrado ? intervaloEncontrado.valor : null;
};

/**
 * Função pura para determinar os intervalos a serem usados com base no período acadêmico
 * @param {string|null} periodoAcademico - Período acadêmico do trabalho
 * @returns {Array<Object>|null} - Intervalos a serem usados ou null se não houver período
 */
const determinarIntervalos = (periodoAcademico) => {
    if (!periodoAcademico) return null;

    if (periodoAcademico.includes('2025')) {
        return INTERVALOS_2025;
    } else if (periodoAcademico.includes('2024')) {
        return INTERVALOS_2024;
    }

    return null;
};

/**
 * Função pura para extrair campos específicos de cada trabalho
 * @param {Object} trabalho - Trabalho original
 * @returns {Object} - Trabalho com apenas os campos desejados
 */
const extrairCamposDesejados = (trabalho) => {
    // Determinar os intervalos com base no período acadêmico
    const intervalosAjuste = determinarIntervalos(trabalho.academic_period);

    // Calcular a nota ajustada
    let notaAjustada = intervalosAjuste ? ajustarNota(trabalho.grade, intervalosAjuste) : null;

    // Se a nota real existe mas a nota ajustada for nula, tente transformar e calcular novamente
    if (trabalho.grade !== null && notaAjustada === null && intervalosAjuste) {
        const notaTransformada = (trabalho.grade / 6) * 2; // Dividir por 6 e multiplicar por 2
        notaAjustada = ajustarNota(notaTransformada, intervalosAjuste);

        // Se mesmo após a transformação a nota ajustada continuar nula, logar no console
        if (notaAjustada === null) {
            console.log(
                `Nota real: ${trabalho.grade}, Nota transformada: ${notaTransformada}, Nota ajustada: null`
            );
        }
    } else if (trabalho.grade !== null && notaAjustada === null) {
        console.log(`Nota real: ${trabalho.grade}, Nota ajustada: null`);
    }

    // Retornar objeto com os campos desejados incluindo a nota ajustada
    return {
        id: trabalho.id,
        nota_real: trabalho.grade,
        nota_ajustada: notaAjustada,
        data_criacao: trabalho.created_at,
        progresso: trabalho.progress,
        periodo_academico: trabalho.academic_period,
        nome_disciplina: trabalho.name,
        data_avaliacao: trabalho.evaluated_at
    };
};

/**
 * Função pura para transformar a lista de trabalhos
 * @param {Array} trabalhos - Lista de trabalhos filtrados
 * @returns {Array} - Lista de trabalhos transformados
 */
const transformarTrabalhos = (trabalhos) => trabalhos.map(extrairCamposDesejados);

/**
 * Função pura para converter objeto JavaScript para string JSON formatada
 * @param {Array|Object} objeto - Objeto JavaScript a ser convertido
 * @returns {string} - String JSON formatada
 */
const converterObjetoParaJson = (objeto) => JSON.stringify(objeto, null, 2);

/**
 * Função de composição para processar os dados
 * @param {string} dadosJson - Dados JSON como string
 * @returns {string} - Novo JSON como string
 */
const processarDados = (dadosJson) => {
    const trabalhos = converterJsonParaObjeto(dadosJson);
    const trabalhosFiltrados = filtrarTrabalhosDeletados(trabalhos);
    const trabalhosTranformados = transformarTrabalhos(trabalhosFiltrados);
    return converterObjetoParaJson(trabalhosTranformados);
};

/**
 * Função principal que executa o processamento
 */
const executarProcessamento = async () => {
    try {
        console.log('Iniciando processamento dos dados...');

        const caminhoEntrada = path.join(__dirname, 'data.json');
        const caminhoSaida = path.join(__dirname, 'trabalhos_filtrados.json');

        console.log(`Lendo arquivo: ${caminhoEntrada}`);
        const dadosJson = await lerArquivo(caminhoEntrada);

        console.log('Processando dados...');
        const resultado = processarDados(dadosJson);

        console.log(`Salvando resultados em: ${caminhoSaida}`);
        await escreverArquivo(caminhoSaida, resultado);

        console.log('Processamento concluído com sucesso!');
    } catch (erro) {
        console.error(`Erro durante o processamento: ${erro.message}`);
    }
};

/**
 * Função para agrupar dados quando há muitos pontos no eixo X
 * @param {Array} labels - Array com os rótulos originais
 * @param {Array} valores - Array com os valores originais
 * @param {number} maxGrupos - Número máximo de grupos a serem exibidos
 * @returns {Object} - Objeto com arrays de labels e valores agrupados
 */
function agruparDadosEixoX(labels, valores, maxGrupos) {
    // Se o número de labels é menor ou igual ao máximo, não precisa agrupar
    if (labels.length <= maxGrupos) {
        return { labels, valores };
    }

    // Calcular o tamanho de cada grupo
    const tamanhoGrupo = Math.ceil(labels.length / maxGrupos);

    // Arrays para os novos labels e valores agrupados
    const labelsAgrupados = [];
    const valoresAgrupados = [];

    // Agrupar os dados em grupos do tamanho calculado
    for (let i = 0; i < labels.length; i += tamanhoGrupo) {
        // Pegar o intervalo de labels para este grupo
        const grupoLabels = labels.slice(i, Math.min(i + tamanhoGrupo, labels.length));
        const grupoValores = valores.slice(i, Math.min(i + tamanhoGrupo, valores.length));

        // Determinar o label do grupo (primeiro-último)
        let labelGrupo;
        if (grupoLabels.length === 1) {
            labelGrupo = grupoLabels[0];
        } else {
            labelGrupo = `${grupoLabels[0]} - ${grupoLabels[grupoLabels.length - 1]}`;
        }

        // Calcular o valor médio do grupo
        const somaGrupo = grupoValores.reduce((soma, val) => soma + val, 0);
        const mediaGrupo = somaGrupo / grupoValores.length;

        // Adicionar aos arrays agrupados
        labelsAgrupados.push(labelGrupo);
        valoresAgrupados.push(mediaGrupo);
    }

    return { labels: labelsAgrupados, valores: valoresAgrupados };
}

// Executa o processamento
executarProcessamento();
