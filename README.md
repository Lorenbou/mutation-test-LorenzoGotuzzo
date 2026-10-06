# Mutation Tests com Stryker

Trabalho baseado no [primeiro trabalho de testes unitários](https://github.com/Lorenbou/prova01-unit-test-LorenzoGotuzzo) (Jest), agora avaliado e melhorado com **mutation testing** usando o [Stryker Mutator](https://stryker-mutator.io/).

## O que é mutation testing?

O Stryker altera o código-fonte (cria "mutantes": troca `>` por `>=`, `&&` por `||`, remove ramos, altera strings, etc.) e roda a suíte de testes para cada mutante.

- Se algum teste **falha**, o mutante foi **morto** (bom).
- Se todos os testes **passam**, o mutante **sobreviveu** (os testes não detectam aquela mudança de comportamento).

O **mutation score** é `mutantes mortos / total de mutantes`. Ele mede a qualidade real dos testes, indo além da cobertura de linhas: a cobertura do primeiro trabalho já era alta, mas vários testes não verificavam o suficiente.

## Resultado

| | Mutation score | Mortos | Sobreviveram | Sem cobertura |
|---|---|---|---|---|
| Suíte original (primeiro trabalho) | **88,31%** | 476 | 53 | 10 |
| Suíte melhorada (este repositório) | **100%** | 528 | 0 | 0 |

Testes: 67 → 98 (12 suítes). Relatório HTML gerado em `reports/mutation/mutation.html`.

### O que os mutantes sobreviventes revelaram

| Tipo de lacuna | Exemplo | Teste adicionado |
|---|---|---|
| Valores de fronteira não testados | `idade < 15` virou `<= 15` em `jogador.js`; `valor > saldo` virou `>=` em `banco.js` | Idades 15 e 45, sacar exatamente o saldo, camisa 1 e 99, minutos 1 e 120 |
| Ramo nunca executado | `contarOcorrencias` (o teste existia, mas estava **vazio**); `reiniciarEstatisticas` | Testes novos para os dois métodos |
| Só o caminho feliz verificado | `podeJogar` com `&&` trocado por `\|\|` | Casos suspenso, lesionado e ambos |
| Mensagens de erro não verificadas | `new Error("")` passava | `toThrow("mensagem esperada")` |
| Funções com aleatoriedade | `Math.random() / max` passava | `jest.spyOn(Math, "random")` com valor fixo |
| Colaboradores internos | `transferir` em `contaBancaria.js` | `jest.spyOn` para provar que `sacar` não é chamado / que o destino não recebe depósito se o saque falhar |
| Validação de tipo | `ehNumero("5")` | Caso com string numérica |

### Mutantes equivalentes

Quatro pontos do código geram mutantes que **não alteram o comportamento observável**, então nenhum teste consegue matá-los. Foram marcados com `// Stryker disable next-line <Mutator>` e uma justificativa no próprio código:

- `src/anagram.js`: `toUpperCase` no lugar de `toLowerCase` e o separador do `join` não mudam o resultado da comparação entre as duas strings.
- `src/carro.js`: `distancia >= 0` soma 0 à quilometragem.
- `src/utilitarios.js`: `toUpperCase` no `ehPalindromo` normaliza a caixa da mesma forma para entradas ASCII.
- `src/textoUtils.js`: `split(/\s/)` no lugar de `split(/\s+/)` é absorvido pelo `filter(Boolean)`. O `.trim()` redundante foi removido pelo mesmo motivo.

## Como executar

Requisitos: [Node JS](https://nodejs.org/) >= 20.

```bash
npm install
npm test            # testes unitários (Jest)
npm run coverage    # testes com cobertura
npm run mutation    # mutation testing (Stryker)
```

Configuração do Stryker em [`stryker.config.json`](stryker.config.json): runner Jest, `mutate: src/**/*.js`, `coverageAnalysis: perTest`, relatórios `html` e `clear-text`.

## CI

O workflow [`.github/workflows/node.js.yml`](.github/workflows/node.js.yml) roda os testes com cobertura e o Stryker a cada push/PR para `master`, publicando o relatório HTML como artefato.

## Estrutura

- `src`: código-fonte
- `test`: testes unitários (incluindo os blocos `(mutation tests)` criados para matar os mutantes)
- `stryker.config.json`: configuração do Stryker
