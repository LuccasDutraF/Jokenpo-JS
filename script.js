// ===== Seletores (seu código) =====
const PointHuman = document.querySelector("#PointHuman");
const PointMachine = document.querySelector("#PointMachine");
const whowin = document.querySelector(".WhoWin");
const paperimgMachine = document.querySelector(".papertomove-Machine");
const rockimgMachine = document.querySelector(".rocktomove-Machine");
const scissorsimgMachine = document.querySelector(".scissorstomove-Machine");
const paperimgPlayer = document.querySelector(".papertomove-Player");
const rockimgPlayer = document.querySelector(".rocktomove-Player");
const scissorsimgPlayer = document.querySelector(".scissorstomove-Player");

let HumanScore = 0;
let OpponentScore = 0;

// ===== Firebase helpers vindos do index.html (seu setup) =====
const { doc, setDoc, onSnapshot } = window.firestoreHelpers;
const db = window.db;

// ===== Identificação do jogador =====
let playerId = Math.random().toString(36).substr(2, 5);

// ===== Sala (agora vem do input, não da URL) =====
let roomId = null;
let roomRef = null;
let unsubscribe = null;
let lastResolved = "";

// ===== Botão "Entrar" do HTML chama isto =====
window.setRoom = async function () {
  const input = document.getElementById("RoomInput");
  const chosen = (input?.value || "").trim();

  if (!chosen) {
    whowin.textContent = ("Digite o nome/código da sala.");
    return;
  }

  roomId = chosen;
  roomRef = doc(db, "rooms", roomId);

  // Mostra status imediatamente
  whowin.textContent = "Esperando oponente...";

  // Marca presença na sala
  try {
    await setDoc(roomRef, { [playerId]: null }, { merge: true });
  } catch (e) {
    console.error("Falha ao entrar na sala:", e);
    whowin.textContent = "Erro ao entrar na sala";
    return;
  }

  // Começa a escutar a sala (se trocar de sala, remove listener anterior)
  if (unsubscribe) unsubscribe();
  unsubscribe = listenRoom();
};

// ===== Jogada do jogador (exposta ao HTML) =====
async function HumanMove(move) {
  if (!roomRef) {
    whowin.textContent = ("Entre em uma sala primeiro!");
    return;
  }
  try {
    await setDoc(roomRef, { [playerId]: move }, { merge: true });
  } catch (e) {
    console.error("Falha ao enviar jogada:", e);
  }
}
window.HumanMove = HumanMove; // importante por causa do onclick no HTML

// ===== Escuta da sala (usada só depois de setRoom) =====
function listenRoom() {
  return onSnapshot(roomRef, async (snap) => {
    const data = snap.data();

    if (!data) {
      whowin.textContent = "Esperando oponente...";
      return;
    }

    // considere chaves simples como ids de players (seu modelo atual)
    const players = Object.keys(data).filter((k) => typeof data[k] !== "object");

    if (players.length < 2) {
      whowin.textContent = "Esperando oponente...";
      return;
    }

    const [p1, p2] = players;
    const move1 = data[p1];
    const move2 = data[p2];

    // precisa das duas jogadas
    if (!move1 || !move2) return;

    // evita processar mesma rodada repetidamente
    const roundKey = `${p1}:${move1}|${p2}:${move2}`;
    if (roundKey === lastResolved) return;
    lastResolved = roundKey;

    // sua lógica, mantendo a perspectiva do jogador local
    if (playerId === p1) {
      LetsPlay(move1, move2);
    } else {
      LetsPlay(move2, move1);
    }

    // limpa jogadas para próxima rodada
    try {
      await setDoc(roomRef, { [p1]: null, [p2]: null }, { merge: true });
      // prepara para próxima
      setTimeout(() => {
        lastResolved = "";
        whowin.textContent = "CHOOSE YOUR MOVE";
      }, 400);
    } catch (e) {
      console.error("Falha ao limpar rodada:", e);
    }
  });
}

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