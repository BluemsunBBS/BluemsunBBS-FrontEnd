import { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function Search(){

    const [str, setStr] = useState();

    return(
        <div className="searchContainer">
            <input
                type="text"
                className="inputBox"
                value={str}
                onChange={(e)=>{setStr(e.target.value)}}
            ></input>
            <button className="searchBtn">
                <Link to={`/list/${str}`}>BBS搜索</Link>
            </button>
        </div>
    )
}
export default Search;