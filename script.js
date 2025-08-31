let fogosAtivos = false;
let canvas, ctx, particulas = [];

function tocarMusica() {
  const musica = document.getElementById('musica');
  const overlay = document.getElementById('overlay');

  // Toca a música
  musica.play();

  // Esconde o overlay
  overlay.style.display = 'none';
}

const emojis = ["❤️", "🌻", "🎊"];
const tela = document.body;

function criarEmoji() {
  const emoji = document.createElement("div");
  emoji.classList.add("emoji");

  // Emoji aleatório
  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];

  // Posição horizontal aleatória (0% a 100%)
  emoji.style.left = Math.random() * 100 + "%";

  // Tamanhos e durações diferentes
  const tamanho = 20 + Math.random() * 30; // entre 20px e 50px
  const duracao = 5 + Math.random() * 5;   // entre 5s e 10s
  emoji.style.fontSize = `${tamanho}px`;
  emoji.style.animationDuration = `${duracao}s`;

  // Adiciona na tela
  tela.appendChild(emoji);

  // Remove depois que termina a animação
  setTimeout(() => {
    tela.removeChild(emoji);
  }, duracao * 1000);
}

// Cria novos emojis a cada 1 segundo
setInterval(criarEmoji, 800);

function mensagemFinal() {
    // Mudando o texto do botão para uma seta
    const botao = document.getElementById("botaofinal");
    botao.textContent = "⬇️";  // Coloca a seta para baixo
    const som = document.getElementById("somBotao");
  som.play();
    document.getElementById("telaEsmaecida").style.display = "block";
    const mensagem = document.getElementById("mensagemFinal");
    mensagem.style.display = "block";
  // Agora aplica a transição
  mensagem.style.transform = "scale(1)";
  mensagem.style.opacity = "1";


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
