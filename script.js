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

        card.className = "movie-card bg-zinc-800 rounded-lg overflow-hidden p-3"

        card.innerHTML = `

        <h3 class="font-semibold text-sm mb-1">
        ${movie.title}
        </h3>

        <p class="text-xs text-zinc-400">
        ${movie.reason}
        </p>

        <p class="text-yellow-400 text-xs mt-2">
        Score: ${movie.score.toFixed(1)}
        </p>

        `

        results.appendChild(card)

    })

}