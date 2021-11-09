import "./App.scss";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Pokedex from "./components/Pokedex";
import Pokemon from "./components/Pokemon";
import NotFound from "./components/NotFound";
import { Switch, Route } from "react-router-dom";
import { useState } from 'react';

function App() {
    const [pokemonData, setPokemonData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [allData, setallData] = useState({});

    const FetchData = (url) => {
        setIsLoading(true);
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setallData(data);
            setIsLoading(false);
            setPokemonData(data.results);
        });
    }

    return (
        <div>
            <Navbar FetchData={FetchData}/>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path={["/pokedex/", "/pokedex/offset=:offset/limit=:limit"]}>
                    <Pokedex pokemonData={pokemonData} FetchData={FetchData} isLoading={isLoading} allData={allData}/>
                </Route>
                <Route path="/pokemon/:id" component={Pokemon} />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
}

export default App;
