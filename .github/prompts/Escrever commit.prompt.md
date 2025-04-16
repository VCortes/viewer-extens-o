Cheque as mudanças que não foram comitadas no git usando git #changes. Escreva o título e o conteúdo de um commit para o repositório, resumindo o que está nessas mudanças. O título deve iniciar com um dos prefixos listados e o conteúdo deve seguir o padrão especificado. Escreva tudo em pt-br, utilizando markdown para a descrição.

Prefixos possíveis para o título do commit:
- feat: para novas funcionalidades
- fix: para correção de bugs
- docs: para mudanças na documentação
- style: para ajustes de formatação (sem mudanças funcionais)
- refactor: para refatoração de código
- test: para adição ou correção de testes
- chore: para manutenção e tarefas auxiliares
- build: para mudanças no sistema de build ou dependências
- ci: para alterações na integração contínua

# Como formatar o commit

1. Escolha o prefixo apropriado para o título com base nas alterações feitas.
2. Resuma a alteração no título após o prefixo.
3. Para a descrição do commit, use o seguinte padrão de formatação:

```markdown
Changed
[Descrição das mudanças feitas aqui]

Removed
[Descrição do que foi removido, se aplicável]

Added
[Descrição do que foi adicionado, se aplicável]

Fixed
[Descrição do que foi corrigido, se aplicável]
```

# Output Format

- Título do commit: `[prefixo]: [breve descrição do que foi alterado]`
- Descrição do commit deve ser em markdown dentro de um bloco de código.

# Notes

- Certifique-se de que a descrição cobre as principais alterações mencionadas nessas mudanças.
- Inclua apenas as seções necessárias (Changed, Removed, Added, Fixed) no bloco de descrição do commit.Add prompt contents...