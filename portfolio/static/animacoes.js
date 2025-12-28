// Minimizar / Maximizar por botão (recebe o botão clicado)
function minimizarBox(btn) {
  if(!btn) return; // Se não houver botão, sai da função

  // Tenta encontrar a box mais próxima do botão clicado
  let el = btn.closest('.projetos-container'); // Primeiro procura se está dentro de uma box de projetos
  if(!el) el = btn.closest('.sobre-container'); // Senão, procura se está dentro de uma box "sobre"
  if(!el) el = btn.closest('.square-box'); // Senão, procura se está dentro de qualquer square-box genérica
  if(!el) return; // Se não encontrou nenhum container válido, sai da função

  // Se for a box container "sobre-container", esconde as boxes internas mas mantém o header visível
  if(el.classList.contains('sobre-container')) {
    el.classList.add('hide-inner-boxes'); // Adiciona classe que oculta conteúdo interno
  } else {
    el.classList.add('minimized'); // Adiciona classe "minimized" para esconder a box
    // Garantir que box "Sobre mim" mantém largura sempre ao minimizar
    if(el.classList.contains('sobre-mim-box')) {
      // Força a largura para garantir que seja sempre a mesma
      el.style.width = 'min(900px, 95%)'; 
      el.style.minWidth = 'min(900px, 95%)';
      el.style.maxWidth = '95%';
      el.style.flexShrink = '0'; // Impede que a box encolha ao minimizar
    }
  }

  btn.textContent = '+'; // Altera o texto do botão para "+"
  btn.setAttribute('aria-label', 'Expandir'); // Atualiza atributo de acessibilidade
  // Redefine o evento onclick para que, ao clicar, a box seja maximizada
  btn.onclick = function(e){ 
    if(e) e.stopPropagation(); // Impede que o clique se propague para elementos pai
    maximizarBox(btn); // Chama função para maximizar a box
  };
}

// Função para maximizar box (reverso da minimizar)
function maximizarBox(btn) {
  if(!btn) return; // Se não houver botão, sai da função

  // Tenta encontrar a box mais próxima do botão clicado
  let el = btn.closest('.projetos-container');
  if(!el) el = btn.closest('.sobre-container');
  if(!el) el = btn.closest('.square-box');
  if(!el) return; // Se não encontrou nenhum container válido, sai da função

  // Se for a box container "sobre-container", mostra as boxes internas novamente
  if(el.classList.contains('sobre-container')) {
    el.classList.remove('hide-inner-boxes'); // Remove classe que ocultava conteúdo
  } else {
    el.classList.remove('minimized'); // Remove classe que minimizava a box
  }

  btn.textContent = '−'; // Altera o texto do botão para "−"
  btn.setAttribute('aria-label', 'Minimizar'); // Atualiza atributo de acessibilidade
  // Redefine o evento onclick para que, ao clicar, a box seja minimizada novamente
  btn.onclick = function(e){ 
    if(e) e.stopPropagation(); // Impede que o clique se propague para elementos pai
    minimizarBox(btn); // Chama função para minimizar a box
  };
}

// Função para fechar box completamente
function fecharBox(btn) {
  if(!btn) return; // Se não houver botão, sai da função

  let el = btn.closest('.square-box'); // Encontra a box mais próxima do botão clicado
  if(!el) return; // Se não encontrar, sai da função

  el.style.display = 'none'; // Oculta a box completamente
}

