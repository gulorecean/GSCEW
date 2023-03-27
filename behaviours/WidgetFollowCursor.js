export default class WidgetFollowCursor {
    constructor() {
        this.required = ["Input_Mouse_Move"]
        this.details = {
            name: "WidgetFollowCursor",
            GSCEW_Version: 2,
            urlProject: "https://github.com/",
            dev: {
                WidgetFollowCursor: [["Gulorecean", "https://brandeau.ovh/"]],
            }
        }
        this.GSCEW = undefined
    }
    test(param) {
        const currentPosition = this.GSCEW.INPUTS.Input_Mouse_Move.variables.GSCEW.currentPosition
        if(currentPosition[0] >= param.left[0] && currentPosition[0] <= param.left[1] && currentPosition[1] >= param.top[0] && currentPosition[1] <= param.top[1]) {
            return true
        } else {
            return false
        }
    }
    rend(el) {
        const currentPosition = this.GSCEW.INPUTS.Input_Mouse_Move.variables.GSCEW.currentPosition
        const Points = el.conditionDatas
        const finalTransformation = [
            [
                (currentPosition[0] - Points.left[0])/(Points.left[1] - Points.left[0]) * el.values[0][0],
                el.values[0][1]
            ],
            [
                (currentPosition[1] - Points.top[0])/(Points.top[1] - Points.top[0]) * el.values[1][0],
                el.values[1][1]
            ],
        ]
        return finalTransformation
    }
}