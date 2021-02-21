const w : number = window.innerWidth 
const h : number = window.innerHeight 
const scGap : number = 0.02 
const delay : number = 20
const strokeFactor : number = 90 
const backColor : string = "#bdbdbd"
const color : string = "indigo"

class State {

    scale : number = 0 
    dir : number = 0 

    update(cb : Function) {
        this.scale += scGap * this.dir 
        if (this.scale > 1 ) {
            this.scale = 1 
            this.dir = 0 
            cb()
        }
    }

    startUpdating(cb : Function) {
        if (this.dir == 0) {
            this.dir = 1 
            cb()
        }
    }
}