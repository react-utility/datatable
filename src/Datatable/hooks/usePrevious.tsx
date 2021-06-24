import {useRef, useEffect} from 'react';
const usePrevious = <T, >(value: T) => {
    const ref : any = useRef<T>();

    useEffect(() => {
        console.log(value);
        ref.current = value;
    },[value]);

    return ref.current;
}

export default usePrevious;