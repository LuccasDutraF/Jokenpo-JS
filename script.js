const PointHuman = document.querySelector("#PointHuman")
const PointMachine = document.querySelector("#PointMachine")
const paperimg = document.querySelector(".papertomove")
const paperimg2 = document.querySelector(".papertomove2")
const rockimg = document.querySelector(".rocktomove")
const scissorsimg = document.querySelector(".scissorstomove")

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

    if (human === machine) {
        console.log("empatou")
    } else if (
        human === 'Paper' && machine === 'Rock') {
        HumanScore++
        PointHuman.innerHTML = HumanScore

        const animationPaper = paperimg.animate([
            { transform: 'translateX(-500px)' },       // Frame inicial
            { transform: 'translateX(-230px)' }    // Frame final
        ], {
            duration: 450, // Duração em milissegundos
            easing: 'ease-in-out',
            fill: 'forwards'
        });

        const animationRock = rockimg.animate([
            { transform: 'translateX(700px)' },       // Frame inicial
            { transform: 'translateX(490px)' }    // Frame final
        ], {
            duration: 450, // Duração em milissegundos
            easing: 'ease-in-out',
            fill: 'forwards'
        });

        paperimg.style.display = 'none'
        scissorsimg.style.display = 'none'
        rockimg.style.display = 'none'

        /* Paper Configs */

        paperimg.style.position = 'absolute'
        paperimg.style.opacity = 1
        paperimg.style.display = 'flex'
        paperimg.style.top = '240px'
        paperimg.style.border = 'none'
        paperimg.style.boxShadow = 'none'
        paperimg.style.width = '70px'

        /* Rock Configs */

        rockimg.style.position = 'absolute'
        rockimg.style.opacity = 1
        rockimg.style.display = 'flex'
        rockimg.style.top = '240px'
        rockimg.style.border = 'none'
        rockimg.style.boxShadow = 'none'
        rockimg.style.width = '70px'

        animationPaper
        animationRock
    }
    else if
        (human === 'Scissors' && machine === 'Paper') {
        const animationScissors = scissorsimg.animate([
            { transform: 'translateX(-700px)' },      // Frame inicial
            { transform: 'translateX(-390px)' }    // Frame final
        ], {
            duration: 450, // Duração em milissegundos
            easing: 'ease-in-out',
            fill: 'forwards'
        });
        const animationPaper = paperimg.animate([
            { transform: 'translateX(600px)' },      // Frame inicial
            { transform: 'translateX(310px)' }    // Frame final
        ], {
            duration: 450, // Duração em milissegundos
            easing: 'ease-in-out',
            fill: 'forwards'
        });

        HumanScore++
        PointHuman.innerHTML = HumanScore

        paperimg.style.display = 'none'
        scissorsimg.style.display = 'none'
        rockimg.style.display = 'none'

        /* Scissors Configs */

        scissorsimg.style.position = 'absolute'
        scissorsimg.style.opacity = 1
        scissorsimg.style.display = 'flex'
        scissorsimg.style.top = '250px'
        scissorsimg.style.border = 'none'
        scissorsimg.style.boxShadow = 'none'
        scissorsimg.style.width = '70px'

        /* Paper Configs */

        paperimg.style.position = 'absolute'
        paperimg.style.opacity = 1
        paperimg.style.display = 'flex'
        paperimg.style.top = '250px'
        paperimg.style.border = 'none'
        paperimg.style.boxShadow = 'none'
        paperimg.style.width = '70px'

        animationScissors
        animationPaper
    }
    else if
        (human === 'Rock' && machine === 'Scissors') {
        HumanScore++
        PointHuman.innerHTML = HumanScore

        const animationRock = rockimg.animate([
            { transform: 'translateX(-600px)' },      // Frame inicial
            { transform: 'translateX(-50px)' }    // Frame final
        ], {
            duration: 450, // Duração em milissegundos
            easing: 'ease-in-out',
            fill: 'forwards'
        });
        const animationScissors = scissorsimg.animate([
            { transform: 'translateX(500px)' },      // Frame inicial
            { transform: 'translateX(130px)' }    // Frame final
        ], {
            duration: 450, // Duração em milissegundos
            easing: 'ease-in-out',
            fill: 'forwards'
        });

        paperimg.style.display = 'none'
        scissorsimg.style.display = 'none'
        rockimg.style.display = 'none'

        /* Rock Configs */

        rockimg.style.position = 'absolute'
        rockimg.style.opacity = 1
        rockimg.style.display = 'flex'
        rockimg.style.top = '245px'
        rockimg.style.border = 'none'
        rockimg.style.boxShadow = 'none'
        rockimg.style.width = '70px'

        /* Scissors Configs */

        scissorsimg.style.position = 'absolute'
        scissorsimg.style.opacity = 1
        scissorsimg.style.display = 'flex'
        scissorsimg.style.top = '250px'
        scissorsimg.style.border = 'none'
        scissorsimg.style.boxShadow = 'none'
        scissorsimg.style.width = '70px'

        animationRock
        animationScissors
    }
    else if(
        human === 'Paper' && machine === 'Scissors'){
            const animationScissors = scissorsimg.animate([
            { transform: 'translateX(600px)' },      // Frame inicial
            { transform: 'translateX(140px)' }    // Frame final
        ], {
            duration: 450, // Duração em milissegundos
            easing: 'ease-in-out',
            fill: 'forwards'
        });
        const animationPaper = paperimg.animate([
            { transform: 'translateX(-600px)' },      // Frame inicial
            { transform: 'translateX(-220px)' }    // Frame final
        ], {
            duration: 450, // Duração em milissegundos
            easing: 'ease-in-out',
            fill: 'forwards'
        });

        MachineScore++
        PointMachine.innerHTML = MachineScore

        paperimg.style.display = 'none'
        scissorsimg.style.display = 'none'
        rockimg.style.display = 'none'

        /* Scissors Configs */

        scissorsimg.style.position = 'absolute'
        scissorsimg.style.opacity = 1
        scissorsimg.style.display = 'flex'
        scissorsimg.style.top = '250px'
        scissorsimg.style.border = 'none'
        scissorsimg.style.boxShadow = 'none'
        scissorsimg.style.width = '70px'

        /* Paper Configs */

        paperimg.style.position = 'absolute'
        paperimg.style.opacity = 1
        paperimg.style.display = 'flex'
        paperimg.style.top = '250px'
        paperimg.style.border = 'none'
        paperimg.style.boxShadow = 'none'
        paperimg.style.width = '70px'

        animationPaper
        animationScissors
    }
    else if(
        human === 'Rock' && machine === 'Paper'){
        MachineScore++
        PointMachine.innerHTML = MachineScore

        const animationPaper = paperimg.animate([
            { transform: 'translateX(500px)' },       // Frame inicial
            { transform: 'translateX(310px)' }    // Frame final
        ], {
            duration: 450, // Duração em milissegundos
            easing: 'ease-in-out',
            fill: 'forwards'
        });

        const animationRock = rockimg.animate([
            { transform: 'translateX(-700px)' },       // Frame inicial
            { transform: 'translateX(-50px)' }    // Frame final
        ], {
            duration: 450, // Duração em milissegundos
            easing: 'ease-in-out',
            fill: 'forwards'
        });

        paperimg.style.display = 'none'
        scissorsimg.style.display = 'none'
        rockimg.style.display = 'none'

        /* Paper Configs */

        paperimg.style.position = 'absolute'
        paperimg.style.opacity = 1
        paperimg.style.display = 'flex'
        paperimg.style.top = '250px'
        paperimg.style.border = 'none'
        paperimg.style.boxShadow = 'none'
        paperimg.style.width = '70px'

        /* Rock Configs */

        rockimg.style.position = 'absolute'
        rockimg.style.opacity = 1
        rockimg.style.display = 'flex'
        rockimg.style.top = '250px'
        rockimg.style.border = 'none'
        rockimg.style.boxShadow = 'none'
        rockimg.style.width = '70px'

        animationPaper
        animationRock
    }
    else if
    (human === 'Scissors' && machine === 'Rock'){
        MachineScore++
        PointMachine.innerHTML = MachineScore

        const animationRock = rockimg.animate([
            { transform: 'translateX(700px)' },      // Frame inicial
            { transform: 'translateX(475px)' }    // Frame final
        ], {
            duration: 450, // Duração em milissegundos
            easing: 'ease-in-out',
            fill: 'forwards'
        });
        const animationScissors = scissorsimg.animate([
            { transform: 'translateX(-700px)' },      // Frame inicial
            { transform: 'translateX(-390px)' }    // Frame final
        ], {
            duration: 450, // Duração em milissegundos
            easing: 'ease-in-out',
            fill: 'forwards'
        });

        paperimg.style.display = 'none'
        scissorsimg.style.display = 'none'
        rockimg.style.display = 'none'

        /* Rock Configs */

        rockimg.style.position = 'absolute'
        rockimg.style.opacity = 1
        rockimg.style.display = 'flex'
        rockimg.style.top = '245px'
        rockimg.style.border = 'none'
        rockimg.style.boxShadow = 'none'
        rockimg.style.width = '70px'

        /* Scissors Configs */

        scissorsimg.style.position = 'absolute'
        scissorsimg.style.opacity = 1
        scissorsimg.style.display = 'flex'
        scissorsimg.style.top = '250px'
        scissorsimg.style.border = 'none'
        scissorsimg.style.boxShadow = 'none'
        scissorsimg.style.width = '70px'

        animationRock
        animationScissors
    }
    else if(human === 'Paper' && machine === 'Paper'){
        paperimg.style.position = 'absolute'
        paperimg.style.opacity = 1
        paperimg.style.display = 'flex'
        paperimg.style.top = '250px'
        paperimg.style.border = 'none'
        paperimg.style.boxShadow = 'none'
        paperimg.style.width = '70px'
    }   
}
