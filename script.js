const catalogo = document.querySelector('.movies')
//modal
const ModalFilmes = document.querySelector('.modal')
const modalBody = document.querySelector('.modal__body')
const modalClose = document.querySelector('.modal__close')
const modalTitle = document.querySelector('.modal__title')
const modalImagem = document.querySelector('.modal__img')
const modalDescription = document.querySelector('.modal__description')
const modalAverage = document.querySelector('.modal__genre-average')

//paginação
const buttonNext = document.querySelector('.btn-next')
const buttonPrev = document.querySelector('.btn-prev')

//filme do dia
const filmeDia = document.querySelector('.highlight size')
const aVideoLink = document.querySelector('.highlight__video-link')

const highLightInfo = document.querySelector('.highlight__info')
const highlightInfoRatingTitle = document.querySelector('.highlight__title-rating')
const highlightInfoTitle = document.querySelector('.highlight__title')
const highlightInfoRating = document.querySelector('.highlight__rating')

const highlightGenreLaunch = document.querySelector('.highlight__genre-launch')
const highlightGenres = document.querySelector('.highlight__genres')
const highlightLaunch = document.querySelector('.highlight__launch')
const highlightDescription = document.querySelector('.highlight__description')
const highLightVideo = document.querySelector('.highlight__video')

let end = 6;
let start = 0;
let currentPag = 0;


function visualizacaoFilmes(filmesCatalogos) {

    for (let i = start; i < end; i++) {

        const divMovie = document.createElement('div')
        const info = document.createElement('div')
        const estrela = document.createElement('img')
        const title = document.createElement('span')
        const nota = document.createElement('span')

        catalogo.appendChild(divMovie);
        divMovie.appendChild(info);
        info.appendChild(title);
        info.appendChild(nota);

        title.textContent = filmesCatalogos[i].title;
        nota.textContent = filmesCatalogos[i].vote_average;
        nota.appendChild(estrela);

        divMovie.style.backgroundImage = `url(${filmesCatalogos[i].poster_path})`
        estrela.src = "./assets/estrela.svg"

        divMovie.classList.add('movie')
        title.classList.add('movie__title')
        nota.classList.add('movie__rating')
        info.classList.add('movie__info')

        divMovie.addEventListener('click', (e) => {
            abrirModal(filmesCatalogos[i]);
        })
    }

}

buttonNext.addEventListener('click', (event) => {

    event.stopPropagation();

    catalogo.innerHTML = '';

    currentPag++
    end += 6;
    start += 6;

    if (currentPag == 3) {
        currentPag = 0;
        end = 6;
        start = 0;
    }

    verFilmes()
})

buttonPrev.addEventListener('click', (event) => {

    event.stopPropagation();

    catalogo.innerHTML = '';

    currentPag--;
    end -= 6;
    start -= 6;

    if (currentPag == -1) {
        currentPag = 2;
        end = 18;
        start = 12;
    }

    verFilmes()
})





function abrirModal(filme) {

    modalTitle.textContent = filme.title;
    modalDescription.textContent = filme.overview;
    modalAverage.textContent = filme.vote_average;
    modalImagem.style.backgroundImage = `url(${filme.backdrop_path})`
    modalImagem.style.backgroundSize = "cover";


    ModalFilmes.classList.add('modal')

    modalClose.addEventListener('click', () => {
        modalClose = ModalFilmes.classList.add('hidden')

    })
    ModalFilmes.classList.toggle('hidden')



}


async function filmeDoDia() {

    try {
        const res = await api.get('/movie/436969?language=pt-BR')
        const movie = res.data

        highLightVideo.style.backgroundImage = `url(${movie.backdrop_path})`
        highLightVideo.style.backgroundSize = "cover";
        highlightInfoTitle.textContent = movie.title;
        highlightInfoRating.textContent = movie.vote_average.toFixed(1);
        highlightGenres.textContent = `${movie.genres[0].name}, ${movie.genres[1].name}, ${movie.genres[2].name}`
        highlightLaunch.textContent = new Date(movie.release_date).toLocaleDateString("pt-BR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
        });
        highlightDescription.textContent = movie.overview;

        const linkVideo = await api.get('/movie/436969/videos?language=pt-BR')
        const video = linkVideo.data.results

        aVideoLink.href = `https://www.youtube.com/watch?v=${video[1].key}`


    } catch (error) {
        console.log(error.res)
    }



}
filmeDoDia();


async function verFilmes() {
    try {
        const response = await api.get('/discover/movie?language=pt-BR&include_adult=false')
        visualizacaoFilmes(response.data.results)

    } catch (error) {
        console.log(error.response)
    }


}

verFilmes();
