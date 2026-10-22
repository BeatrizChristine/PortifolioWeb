# Portfólio Web - Beatriz Christine

Portfólio pessoal desenvolvido para apresentar minha trajetória como estudante de Engenharia da Computação e desenvolvedora web e mobile.

O site reúne informações sobre mim, minhas principais habilidades, projetos desenvolvidos, certificados e canais de contato profissional.

---

## Preview

O projeto é um site desenvolvido com HTML, CSS e JavaScript.

```text
https://BeatrizChristine.github.io/PortifolioWeb/
```

---

## Sobre o Projeto

Portfólio feito do zero, sem frameworks, com visual de desenvolvedora: tema escuro em roxo, lavanda e rosa (com alternância para o tema claro) e uma cena 3D interativa no início.

No site, é possível encontrar:

* Pilha Full-Stack em 3D (interface, API e banco) com uma requisição animada percorrendo as camadas
* Apresentação com cargo digitado dinamicamente
* Sobre mim com foto recortada, destacando desenvolvimento, suporte de TI e uso de IA
* Experiência atual (IDAM) dividida em Desenvolvimento e Suporte de TI, com linha do tempo
* 15 projetos, incluindo os sistemas do estágio no IDAM, com filtros e botão "Mostrar mais"
* Habilidades em um explorador estilo IDE, com pastas que trocam sozinhas
* Formação acadêmica e certificados em cards que giram
* Currículo em PDF e contato com botão para copiar o e-mail

---

## Tecnologias Utilizadas

* HTML5
* CSS3 (transformações 3D, variáveis, grid e animações)
* JavaScript puro, organizado em módulos
* [Devicon](https://devicon.dev/) para os ícones das tecnologias, reduzido só aos ícones usados (`css/devicon.css` e `assets/fonts/devicon-subset.woff2`)
* Google Fonts: Inter, Space Grotesk e JetBrains Mono

---

## Estrutura do Projeto

```text
PortifolioWeb/
│
├── assets/
│   ├── docs/          # currículo em PDF
│   ├── icons/
│   ├── fonts/         # fonte de ícones reduzida
│   └── img/           # foto de perfil recortada e imagens do site
│
├── css/
│   ├── base.css       # variáveis dos temas e componentes compartilhados
│   ├── devicon.css    # ícones das tecnologias (versão reduzida)
│   ├── navbar.css
│   ├── home.css       # hero e pilha Full-Stack em 3D
│   ├── about.css
│   ├── experience.css
│   ├── projects.css
│   ├── skills.css
│   ├── certificates.css # formação e certificados
│   ├── contact.css
│   ├── animation.css
│   └── responsive.css
│
├── js/
│   ├── modules/
│   │   ├── theme.js           # tema claro/escuro
│   │   ├── navbar.js          # menu mobile
│   │   ├── active-nav.js      # link ativo conforme a rolagem
│   │   ├── hero-3d.js         # arrastar e girar a cena 3D
│   │   ├── typed-role.js      # efeito de digitação
│   │   ├── skills.js          # dados e explorador das habilidades
│   │   ├── reveal.js          # animações de entrada
│   │   ├── project-filter.js  # filtros dos projetos
│   │   ├── certificates.js    # virar os cards no toque
│   │   ├── pointer-effects.js # inclinação dos cards e luz do cursor
│   │   └── contact.js         # copiar e-mail
│   └── script.js
│
├── index.html
├── .gitignore
└── README.md
```

---

## Como Visualizar Localmente

Para executar o projeto em sua máquina:

1. Clone este repositório:

```bash
git clone https://github.com/BeatrizChristine/PortifolioWeb.git
```

2. Acesse a pasta do projeto:

```bash
cd PortifolioWeb
```

3. Abra o arquivo `index.html` no navegador.

Também é possível utilizar a extensão Live Server no VS Code para visualizar o site com recarregamento automático.

---

## Contato

* GitHub: https://github.com/BeatrizChristine
* LinkedIn: https://www.linkedin.com/in/beatriz-christine-51b304269/
* E-mail: [beatrizchristineab@gmail.com](mailto:beatrizchristineab@gmail.com)

---

## Licença

Este projeto está sob a licença MIT.
Consulte o arquivo `LICENSE` para mais detalhes.
