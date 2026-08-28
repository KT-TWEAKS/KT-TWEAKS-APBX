<p align="center">
  <img src="https://raw.githubusercontent.com/KT-TWEAKS/KT-TWEAKS-APBX/main/public/kt-logo.png" alt="KT TWEAKS APBX" width="120">
</p>

<h1 align="center">KT TWEAKS APBX</h1>

<p align="center">
  Curadoria e distribuição de <b>playbooks originais da comunidade AME</b> para Windows 10 e 11 —<br>auditados, verificados por hash SHA-256 e distribuídos <b>sem nenhuma modificação</b>.
</p>

<p align="center">
  <a href="https://kt-tweaks-apbx.vercel.app"><img src="https://img.shields.io/badge/site-kt--tweaks--apbx.vercel.app-8b5cf6" alt="Site"></a>
  <a href="https://github.com/KT-TWEAKS/KT-TWEAKS-APBX/releases/tag/v1.0"><img src="https://img.shields.io/badge/release-v1.0-22d3ee" alt="Release v1.0"></a>
  <img src="https://img.shields.io/badge/playbooks-16-34d399" alt="16 playbooks">
  <img src="https://img.shields.io/badge/Windows-10%20%7C%2011-0078D6?logo=windows&logoColor=white" alt="Windows 10 | 11">
</p>

<p align="center">
  <a href="https://kt-tweaks-apbx.vercel.app">Catálogo online</a> ·
  <a href="https://kt-tweaks-apbx.vercel.app/comparar">Comparar playbooks</a> ·
  <a href="https://kt-tweaks-apbx.vercel.app/changelog-playbooks">Changelog</a> ·
  <a href="https://github.com/KT-TWEAKS/KT-WIRZADE">KT WIRZADE</a>
</p>

---

## O que é

Este repositório hospeda o site (Astro 5, saída estática) e os arquivos dos **16 playbooks originais da comunidade AME** — Atlas Playbook, AtmosphereOS, ReviOS, RapidOS, FSOS-XR10, Vain e outros — para Windows 10 e 11.

- **Downloads diretos** — 13 playbooks via raw do GitHub e 3 pesados (>100MB) via [Releases](https://github.com/KT-TWEAKS/KT-TWEAKS-APBX/releases/tag/v1.0)
- **Comparação** — coloque playbooks lado a lado e veja tamanho, ações, serviços, registro e nível de risco
- **Detalhes** — relatório de auditoria de cada playbook (o que ele toca no sistema), gerado com o mesmo motor do **APBX Developer** do [KT WIRZADE](https://github.com/KT-TWEAKS/KT-WIRZADE)
- **Verificação de integridade** — todos os 16 playbooks são checados por hash SHA-256; o selo ✓ Verificado garante que o arquivo não foi alterado

## Como usar com o KT WIRZADE

1. Baixe o [KT WIRZADE](https://github.com/KT-TWEAKS/KT-WIRZADE/releases/latest) e o playbook desejado
2. Abra o KT WIRZADE e adicione o `.apbx` na sidebar
3. Revise os requisitos e as etapas que precisam de internet
4. Aplique — o progresso e o rollback ficam registrados por sessão

## Estrutura

```
├── src/
│   ├── layouts/             # BaseLayout (fundo interativo Three.js)
│   ├── pages/               # index · comparar · changelog-playbooks
│   └── styles/              # CSS por página
├── public/                  # Assets servidos: logos · robots.txt · sitemap.xml
├── playbooks/               # 13 arquivos .apbx (fonte dos downloads via raw do GitHub)
├── astro.config.mjs         # output: static · site: https://kt-tweaks-apbx.vercel.app
├── vercel.json              # Build Astro + headers de segurança
└── README.md
```

## Playbooks

| Playbook | Tamanho | Download |
|---|---|---|
| Atlas Playbook | 45.8 MB | [raw](https://raw.githubusercontent.com/KT-TWEAKS/KT-TWEAKS-APBX/main/playbooks/atlas-playbook-v0.5.0-hotfix.apbx) |
| AtmosphereOS | 12.1 MB | [raw](https://raw.githubusercontent.com/KT-TWEAKS/KT-TWEAKS-APBX/main/playbooks/atmosphereos.apbx) |
| Atom Playbook | 119 MB | [release](https://github.com/KT-TWEAKS/KT-TWEAKS-APBX/releases/download/v1.0/Atom.Playbook.v0.0.7.apbx) |
| Eternity OS | 3.3 MB | [raw](https://raw.githubusercontent.com/KT-TWEAKS/KT-TWEAKS-APBX/main/playbooks/eternity-v1.4.apbx) |
| FSOS-XR10 | 416 MB | [release](https://github.com/KT-TWEAKS/KT-TWEAKS-APBX/releases/download/v1.0/FSOS-XR10.apbx) |
| NOVA | 18.1 MB | [raw](https://raw.githubusercontent.com/KT-TWEAKS/KT-TWEAKS-APBX/main/playbooks/nova-v0.5.0.apbx) |
| NovaOS V6.2 | 97.4 MB | [release](https://github.com/KT-TWEAKS/KT-TWEAKS-APBX/releases/download/v1.0/Nova-V6.2.apbx) |
| PeakOS | 15.5 MB | [raw](https://raw.githubusercontent.com/KT-TWEAKS/KT-TWEAKS-APBX/main/playbooks/peakos-v1.0.2.apbx) |
| RapidOS | 2.4 MB | [raw](https://raw.githubusercontent.com/KT-TWEAKS/KT-TWEAKS-APBX/main/playbooks/rapidos.apbx) |
| RaxOS | 3.5 MB | [raw](https://raw.githubusercontent.com/KT-TWEAKS/KT-TWEAKS-APBX/main/playbooks/raxos.apbx) |
| ReviOS | 1.1 MB | [raw](https://raw.githubusercontent.com/KT-TWEAKS/KT-TWEAKS-APBX/main/playbooks/revios-26.04.apbx) |
| SapphireOS | 23.5 MB | [raw](https://raw.githubusercontent.com/KT-TWEAKS/KT-TWEAKS-APBX/main/playbooks/sapphireos.apbx) |
| SynergyOS | 18.7 MB | [raw](https://raw.githubusercontent.com/KT-TWEAKS/KT-TWEAKS-APBX/main/playbooks/synergyos.apbx) |
| XOS | 8.9 MB | [raw](https://raw.githubusercontent.com/KT-TWEAKS/KT-TWEAKS-APBX/main/playbooks/xos-v0.574.apbx) |
| Z-LAG OS | 4.9 MB | [raw](https://raw.githubusercontent.com/KT-TWEAKS/KT-TWEAKS-APBX/main/playbooks/z-lag-os.apbx) |
| Vain v14 hf6 | 91.4 MB | [raw](https://raw.githubusercontent.com/KT-TWEAKS/KT-TWEAKS-APBX/main/playbooks/vain-v14-hotfix6.apbx) |

## Desenvolvimento

```bash
npm install       # dependências
npm run dev       # dev server em http://localhost:4321
npm run build     # build estático em dist/
```

## Deploy

O site é servido pela Vercel em **https://kt-tweaks-apbx.vercel.app** — framework Astro detectado automaticamente (build: `astro build`, output: `dist/`). A pasta `playbooks/` da raiz fica fora do deploy (`.vercelignore`); ela existe como fonte dos downloads via `raw.githubusercontent.com`.

## Licença

Os playbooks pertencem à comunidade AME (cada um com sua licença original). Este repositório faz apenas curadoria e distribuição direta, **sem modificações** nos pacotes.
