# Consulta de CEP no Google Sheets/Google Apps Script 🗺

Se você não conhece ou tem pouca experiência com Google Apps Script, leia o nosso artigo do [blog](https://octadata.com.br/blog/google-sheets-apps-script-o-que-e/).

Atualmente existem poucas soluções prontas para consultar CEP diretamente no Google Sheets, por isso, criamos esse script gratuito para lidar com essa demanda.

A função foi desenvolvida no **Google Apps Script** com a API do **ViaCEP.com.br** - um excelente projeto, diga-se de passagem. Inclusive, se o projeto for útil para você, considere fazer uma doação para o ViaCEP.

[Octadata - consulta de CEP no Google Planilhas (viacep.com.br)](https://octadata.com.br/blog/como-consultar-cep-no-google-sheets/)

# Implementação do script

Acesse sua planilha, clique em **Extensões** > **Apps Script**. Renomeie o seu projeto, cole todo o código do script **[consultar_cep.gs](https://github.com/octadata/google-sheets-consultar-cep/blob/main/consultar_cep.gs)** dentro do seu projeto no Google Apps Script, salve e execute para conceder as permissões necessárias.

# Parâmetros da função

Função: **=CONSULTAR_CEP(cep_ou_referencia_célula; _parâmetros_)**

Os parâmetros são opcionais, mas podem ser: 
- logradouro (que é o nome da Rua, Avenida, etc)
- complemento (por exemplo: lado par)
- bairro
- uf (estado abreviado: SP, RJ, ES)
- estado (nome do estado por extenso)
- regiao
- ibge
- ddd
- siafi

Os parâmetros selecionados serão retornados separados por vírgula.

Para retornar mais de um parâmetro na sua função, você precisa passá-los dentro de chaves, entre aspas e separados por vírgula.
Exemplo: =CONSULTAR_CEP(A2; {"logradouro"; "bairro"})

Onde A2 representa o valor 29100010 (válido para formato numérico ou de texto).

1. O CEP pode conter hífen que será tratado como sem.
2. O resultado na íntegra (independente dos parâmetros passados na função) será armazenado em cache por 6 horas.
3. CEPs com menos de 8 dígitos, terão zeros automaticamente adicionados à esquerda.
4. Se nenhum parâmetro for definido, o retorno padrão será: ["logradouro", "bairro", "localidade", "uf"]
5. Caso um parâmetro não seja encontrado na resposta, o mesmo constará como "N/A" no retorno final
6. Não sabemos se é uma falha do Apps Script ou recusas de conexão do ViaCEP, mas comumente algumas requisições não são realizadas com sucesso. Por isso, esse script realiza 10 tentativas de consultar um CEP, até uma resposta HTTP/200 seja emitida [exceto em caso de erro declarado na resposta da API]

![code-consultar-cep-gas](https://github.com/user-attachments/assets/f46328c2-35d6-40be-9817-a402e745b081)

# Sobre a Octadata

A [Octadata](https://octadata.com.br/) é um projeto que se propõe a ensinar dicas sobre manipulação e análise de dados, e automação nas ferramentas do Google, como Sheets, Apps Script, Looker Studio e Google Colab.

Estamos no [Blog](https://octadata.com.br/) | [YouTube](https://www.youtube.com/@OctadataBR) | [TikTok](https://www.tiktok.com/@octadatabr) | [Instagram](https://www.instagram.com/octadatabr/)

# Considerações finais

Esse é um script livre para realização de alterações/melhorias. [MIT License](https://github.com/octadata/google-sheets-consultar-cep/blob/main/LICENSE).
