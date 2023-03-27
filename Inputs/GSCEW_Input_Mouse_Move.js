// make by Rémy Brandeau, All restrictives rights
// MTCMC => Moteur (de rendu) de Transitions Complexes au Mouvement du Curseur 

export default class Input_Mouse_Move {
    constructor() {
        this.details = {
            name: "Input_Mouse_Move",
            GSCEW_Version: 2,
            urlProject: "https://github.com/",
            dev: {
                Input_Mouse_Move: [["Gulorecean", "https://brandeau.ovh/"]],
            }
        }
        this.variables = {
            event: undefined,
            GSCEW: {
                currentPosition: [0, 0]
            }
        }
        this.GSCEW = undefined
    }

    start() {
        window.addEventListener("mousemove", (e) => {
            this.variables.event = e
            this.variables.GSCEW.currentPosition = [e.clientX, e.clientY]
            this.GSCEW.actualiseInput(this.details.name)
        })
    }
}