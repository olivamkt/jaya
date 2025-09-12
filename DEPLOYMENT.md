# Deploy no GitHub Pages

Este projeto está configurado para ser deployado no GitHub Pages com suporte a múltiplos idiomas.

## Configuração

### 1. Configuração do Astro

O arquivo `astro.config.mjs` está configurado com:

```javascript
export default defineConfig({
	site: 'https://ricardopdj.github.io',
	base: '/jaya/',
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'es'],
		routing: {
			prefixDefaultLocale: false
		}
	}
	// ... outras configurações
})
```

### 2. Estrutura de URLs

Com essa configuração, as URLs serão:

- Inglês (padrão): `https://ricardopdj.github.io/jaya/`
- Espanhol: `https://ricardopdj.github.io/jaya/es/`

### 3. Language Switcher

O componente `LanguageSelector` foi corrigido para funcionar corretamente com o base path do GitHub Pages. Ele:

- Remove o base path `/jaya` do pathname atual
- Remove o idioma atual do path
- Gera as URLs corretas para cada idioma

## Como fazer o Deploy

### 1. GitHub Actions (Recomendado)

1. Crie um arquivo `.github/workflows/deploy.yml` (se não existir)
2. Configure o workflow para fazer build e deploy automático
3. Configure as permissões do repositório para GitHub Pages

### 2. Deploy Manual

1. Execute o build:

   ```bash
   npm run build
   ```

2. Faça push da pasta `dist/` para a branch `gh-pages` ou configure o GitHub Pages para usar a pasta `dist/` da branch `main`

### 3. Configuração do Repositório

1. Vá para Settings > Pages
2. Configure a source como "GitHub Actions" ou "Deploy from a branch"
3. Se usar branch, configure para usar a pasta `dist/` da branch `main`

## Estrutura de Arquivos

```
dist/
├── index.html          # Página em inglês (padrão)
├── es/
│   └── index.html      # Página em espanhol
├── _astro/             # Assets do Astro
└── ... outros arquivos
```

## Troubleshooting

### Language Switcher não funciona

Se o language switcher não estiver funcionando após o deploy:

1. Verifique se o `base` no `astro.config.mjs` corresponde ao nome do repositório
2. Verifique se as URLs geradas estão corretas no console do navegador
3. Teste localmente com `npm run build && npm run preview`

### Páginas 404

Se as páginas estão retornando 404:

1. Verifique se o GitHub Pages está configurado corretamente
2. Verifique se o build está gerando os arquivos corretos na pasta `dist/`
3. Verifique se as URLs estão sendo geradas com o base path correto
