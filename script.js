const PointHuman = document.querySelector("#PointHuman");
const PointMachine = document.querySelector("#PointMachine");
const whowin = document.querySelector(".WhoWin");
const paperimgMachine = document.querySelector(".papertomove-Machine");
const rockimgMachine = document.querySelector(".rocktomove-Machine");
const scissorsimgMachine = document.querySelector(".scissorstomove-Machine");
const paperimgPlayer = document.querySelector(".papertomove-Player");
const rockimgPlayer = document.querySelector(".rocktomove-Player");
const scissorsimgPlayer = document.querySelector(".scissorstomove-Player");
const PlayerName = document.getElementById("PlayerName");
const OpponentName = document.getElementById("OpponentName");

// pergunta uma vez e guarda no navegador
let playerName = localStorage.getItem("playerName");
if (!playerName) {
  playerName = prompt("Digite seu nome:")?.trim() || "Player";
  localStorage.setItem("playerName", playerName);
}
// já mostra no placar local
PlayerName.textContent = playerName;

let HumanScore = 0;
let OpponentScore = 0;

// Firebase helpers vindos do index.html
const { doc, setDoc, onSnapshot } = window.firestoreHelpers;
const db = window.db;

// Identificação
let playerId = Math.random().toString(36).substr(2, 5);
let roomId = new URLSearchParams(window.location.search).get("room") || "sala1";

document.getElementById("RoomInfo").textContent = "Sala: " + roomId;

// ==== Presença na sala + status inicial
async function joinRoom() {
  try {
    await setDoc(
      doc(db, "rooms", roomId),
      { 
        [playerId]: null,
        [`names.${playerId}`]: playerName
       },
      { merge: true }
    );
    // Mostra status imediatamente ao entrar
    whowin.innerHTML = "Esperando oponente...";
  } catch (e) {
    console.error("Falha ao entrar na sala:", e);
    whowin.innerHTML = "Erro ao entrar na sala";
  }
}
joinRoom();

// ==== Jogada do jogador (exposta para o HTML)
async function HumanMove(move) {
  try {
    await setDoc(
      doc(db, "rooms", roomId),
      { [playerId]: move },
      { merge: true }
    );
  } catch (e) {
    console.error("Falha ao enviar jogada:", e);
  }
}
window.HumanMove = HumanMove; // importante por causa do onclick no HTML

// ==== Escuta da sala
let lastResolved = ""; // anti-duplicação de rodada
function listenRoom() {
  const roomRef = doc(db, "rooms", roomId);

  onSnapshot(roomRef, async (snap) => {
    const data = snap.data();

    if (!data) {
      // doc ainda não criado/sem dados
      whowin.innerHTML = "Esperando oponente...";
      return;
    }

    const names = data.names || {};
    PlayerName.textContent = names[playerId] || playerName || "Você";

    // só considere chaves que parecem ser players (ids aleatórios) = strings curtas
    const players = Object.keys(names)

    const otherId = players.find((id) => id !== playerId)
    
    if (otherId) {
  OpponentName.textContent = names[otherId] || "Oponente";
}

    if (players.length < 2) {
      whowin.innerHTML = "Esperando oponente...";
      return;
    }

    const [p1, p2] = players;
    const move1 = data[p1];
    const move2 = data[p2];

    // precisa das duas jogadas
    if (!move1 || !move2) return;

    // evita processar a mesma rodada repetidamente nos dois navegadores
    const roundKey = `${move1}|${move2}`;
    if (roundKey === lastResolved) return;
    lastResolved = roundKey;

    // chama sua lógica mantendo perspectiva do jogador local
    if (playerId === p1) {
      LetsPlay(move1, move2);
    } else {
      LetsPlay(move2, move1);
    }

    // limpa jogadas para próxima rodada
    try {
      await setDoc(
        roomRef,
        { [p1]: null, 
          [p2]: null,
          names:data.names
        },
        { merge: true }
      );
      // prepara chave para a próxima rodada
      setTimeout(() => {
        lastResolved = "";
        whowin.innerHTML = "CHOOSE YOUR MOVE";
      }, 400); // dá tempo das animações começarem
    } catch (e) {
      console.error("Falha ao limpar rodada:", e);
    }
  });
}
listenRoom();

