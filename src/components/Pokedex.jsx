import { useEffect } from 'react';
import { useParams, Link,  useHistory } from "react-router-dom";

const ImgLoaded = (el) =>{
    const elParent = el.target.parentElement.parentElement.parentElement.parentElement;
    elParent.classList.remove('not-loaded');
}

const Pokedex = ({FetchData, pokemonData, isLoading, allData}) => {
    const history = useHistory();
    const { offset, limit } = useParams();

    const PageChange = (btn) =>{
        const url = document.querySelector(".table-"+btn).getAttribute("datalink");
        const urlData = url.split("?");

        if(urlData[1]!== undefined){
            let params = (new URL(url)).searchParams;
            let offsetUrl = params.get('offset');
            let limitUrl = params.get('limit');
            history.push(`/pokedex/offset=${offsetUrl}/limit=${limitUrl}`);
            FetchData(`https://pokeapi.co/api/v2/pokemon/?offset=${offsetUrl}&limit=${limitUrl}`);
        }
        else{
            if(offset !== null && offset !== '' && limit !== null && limit !== ''){
                FetchData(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);
            }
            else{
                FetchData(`https://pokeapi.co/api/v2/pokemon`);
            }
        }
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    useEffect(() => {
        console.log(offset,limit)
        if(offset !== null && offset !== '' && limit !== null && limit !== ''){
            FetchData(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);
        }
        else{
            FetchData(`https://pokeapi.co/api/v2/pokemon`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    if(isLoading){
        return (
            <>
                <div className="container page-container">
                    <div className="row">
                        <header className="text-white px-4 py-5">
                            <h1 className="text-center">Pokémon List</h1>
                        </header>
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
                    <header className="text-white px-4 py-5">
                        <h1 className="text-center">Pokémon List</h1>
                    </header>
                    {
                        pokemonData.map((value,i) => {
                            var pokeNumberArray = value.url.split("/");
                            var pokeNumber = pokeNumberArray[pokeNumberArray.length - 2];
                            return ( 
                                <div className="col-6 col-md-4 col-lg-3 card-container mb-4 not-loaded" key={i}>
                                    <div className="card p-2 ">
                                        <Link to={`/pokemon/${pokeNumber}`} className="card-view text-decoration-none">
                                            <div className="position-relative">
                                                <img  className="card-img front-image" alt={value.name + ` image`} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeNumber}.png`} onLoad={ImgLoaded} />
                                                <img className="card-img back-image" alt={value.name + ` image`} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeNumber}.png`} onLoad={ImgLoaded} />
                                            </div>
                                            <div className="card-body pb-2 pt-3">
                                                <h4 className="text-right m-0">{'#' + ("000" + pokeNumber).slice(-3)} </h4>
                                                <h3 className="card-title text-capitalize m-0"> {value.name}</h3>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="text-center">
                        <button className={`btn btn-danger w-25 me-2 my-2 table-previous ${allData.previous === null && 'disabled'}`}  datalink={allData.previous} onClick={() => PageChange("previous")}>Previous</button>
                        <button className={`btn btn-danger w-25 me-2 my-2 table-next ${allData.next === null && 'disabled'}`}  datalink={allData.next} onClick={() => PageChange("next")}>Next</button>
                    </div>
                </div>
            </div>
            <div className="pokemon-background second"></div> 
        </>
    );
};

export default Pokedex;
