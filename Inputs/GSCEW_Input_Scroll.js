// make by Rémy Brandeau, All restrictives rights
// MTCS => Moteur (de rendu) de Transitions Complexes au Scroll 

export default class Input_Scroll {
    constructor() {
        this.details = {
            name: "Input_Scroll",
            GSCEW_Version: 2,
            urlProject: "https://github.com/",
            dev: {
                Input_Scroll: [["Gulorecean", "https://brandeau.ovh/"]],
            }
        }
        this.variables = {
            event: undefined,
            GSCEW: {
                currentScroll: 0
            }
        }
        this.GSCEW = undefined
    }

    start() {
        document.addEventListener('wheel', (e) => {
            this.variables.event = e
            if(e.deltaY < 0 && this.variables.GSCEW.currentScroll != 0) {
                this.variables.GSCEW.currentScroll -= 1
            } else {
                this.variables.GSCEW.currentScroll += 1
            }
            this.GSCEW.actualiseInput(this.details.name)
        })
    }
}