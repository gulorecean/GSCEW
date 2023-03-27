export default class WidgetMooveWithScroll {
    constructor() {
        this.required = ["Input_Scroll"]
        this.details = {
            name: "WidgetMooveWithScroll",
            GSCEW_Version: 2,
            urlProject: "https://github.com/",
            dev: {
                WidgetMooveWithScroll: [["Gulorecean", "https://brandeau.ovh/"]],
            }
        }
        this.GSCEW = undefined
    }

    test(param) {
        const currentScroll = this.GSCEW.INPUTS.Input_Scroll.variables.GSCEW.currentScroll
        if(currentScroll >= param[0] && currentScroll <= param[1]) {
            return true
        } else {
            return false
        }
    }

    rend(el) {
        const currentScroll = this.GSCEW.INPUTS.Input_Scroll.variables.GSCEW.currentScroll
        const Points = el.conditionDatas
        const finalTransformation = []
        el.values.map((value) => {
            finalTransformation.push([
                (currentScroll - Points[0])/(Points[1] - Points[0]) * value[0],
                value[1]
            ])
        })
        return finalTransformation
    }
}