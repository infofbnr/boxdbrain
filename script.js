let movies = []
let currentIndex = 0
let username = ""

const button = document.getElementById("searchBtn")
const results = document.getElementById("results")
const loading = document.getElementById("loading")

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500"



button.onclick = async () => {

    username = document.getElementById("username").value.trim()

    if (!username) {
        alert("Enter a Letterboxd username")
        return
    }

    results.innerHTML = ""
    loading.classList.remove("hidden")

    await loadMovies()

    loading.classList.add("hidden")

    currentIndex = 0
    showMovie()

}



async function loadMovies() {

    const res = await fetch(`https://api.boxdbrain.cc/recommend?user=${username}`)
    const data = await res.json()

    movies = data.movies || []

}



function slugify(title) {

    return title
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g,"")
        .replace(/ /g,"-")

}



function showMovie() {

    if (!movies.length) {

        results.innerHTML = `
            <p class="text-zinc-400">
                No recommendations found.
            </p>
        `

        return
    }

    const movie = movies[currentIndex]

    const poster = movie.poster_path
        ? IMAGE_BASE + movie.poster_path
        : ""

    const year = movie.release_date
        ? movie.release_date.slice(0,4)
        : ""

    const rating = movie.vote_average
        ? movie.vote_average.toFixed(1)
        : "N/A"

    const movieSlug = slugify(movie.title)
    const movieLink = `https://letterboxd.com/film/${movieSlug}/`

    const likedMatch = movie.reason?.match(/liked (.*)/)
    const likedTitle = likedMatch ? likedMatch[1] : ""

    const likedSlug = slugify(likedTitle)
    const likedLink = `https://letterboxd.com/film/${likedSlug}/`



    results.innerHTML = `

        <div class="movie-card bg-zinc-800 rounded-xl p-6 max-w-md mx-auto text-center">

            ${poster ? `<img src="${poster}" class="poster mx-auto rounded mb-4">` : ""}

            <h2 class="text-xl font-bold mb-1">

                <a href="${movieLink}" target="_blank" class="hover:text-green-400">

                    ${movie.title} ${year ? `(${year})` : ""}

                </a>

            </h2>

            <p class="text-yellow-400 mb-3">
                ⭐ ${rating}/10 on TMDB
            </p>

            <p class="text-zinc-400 text-sm mb-4">
                ${movie.overview || ""}
            </p>

            <p class="text-zinc-300 mb-6">
                Because you liked
                <a href="${likedLink}" target="_blank" class="text-green-400 hover:underline">
                    ${likedTitle}
                </a>
            </p>

            <button
                onclick="nextMovie()"
                class="bg-green-500 hover:bg-green-400 px-6 py-3 rounded font-semibold text-black"
            >
                Next recommendation
            </button>

        </div>

    `
}



async function nextMovie() {

    currentIndex++

    if (currentIndex >= movies.length) {

        loading.classList.remove("hidden")

        await loadMovies()

        loading.classList.add("hidden")

        currentIndex = 0

    }

    showMovie()

}