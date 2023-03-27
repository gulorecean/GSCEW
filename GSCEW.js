export default class GSCEW {
    constructor() {
        this.INPUTS = {}
        this.WIDGETS = {}
        this.BEHAVIOURS = {}
        this.ANIMATIONS = {}
        this.ACTIONS = {}
        this.details = {
            run_Mode: "default",
            realease_Version: "public",
            GSCEW_Motor_Version: 2,
            dev: {
               GSCEW: [["Gulorecean", "https://brandeau.ovh/"]],
            }
        }
    }

    debug() {
        this.details.run_Mode = "debug"
    }

    GSCEW_inform(str) {
        if(this.details.run_Mode == "debug") {
            console.info(`GSCEW : ${str}`)
        }
    }

    GSCEW_space() {
        if(this.details.run_Mode == "debug") {
            console.info()
        }
    }

    GSCEW_alert(str) {
        console.error(`GSCEW : ${str}`)
    }

    make_WIDGETS_ID() {
        let stop = false
        while (stop == false) {
            const ID = `GSCEW_Object_${Math.round(Math.random()*10000000)}`
            if(this.WIDGETS[ID] == undefined) {
                stop = true
                return ID
            }
        }
    }

    initInputs(array) {
        array.map((Input) => {
            if(this.details.GSCEW_Motor_Version !== Input.details.GSCEW_Version) {
                this.GSCEW_alert(`bad version for Input (${Input.details.name}) \n==========\n input GSCEW version : ${Input.details.GSCEW_Version} \n current GSCEW version : ${this.details.GSCEW_Motor_Version} \n==========\n PLEASE : \n - download the compatible version of ${Input.details.name} (${Input.details.urlProject}) \n or \n - download the compatible GSCEW version (https://github/GSCEW/${Input.details.GSCEW_Version})`)
            } else {
                Input.GSCEW = this
                this.INPUTS[Input.details.name] = Input
                this.ACTIONS[Input.details.name] = {}
                Input.start()
                this.GSCEW_inform(`Render ${Input.details.name} registered and started`)
            }
            this.details.dev[Input.details.name] = Input.details.dev[Input.details.name]
        })
        this.GSCEW_inform('All Renders loaded')
        this.GSCEW_space()
    }

    initObjects(tab){
        tab.map((e) => {
            e.setGSCEW(this)
            const ID = this.make_WIDGETS_ID()
            e.setID(ID)
            this.WIDGETS[e.uniqueID] = e
            Object.keys(e.conditions).forEach((Behaviour) => {
                Object.keys(e.conditions[Behaviour]).forEach((condition) => {
                    this.BEHAVIOURS[Behaviour].required.map((requireInput) => {
                        if(this.ACTIONS[requireInput] == undefined) {
                            this.ACTIONS[requireInput] = {}
                        }
                        if(this.ACTIONS[requireInput][Behaviour] == undefined) {
                            this.ACTIONS[requireInput][Behaviour] == {}
                        }
                        this.ACTIONS[requireInput][Behaviour][ID + condition] = {
                            values: e.conditions[Behaviour][condition][Behaviour],
                            widget_ID: ID,
                            animation_ID: condition
                        } 
                    })
                })
            })
            Object.keys(e.animations).forEach((animationID) => {
                this.ANIMATIONS[e.animations[animationID].GSCEW_Widget.uniqueID + animationID] = e.animations[animationID]
            })
            this.GSCEW_inform(`Object ${ID} registered`)
        })
        this.GSCEW_inform('All Objects loaded')
        this.GSCEW_space()
        if(this.details.run_Mode === "debug") {
            console.log("GSCEW : ", this)
        }
        console.warn("Animations powered by GSCEW => https://github.com/GSCEW \n\n execute document.GSCEW_dev to see devs") // please dont remove this -> GSCEW is free to use so if you remove this comment, you remove the only visibility which we have on the web :)
        document.GSCEW_dev = this.details.dev
        document.appendChild(document.createComment("-   Animations powered by GSCEW => https://github.com/GSCEW   -")) // please dont remove this -> GSCEW is free to use so if you remove this comment, you remove the only visibility which we have on the web :)
    }

    initBehaviours(tab) {
        tab.map((behaviour) => {
            if(behaviour.details.GSCEW_Version !== this.details.GSCEW_Motor_Version) {
                this.GSCEW_alert(`bad version for Behaviour (${behaviour.details.name}) \n==========\n behaviour GSCEW version : ${behaviour.details.GSCEW_Version} \n current GSCEW version : ${this.details.GSCEW_Motor_Version} \n==========\n PLEASE : \n - download the compatible version of ${behaviour.details.name} (${behaviour.details.urlProject}) \n or \n - download the compatible GSCEW version (https://github/GSCEW/${behaviour.details.GSCEW_Version})`)
            } else if(this.BEHAVIOURS[behaviour.details.name] === undefined){
                this.BEHAVIOURS[behaviour.details.name] = behaviour
                behaviour.GSCEW = this
                this.GSCEW_inform(`Behaviour ${behaviour.details.name} loaded`)
            }
            this.testBehaviourRequirments(behaviour)
            this.details.dev[behaviour.details.name] = behaviour.details.dev[behaviour.details.name]

        })
        this.GSCEW_inform(`All Behaviour loaded`)
        this.GSCEW_space()
    }

    RendDomStyle(el) {
        const DomElement = this.WIDGETS[el.widget_ID].DOM_Element
        Object.keys(el.values).forEach((transformation) => {
            let style = ``
            el.values[transformation].map((EachValues) => {
                let finalValue = `calc(`
                for(let i = 0; i < Object.keys(EachValues).length; i++) {
                    const measurment = Object.keys(EachValues)[i]
                    if(i !== 0) {
                        finalValue+=` + ${EachValues[measurment]}${measurment}`
                    } else {
                        finalValue+=`${EachValues[measurment]}${measurment}`
                    }
                }
                finalValue+=`)`
                style+=finalValue+" "
            })
            DomElement.style[transformation] = style
        })
    }

    CalcRendDomElement(Widget) {
        const style = Widget.style
        const total = {}
        Object.keys(style).forEach((transformation) => {
            const valueOfTransformation = []
            if(total[transformation] === undefined) {
                total[transformation] = []
            }
            Object.keys(style[transformation]).forEach((animation) => {
                Object.keys(style[transformation][animation]).forEach((behaviour) => {
                    const values = style[transformation][animation][behaviour]
                    for(let i = 0; i < values.length; i++) {
                        if(valueOfTransformation[i] === undefined) {
                            valueOfTransformation.push({})
                        }
                        if(valueOfTransformation[i][values[i][1]] === undefined){
                            valueOfTransformation[i][values[i][1]] = values[i][0]
                        } else {
                            valueOfTransformation[i][values[i][1]]+=values[i][0]
                        }
                    }
                })
            })
            total[transformation] = valueOfTransformation
        })
        return total
    }

    rendAnimation(animationID) {
        Object.keys(this.ANIMATIONS[animationID].actions.style).forEach((behaviour) => {
            Object.keys(this.ANIMATIONS[animationID].actions.style[behaviour]).forEach((transformation) => {
                const NewTransformation = this.BEHAVIOURS[behaviour].rend({
                    type: transformation,
                    values: this.ANIMATIONS[animationID].actions.style[behaviour][transformation].values,
                    conditionDatas: this.ANIMATIONS[animationID].conditions[behaviour],
                })
                if(this.WIDGETS[this.ANIMATIONS[animationID].GSCEW_Widget.uniqueID].GSCEW_Element.style[transformation] === undefined) {
                    this.WIDGETS[this.ANIMATIONS[animationID].GSCEW_Widget.uniqueID].GSCEW_Element.style[transformation] = {}
                }
                if(this.WIDGETS[this.ANIMATIONS[animationID].GSCEW_Widget.uniqueID].GSCEW_Element.style[transformation][animationID] === undefined) {
                    this.WIDGETS[this.ANIMATIONS[animationID].GSCEW_Widget.uniqueID].GSCEW_Element.style[transformation][animationID] = {}
                }
                this.WIDGETS[this.ANIMATIONS[animationID].GSCEW_Widget.uniqueID].GSCEW_Element.style[transformation][animationID][behaviour] = NewTransformation
            })
        })
        const calcValues = this.CalcRendDomElement(this.WIDGETS[this.ANIMATIONS[animationID].GSCEW_Widget.uniqueID].GSCEW_Element)
        this.RendDomStyle({
            widget_ID: this.ANIMATIONS[animationID].GSCEW_Widget.uniqueID,
            values: calcValues
        })
    }

    testAllConditionsOfAnAnimation(animationID) {
        let allTrue = true
        Object.keys(this.ANIMATIONS[animationID].conditions).forEach((Behaviour) => {
            if(this.BEHAVIOURS[Behaviour].test(this.ANIMATIONS[animationID].conditions[Behaviour])!== true) {
                allTrue = false
            }
        })
        if(allTrue === true) {
            this.rendAnimation(animationID)
        }
    }

    actualiseInput(name) {
        Object.keys(this.ACTIONS[name]).forEach((Behaviour) => {
            Object.keys(this.ACTIONS[name][Behaviour]).forEach((animationID) => {
                if(this.BEHAVIOURS[Behaviour].test(this.ACTIONS[name][Behaviour][animationID].values) == true) {
                    this.testAllConditionsOfAnAnimation(animationID)
                }
            })
        })
    }

    testBehaviourRequirments(behaviour) {
        behaviour.required.map((require) => {
            if(this.INPUTS[require] === undefined) {
                this.GSCEW_alert(`${behaviour.details.name} required Input ${require} \n PLEASE : \n - download the Input ${require} (https://GSCEW.com/${require}) \n or \n - check the behaviour page (https://github/GSCEW/${behaviour.details.name})`)
            } else {
                this.ACTIONS[require][behaviour.details.name] = {}
            }
        })
    }
}