function getTemplate(state) {
    return `
        <div class="slider__after" style="width: ${state.width + "px"}; background-image: url(${state.after})">
          <div class="slider__resize" data-type="resize"></div>
        </div>
        <div class="slider__before" style="background-image: url(${state.before})">
</div>
    `
}

class Slider {

    constructor(selector) {
        this.$el = document.getElementById(selector)
        this.state = {
            width: 512,
            after: '',
            before: '',
        }
        this.#render(this.state)
        this.#listen()
        this.#setImageAfter(); // Переместили вызов сюда
        this.#setImageBefore();
    }

    #render(state) {
        this.$el.innerHTML = getTemplate(state)
    }

    #update(props) {
        this.state = {
            ...this.state,
            ...props
        }
        console.log(this.state)
        this.#render(this.state)
    }

  #setImageAfter() {
        document.querySelector(".file_after").onchange = (event) => {
            let url = URL.createObjectURL(event.target.files[0]);
            const after = document.getElementsByClassName('slider__after')[0]; // Используем [0] для доступа к первому элементу
            after.style.backgroundImage = `url(${url})`;
            this.#update({ after: url }); // Обновляем состояние
        };
    }

    #setImageBefore() {
        document.querySelector(".file_before").onchange = (event) => {
            let url = URL.createObjectURL(event.target.files[0]);
            const before = document.getElementsByClassName('slider__before')[0]; // Используем [0] для доступа к первому элементу
            before.style.backgroundImage = `url(${url})`;
            this.#update({ before: url }); // Обновляем состояние
        };
    }

    #listen() {
        this.resizeDown = this.resizeDown.bind(this)
        this.resizeUp = this.resizeUp.bind(this)
        this.moveHandler = this.moveHandler.bind(this)
        this.$el.addEventListener('mousedown', this.resizeDown)
        this.$el.addEventListener('mouseup', this.resizeUp)
    }

    resizeUp(event) {
        if(event.target.dataset.type === 'resize') {
            console.log('up')
        }
        this.$el.removeEventListener('mousemove', this.moveHandler)

    }

    resizeDown(event) {
        if(event.target.dataset.type  === 'resize') {
            this.$el.addEventListener('mousemove', this.moveHandler)
            this.currentCursor = event.clientX
        }
    }

    moveHandler(event) {
        let newX = this.currentCursor - event.clientX
        this.#update({width: this.state.width - newX})
        this.currentCursor = event.clientX
    }

}

const slider = new Slider('slider')
