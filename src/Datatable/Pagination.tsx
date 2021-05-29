import { PaginationProps } from "./types";


const Pagination : React.FC<PaginationProps> = (props) => {

    return(
        <div className={props.classNames.page}> 
            <p>Rows per page</p>
            <select className={props.classNames.select}>
                <option>1</option>
            </select>

            <div className={props.classNames.pageButtonGroup}>
                <button className={props.classNames.pageButton}>First Page</button>
                <button className={props.classNames.pageButton}>Previous</button>
                <button className={props.classNames.pageButton}>Next</button>
                <button className={props.classNames.pageButton}>Last Page</button>
            </div>
        </div>
    )
}

export default Pagination;