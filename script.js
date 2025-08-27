let fogosAtivos = false;
let canvas, ctx, particulas = [];

// script.js

// Função para criar elementos aleatórios
function createElement() {
    const container = document.getElementById('container');
    
    // Escolher aleatoriamente entre coração e girassol
    const isHeart = Math.random() > 0.5; // 50% chance para cada um
    const element = document.createElement('span');
    element.classList.add(isHeart ? 'heart' : 'sunflower');
    element.textContent = isHeart ? '💖' : '🌻'; // Coração ou Girassol

    // Definir posição aleatória horizontal
    const randomX = Math.random() * 100; // Aleatório entre 0% e 100% da largura
    const randomDelay = Math.random() * 2; // Aleatório para um atraso de animação

    element.style.left = `${randomX}%`;
    element.style.animationDelay = `${randomDelay}s`; // Atraso aleatório

    // Adicionar ao container
    container.appendChild(element);

    // Remover o elemento após a animação
    setTimeout(() => {
        element.remove();
    }, 5000); // Remover após 5 segundos (duração da animação)
}

// Criar corações e girassóis a cada 300ms
setInterval(createElement, 300);


function tocarMusica() {
  const musica = document.getElementById("musica");
  musica.play();
  document.getElementById("botaoMusica").style.display = "none";
}

function finalSurpresa() {
  const som = document.getElementById("somBotao");
  som.play();
  document.getElementById("telaEsmaecida").style.display = "block";
  const mensagem = document.getElementById("mensagemFinal");
  mensagem.style.display = "block";

  setTimeout(() => {
    mensagem.style.transform = "scale(1)";
    mensagem.style.opacity = 1;
  }, 100);

  soltarFogos();
}

function soltarFogos() {
  if (!fogosAtivos) {
    fogosAtivos = true;
    canvas = document.getElementById("fogosCanvas");
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    loopFogos();
  }
}

class Particula {
  constructor(x, y, cor) {
    this.x = x;
    this.y = y;
    this.radius = 2 + Math.random() * 2;
    this.color = cor;
    this.velX = (Math.random() - 0.5) * 6;
    this.velY = (Math.random() - 0.5) * 6;
    this.life = 100;
  }
  update() {
    this.x += this.velX;
    this.y += this.velY;
    this.velY += 0.05;
    this.life--;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function criarFogos() {
  const cores = ["#ffeb3b", "#ff4081", "#00e676", "#2196f3"];
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height / 2;
  for (let i = 0; i < 50; i++) {
    particulas.push(new Particula(x, y, cores[Math.floor(Math.random() * cores.length)]));
  }
}

function loopFogos() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particulas.forEach((p, i) => {
    p.update();
    p.draw();
    if (p.life <= 0) particulas.splice(i, 1);
  });
  if (Math.random() < 0.05) criarFogos();
  requestAnimationFrame(loopFogos);
}

