import { Link,  useHistory } from "react-router-dom";

const Navbar = ({ FetchData }) => {
    const history = useHistory();
    const handleClick = (el) => {
        if(document.querySelectorAll('.nav-wrapper.collapse.show').length === 1){
            document.getElementById("navbar-toggler").click();
        }
    }
    const handleEnter = (el) => {
        if(el.key === 'Enter') {
            var searchValue = el.target.value;
            if(searchValue === ''){
                alert("Please input a name or id.");
            }
            else{
                history.push("/pokemon/" + searchValue)
                handleClick();
            }   
        }
    }
    const handleSearchButton = (el) => {
        var searchValue = document.getElementById('search-input').value;
        if(searchValue === ''){
            alert("Please input a name or id.");
        }
        else{
            history.push("/pokemon/" + searchValue)
            handleClick();
        }
    }

    return (    
        <nav className="navbar fixed-top navbar-expand-md navbar-dark topnav" id="navbarTop" style={{zIndex:500}}>
            <div className="container-fluid d-md-none" style={{zIndex:501}}>
                <Link className="navbar-brand py-0" to="/">
                    <img className="img-logo img-responsive ms-2 me-0" src="/images/pokeball.png" alt="logo" width="auto" height="40px"/>
                </Link>
                <Link className="navbar-brand" to="/" onClick={() => handleClick()}>Pokédex</Link>
                <a className="navbar-toggler" id="navbar-toggler" href="#navbarSupportedContent" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </a>
            </div>
            <div className="container-fluid" style={{backgroundColor:'inherit'}}>
                <div className="collapse navbar-collapse nav-wrapper" id="navbarSupportedContent">
                    <Link className="navbar-brand d-md-block d-none py-0" to="/">
                        <img className="img-logo img-responsive ms-2 me-0" src="/images/pokeball.png" alt="logo" width="auto" height="40px"/>
                    </Link>
                    <Link className="navbar-brand d-md-block d-none" to="/">Pokédex</Link>
                    <div className="navbar-nav text-center me-auto mb-0">
                        <Link className="nav-about nav-item nav-link" to="/pokedex" onClick={() => handleClick()}>Pokémon List</Link>
                    </div>
                    <div className="d-flex ">
                        <input className="form-control me-2" id="search-input" type="search" placeholder="Type a name or id" aria-label="Search" onKeyPress={handleEnter}/>
                        <button className="btn btn-warning" id="search-button" onClick={() => handleSearchButton()}>Search</button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
