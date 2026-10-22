// Cada item usa um icone do Devicon (devicon) ou do sprite SVG da pagina (svg)
const SKILL_GROUPS = [
  {
    id: "linguagens",
    items: [
      { name: "Java", devicon: "devicon-java-plain colored", brand: "#f89820", note: "Back-end, Android e desktop" },
      { name: "Python", devicon: "devicon-python-plain colored", brand: "#3776ab", note: "Flask, FastAPI e automações" },
      { name: "C", devicon: "devicon-c-plain colored", brand: "#7f9cc9", note: "Fundamentos de computação" },
      { name: "JavaScript", devicon: "devicon-javascript-plain colored", brand: "#f0c419", note: "Interatividade na web" },
      { name: "TypeScript", devicon: "devicon-typescript-plain colored", brand: "#3178c6", note: "React e Next.js" },
      { name: "SQL", svg: "database", brand: "#d48ad1", note: "Consultas e modelagem" }
    ]
  },
  {
    id: "front-end",
    items: [
      { name: "HTML5", devicon: "devicon-html5-plain colored", brand: "#e34f26", note: "Estrutura semântica" },
      { name: "CSS3", devicon: "devicon-css3-plain colored", brand: "#1572b6", note: "Layouts e animações" },
      { name: "React", devicon: "devicon-react-original colored", brand: "#61dafb", note: "Interfaces em componentes" },
      { name: "Next.js", devicon: "devicon-nextjs-plain", mono: true, brand: "#b3a5b8", note: "Aplicações web no IDAM" },
      { name: "Tailwind CSS", devicon: "devicon-tailwindcss-original colored", brand: "#38bdf8", note: "Estilização utilitária" },
      { name: "Bootstrap", devicon: "devicon-bootstrap-plain colored", brand: "#7952b3", note: "Layouts responsivos" }
    ]
  },
  {
    id: "back-end",
    items: [
      { name: "Java 17", devicon: "devicon-java-plain colored", brand: "#f89820", note: "Base das APIs" },
      { name: "Spring Boot", devicon: "devicon-spring-plain colored", brand: "#6db33f", note: "APIs REST no IDAM" },
      { name: "Spring Security", devicon: "devicon-spring-plain colored", brand: "#6db33f", note: "Autenticação e acesso" },
      { name: "Flask", devicon: "devicon-flask-original", mono: true, brand: "#b3a5b8", note: "Conexis e WhatsApp Monitor" },
      { name: "FastAPI", devicon: "devicon-fastapi-plain colored", brand: "#05998b", note: "MonitoraDOE-AM" },
      { name: "APIs REST", svg: "server", brand: "#d48ad1", note: "Integração entre sistemas" }
    ]
  },
  {
    id: "banco-de-dados",
    items: [
      { name: "PostgreSQL", devicon: "devicon-postgresql-plain colored", brand: "#4169e1", note: "Sistemas institucionais" },
      { name: "MySQL", devicon: "devicon-mysql-plain colored", brand: "#4479a1", note: "Sistema de lanchonete" },
      { name: "SQLite", devicon: "devicon-sqlite-plain colored", brand: "#0f80cc", note: "Bancos locais" },
      { name: "Firebase", devicon: "devicon-firebase-plain colored", brand: "#ffca28", note: "Auth e dados nos apps" }
    ]
  },
  {
    id: "mobile-desktop",
    items: [
      { name: "Android Studio", devicon: "devicon-androidstudio-plain colored", brand: "#3ddc84", note: "Apps e jogos Android" },
      { name: "Java", devicon: "devicon-java-plain colored", brand: "#f89820", note: "Android e Swing" },
      { name: "XML", devicon: "devicon-xml-plain colored", brand: "#e37933", note: "Layouts Android" },
      { name: "JavaFX", devicon: "devicon-java-plain colored", brand: "#f89820", note: "Interfaces desktop" }
    ]
  },
  {
    id: "integracoes",
    items: [
      { name: "Evolution API", svg: "message", brand: "#25d366", note: "WhatsApp corporativo" },
      { name: "Webhooks", svg: "link", brand: "#c77dff", note: "Eventos entre sistemas" },
      { name: "Socket.IO", devicon: "devicon-socketio-original", mono: true, brand: "#b3a5b8", note: "Tempo real no Conexis" },
      { name: "JWT", svg: "key", brand: "#fb5b8b", note: "Tokens de acesso" },
      { name: "AD / LDAP", svg: "users", brand: "#3b9cff", note: "Login corporativo" }
    ]
  },
  {
    id: "dados-automacao",
    items: [
      { name: "Power BI", svg: "chart", brand: "#f2c811", note: "Dashboards e indicadores" },
      { name: "Excel", svg: "table", brand: "#21a366", note: "Planilhas e relatórios" },
      { name: "n8n", svg: "workflow", brand: "#ea4b71", note: "Automações e agentes de IA" },
      { name: "IA generativa", svg: "sparkles", brand: "#c77dff", note: "Código, estudo e novas ideias" }
    ]
  },
  {
    id: "ferramentas",
    items: [
      { name: "Git", devicon: "devicon-git-plain colored", brand: "#f05032", note: "Versionamento" },
      { name: "GitHub", devicon: "devicon-github-original", mono: true, brand: "#b3a5b8", note: "Repositórios" },
      { name: "VS Code", devicon: "devicon-vscode-plain colored", brand: "#007acc", note: "Editor do dia a dia" },
      { name: "Postman", devicon: "devicon-postman-plain colored", brand: "#ff6c37", note: "Testes de API" },
      { name: "Docker", devicon: "devicon-docker-plain colored", brand: "#2496ed", note: "Containers" },
      { name: "Linux", devicon: "devicon-linux-plain", mono: true, brand: "#fcc624", note: "Linha de comando" },
      { name: "Microsoft 365", svg: "grid", brand: "#ea580c", note: "Produtividade" }
    ]
  },
  {
    id: "suporte-ti",
    items: [
      { name: "Atendimento", svg: "headset", brand: "#d48ad1", note: "Orientação aos usuários" },
      { name: "Diagnóstico", svg: "search", brand: "#b1b2e4", note: "Identificar e resolver problemas" },
      { name: "Manutenção", svg: "tools", brand: "#f0a6c8", note: "Configuração de computadores" },
      { name: "Softwares", svg: "package", brand: "#c77dff", note: "Instalação e configuração" },
      { name: "Chamados", svg: "clipboard", brand: "#8f90d8", note: "Registro, prazos e respostas" },
      { name: "Documentação", svg: "file", brand: "#e58fb5", note: "Técnica e administrativa" }
    ]
  },
  {
    id: "comportamentais",
    items: [
      { name: "Proatividade", svg: "zap", brand: "#f2c811", note: "Antecipar e agir" },
      { name: "Comunicação", svg: "message", brand: "#d48ad1", note: "Clareza com usuários e equipe" },
      { name: "Organização", svg: "list", brand: "#8f90d8", note: "Prazos e demandas" },
      { name: "Trabalho em equipe", svg: "users", brand: "#3b9cff", note: "Colaboração" },
      { name: "Resolver problemas", svg: "puzzle", brand: "#3ddc84", note: "Foco na solução" },
      { name: "Adaptabilidade", svg: "refresh", brand: "#f58b4c", note: "Novos contextos" },
      { name: "Aprendizado", svg: "book", brand: "#c77dff", note: "Sempre estudando" },
      { name: "Inglês", svg: "globe", brand: "#60a5fa", note: "Intermediário, leitura técnica" }
    ]
  }
];

