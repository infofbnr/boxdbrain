let movies = []
let index = 0

const button = document.getElementById("searchBtn")
const results = document.getElementById("results")
const loading = document.getElementById("loading")

button.onclick = async () => {

    const username = document.getElementById("username").value.trim()

    if(!username){
        alert("Enter a Letterboxd username")
        return
    }

    results.innerHTML = ""
    loading.classList.remove("hidden")

    const res = await fetch(`https://api.boxdbrain.cc/recommend?user=${username}`)
    const data = await res.json()

    loading.classList.add("hidden")

    movies = data.movies
    index = 0

    showMovie()

}

function showMovie(){

    const movie = movies[index]

    const slug = movie.title
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g,"")
        .replace(/ /g,"-")

    const link = `https://letterboxd.com/film/${slug}/`

    results.innerHTML = `

    <div class="bg-zinc-800 rounded-xl overflow-hidden max-w-md mx-auto">

        <img src="${movie.poster || ''}" class="w-full">

        <div class="p-4">

        <h2 class="text-xl font-bold mb-1">
        <a href="${link}" target="_blank" class="hover:text-green-400">
        ${movie.title}
        </a>
        </h2>

        <p class="text-sm text-zinc-400 mb-2">
        ${movie.year || ""}
        </p>

        <p class="text-sm text-yellow-400 mb-3">
        ⭐ ${movie.rating ? movie.rating.toFixed(1) : ""}
        </p>

        <p class="text-sm text-zinc-300">
        ${movie.reason}
        </p>

        <p class="text-xs text-zinc-500 mt-3">
        <a href="${link}" target="_blank" class="hover:text-green-400">
        View on Letterboxd
        </a>
        </p>

        </div>

    </div>

    <div class="text-center mt-6">

        <button onclick="nextMovie()" class="bg-green-500 hover:bg-green-400 px-6 py-3 rounded text-black font-semibold">
        Show Another
        </button>

    </div>

    `

}

function nextMovie(){

    index++

    if(index >= movies.length){
        index = 0
    }

    showMovie()

}