// Alternar fullscreen da box
function toggleFullscreen(btn, event) {
  if(event) {
    event.preventDefault(); // Evita comportamento padrão do botão (ex: submit)
    event.stopPropagation(); // Impede que o clique se propague para elementos pai
  }
  if(!btn) return; // Se não houver botão, sai da função
  let el = btn.closest('.square-box'); // Encontra a box mais próxima do botão
  if(!el) return; // Se não encontrar, sai da função

  // Verifica se a box já está em fullscreen
  const isFullscreen = el.classList.contains('fullscreen');

  if(isFullscreen) {
    // Remove fullscreen
    el.classList.remove('fullscreen');
    
    // Restaura estilos originais salvos antes de entrar em fullscreen
    const savedStyles = el.getAttribute('data-saved-styles'); // Recupera estilos salvos
    if(savedStyles) {
      try {
        const styles = JSON.parse(savedStyles); // Converte string JSON para objeto
        // Restaura cada propriedade salva
        Object.keys(styles).forEach(function(key) {
          el.style[key] = styles[key]; // Aplica cada estilo salvo
        });
        el.removeAttribute('data-saved-styles'); // Remove atributo após restaurar
      } catch(e) {
        // Se houver erro ao restaurar, apenas limpa estilos do fullscreen
        el.style.width = ''; // Limpa largura do fullscreen
        el.style.height = ''; // Limpa altura do fullscreen
        el.style.maxWidth = ''; // Limpa max-width do fullscreen
        el.style.maxHeight = ''; // Limpa max-height do fullscreen
        el.style.top = ''; // Limpa posição top do fullscreen
        el.style.left = ''; // Limpa posição left do fullscreen
        el.style.right = ''; // Limpa posição right do fullscreen
        el.style.bottom = ''; // Limpa posição bottom do fullscreen
        el.style.margin = ''; // Limpa margens do fullscreen
      }
    } else {
      // Se não houver estilos salvos, limpa apenas propriedades do fullscreen
      el.style.width = ''; // Limpa largura do fullscreen
      el.style.height = ''; // Limpa altura do fullscreen
      el.style.maxWidth = ''; // Limpa max-width do fullscreen
      el.style.maxHeight = ''; // Limpa max-height do fullscreen
      el.style.top = ''; // Limpa posição top do fullscreen
      el.style.left = ''; // Limpa posição left do fullscreen
      el.style.right = ''; // Limpa posição right do fullscreen
      el.style.bottom = ''; // Limpa posição bottom do fullscreen
      el.style.margin = ''; // Limpa margens do fullscreen
    }
    
    btn.textContent = '□'; // Altera o ícone do botão para "Fullscreen"
    btn.setAttribute('aria-label', 'Fullscreen'); // Atualiza acessibilidade
  } else {
    // Salva estilos atuais antes de entrar em fullscreen
    const currentStyles = {
      width: el.style.width || '', // Salva largura atual ou string vazia
      height: el.style.height || '', // Salva altura atual ou string vazia
      minWidth: el.style.minWidth || '', // Salva min-width atual ou string vazia
      maxWidth: el.style.maxWidth || '', // Salva max-width atual ou string vazia
      minHeight: el.style.minHeight || '', // Salva min-height atual ou string vazia
      maxHeight: el.style.maxHeight || '', // Salva max-height atual ou string vazia
      top: el.style.top || '', // Salva posição top atual ou string vazia
      left: el.style.left || '', // Salva posição left atual ou string vazia
      right: el.style.right || '', // Salva posição right atual ou string vazia
      bottom: el.style.bottom || '', // Salva posição bottom atual ou string vazia
      margin: el.style.margin || '', // Salva margens atuais ou string vazia
      position: el.style.position || '', // Salva posição atual ou string vazia
      zIndex: el.style.zIndex || '' // Salva z-index atual ou string vazia
    };
    el.setAttribute('data-saved-styles', JSON.stringify(currentStyles)); // Salva estilos como JSON
    
    // Adiciona fullscreen
    el.classList.add('fullscreen');
    btn.textContent = '❐'; // Altera o ícone do botão para "Restaurar"
    btn.setAttribute('aria-label', 'Restaurar'); // Atualiza acessibilidade
  }
}

// Variáveis globais para controlar z-index e posicionamento
let maxZIndex = 10000; // Inicializa contador de z-index crescente

// Garante que a box esteja em posição "fixed" antes de arrastar
  function ensureFixedPosition(el){
  const cs = getComputedStyle(el); // Pega os estilos atuais da box
  if(cs.position !== 'fixed'){ // Se não estiver "fixed"
    const rect = el.getBoundingClientRect(); // Pega posição atual da box na tela
    el.style.position = 'fixed'; // Define posição como fixa
    el.style.left = rect.left + 'px'; // Mantém posição horizontal
    el.style.top = rect.top + 'px'; // Mantém posição vertical
    el.style.right = 'auto'; // Remove qualquer valor de right
    el.style.bottom = 'auto'; // Remove qualquer valor de bottom
    el.style.margin = '0'; // Remove margens para evitar deslocamento
    }
  }

// Traz a box para frente (z-index maior)
function bringToFront(el){
  maxZIndex += 1; // Incrementa o z-index global
  el.style.zIndex = maxZIndex.toString(); // Aplica z-index à box
}

