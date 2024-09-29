/**
 * Função personalizada para consultar um CEP.
 * Criado e publicado no Blog da Octadata: https://octadata.com.br/blog/como-consultar-cep-no-google-sheets/
 * 
 * @param {string} cep O CEP a ser consultado.
 * @param {Array} [itens] Um array contendo os itens da resposta a serem retornados.
 * @return {string} Os valores dos itens da resposta, separados por vírgula ou "Erro" em caso de falha.
 * @customfunction
 */

function CONSULTAR_CEP(cep, itens) {
  // Remove o traço, se existir
  cep = String(cep).replace("-", "");

  // Adiciona zeros à esquerda se o CEP tiver menos de 8 dígitos
  if (cep.length < 8) {
    cep = cep.padStart(8, '0');
  }

  var cache = CacheService.getScriptCache();
  var cachedData = cache.get(cep);

  // Se o dado estiver em cache, reutiliza o resultado
  if (cachedData) {
    var data = JSON.parse(cachedData);
  } else {
    var url = 'https://viacep.com.br/ws/' + cep + '/json/';
    var response;
    var attempts = 0;
    var success = false;

    // Faz até 10 tentativas para obter uma resposta com status HTTP 200
    while (attempts < 10 && !success) {
      try {
        // Faz a requisição para a API do ViaCEP.com.br
        response = UrlFetchApp.fetch(url);
        // Verifica se o status da resposta é 200
        if (response.getResponseCode() === 200) {
          success = true;
        } else {
          attempts++;
          Utilities.sleep(1000);
        }
      } catch (e) {
        attempts++;
        Utilities.sleep(1000);
      }
    }

    if (!success) {
      return "Erro";
    }
    
    data = JSON.parse(response.getContentText());

    if (data.erro) {
      return "CEP não encontrado.";
    }

    // Armazena a resposta no cache pelo tempo máximo (21600 segundos/6 horas)
    cache.put(cep, JSON.stringify(data), 21600);
  }

  // Se os itens não forem especificados, retornará valores padrões
  if (!itens || itens.length === 0) {
    itens = ["logradouro", "bairro", "localidade", "uf"];
  }

  // Retorna a resposta com os itens desejados
  var resultado = itens.map(function(item) {
    return data[item] || 'N/A';
  });

  // Retorna os valores separados por vírgula
  return resultado.join(', ');
}
