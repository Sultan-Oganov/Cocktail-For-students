const API = 'https://www.thecocktaildb.com/api/json/v1/1/'


let form, input, output, select, logo
form = document.getElementById('form')
logo = document.getElementById('logo')
input = document.getElementById('input')
output = document.getElementById('output')
select = document.getElementById('select')


const getAllCocktails = async () => {
    const request = await fetch(API + 'filter.php?c=Cocktail')
    const response = await request.json()
    renderCocktail(response.drinks)
}

const getCocktailByName = async (name) => {
    const request = await fetch(API + 'search.php?s=' + name)
    const response = await request.json()
    renderCocktail(response.drinks)
}

const filterCocktailByAlcoholic = async (types) => {
    const request = await fetch(API + 'filter.php?a=' + types)
    const response = await request.json()
    renderCocktail(response.drinks)
}

const getDetailsById = async (id) => {
    const request = await fetch(API + 'lookup.php?i=' + id)
    const response = await request.json()
    renderForDetail(response.drinks[0])
}

const getInfoByIngridient = async (name) => {
    const request = await fetch(API + 'search.php?i=' + name)
    const response = await request.json()
    renderForIngridient(response.ingredients[0])
}

const renderCocktail = (data) => {
    output.innerHTML = ''
    input.value = ''
    data ? data.map((el, index) => {
        let card = document.createElement('div')
        let img = document.createElement('img')
        let h2 = document.createElement('h2')

        card.addEventListener('click', () => {
            getDetailsById(el.idDrink)
        })

        card.classList.add('card')
        img.src = el.strDrinkThumb
        h2.innerHTML = el.strDrink

        card.append(img, h2)
        output.append(card)
    })
        : 'Server ERROR'
}

const renderForDetail = (data) => {
    output.innerHTML = ''

    const detail = document.createElement('div')
    const detailImg = document.createElement('img')
    const detailDescr = document.createElement('div')
    const h2 = document.createElement('h2')
    const p = document.createElement('p')
    const ingridients = document.createElement('div')

    detail.classList.add('detail')
    detailImg.classList.add('detail__img')
    detailDescr.classList.add('detail__descr')
    h2.classList.add('detail__title')
    p.classList.add('detail__text')
    ingridients.classList.add('detail__ingridients')

    detailImg.src = data.strDrinkThumb
    h2.innerHTML = data.strDrink
    p.innerHTML = data.strInstructions

    for (let i = 1; i <= 3; i++) {
        const ingrItem = document.createElement('strong')
        ingrItem.innerHTML = data['strIngredient' + i]
        ingrItem.classList.add('ingrItem')
        ingridients.append(ingrItem)

        ingrItem.addEventListener('click', () => {
            getInfoByIngridient(data['strIngredient' + i])
        })
    }

    detailDescr.append(h2, p, ingridients)
    detail.append(detailImg, detailDescr)

    output.append(detail)
}

const renderForIngridient = (data) => {
    output.innerHTML = ''

    const ingridientInfo = document.createElement('div')
    const h2 = document.createElement('h2')
    const p = document.createElement('p')

    ingridientInfo.classList.add('ingridientInfo')
    h2.classList.add('ingridient__title')
    p.classList.add('ingridient__text')

    h2.innerHTML = data.strIngredient
    p.innerHTML = data.strDescription

    ingridientInfo.append(h2, p)
    output.append(ingridientInfo)
}

getAllCocktails()

form.addEventListener('submit', (event) => {
    event.preventDefault()
    getCocktailByName(input.value)
})

logo.addEventListener('click', getAllCocktails)

select.addEventListener('change', () => filterCocktailByAlcoholic(select.value))
