import { CellProps } from "./interfaces";

const Cell = (props: CellProps) => {

    return (
        <td
            className="border border-gray-900 text-left pl-2 pr-8"
        >
            {props.displayValue}
        </td>
    )
}

export default Cell;