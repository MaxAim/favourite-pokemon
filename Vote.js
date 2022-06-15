var pokemonList = []
var tempList = []
var title = ''

const CreateList = (kind, val) => {
    title = val
    $("a:eq(1)").attr("onclick", "Vote(pokemon1)")
    $("a:eq(0)").attr("onclick", "Vote(pokemon2)")
    $("h3").hide();
        $.ajax({
            type: "get",
            url: `https://pokeapi.co/api/v2/${kind}/${val}`,
            data: "data",
            dataType: "JSON",
            success: function (response) {
                object = response.pokemon_species || response.pokemon
                for (const key in object) {
                    if (Object.hasOwnProperty.call(object, key)) {
                        const element = object[key];
                        pokemonList.push(element.name || element.pokemon.name)
                    }
                }
            }
        });
    setTimeout(() => {
        Load()
        $("button").hide();
        $("h1").text(`Pick your favourite (${pokemonList.length} left)`);
        $(".subContainer").css("min-width", "37vw");
        $(".subContainer").css("min-height", "37vw");
        $(".desktop").css("display", "block");
    }, 1000);
}

const AjaxPk = (pk, pkm) => {
    $.ajax({
        type: "get",
        url: `https://pokeapi.co/api/v2/pokemon/${pokemonList[pk]}`,
        data: "data",
        dataType: "JSON",
        success: function (response) {
            $(`h2:eq(${pkm})`).hide();
            $(`img:eq(${pkm})`).hide()
            $(`h2:eq(${pkm})`).text(response.name);
            if(response.sprites.other["official-artwork"].front_default !== null){
                $(`img:eq(${pkm})`).attr("src", `${response.sprites.other["official-artwork"].front_default}`);
            }
            else{
                Vote(pk);
            }
            $(`h2:eq(${pkm})`).show();
            setTimeout(() => {
                $(`img:eq(${pkm})`).fadeIn(500);
            }, 600);
        }
    });
}


const Load = () => {
    if (pokemonList.length > 1){
        pokemon1 = Math.floor(Math.random() * pokemonList.length);
        pokemon2 = Math.floor(Math.random() * pokemonList.length);
        if (pokemon1 !== pokemon2){
            AjaxPk(pokemon1, 0)
            AjaxPk(pokemon2 ,1)
        }
        else{
            Load()
        }
    }
    else{
        window.location.href = `/result.html?${pokemonList[0]}=${title}`
    };
};

const Vote = (pokemonNum) => {
    pokemonList.splice(pokemonNum, 1)
    $("h1").text(`Pick your favourite (${pokemonList.length} left)`);
    Load()
}

const byGen = () => {
    $(".genContainer").css("display", "inline")
    $(".typeContainer").css("display", "none")
}

const byType = () => {
    $(".typeContainer").css("display", "inline")
    $(".genContainer").css("display", "none")
}

const Result = () => {
    var bestPokemon = new URLSearchParams(window.location.search).toString().split('=')
    pokemonList.push(bestPokemon[0])
    AjaxPk(0, 0);
    setTimeout(() => {
        $("h1").text(`The best ${bestPokemon[1]} pokemon is:`);
    }, 0);
}