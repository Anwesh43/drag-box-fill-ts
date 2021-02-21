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

    handleMouse(canvas : HTMLCanvasElement, cb : Function) {
        canvas.onmousedown = (e : MouseEvent) => {
            if (!this.isDown) {
                this.isDown = true 
                this.x = e.offsetX 
                this.y = e.offsetY  
                this.x1 = this.x 
                this.y1 = this.y 
            }
        }
        
        canvas.onmousemove = (e : MouseEvent) => {
            if (this.isDown && e.offsetX > this.x && e.offsetY > this.y) {
                this.x1 = e.offsetX 
                this.y1 = e.offsetY 
            }
        } 

        canvas.onmouseup = (e : MouseEvent) => {
            if (this.isDown) {
                this.isDown = false 
                cb()
            }
        }
    }

    setCoords(cb : Function) {
        if (this.isDown) {
            cb(this.x, this.y, this.x1, this.y1)
        }
    } 
}

class DragBox {

    state : State = new State()
    x : number 
    y : number 
    x1 : number 
    y1 : number 

    draw(context : CanvasRenderingContext2D) {
        context.strokeStyle = color
        context.lineCap = 'round'
        context.lineWidth = Math.min(w, h) / strokeFactor  
        context.strokeRect(this.x, this.y, this.x1 - this.x, this.y1 - this.y)
        context.fillStyle = color 
        context.fillRect(
            this.x,
            this.y1 - (this.y1 - this.y) * this.state.scale,
            this.x1 - this.x,
            (this.y1 - this.y) * this.state.scale
        )
    }

    update(cb : Function) {
        this.state.update(cb)
    }

    startUpdating(cb : Function) {
        this.state.startUpdating(cb)
    }
}

class Stage {

    canvas : HTMLCanvasElement = document.createElement('canvas')
    context : CanvasRenderingContext2D 
    mouseController : MouseController = new MouseController()


    initCanvas() {
        this.canvas.width = w 
        this.canvas.height = h 
        this.context = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
        this.mouseController.handleMouse(this.canvas, () => {

        })
    }

    render() {
        this.context.fillStyle = backColor 
        this.context.fillRect(0, 0, w, h)
        this.mouseController.setCoords((x : number, y : number, x1 : number, y1 : number) => {
            
        })
    }
}