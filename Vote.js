var pokemonList = []
var pokemon1 = 0
var pokemon2 = 0

const CreateList = () => {
    i = 0
    while (i < 898){
        i++
        pokemonList.push(i)
    }
}


const Load = () => {
    if (pokemonList.length > 1){
        pokemon1 = Math.floor(Math.random() * pokemonList.length);
        pokemon2 = Math.floor(Math.random() * pokemonList.length);
        if(pokemon1 !== pokemon2){
            $.ajax({
                type: "get",
                url: `https://pokeapi.co/api/v2/pokemon/${pokemonList[pokemon1]}`,
                data: "data",
                dataType: "JSON",
                success: function (response) {
                    $("h2:eq(0)").text(response.name)
                    $("img:eq(0)").attr("src", `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonList[pokemon1]}.png`);
                }
            });
            $.ajax({
                type: "get",
                url: `https://pokeapi.co/api/v2/pokemon/${pokemonList[pokemon2]}`,
                data: "data",
                dataType: "JSON",
                success: function (response) {
                    $("h2:eq(1)").text(response.name)
                    $("img:eq(1)").attr("src", `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonList[pokemon2]}.png`);
                }
            });
        }
        else{
            Load()
        }
    }
    else{
        $.ajax({
            type: "get",
            url: `https://pokeapi.co/api/v2/pokemon/${pokemonList[0]}`,
            data: "data",
            dataType: "JSON",
            success: function (response) {
                $("h1").text("Your favourite pokemon is:");
                $("h2:eq(0)").text(response.name);
                $("img:eq(0)").attr("src", `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonList[0]}.png`);
                $("h2:eq(1)").hide();
                $("img:eq(1)").hide();
                $(".mainContainer").css("width", "0");
            }
        });
    }
}

const Vote = (pokemonNum) => {
    pokemonList.splice(pokemonNum, 1)
    Load()
}


$(document).ready(function(){
    CreateList()
    Load()
});