// Drag (mouse + touch) para múltiplas .square-box (função autoexecutável)
(function(){
  let active = null; // Box atualmente sendo arrastada
  let startX = 0, startY = 0; // Posição inicial do cursor/toque
  let origLeft = 0, origTop = 0; // Posição original da box
  let mouseDown = false; // Flag para saber se botão do mouse está pressionado

  // Função chamada quando inicia o arraste (mousedown / touchstart)
  function onDown(el, x, y){
    // Guarda a posição do scroll antes de mudar para fixed
    const scrollY = window.scrollY || window.pageYOffset;
    const scrollX = window.scrollX || window.pageXOffset;

    ensureFixedPosition(el); // Garante que a box está "fixed"
    bringToFront(el); // Traz a box para frente
    
    // Remove transform de centralização se existir (para boxes modais)
    if(el.classList.contains('pitch-modal-box')) {
      // Pega a posição atual antes de remover o transform
      const currentRect = el.getBoundingClientRect();
      const centerX = currentRect.left + currentRect.width / 2;
      const centerY = currentRect.top + currentRect.height / 2;
      
      // Remove o transform e ajusta a posição
      el.style.transform = 'none';
      el.style.left = centerX - (el.offsetWidth / 2) + 'px';
      el.style.top = centerY - (el.offsetHeight / 2) + 'px';
    }
    
    active = el; // Marca a box como ativa
    startX = x; // Armazena posição X do clique/toque
    startY = y; // Armazena posição Y do clique/toque
    const rect = el.getBoundingClientRect(); // Pega posição atual da box
    origLeft = rect.left; // Guarda posição horizontal original
    origTop = rect.top; // Guarda posição vertical original
    el.classList.add('dragging'); // Adiciona classe para estilo de arraste
    el.classList.remove('released'); // Remove classe de transição de soltura
    document.body.style.userSelect = 'none'; // Desativa seleção de texto durante arraste

    // Previne scroll após mudança de posição (importante para box Pitch)
    requestAnimationFrame(() => {
      window.scrollTo(scrollX, scrollY); // Mantém a posição do scroll
    });
  }
// Adiciona listener para qualquer clique em uma box para trazê-la para frente
document.addEventListener('click', function(e){
  const box = e.target.closest('.square-box'); // Encontra a box mais próxima do clique
  // Se encontrar uma box e ela não estiver dentro de containers especiais
  if(box && !box.closest('.projetos-container, .sobre-container')) {
    bringToFront(box); // Traz a box para frente
  }
}, true); // Use capture phase para garantir que ocorra antes de outros listeners

// Função chamada quando o mouse ou toque se move
  function onMove(x, y){
  if(!active) return; // Se não houver box ativa, sai
  const dx = x - startX; // Calcula deslocamento horizontal desde o início do drag
  const dy = y - startY; // Calcula deslocamento vertical
  const scrollY = window.scrollY || window.pageYOffset; // Posição do scroll vertical
  const scrollX = window.scrollX || window.pageXOffset; // Posição do scroll horizontal
  let nx = origLeft + dx; // Nova posição horizontal desejada
  let ny = origTop + dy; // Nova posição vertical desejada
  const pad = 8; // Padding mínimo da borda da tela
  const vw = window.innerWidth; // Largura da viewport
  const vh = window.innerHeight; // Altura da viewport
  // Limita nx e ny para que a box não saia da tela
    nx = Math.max(pad, Math.min(nx, vw - active.offsetWidth - pad));
    ny = Math.max(pad, Math.min(ny, vh - active.offsetHeight - pad));
  // Aplica novas posições à box
    active.style.left = nx + 'px';
    active.style.top = ny + 'px';
  }

// Função chamada quando o drag termina (mouseup / touchend)
  function onUp(){
  if(!active) return; // Se não houver box ativa, sai
  active.classList.remove('dragging'); // Remove classe de arraste
  active.classList.add('released'); // Adiciona classe para transição suave de soltura
  document.body.style.userSelect = ''; // Restaura seleção de texto
    setTimeout(()=> {
    if(active) active.classList.remove('released'); // Remove classe released após 400ms
    active = null; // Limpa box ativa
    }, 400);
  mouseDown = false; // Reset da flag de mouse pressionado
}

// Listener para início de arraste com mouse
document.addEventListener('mousedown', function(e){
  if(e.button !== 0) return; // Somente botão esquerdo do mouse
  mouseDown = true; // Marca mouse como pressionado

  // Não arrasta se clicar nos botões da box
  if(e.target.closest('.box-toggle, .toggle-inner, .box-fullscreen, .box-close')) {
    mouseDown = false;
    return;
  }

  // Verifica se o clique foi em um container (prioridade para containers)
  let container = e.target.closest('.projetos-container, .sobre-container');
  if(container) {
    // Não arrasta se clicar em box interna
    if(e.target.closest('.projetos-inner-box, .eu-box, .sobre-mim-box')) {
      const innerBox = e.target.closest('.square-box'); // Pega a box interna
      if(innerBox) {
        e.preventDefault(); // Prevê comportamento padrão
        onDown(innerBox, e.clientX, e.clientY); // Inicia arraste da box interna
        return;
      }
      return;
    }

    // Permite arrastar o container se clicar no header ou em conteúdo vazio
    const header = container.querySelector('> .box-header');
    if((header && header.contains(e.target)) || 
       e.target.closest('.projetos-content, .sobre-content') || 
       container.classList.contains('hide-inner-boxes') ||
       e.target === container) {
      e.preventDefault();
      onDown(container, e.clientX, e.clientY); // Inicia arraste do container
      return;
    }
  }

  // Verifica se é uma square-box normal (fora de containers)
  let el = e.target.closest('.square-box');
  if(el && !el.closest('.projetos-container, .sobre-container')) {
    // Não arrasta se clicar nos botões, mas traz para frente
    if(e.target.closest('.box-toggle, .box-fullscreen, .box-close')) {
      maxZIndex += 1;
      el.style.zIndex = maxZIndex.toString();
      mouseDown = false;
      return;
    }

    // Não arrasta se clicar no menu bar, mas traz para frente
    if(e.target.closest('.box-menu-bar')) {
      maxZIndex += 1;
      el.style.zIndex = maxZIndex.toString();
      mouseDown = false;
      return;
    }

    // Não arrasta se estiver em fullscreen, mas traz para frente
    if(el.classList.contains('fullscreen')) {
      maxZIndex += 1;
      el.style.zIndex = maxZIndex.toString();
    mouseDown = false;
      return;
  }

    // Se clicar no vídeo, não arrasta, mas previne scroll e traz para frente
    if(e.target.tagName === 'VIDEO' || e.target.tagName === 'SOURCE' || e.target.closest('video')) {
      maxZIndex += 1;
      el.style.zIndex = maxZIndex.toString();
    e.preventDefault();
      e.stopPropagation();
      mouseDown = false;
      return;
    }

    e.preventDefault(); // Prevê comportamento padrão
    onDown(el, e.clientX, e.clientY); // Inicia arraste da box
  }
  });

  document.addEventListener('mousemove', function(e){
    // Apenas move se o botão esquerdo estiver pressionado
    if(!mouseDown) return;
    onMove(e.clientX, e.clientY);
  });

  document.addEventListener('mouseup', function(){
    onUp();
  });

  // Touch (delegado)
  document.addEventListener('touchstart', function(e){
    // Não arrasta se clicar nos botões
    if(e.target.closest('.box-toggle, .toggle-inner')) {
      return;
    }
    
    // Verifica primeiro se é um container (prioridade para containers)
    let container = e.target.closest('.projetos-container, .sobre-container');
    if(container) {
      // Não arrasta se clicar em uma box interna
      if(e.target.closest('.projetos-inner-box, .eu-box, .sobre-mim-box')) {
        // Mas permite arrastar a box interna
        const innerBox = e.target.closest('.square-box');
        if(innerBox) {
          const t = e.touches[0];
          onDown(innerBox, t.clientX, t.clientY);
          return;
        }
        return;
      }
      // Permite arrastar o container se clicar no header ou no conteúdo vazio
      const header = container.querySelector('> .box-header');
      if((header && header.contains(e.target)) || 
         e.target.closest('.projetos-content, .sobre-content') || 
         container.classList.contains('hide-inner-boxes') ||
         e.target === container) {
    const t = e.touches[0];
        onDown(container, t.clientX, t.clientY);
        return;
      }
    }
    
    // Verifica se é uma square-box normal (fora de containers)
    let el = e.target.closest('.square-box'); // Procura a box mais próxima do elemento tocado
    if(el && !el.closest('.projetos-container, .sobre-container')) { // Garante que não esteja dentro de um container
      // Não arrasta se clicar nos botões, mas traz para frente
      if(e.target.closest('.box-toggle, .box-fullscreen, .box-close')) {
        maxZIndex += 1; // Incrementa z-index global para trazer box para frente
        el.style.zIndex = maxZIndex.toString(); // Atualiza o estilo z-index da box
        return; // Atualiza o estilo z-index da box
      }
      const t = e.touches[0]; // Pega a posição do primeiro toque
      onDown(el, t.clientX, t.clientY); // Inicia drag da box na posição do toque
    }
  }, {passive:false}); // passive:false permite chamar preventDefault() nos eventos

  document.addEventListener('touchmove', function(e){
    if(!active) return; // Se não houver box ativa, sai
    const t = e.touches[0]; // Pega a posição do primeiro toque
    onMove(t.clientX, t.clientY); // Move a box para a posição do toque
    e.preventDefault(); // Previne comportamento padrão do navegador
  }, {passive:false}); // passive:false permite chamar preventDefault() nos eventos

  document.addEventListener('touchend', function(){ // Listener para finalização de arraste (touchend)
    onUp(); // Finaliza o arraste
  });
})();

