let movies = []

const button = document.getElementById("searchBtn")
const results = document.getElementById("results")
const loading = document.getElementById("loading")

button.onclick = async () => {

    const username = document.getElementById("username").value.trim()

    if (!username) {
        alert("Enter a Letterboxd username")
        return
    }

    results.innerHTML = ""
    loading.classList.remove("hidden")

    const res = await fetch(`https://api.boxdbrain.cc/recommend?user=${username}`)
    const data = await res.json()

    loading.classList.add("hidden")

    movies = data.movies || []

    showMovie()
}

function slugify(title) {
    if (!title) return ""

    return title
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/ /g, "-")
}

function renderMovie(movie) {

    const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : ""

    const year = movie.release_date
        ? movie.release_date.slice(0, 4)
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

            ${poster ? `<img src="${poster}" class="w-40 mx-auto rounded mb-4">` : ""}

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

            <p class="text-zinc-300">
                Because you liked 
                <a href="${likedLink}" target="_blank" class="text-green-400 hover:underline">
                    ${likedTitle}
                </a>
            </p>

        </div>

        <div class="text-center mt-6">

            <button onclick="showMovie()" 
            class="bg-green-500 hover:bg-green-400 px-6 py-3 rounded text-black font-semibold">
                Another recommendation
            </button>

        </div>
    `
}

async function showMovie() {

    if (movies.length === 0) {

        const username = document.getElementById("username").value.trim()

        const res = await fetch(`https://api.boxdbrain.cc/recommend?user=${username}`)
        const data = await res.json()

        movies = data.movies || []
    }

    const movie = movies.shift()

    if (movie) renderMovie(movie)
}