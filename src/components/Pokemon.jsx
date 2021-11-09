import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ImgLoaded = (el) =>{
    document.querySelector(".details-row").classList.remove('not-loaded');
}
const PokemonType = ({type}) => {
    return (
        <span className={`badge bg-type-${type.name} text-capitalize me-1`}>
            {type.name}
        </span>
    );
}

const SpecieData = ({species, pokemon}) => {
    if(species.is_mythical){
        return ( <span className={`evo-pill rounded-pill badge text-capitalize bg-type-mythical`}>Mythical Pokémon</span> );
    }
    else if(species.is_legendary){
        return ( <span className={`evo-pill rounded-pill badge text-capitalize bg-type-legendary`}>Legendary Pokémon</span> );
    }
    else if(species.evolves_from_species !== null){
        let specieData = (species.evolves_from_species.url).split('/');

        return (
            <Link to={`/pokemon/${specieData[specieData.length -2]}`}>
                <span className={`evo-pill rounded-pill badge text-capitalize bg-type-${pokemon.types[0].type.name}`}>Evolves from {species.evolves_from_species.name}</span>
            </Link>
        );
    }
    else{
        return ( <span className={`evo-pill rounded-pill badge text-capitalize bg-type-${pokemon.types[0].type.name}`}>First Evolution</span> );
    }
}

const Pokemon = () => {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState({});
    const [species, setSpecies] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        //species data
        fetch(`https://pokeapi.co/api/v2/pokemon-species/`+id)
        .then(response => response.json())
        .then(data => {
            //pokemon data
            fetch(`https://pokeapi.co/api/v2/pokemon/`+data.id)
            .then(response => response.json())
            .then(data => {
                setPokemon(data);
                setIsLoading(false);
            }).catch(function(error) {
                setIsLoading(false);
                setPokemon({});
            });


            setSpecies(data);
        }).catch(function(error) {
            setIsLoading(false);
            setPokemon({});
            setSpecies({});
        });;
    }, [id]);


    if(isLoading){
        return (
            <>
                <div className="container page-container">
                    <div className="row">
                        <header className="text-white px-4 py-5">
                            <h1 className="text-center">Loading...</h1>
                        </header>
                    </div>
                </div>
                <div className="pokemon-background second"></div>
            </>
        )
    }
    return (
        <>
            <div className="container page-container">
                <div className="row">
                    <div className="col-12 offset-0 col-lg-10 offset-lg-1 mt-2">
                        {(Object.keys(pokemon).length !== 0 && Object.keys(species).length !== 0)
                        ?   <div className="row details-row not-loaded">
                                <div className="col-12 offset-0 col-md-5 offset-md-0">
                                    <div className="col-12 position-relative">
                                        <img className={`img-pokemon mb-2 light-bg-type-${pokemon.types[0].type.name}`} src={pokemon.sprites.other['official-artwork'].front_default} alt="pokemon-img" onLoad={ImgLoaded}/>
                                        <SpecieData species={species} pokemon={pokemon}/>
                                    </div>
                                </div>
                                <div className="col-12 offset-0 col-md-7 offset-md-0">
                                    <div className="col-12">
                                        <div className={`card details-card p-3 lighter-bg-type-${pokemon.types[0].type.name}`}>
                                            <div className="row">
                                                <div className="col-12 mb-3">
                                                    <h2 className="mt-2 d-inline">
                                                        <span className={`align-text-bottom badge bg-type-${pokemon.types[0].type.name}`}>{'#' + ("000" + pokemon.id).slice(-3)}</span>
                                                    </h2>
                                                    <h1 className="mt-2 d-inline big-h1">
                                                        <span className={`text-capitalize fw-bold align-middle text-type-${pokemon.types[0].type.name}`}> {species.name}</span>
                                                    </h1>
                                                </div>
                                                <div className="col-12 mb-3">
                                                    <h4>{(species.flavor_text_entries[1].flavor_text).replace('\f',' ')}</h4>
                                                </div>
                                                <div className="col-12 mb-3">
                                                    <h4> {pokemon.types.length > 1 ? "Types: ": "Type: "}
                                                        {pokemon.types.map((value,i) => {
                                                            return <PokemonType type={value.type} key={i}/>
                                                        })}
                                                    </h4>
                                                </div>
                                        
                                                <div className="col-6">
                                                    <h4 className="d-inline">Generation: </h4>
                                                    <h4 className="d-inline text-uppercase">{(species.generation.name).replace('-',' ').replace('generation','Gen. ')}</h4>
                                                </div>
                                                <div className="col-6">
                                                    <h4>Height: {pokemon.height * 10}cm</h4>
                                                    <h4>Weight: {pokemon.weight * 10}g</h4>
                                                </div>
                                                <div className="col-12 mt-3">
                                                    <h4>Sprites: 
                                                        <div className="sprite-container row text-center">
                                                            <div className="col-12 col-lg-6">
                                                                <h6 className="m-0">Default</h6>
                                                                <img className="sprite-pokemon ms-2 me-0" src={pokemon.sprites.front_default} alt="front_default"/>
                                                                <img className="sprite-pokemon ms-2 me-0" src={pokemon.sprites.back_default} alt="back_default"/>
                                                            </div>
                                                            <div className="col-12 col-lg-6">
                                                                <h6 className="m-0">Shiny</h6>
                                                                <img className="sprite-pokemon ms-2 me-0" src={pokemon.sprites.front_shiny} alt="front_shiny"/>
                                                                <img className="sprite-pokemon ms-2 me-0" src={pokemon.sprites.back_shiny} alt="back_shiny"/>
                                                            </div>
                                                        </div>
                                                    </h4>
                                                </div>
                                                <div className="col-12">
                                                    <h4 className="d-inline">Abilities: </h4>
                                                    <h5 className="d-inline text-right ">
                                                        {pokemon.abilities.map((value,i) => {
                                                            return <span className={`text-capitalize align-text-bottom badge me-1 bg-type-${pokemon.types[0].type.name}`} key={i}>{value.ability.name}</span>
                                                        })}
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                        
                                <div className="col-10 offset-1 my-4 text-center">
                                    <Link className={`btn btn-danger w-25 me-2 my-2 pokemon-previous ${pokemon.id === 1 && 'disabled'}`} to={`/pokemon/${pokemon.id - 1}`}>Previous</Link>
                                    <Link className={`btn btn-danger w-25 me-2 my-2 pokemon-next ${pokemon.id === 898 && 'disabled'}`} to={`/pokemon/${pokemon.id + 1}`}>Next</Link>
                                </div>
                            </div>
                        : 
                            <div className="row">
                                <div className="col-12 0ffset-0 col-md-10 offset-md-1 text-center">
                                    <h1 className="text-white">No Results</h1>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="pokemon-background second"></div>
        </>
    );
};

export default Pokemon;
