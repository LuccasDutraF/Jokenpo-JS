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

let playerName = localStorage.getItem("playerName");
if (!playerName) {
  playerName = prompt("Digite seu nome:")?.trim() || "Player";
  localStorage.setItem("playerName", playerName);
}
PlayerName.textContent = playerName;

let HumanScore = 0;
let OpponentScore = 0;

// 🔹 Variáveis globais que só são definidas após Firebase carregar
let doc, setDoc, onSnapshot, updateDoc, db, roomRef, playerId, roomId;

// ====================
// FUNÇÕES DO JOGO
// ====================
async function joinRoom() {
  try {
    await setDoc(
      roomRef,
      {
        [`names.${playerId}`]: playerName,
        [`moves.${playerId}`]: null
      },
      { merge: true }
    );
    whowin.innerHTML = "Esperando oponente...";
  } catch (e) {
    console.error("Falha ao entrar na sala:", e);
    whowin.innerHTML = "Erro ao entrar na sala";
  }
}

async function HumanMove(move) {
  try {
    await setDoc(
      roomRef,
      { [`moves.${playerId}`]: move, updatedAt: Date.now() },
      { merge: true }
    );
  } catch (e) {
    console.error("Falha ao enviar jogada:", e);
  }
}
window.HumanMove = HumanMove;

let lastResolved = "";
function listenRoom() {
  onSnapshot(roomRef, async (snap) => {
    if (!snap.exists()) {
      whowin.innerHTML = "Esperando oponente...";
      return;
    }

    const data = snap.data();
    const names = data.names || {};
    PlayerName.textContent = names[playerId] || playerName || "Você";
    const players = Object.keys(names);
    const otherId = players.find((id) => id !== playerId);
    OpponentName.textContent = (otherId && names[otherId]) || "Oponente";

    if (!otherId) {
      whowin.innerHTML = "Esperando oponente...";
      return;
    }

    const moves = data.moves || {};
    const myMove = moves[playerId];
    const oppMove = moves[otherId];

    if (!myMove || !oppMove) return;

    const roundKey = `${myMove}|${oppMove}`;
    if (roundKey === lastResolved) return;
    lastResolved = roundKey;

    LetsPlay(myMove, oppMove);

    try {
      await updateDoc(roomRef, {
        [`moves.${playerId}`]: null,
        [`moves.${otherId}`]: null,
        updatedAt: Date.now(),
        names: data.names
      });
      setTimeout(() => {
        lastResolved = "";
        if (otherId) {
          whowin.innerHTML = "CHOOSE YOUR MOVE";
        } else {
          whowin.innerHTML = "Esperando oponente...";
        }
      }, 1200);
    } catch (e) {
      console.error("Falha ao limpar rodada:", e);
    }
  });
}

// ====================
// INICIALIZAÇÃO
// ====================
window.addEventListener("load", () => {
  // Pega os helpers do Firebase já expostos no index.html
  ({ doc, setDoc, onSnapshot, updateDoc } = window.firestoreHelpers);
  db = window.db;

  // Identificação
  playerId = Math.random().toString(36).substr(2, 5);
  roomId = new URLSearchParams(window.location.search).get("room") || "default";

  document.getElementById("RoomInfo").textContent = "Sala: " + roomId;
  roomRef = doc(db, "rooms", roomId);

  // Inicia multiplayer
  joinRoom();
  listenRoom();
});


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
