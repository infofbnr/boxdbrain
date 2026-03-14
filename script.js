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

    try{

        const res = await fetch(`https://api.boxdbrain.cc/recommend?user=${username}`)

        const data = await res.json()

        loading.classList.add("hidden")

        renderMovies(data.movies)

    }catch(e){

        loading.innerText = "Error loading recommendations"

    }

}

function renderMovies(movies){

    results.innerHTML = ""

    movies.forEach(movie => {

        const card = document.createElement("div")

        card.className = "movie-card bg-zinc-800 rounded-lg overflow-hidden"

        card.innerHTML = `

        <img src="${movie.poster}" class="w-full">

        <div class="p-3">

        <h3 class="font-semibold text-sm mb-1">
        ${movie.title} (${movie.year})
        </h3>

        <p class="text-yellow-400 text-sm">
        ⭐ ${movie.rating.toFixed(1)}
        </p>

        <p class="text-xs text-zinc-400 mt-1">
        ${movie.reason}
        </p>

        <a href="${movie.tmdb}"
        target="_blank"
        class="text-green-400 text-xs mt-2 inline-block">
        View details
        </a>

        </div>
        `

        results.appendChild(card)

    })

}