// Scroll para box "Sobre Mim" ao clicar no botão e mostrar se estiver fechada
function toggleSidebarContent(button) {
    const sidebarDiv = button.closest('.sidebar-top, .sidebar-middle, .sidebar-bottom'); // Encontra o container da sidebar mais próximo do botão clicado
    if (sidebarDiv) {
        sidebarDiv.classList.toggle('collapsed'); // Alterna a classe collapsed para mostrar/esconder o conteúdo da sidebar
        button.textContent = sidebarDiv.classList.contains('collapsed') ? '+' : '−'; // Alterna o texto do botão para + ou -
    }
}

function scrollToSobreMim(event) {
    event.preventDefault(); // Previne comportamento padrão do navegador
    const sobreMimBox = document.querySelector('.sobre-mim-box'); // Encontra a box "Sobre Mim"
    if (sobreMimBox) {
        sobreMimBox.classList.add('visible'); // Adiciona a classe visible para mostrar a box
        sobreMimBox.style.display = 'flex'; // Mostra a box
        ensureFixedPosition(sobreMimBox); // Garante que a box está "fixed"
        const vw = window.innerWidth; // Largura da viewport
        const vh = window.innerHeight; // Altura da viewport
        const boxWidth = sobreMimBox.offsetWidth || 360; // Largura da box ou padrão 360px
        const boxHeight = sobreMimBox.offsetHeight || 360; // Altura da box ou padrão 360px
        sobreMimBox.style.left = ((vw - boxWidth) / 2) + 'px'; // Centraliza horizontalmente
        sobreMimBox.style.top = ((vh - boxHeight) / 2) + 'px'; // Centraliza verticalmente
        bringToFront(sobreMimBox); // Traz a box para frente
        sobreMimBox.classList.remove('minimized'); // Remove a classe minimized se estiver minimizada
        const toggleBtn = sobreMimBox.querySelector('.box-toggle'); // Busca o botão de minimizar
        if (toggleBtn) {
            toggleBtn.textContent = '−'; // Altera o texto do botão para -
            toggleBtn.setAttribute('aria-label', 'Minimizar');
        }
        setTimeout(() => {
            sobreMimBox.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Scroll para a box "Sobre Mim"
        }, 100);
    }
}

