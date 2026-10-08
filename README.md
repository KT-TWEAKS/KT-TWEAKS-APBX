# KT APBX — catálogo verificado

Catálogo público de playbooks `.apbx` verificados pelo painel privado KT WIRZADE.

## Como funciona

- O painel privado recebe o arquivo, extrai e audita a estrutura localmente.
- O SHA-256 é calculado antes do registro e validado novamente no GitHub Actions.
- Cada APBX é publicado exclusivamente como asset de uma GitHub Release.
- Este repositório contém apenas o site Astro e `public/catalog.json`; nenhum APBX é incluído no deploy ou no histórico novo do catálogo.
- O site público mostra somente registros verificados com hash e download HTTPS.

## Desenvolvimento

```bash
npm install
npm run dev
npm run build
```

O site de produção é servido pela Vercel em [kt-tweaks-apbx.vercel.app](https://kt-tweaks-apbx.vercel.app). O catálogo é atualizado automaticamente pelo workflow `publish-apbx.yml` depois que o painel conclui uma publicação.

## Estrutura

```text
src/layouts/             shell e navegação
src/pages/index.astro    catálogo com busca e filtros
src/pages/comparar.astro comparação lado a lado
src/pages/changelog-playbooks.astro histórico público
src/styles/site.css      identidade visual
public/catalog.json      metadados públicos, sem arquivos APBX
.github/workflows/       validação e publicação por Release
```
