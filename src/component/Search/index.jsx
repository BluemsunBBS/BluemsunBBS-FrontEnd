import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './index.css';

function Search(){

    const params = useParams();

    const navigate = useNavigate();

    const [str, setStr] = useState(params.searchStr);

    const handleClick = () => {
        if (str) navigate(`/list/${str}`);
    }

    return(
        <div className="searchContainer">
            <input
                type="text"
                className="inputBox"
                value={str}
                onChange={(e)=>{setStr(e.target.value)}}
            ></input>
            <button className="searchBtn" onClick={handleClick}>BBS搜索</button>
        </div>
    )
}
export default Search;