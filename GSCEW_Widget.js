// make by Rémy Brandeau, All restrictives rights
// GSCEW => Gestionnaire de Structures Complexes d'Element Web

export default class GSCEW_Widget {
    constructor(DOMElement) {
        this.uniqueID = undefined
        this.DOM_Element = DOMElement
        this.GSCEW_Element = {
            style: {}
        }
        this.GSCEW_Parent = undefined,
        this.conditions = {}
        this.animations = {}
    }

    setGSCEW(GSCEW) {
        this.GSCEW_Parent = GSCEW
    }

    setID(ID) {
        this.uniqueID = ID
    }

    
    makeID() {
        let stop = false
        while (stop == false) {
            const ID = `GSCEW_Animation_${Math.round(Math.random()*10000000)}`
            if(Object.keys(this.conditions).indexOf([ID]) == -1) {
                stop = true
                return ID
            }
        }
    }

    addAnimations(array) {
        array.map((animation) => {
            const ID = this.makeID()
            animation.type.map((type) => {
                if(this.conditions[type] == undefined) {
                    this.conditions[type] = {}
                }
                this.conditions[type][ID] = {}
                this.conditions[type][ID][type] = animation.conditions[type]
            })
            this.animations[ID] = animation
            this.animations[ID].GSCEW_Widget = this
            this.animations[ID].animationID = ID
        })
    }
}