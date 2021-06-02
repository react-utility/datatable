import { CellProps } from "./types";

const Cell = (props: CellProps) => {

    return (
        <td>
            {props.displayValue}
        </td>
    )
}

export default Cell;