// ==== SUA LÓGICA ORIGINAL (mantida) ====
const LetsPlay = (human, machine) => {

  /* IF HUMAN WINS */
  if (human === 'Paper' && machine === 'Rock') {
    HumanScore++;
    PointHuman.innerHTML = HumanScore;
    whowin.innerHTML = "Você ganhou";

    rockimgPlayer.style.display = 'none';
    paperimgPlayer.style.display = 'none';
    scissorsimgPlayer.style.display = 'none';
    rockimgMachine.style.display = 'none';
    paperimgMachine.style.display = 'none';
    scissorsimgMachine.style.display = 'none';

    const animationPaper = paperimgPlayer.animate(
      [{ transform: 'translateX(-250px)' }, { transform: 'translateX(0px)' }],
      { duration: 450, easing: 'ease-in-out', fill: 'forwards' }
    );

    const animationRock = rockimgMachine.animate(
      [{ transform: 'translateX(250px)' }, { transform: 'translateX(0px)' }],
      { duration: 450, easing: 'ease-in-out', fill: 'forwards' }
    );

    paperimgPlayer.style.display = 'flex';
    rockimgMachine.style.display = 'flex';
    animationPaper; animationRock;
  }
  else if (human === 'Rock' && machine === 'Scissors') {
    HumanScore++;
    PointHuman.innerHTML = HumanScore;
    whowin.innerHTML = "Você ganhou";

    rockimgPlayer.style.display = 'none';
    paperimgPlayer.style.display = 'none';
    scissorsimgPlayer.style.display = 'none';
    rockimgMachine.style.display = 'none';
    paperimgMachine.style.display = 'none';
    scissorsimgMachine.style.display = 'none';

    const animationScissor = rockimgPlayer.animate(
      [{ transform: 'translateX(-250px)' }, { transform: 'translateX(0px)' }],
      { duration: 450, easing: 'ease-in-out', fill: 'forwards' }
    );

    const animationRock = scissorsimgMachine.animate(
      [{ transform: 'translateX(250px)' }, { transform: 'translateX(0px)' }],
      { duration: 450, easing: 'ease-in-out', fill: 'forwards' }
    );

    rockimgPlayer.style.display = 'flex';
    scissorsimgMachine.style.display = 'flex';
    animationScissor; animationRock;
  }
  else if (human === 'Scissors' && machine === 'Paper') {
    HumanScore++;
    PointHuman.innerHTML = HumanScore;
    whowin.innerHTML = "Você ganhou";

    rockimgPlayer.style.display = 'none';
    paperimgPlayer.style.display = 'none';
    scissorsimgPlayer.style.display = 'none';
    rockimgMachine.style.display = 'none';
    paperimgMachine.style.display = 'none';
    scissorsimgMachine.style.display = 'none';

    const animationScissor = scissorsimgPlayer.animate(
      [{ transform: 'translateX(-250px)' }, { transform: 'translateX(0px)' }],
      { duration: 450, easing: 'ease-in-out', fill: 'forwards' }
    );

    const animationPaper = paperimgMachine.animate(
      [{ transform: 'translateX(250px)' }, { transform: 'translateX(0px)' }],
      { duration: 450, easing: 'ease-in-out', fill: 'forwards' }
    );

    scissorsimgPlayer.style.display = 'flex';
    paperimgMachine.style.display = 'flex';
    animationScissor; animationPaper;
  }

  /* IF OPPONENT WINS  (corrigido: antes usava MachineScore) */
  else if (human === 'Rock' && machine === 'Paper') {
    OpponentScore++;
    PointMachine.innerHTML = OpponentScore;
    whowin.innerHTML = "Oponente ganhou";

    rockimgPlayer.style.display = 'none';
    paperimgPlayer.style.display = 'none';
    scissorsimgPlayer.style.display = 'none';
    rockimgMachine.style.display = 'none';
    paperimgMachine.style.display = 'none';
    scissorsimgMachine.style.display = 'none';

    const animationPaper = rockimgPlayer.animate(
      [{ transform: 'translateX(-250px)' }, { transform: 'translateX(0px)' }],
      { duration: 450, easing: 'ease-in-out', fill: 'forwards' }
    );

    const animationRock = paperimgMachine.animate(
      [{ transform: 'translateX(250px)' }, { transform: 'translateX(0px)' }],
      { duration: 450, easing: 'ease-in-out', fill: 'forwards' }
    );

    rockimgPlayer.style.display = 'flex';
    paperimgMachine.style.display = 'flex';
    animationPaper; animationRock;
  }
  else if (human === 'Scissors' && machine === 'Rock') {
    OpponentScore++;
    PointMachine.innerHTML = OpponentScore;
    whowin.innerHTML = "Oponente ganhou";

    rockimgPlayer.style.display = 'none';
    paperimgPlayer.style.display = 'none';
    scissorsimgPlayer.style.display = 'none';
    rockimgMachine.style.display = 'none';
    paperimgMachine.style.display = 'none';
    scissorsimgMachine.style.display = 'none';

    const animationScissor = scissorsimgPlayer.animate(
      [{ transform: 'translateX(-250px)' }, { transform: 'translateX(0px)' }],
      { duration: 450, easing: 'ease-in-out', fill: 'forwards' }
    );

    const animationRock = rockimgMachine.animate(
      [{ transform: 'translateX(250px)' }, { transform: 'translateX(0px)' }],
      { duration: 450, easing: 'ease-in-out', fill: 'forwards' }
    );

    scissorsimgPlayer.style.display = 'flex';
    rockimgMachine.style.display = 'flex';
    animationScissor; animationRock;
  }
  else if (human === 'Paper' && machine === 'Scissors') {
    OpponentScore++;
    PointMachine.innerHTML = OpponentScore;
    whowin.innerHTML = "Oponente ganhou";

    rockimgPlayer.style.display = 'none';
    paperimgPlayer.style.display = 'none';
    scissorsimgPlayer.style.display = 'none';
    rockimgMachine.style.display = 'none';
    paperimgMachine.style.display = 'none';
    scissorsimgMachine.style.display = 'none';

    const animationPaper = paperimgPlayer.animate(
      [{ transform: 'translateX(-250px)' }, { transform: 'translateX(0px)' }],
      { duration: 450, easing: 'ease-in-out', fill: 'forwards' }
    );

    const animationScissor = scissorsimgMachine.animate(
      [{ transform: 'translateX(250px)' }, { transform: 'translateX(0px)' }],
      { duration: 450, easing: 'ease-in-out', fill: 'forwards' }
    );

    paperimgPlayer.style.display = 'flex';
    scissorsimgMachine.style.display = 'flex';
    animationPaper; animationScissor;
  }

  /* EMPATE */
  else if (human === 'Paper' && machine === 'Paper') {
    whowin.innerHTML = "Empatou";

    rockimgPlayer.style.display = 'none';
    paperimgPlayer.style.display = 'none';
    scissorsimgPlayer.style.display = 'none';
    rockimgMachine.style.display = 'none';
    paperimgMachine.style.display = 'none';
    scissorsimgMachine.style.display = 'none';

    const animationPaperPlayer = paperimgPlayer.animate(
      [{ transform: 'translateX(-250px)' }, { transform: 'translateX(0px)' }],
      { duration: 450, easing: 'ease-in-out', fill: 'forwards' }
    );

    const animationPaperMachine = paperimgMachine.animate(
      [{ transform: 'translateX(250px)' }, { transform: 'translateX(0px)' }],
      { duration: 450, easing: 'ease-in-out', fill: 'forwards' }
    );

    paperimgPlayer.style.display = 'flex';
    paperimgMachine.style.display = 'flex';
    animationPaperPlayer; animationPaperMachine;
  }
  else if (human === 'Rock' && machine === 'Rock') {
    whowin.innerHTML = "Empatou";

    rockimgPlayer.style.display = 'none';
    paperimgPlayer.style.display = 'none';
    scissorsimgPlayer.style.display = 'none';
    rockimgMachine.style.display = 'none';
    paperimgMachine.style.display = 'none';
    scissorsimgMachine.style.display = 'none';

    const animationRockPlayer = rockimgPlayer.animate(
      [{ transform: 'translateX(-250px)' }, { transform: 'translateX(0px)' }],
      { duration: 450, easing: 'ease-in-out', fill: 'forwards' }
    );

    const animationRockMachine = rockimgMachine.animate(
      [{ transform: 'translateX(250px)' }, { transform: 'translateX(0px)' }],
      { duration: 450, easing: 'ease-in-out', fill: 'forwards' }
    );

    rockimgPlayer.style.display = 'flex';
    rockimgMachine.style.display = 'flex';
    animationRockPlayer; animationRockMachine;
  }
  else if (human === 'Scissors' && machine === 'Scissors') {
    whowin.innerHTML = "Empatou";

    rockimgPlayer.style.display = 'none';
    paperimgPlayer.style.display = 'none';
    scissorsimgPlayer.style.display = 'none';
    rockimgMachine.style.display = 'none';
    paperimgMachine.style.display = 'none';
    scissorsimgMachine.style.display = 'none';

    const animationScissorPlayer = scissorsimgPlayer.animate(
      [{ transform: 'translateX(-250px)' }, { transform: 'translateX(0px)' }],
      { duration: 450, easing: 'ease-in-out', fill: 'forwards' }
    );

    const animationScissorMachine = scissorsimgMachine.animate(
      [{ transform: 'translateX(250px)' }, { transform: 'translateX(0px)' }],
      { duration: 450, easing: 'ease-in-out', fill: 'forwards' }
    );

    scissorsimgPlayer.style.display = 'flex';
    scissorsimgMachine.style.display = 'flex';
    animationScissorPlayer; animationScissorMachine;
  }
};
