
import React from 'react';

declare type ButtonProps = {
    className?: string,
    onClickHandler? : (e: React.MouseEvent<HTMLButtonElement>) => void,
    onMouseOverHandler? : (e: React.MouseEvent<HTMLButtonElement>) => void,
    onMouseOutHandler? : (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button : React.FC<ButtonProps> = (props) => {
    return (
        <button className={props.className!} onClick={props.onClickHandler} onMouseOver={props.onMouseOverHandler} onMouseOut={props.onMouseOutHandler}>
            {props.children}
        </button>
    )
}

export default Button;