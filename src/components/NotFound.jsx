import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

const NotFound = () => {
  const [counter, setCounter] = useState(3);
  const history = useHistory();

  
  useEffect(() => {
    if(counter <= 0){
      history.push('/')
    }
    else{
      setTimeout(() => {
       setCounter(counter => counter - 1);
       }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  return (
        <>
            <div className="container page-container">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2 my-5 text-secondary">
                        <p className="h4 my-3 fw-normal text-center text-white">The URL you entered doesn't exist on this site.</p>
                        <p className="h4 my-3 fw-normal text-center text-white">You will be redirected to the homepage in <span className="fw-bold text-danger">{counter + (counter > 1 ?  ' seconds' : ' second')}</span>.</p>
                    </div>
                </div>
            </div>
            <div className="pokemon-background second"></div> 
        </>
  );
};

export default NotFound;
