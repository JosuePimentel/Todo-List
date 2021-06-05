const DOM = ele => document.querySelector(ele)
const createEle = ele => document.createElement(ele)

//Tema escuro e claro
const tema = DOM('#temas')
tema.addEventListener('click', ()=> {
    const body = document.body
    const newTodo = DOM('.newTask')
    const dragga = DOM('.draggable')
    const filter = DOM('.filter')
    const filterTodo = DOM('.filterTodo')

    //Mudando btn sol -> lua
    tema.classList.toggle('fas')
    tema.classList.toggle('fa-sun')
    tema.classList.toggle('far')
    tema.classList.toggle('fa-moon')

    //Mudando background - Light
    body.classList.toggle('light')
    newTodo.classList.toggle('light')
    filter.classList.toggle('light')
    filterTodo.classList.toggle('light')
    dragga.classList.toggle('light')

    //Mudando background - Dark
    body.classList.toggle('dark')
    newTodo.classList.toggle('dark')
    filter.classList.toggle('dark')
    filterTodo.classList.toggle('dark')
    dragga.classList.toggle('dark')
})

//Add cards
const dragga = DOM('.draggable')
window.addEventListener('keydown', (e) => {
    const input = document.querySelector('.todo')
    if(e.key == 'Enter' && input.value) {
        const div = createEle('div')
        div.setAttribute('class', 'drag active')
        // div.setAttribute('draggable', true)

        const iC = createEle('i')
        iC.setAttribute('class', 'click circulo card')
        iC.setAttribute('onclick', 'completed(this, this.nextElementSibling)')

        const p = createEle('p')
        p.setAttribute('class', 'active')
        p.innerHTML = input.value

        const i = createEle('i')
        i.setAttribute('class', 'fas fa-times close click')

        dragga.appendChild(div)
        div.append(iC, p, i)

        input.value = ''

    }
})


setInterval(() => {
    //Excluir cards
    document.querySelectorAll('.close').forEach(ele => {
        ele.addEventListener('click' , () => {
            ele.parentNode.remove()
        })
    })

    nNodesDragga()
}, 10)


//Btn card ready
function completed(e) {
    //Check
    e.classList.toggle('completed')
    e.classList.toggle('fas')
    e.classList.toggle('fa-check')

    //Task completed
    const pai = e.parentNode
    pai.classList.toggle('completed')
    pai.classList.toggle('active')
}


//Drag and drop
function dragstart() {
    this.classList.add('is-dragging')
}

function dragend() {
    this.classList.remove('is-dragging')
}

new Sortable(dragga, {
    aniamtion: 350
})

// Filter
const itemsLeft = DOM('.items')
function nNodesDragga() {
    const leng = document.querySelectorAll('.drag.active')
    itemsLeft.innerHTML = `${leng.length} items left`
}

const FiltersClick = document.querySelectorAll('.filter div .click')
FiltersClick.forEach(ele => {
    ele.addEventListener('click', filterClicks)
})

function filterClicks() {
    FiltersClick.forEach(ele => {
        ele.classList.remove('select')
    })

    document.querySelectorAll('div.drag').forEach(ele => {
        ele.classList.remove('display')
    })

    this.classList.add('select')

    if(this.classList.contains('ativos')) {
        const divFeitas = document.querySelectorAll('div.drag.completed')
        divFeitas.forEach(ele => {
            ele.classList.toggle('display')
        })
    } else if(this.classList.contains('feitos')) {
        const divativas = document.querySelectorAll('div.drag.active')
        divativas.forEach(ele => {
            ele.classList.toggle('display')
        })
    }
}


document.querySelector('.clear').addEventListener('click', e => {
    document.querySelectorAll('.drag').forEach(ele => {
        ele.remove()
    })
})
