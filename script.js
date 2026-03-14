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

function showMovie(){

    if(movies.length === 0){

        results.innerHTML = `
        <p class="text-center text-zinc-400">
        No more recommendations
        </p>`
        return
    }

    const movie = movies.shift()

    const movieSlug = slugify(movie.title)
    const movieLink = `https://letterboxd.com/film/${movieSlug}/`

    const likedMatch = movie.reason.match(/liked (.*)/)
    const likedTitle = likedMatch ? likedMatch[1] : ""

    const likedSlug = slugify(likedTitle)
    const likedLink = `https://letterboxd.com/film/${likedSlug}/`

    results.innerHTML = `

    <div class="bg-zinc-800 rounded-xl overflow-hidden max-w-md mx-auto">

        ${movie.poster ? `<img src="${movie.poster}" class="w-full">` : ""}

        <div class="p-5">

            <h2 class="text-xl font-bold mb-2">
                <a href="${movieLink}" target="_blank" class="text-green-400 hover:underline">
                ${movie.title} (${movie.year || ""})
                </a>
            </h2>

            <p class="text-yellow-400 mb-4">
            ⭐ ${movie.rating ? movie.rating.toFixed(1) : "?"}/10 on IMDb
            </p>

            <p class="text-zinc-300">
            Because you liked 
            <a href="${likedLink}" target="_blank" class="text-green-400 hover:underline">
            ${likedTitle}
            </a>
            </p>

        </div>

    </div>

    <div class="text-center mt-6">

        <button onclick="showMovie()" 
        class="bg-green-500 hover:bg-green-400 px-6 py-3 rounded text-black font-semibold">
        Another recommendation
        </button>

    </div>

    `
}