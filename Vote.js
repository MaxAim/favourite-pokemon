var pokemonList = []
var tempList = []
var type = ""

const CreateList = (i, gen, newType) => {
    $("a:eq(1)").attr("onclick", "Vote(pokemon1)")
    $("a:eq(0)").attr("onclick", "Vote(pokemon2)")
    $("h3").hide();
    type = newType
    if(type === ""){
        while (i < gen){
            i++
            $.ajax({
                type: "get",
                url: `https://pokeapi.co/api/v2/pokemon/${i}`,
                data: "data",
                dataType: "JSON",
                success: function (response) {
                    if(response.sprites.other["official-artwork"].front_default !== null){
                        pokemonList.push(response.name)
                    }

                }
            })
        }
    }
    else{
        $.ajax({
            type: "get",
            url: `https://pokeapi.co/api/v2/type/${type}`,
            data: "data",
            dataType: "JSON",
            success: function (response) {
                object = response.pokemon
                for (const key in object) {
                    if (Object.hasOwnProperty.call(object, key)) {
                        const element = object[key];
                        pokemonList.push(element.pokemon.name)
                    }
                }
            }
        });
    }
    setTimeout(() => {
        Load()
        $("button").hide();
        $("h1").text("Pick your favourite");
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
        AjaxPk(0, 0);
        $("h1").text(`Your favourite ${type} pokemon is:`);
        $(".subContainer:eq(1)").hide();
        $(".mainContainer").css("width", "100%");
    };
};

const Vote = (pokemonNum) => {
    pokemonList.splice(pokemonNum, 1)
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