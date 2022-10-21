import Nav from "../../component/Nav/Nav";
import Search from "../../component/Search";
import SearchResult from "../../component/SearchResult";

function ShowListPage(){
    return(
        <div>
            <Nav/>
            <Search/>
            <SearchResult/>
        </div>
    )
}
export default ShowListPage;