function scrollToProjetos(event) {
    event.preventDefault();
    const projetosBox = document.querySelector('.projetos-box'); // Encontra a box "Projetos"
    if (projetosBox) {
        projetosBox.classList.add('visible'); // Adiciona a classe visible para mostrar a box
        projetosBox.style.display = 'flex';
        ensureFixedPosition(projetosBox); // Garante que a box está "fixed"
        const vw = window.innerWidth; // Largura da viewport
        const vh = window.innerHeight; // Altura da viewport
        const boxWidth = projetosBox.offsetWidth || 360; // Largura da box
        const boxHeight = projetosBox.offsetHeight || 360; // Altura da box
        projetosBox.style.left = ((vw - boxWidth) / 2) + 'px';
        projetosBox.style.top = ((vh - boxHeight) / 2) + 'px';
        bringToFront(projetosBox); // Traz a box para frente
        projetosBox.classList.remove('minimized');
        const toggleBtn = projetosBox.querySelector('.box-toggle');
        if (toggleBtn) {
            toggleBtn.textContent = '−'; // Altera o texto do botão para -
            toggleBtn.setAttribute('aria-label', 'Minimizar');
        }
        setTimeout(() => {
            projetosBox.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Scroll para a box "Projetos"
        }, 100);
    }
}

function scrollToCurriculo(event) {
    event.preventDefault(); // Previne comportamento padrão do navegador
    const curriculoBox = document.querySelector('.curriculo-box');
    if (curriculoBox) {
        curriculoBox.classList.add('visible'); // Adiciona a classe visible para mostrar a box
        curriculoBox.style.display = 'flex';
        ensureFixedPosition(curriculoBox); // Garante que a box está "fixed"  
        const vw = window.innerWidth; // Largura da viewport
        const vh = window.innerHeight; // Altura da viewport
        const boxWidth = curriculoBox.offsetWidth || 360; // Largura da box
        const boxHeight = curriculoBox.offsetHeight || 360; // Altura da box
        curriculoBox.style.left = ((vw - boxWidth) / 2) + 'px';
        curriculoBox.style.top = ((vh - boxHeight) / 2) + 'px';
        bringToFront(curriculoBox); // Traz a box para frente
        curriculoBox.classList.remove('minimized');
        const toggleBtn = curriculoBox.querySelector('.box-toggle'); // Encontra o botão de toggle da box
        if (toggleBtn) {
            toggleBtn.textContent = '−'; // Altera o texto do botão para -
            toggleBtn.setAttribute('aria-label', 'Minimizar');
        }
        setTimeout(() => {
            curriculoBox.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Scroll para a box "Currículo"
        }, 100);
    }
}

