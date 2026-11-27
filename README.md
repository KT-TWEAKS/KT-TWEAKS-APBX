<div align="center">

<img src="assets/banner.png" alt="Banner oficial da KT TWEAKS" width="100%">

<h1>KT TWEAKS APBX</h1>

<p><strong>Catálogo público de playbooks para o KT WIRZADE.</strong></p>

<p><a href="https://kt-tweaks-apbx.vercel.app/">Explorar catálogo</a> · <a href="https://kt-tweaks-apbx.vercel.app/comparar">Comparar</a> · <a href="https://kt-tweaks-apbx.vercel.app/changelog-playbooks">Changelog</a> · <a href="https://github.com/KT-TWEAKS/KT-WIRZADE">KT WIRZADE</a></p>

</div>

## Sobre o projeto

Este repositório mantém o site do catálogo e seus metadados públicos. Cada registro apresenta o playbook, sua versão, o hash SHA-256 e um link para o asset publicado em uma GitHub Release. Os arquivos `.apbx` não fazem parte do deploy do site.

## Integridade dos pacotes

1. O pacote é auditado e seu SHA-256 é registrado.
2. O workflow de publicação confere o hash antes de atualizar o catálogo.
3. O arquivo é distribuído como asset de uma release oficial.

Compare o hash exibido no catálogo com o arquivo baixado antes de aplicar um playbook. O hash confirma a integridade do arquivo registrado; ele não garante que todas as ações sejam adequadas ao seu computador. Leia os [termos e limites de uso](https://kt-tweaks-apbx.vercel.app/termos).

## Desenvolvimento

O site é construído com Astro. O catálogo público fica em `public/catalog.json`.

```bash
npm install
npm run dev
npm run build
```

Consulte o [FAQ](https://kt-tweaks-apbx.vercel.app/faq) ou [abra uma issue](https://github.com/KT-TWEAKS/KT-TWEAKS-APBX/issues) para relatar problemas.

## Licença

[GPL-3.0](LICENSE) · Um projeto da [KT TWEAKS](https://github.com/KT-TWEAKS).