function initSkills() {
  const ide = document.querySelector(".skills-ide");

  if (!ide) return;

  const explorerList = ide.querySelector(".explorer-list");
  const tiles = ide.querySelector(".skill-tiles");
  const commandText = ide.querySelector(".ide-command-text");
  const countText = ide.querySelector(".ide-count");
  const autoplayDelay = 5000;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let activeIndex = 0;
  let autoplayTimer = null;
  let userInteracted = false;
  let isVisible = false;
  let isHovering = false;

  ide.style.setProperty("--autoplay-ms", `${autoplayDelay}ms`);

  const buttons = SKILL_GROUPS.map((group, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "explorer-item";
    button.setAttribute("role", "tab");
    button.innerHTML = `
      <svg class="icon"><use href="#i-folder"/></svg>
      <span>${group.id}/</span>
      <span class="explorer-count">${group.items.length}</span>
    `;

    button.addEventListener("click", () => {
      userInteracted = true;
      stopAutoplay();
      showGroup(index);
    });

    explorerList.appendChild(button);
    return button;
  });

  function renderIcon(item) {
    if (item.devicon) {
      return `<span class="tile-icon${item.mono ? " is-mono" : ""}"><i class="${item.devicon}"></i></span>`;
    }

    return `<span class="tile-icon"><svg class="icon"><use href="#i-${item.svg}"/></svg></span>`;
  }

  function showGroup(index) {
    const group = SKILL_GROUPS[index];

    activeIndex = index;

    buttons.forEach((button, buttonIndex) => {
      const isActive = buttonIndex === index;

      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });

    commandText.textContent = `ls ./${group.id}`;
    countText.textContent = `${group.items.length} itens`;

    tiles.innerHTML = group.items.map((item, itemIndex) => `
      <li class="skill-tile" style="--brand: ${item.brand}; --n: ${itemIndex}">
        ${renderIcon(item)}
        <span class="tile-name">${item.name}</span>
        <span class="tile-note">${item.note}</span>
      </li>
    `).join("");

    // Reinicia a barra de progresso da pasta ativa
    if (autoplayTimer !== null) {
      scheduleNext();
    }
  }

  function scheduleNext() {
    clearTimeout(autoplayTimer);
    autoplayTimer = setTimeout(() => {
      showGroup((activeIndex + 1) % SKILL_GROUPS.length);
    }, autoplayDelay);
  }

  function startAutoplay() {
    if (userInteracted || prefersReducedMotion || !isVisible || isHovering) return;

    ide.classList.add("is-autoplay");
    scheduleNext();
    restartProgressBar();
  }

  function stopAutoplay() {
    clearTimeout(autoplayTimer);
    autoplayTimer = null;
    ide.classList.remove("is-autoplay");
  }

  function restartProgressBar() {
    const activeButton = buttons[activeIndex];

    activeButton.classList.remove("is-active");
    void activeButton.offsetWidth;
    activeButton.classList.add("is-active");
  }

  // Troca as pastas sozinha so enquanto a secao esta visivel e sem o mouse em cima
  const observer = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting;

    if (isVisible) {
      startAutoplay();
    } else {
      stopAutoplay();
    }
  }, { threshold: 0.35 });

  observer.observe(ide);

  ide.addEventListener("pointerenter", () => {
    isHovering = true;
    stopAutoplay();
  });

  ide.addEventListener("pointerleave", () => {
    isHovering = false;
    startAutoplay();
  });

  showGroup(0);
}
