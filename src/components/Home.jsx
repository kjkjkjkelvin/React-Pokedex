
const Home = () => {
    return (
        <>
            <div className="container page-container">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2 my-5 text-secondary">
                        <p className="h3 my-3 fw-normal text-center text-white">
                            This is a Pokédex Application using <a href="https://pokeapi.co/" target="_blank" rel="noreferrer">
                                <img className="pokeapi-logo" src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi.svg" alt="PokeAPI-logo"/></a>.
                        </p>
                    </div>
                </div>
            </div>
            <div className="pokemon-background second"></div> 
        </>
    );
    
};

export default Home;