function scrollToContato(event) {
    event.preventDefault(); // Previne comportamento padrão do navegador
    const contatoBox = document.querySelector('.contato-box');
    if (contatoBox) {
        contatoBox.classList.add('visible'); // Adiciona a classe visible para mostrar a box
        contatoBox.style.display = 'flex';
        ensureFixedPosition(contatoBox); // Garante que a box está "fixed"
        const vw = window.innerWidth; // Largura da viewport
        const vh = window.innerHeight; // Altura da viewport    
        const boxWidth = contatoBox.offsetWidth || 360; // Largura da box
        const boxHeight = contatoBox.offsetHeight || 360; // Altura da box
        contatoBox.style.left = ((vw - boxWidth) / 2) + 'px';
        contatoBox.style.top = ((vh - boxHeight) / 2) + 'px';
        bringToFront(contatoBox); // Traz a box para frente
        contatoBox.classList.remove('minimized');
        const toggleBtn = contatoBox.querySelector('.box-toggle'); // Encontra o botão de toggle da box
        if (toggleBtn) {
            toggleBtn.textContent = '−'; // Altera o texto do botão para -
            toggleBtn.setAttribute('aria-label', 'Minimizar');
        }
        setTimeout(() => {
            contatoBox.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Scroll para a box "Contato"
        }, 100);
    }
}

// Função para abrir a box preta do Pitch
function abrirBoxPitch() {
    const pitchBox = document.getElementById('pitch-box');
    if (pitchBox) {
        pitchBox.style.display = 'flex'; // Mostra a box
        ensureFixedPosition(pitchBox); // Garante posição fixed
        
        // Centraliza a box na tela independentemente de outras boxes
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const boxWidth = pitchBox.offsetWidth || 600;
        const boxHeight = pitchBox.offsetHeight || 650;
        pitchBox.style.left = ((vw - boxWidth) / 2) + 'px';
        pitchBox.style.top = ((vh - boxHeight) / 2) + 'px';
        pitchBox.style.transform = 'none'; // Remove transform de centralização
        
        bringToFront(pitchBox); // Traz para frente
        pitchBox.classList.remove('minimized'); // Remove minimized se estiver
        const toggleBtn = pitchBox.querySelector('.box-toggle');
        if (toggleBtn) {
            toggleBtn.textContent = '−';
            toggleBtn.setAttribute('aria-label', 'Minimizar');
        }
    }
}

// Função para fechar a box preta do Pitch
function fecharBoxPitch() {
    const pitchBox = document.getElementById('pitch-box');
    if (pitchBox) {
        pitchBox.style.display = 'none'; // Esconde a box
    }
}