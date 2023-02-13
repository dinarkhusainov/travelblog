import React, {useState} from "react";

function Pagination (data, cnt)  {
   
    const [currentPage, setCurrentPage] = useState(1);
    const maxPage = Math.ceil(data.length / cnt);

    const next = () => {
        let nextPage = Math.min(currentPage + 1, maxPage);
        setCurrentPage(nextPage);
    }
    const previous = () => {
        let prevPage = Math.max(currentPage - 1, 1);
        setCurrentPage(prevPage);
    }
    const step = (page) => {
        setCurrentPage(page);
    }
    const setPageData = () => {
        let start = (currentPage - 1) * cnt;
        let end = start + cnt;
        return data.slice(start, end);
    }
    
    return {currentPage, maxPage, next, previous, step, setPageData};
}
 export default Pagination;