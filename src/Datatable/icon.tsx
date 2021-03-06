import React, { useRef} from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: string;
  }
  
export const Icon: React.FC<IconProps> = ({ name, ...rest }): JSX.Element | null => {
    const ImportedIconRef = useRef(null);
  
    switch (name) {
        case 'sortAsc':
            return (
            <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" ref={ImportedIconRef} {...rest}>
                    <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg>
            </>)
        case 'sortDesc':
            return (
            <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" ref={ImportedIconRef} {...rest}>
                    <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                </svg>
            </>)    
        default:
            return null;
    }
};

