let movies = []

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

    showMovie()
}

function slugify(title){
    return title
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g,"")
        .replace(/ /g,"-")
}
function renderMovie(movie){

    const movieSlug = slugify(movie.title)
    const movieLink = `https://letterboxd.com/film/${movieSlug}/`

    const likedMatch = movie.reason.match(/liked (.*)/)
    const likedTitle = likedMatch ? likedMatch[1] : ""

    const likedSlug = slugify(likedTitle)
    const likedLink = `https://letterboxd.com/film/${likedSlug}/`

    results.innerHTML = `

    <div class="bg-zinc-800 rounded-xl p-6 max-w-md mx-auto text-center">

        ${movie.poster ? `<img src="${movie.poster}" class="w-40 mx-auto rounded mb-4">` : ""}

        <h2 class="text-xl font-bold mb-1">
            <a href="${movieLink}" target="_blank" class="hover:text-green-400">
            ${movie.title} (${movie.year || ""})
            </a>
        </h2>

        <p class="text-yellow-400 mb-3">
            ⭐ ${movie.rating.toFixed(1)}/10 on TMDB
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
async function showMovie(){

    if(movies.length === 0){

        const username = document.getElementById("username").value.trim()

        const res = await fetch(`https://api.boxdbrain.cc/recommend?user=${username}`)
        const data = await res.json()

        movies = data.movies

    }

    const movie = movies.shift()

    renderMovie(movie)

}