const PointHuman = document.querySelector("#PointHuman")
const PointMachine = document.querySelector("#PointMachine")
const whowin = document.querySelector (".WhoWin")
const paperimgMachine = document.querySelector(".papertomove-Machine")
const rockimgMachine = document.querySelector(".rocktomove-Machine")
const scissorsimgMachine = document.querySelector(".scissorstomove-Machine")
const paperimgPlayer = document.querySelector(".papertomove-Player")
const rockimgPlayer = document.querySelector(".rocktomove-Player")
const scissorsimgPlayer = document.querySelector(".scissorstomove-Player")

let HumanScore = 0
let MachineScore = 0


const HumanMove = (Humanchoice) => {
    LetsPlay(Humanchoice, MachineMove())
}

const MachineMove = () => {
    const moves = ['Rock', 'Paper', 'Scissors']
    const choiceMachine = Math.floor(Math.random() * 3)

    return moves[choiceMachine]
}


const LetsPlay = (human, machine) => {

                 /* IF HUMAN WINS */

    if (
        human === 'Paper' && machine === 'Rock') {
        HumanScore++
        PointHuman.innerHTML = HumanScore
        whowin.innerHTML = "Você ganhou"

        rockimgPlayer.style.display = 'none'
        paperimgPlayer.style.display = 'none'
        scissorsimgPlayer.style.display = 'none'
        rockimgMachine.style.display = 'none'
        paperimgMachine.style.display = 'none'
        scissorsimgMachine.style.display = 'none'

        const animationPaper = paperimgPlayer.animate([
            { transform: 'translateX(-250px)' },       // Frame inicial
            { transform: 'translateX(0px)' }    // Frame final
        ], {
            duration: 450, // Duração em milissegundos
            easing: 'ease-in-out',
            fill: 'forwards'
        });

        const animationRock = rockimgMachine.animate([
            { transform: 'translateX(250px)' },       // Frame inicial
            { transform: 'translateX(0px)' }    // Frame final
        ], {
            duration: 450, // Duração em milissegundos
            easing: 'ease-in-out',
            fill: 'forwards'
        });

        /* Paper Configs */

        paperimgPlayer.style.display = 'flex'

        /* Rock Configs */

        rockimgMachine.style.display = 'flex'

        animationPaper
        animationRock
    }
    else if(
        human === 'Rock' && machine === 'Scissors'){
        HumanScore++
        PointHuman.innerHTML = HumanScore
        whowin.innerHTML = "Você ganhou"

        rockimgPlayer.style.display = 'none'
        paperimgPlayer.style.display = 'none'
        scissorsimgPlayer.style.display = 'none'
        rockimgMachine.style.display = 'none'
        paperimgMachine.style.display = 'none'
        scissorsimgMachine.style.display = 'none'

        const animationScissor = rockimgPlayer.animate([
            { transform: 'translateX(-250px)' },       // Frame inicial
            { transform: 'translateX(0px)' }    // Frame final
        ], {
            duration: 450, // Duração em milissegundos
            easing: 'ease-in-out',
            fill: 'forwards'
        });

        const animationRock = scissorsimgMachine.animate([
            { transform: 'translateX(250px)' },       // Frame inicial
            { transform: 'translateX(0px)' }    // Frame final
        ], {
            duration: 450, // Duração em milissegundos
            easing: 'ease-in-out',
            fill: 'forwards'
        });

        /* Paper Configs */

        rockimgPlayer.style.display = 'flex'

        /* Rock Configs */
        
        scissorsimgMachine.style.display = 'flex'

        animationScissor
        animationRock
        }
    else if(
        human === 'Scissors' && machine === 'Paper'){
        HumanScore++
        PointHuman.innerHTML = HumanScore
        whowin.innerHTML = "Você ganhou"

        rockimgPlayer.style.display = 'none'
        paperimgPlayer.style.display = 'none'
        scissorsimgPlayer.style.display = 'none'
        rockimgMachine.style.display = 'none'
        paperimgMachine.style.display = 'none'
        scissorsimgMachine.style.display = 'none'

        const animationScissor = scissorsimgPlayer.animate([
            { transform: 'translateX(-250px)' },       // Frame inicial
            { transform: 'translateX(0px)' }    // Frame final
        ], {
            duration: 450, // Duração em milissegundos
            easing: 'ease-in-out',
            fill: 'forwards'
        });

        const animationPaper = paperimgMachine.animate([
            { transform: 'translateX(250px)' },       // Frame inicial
            { transform: 'translateX(0px)' }    // Frame final
        ], {
            duration: 450, // Duração em milissegundos
            easing: 'ease-in-out',
            fill: 'forwards'
        });

        /* scissors configs */

        scissorsimgPlayer.style.display = 'flex'

        /* paper configs */
        
        paperimgMachine.style.display = 'flex'

        animationScissor
        animationPaper
        }
                    /* IF HUMAN WINS */

                    /* IF MACHINE WINS */

        else if(
            human === 'Rock' && machine === 'Paper'){
        MachineScore++
        PointMachine.innerHTML = MachineScore
        whowin.innerHTML = "A maquina ganhou"

        rockimgPlayer.style.display = 'none'
        paperimgPlayer.style.display = 'none'
        scissorsimgPlayer.style.display = 'none'
        rockimgMachine.style.display = 'none'
        paperimgMachine.style.display = 'none'
        scissorsimgMachine.style.display = 'none'

        const animationPaper = rockimgPlayer.animate([
            { transform: 'translateX(-250px)' },       // Frame inicial
            { transform: 'translateX(0px)' }    // Frame final
        ], {
            duration: 450, // Duração em milissegundos
            easing: 'ease-in-out',
            fill: 'forwards'
        });

        const animationRock = paperimgMachine.animate([
            { transform: 'translateX(250px)' },       // Frame inicial
            { transform: 'translateX(0px)' }    // Frame final
        ], {
            duration: 450, // Duração em milissegundos
            easing: 'ease-in-out',
            fill: 'forwards'
        }); 

        /* Paper Configs */

        rockimgPlayer.style.display = 'flex'

        /* Rock Configs */

        paperimgMachine.style.display = 'flex'

        animationPaper
        animationRock
        }
        else if(
            human === 'Scissors' && machine === 'Rock'){
        MachineScore++
        PointMachine.innerHTML = MachineScore
        whowin.innerHTML = "A maquina ganhou"

        rockimgPlayer.style.display = 'none'
        paperimgPlayer.style.display = 'none'
        scissorsimgPlayer.style.display = 'none'
        rockimgMachine.style.display = 'none'
        paperimgMachine.style.display = 'none'
        scissorsimgMachine.style.display = 'none'

        const animationScissor = scissorsimgPlayer.animate([
            { transform: 'translateX(-250px)' },       // Frame inicial
            { transform: 'translateX(0px)' }    // Frame final
        ], {
            duration: 450, // Duração em milissegundos
            easing: 'ease-in-out',
            fill: 'forwards'
        });

        const animationRock = rockimgMachine.animate([
            { transform: 'translateX(250px)' },       // Frame inicial
            { transform: 'translateX(0px)' }    // Frame final
        ], {
            duration: 450, // Duração em milissegundos
            easing: 'ease-in-out',
            fill: 'forwards'
        }); 

        /* Paper Configs */

        scissorsimgPlayer.style.display = 'flex'

        /* Rock Configs */

        rockimgMachine.style.display = 'flex'

        animationScissor
        animationRock
        }
        else if(
            human === 'Paper' && machine === 'Scissors'){
        MachineScore++
        PointMachine.innerHTML = MachineScore
        whowin.innerHTML = "A maquina ganhou"

        rockimgPlayer.style.display = 'none'
        paperimgPlayer.style.display = 'none'
        scissorsimgPlayer.style.display = 'none'
        rockimgMachine.style.display = 'none'
        paperimgMachine.style.display = 'none'
        scissorsimgMachine.style.display = 'none'

        const animationPaper = paperimgPlayer.animate([
            { transform: 'translateX(-250px)' },       // Frame inicial
            { transform: 'translateX(0px)' }    // Frame final
        ], {
            duration: 450, // Duração em milissegundos
            easing: 'ease-in-out',
            fill: 'forwards'
        });

        const animationScissor = scissorsimgMachine.animate([
            { transform: 'translateX(250px)' },       // Frame inicial
            { transform: 'translateX(0px)' }    // Frame final
        ], {
            duration: 450, // Duração em milissegundos
            easing: 'ease-in-out',
            fill: 'forwards'
        }); 

        /* Paper Configs */

        paperimgPlayer.style.display = 'flex'

        /* Rock Configs */

        scissorsimgMachine.style.display = 'flex'

        animationPaper
        animationScissor
        }

                    /* IF MACHINE WINS */

                    /* IF NO ONE WINS */

        else if(
            human === 'Paper' && machine === 'Paper'){
        whowin.innerHTML = "Empatou"

        rockimgPlayer.style.display = 'none'
        paperimgPlayer.style.display = 'none'
        scissorsimgPlayer.style.display = 'none'
        rockimgMachine.style.display = 'none'
        paperimgMachine.style.display = 'none'
        scissorsimgMachine.style.display = 'none'

        const animationPaperPlayer = paperimgPlayer.animate([
            { transform: 'translateX(-250px)' },       // Frame inicial
            { transform: 'translateX(0px)' }    // Frame final
        ], {
            duration: 450, // Duração em milissegundos
            easing: 'ease-in-out',
            fill: 'forwards'
        });

        const animationPaperMachine = paperimgMachine.animate([
            { transform: 'translateX(250px)' },       // Frame inicial
            { transform: 'translateX(0px)' }    // Frame final
        ], {
            duration: 450, // Duração em milissegundos
            easing: 'ease-in-out',
            fill: 'forwards'
        }); 

        /* Paper Configs */

        paperimgPlayer.style.display = 'flex'

        /* Rock Configs */

        paperimgMachine.style.display = 'flex'

        animationPaperPlayer
        animationPaperMachine
        }
        else if(
            human === 'Rock' && machine === 'Rock'){
        whowin.innerHTML = "Empatou"

        rockimgPlayer.style.display = 'none'
        paperimgPlayer.style.display = 'none'
        scissorsimgPlayer.style.display = 'none'
        rockimgMachine.style.display = 'none'
        paperimgMachine.style.display = 'none'
        scissorsimgMachine.style.display = 'none'

        const animationRockPlayer = rockimgPlayer.animate([
            { transform: 'translateX(-250px)' },       // Frame inicial
            { transform: 'translateX(0px)' }    // Frame final
        ], {
            duration: 450, // Duração em milissegundos
            easing: 'ease-in-out',
            fill: 'forwards'
        });

        const animationRockMachine = rockimgMachine.animate([
            { transform: 'translateX(250px)' },       // Frame inicial
            { transform: 'translateX(0px)' }    // Frame final
        ], {
            duration: 450, // Duração em milissegundos
            easing: 'ease-in-out',
            fill: 'forwards'
        }); 

        /* Paper Configs */

        rockimgPlayer.style.display = 'flex'

        /* Rock Configs */

        rockimgMachine.style.display = 'flex'

        animationRockPlayer
        animationRockMachine
        }
        else if(
            human === 'Scissors' && machine === 'Scissors'){
        whowin.innerHTML = "Empatou"

        rockimgPlayer.style.display = 'none'
        paperimgPlayer.style.display = 'none'
        scissorsimgPlayer.style.display = 'none'
        rockimgMachine.style.display = 'none'
        paperimgMachine.style.display = 'none'
        scissorsimgMachine.style.display = 'none'

        const animationScissorPlayer = scissorsimgPlayer.animate([
            { transform: 'translateX(-250px)' },       // Frame inicial
            { transform: 'translateX(0px)' }    // Frame final
        ], {
            duration: 450, // Duração em milissegundos
            easing: 'ease-in-out',
            fill: 'forwards'
        });

        const animationScissorMachine = scissorsimgMachine.animate([
            { transform: 'translateX(250px)' },       // Frame inicial
            { transform: 'translateX(0px)' }    // Frame final
        ], {
            duration: 450, // Duração em milissegundos
            easing: 'ease-in-out',
            fill: 'forwards'
        }); 

        /* Paper Configs */

        scissorsimgPlayer.style.display = 'flex'

        /* Rock Configs */

        scissorsimgMachine.style.display = 'flex'

        animationScissorPlayer
        animationScissorMachine
        }

                    /* IF NO ONE WINS */
    }

