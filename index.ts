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

class Animator {

    animated : boolean = false 
    interval : number 

    start(cb : Function) {
        if (!this.animated) {
            this.animated = true 
            this.interval = setInterval(cb, delay)
        }
    }

    stop() {
        if (this.animated) {
            this.animated = false 
            clearInterval(this.interval)
        }
    }
}

class MouseController {

    isDown : boolean = false
    x : number
    y : number 
    x1 : number 
    y1 : number  

    handleMouse(canvas : HTMLCanvasElement) {
        canvas.onmousedown = (e : MouseEvent) => {
            if (!this.isDown) {
                this.isDown = true 
                this.x = e.offsetX 
                this.y = e.offsetY  
            }
        }
        
        canvas.onmousemove = (e : MouseEvent) => {
            if (this.isDown) {
                this.x1 = e.offsetX 
                this.y1 = e.offsetY 
            }
        } 

        canvas.onmouseup = (e : MouseEvent) => {
            if (this.isDown) {
                this.isDown = false 
            }
        }
    }

    setCoords(cb : Function) {
        if (this.isDown) {
            cb(this.x, this.y, this.x1, this.y1)
        }
    } 
}