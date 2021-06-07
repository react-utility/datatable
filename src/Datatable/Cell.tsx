import { CellProps } from "./types";

const Cell = (props: CellProps) => {

    return (
        <td
            className={props.dense!.isDense ? props.classNames!.cell + ' ' + props.dense!.denseCss : props.classNames!.cell}
        >
            {props.displayValue}
        </td>
    )
}

export default Cell;