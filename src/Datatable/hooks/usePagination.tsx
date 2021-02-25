import {useState, useEffect, useRef} from 'react';

type Pagination = {
    currentArray : any[] | null,
    currentPage: number
}
const usePagination = (props: Pagination) : [setPage:(action?:string) => void,isFirst: boolean, isLast: boolean,data: any[],totalRows?: number, ] => {
    const currentArray = useRef<any[]>();
    const slicedArray =  useRef<any[]>();
    const [newData, setNewData] = useState<any[]>([]);
    const [currentSlice, setCurrentSlice] = useState<number>(0);
    const [totalRows, setTotalRows] = useState<number>(0);
    const [pageState, setPageState] =  useState<{isLast:boolean,isFirst:boolean}>({isLast: false, isFirst: true});
    /* const [isLast,setIsLast] = useState<boolean>(false);
    const [isFirst,setIsFirst] = useState<boolean>(true); */

    /* const getPage = (action:string | null) => {
        let tempArray= [];
        switch (action) {
            case 'previous':
                if(slicedArray.current && currentSlice >= 0){
                    tempArray =  slicedArray.current[currentSlice];
                    setCurrentSlice(prevState => prevState -1);
                    currentSlice === 0 ? setIsFirst(true) : setIsFirst(false);
                }else {
                    tempArray = slicedArray.current ? slicedArray.current[0] : [];
                    setIsFirst(false);
                }
                return tempArray;
            case 'next':
                if(slicedArray.current && currentSlice < slicedArray.current.length){
                    tempArray =  slicedArray.current[currentSlice + 1];
                    setCurrentSlice(prevState => prevState +1);
                    currentSlice === slicedArray.current.length ? setIsLast(true) : setIsLast(false);
                }else {
                    tempArray = slicedArray.current ? slicedArray.current[slicedArray.current.length -1] : [];
                    setIsLast(false);
                }
                return tempArray;
            default :
                if(slicedArray.current){
                    return slicedArray.current[0];
                }else{
                    return [];
                }
        }
    } */

    const setPage = (action?:string) => {
        //console.log('setPage is called',currentSlice);
        switch (action) {
            case 'previous':
                if(currentSlice >= 0){
                    if(currentSlice <= 0 ){
                        setPageState({isFirst:true,isLast:false});
                    }else{
                        setPageState({isFirst:false,isLast:false});
                    }
                    setCurrentSlice(currentSlice -1);
                }
                break;
            case 'next':
                if(slicedArray.current){
                    if(currentSlice >= slicedArray.current.length - 1){
                        setCurrentSlice(slicedArray.current.length - 1);
                        setPageState({isFirst:false,isLast:true});
                    }else{
                        setCurrentSlice(currentSlice + 1);
                        setPageState({isFirst:false,isLast:false});
                    }
                }
                break;
            case 'last':
                setCurrentSlice(slicedArray.current!.length - 1);
                setPageState({isFirst:false,isLast:true});
                break;
            
            default:
                setCurrentSlice(0);
                setPageState({isFirst:true,isLast:false});
                break;
        }
    }
    

    useEffect(() => {
        if(props.currentArray !== null){
            currentArray.current = props.currentArray;
            if(currentArray && currentArray.current.length > 0){
                //console.log('useEffect to slice the incoming array',currentArray.current.length,props.currentPage);
                let tempArray = [];
                for(let i = 0; i<currentArray.current.length; i+=props.currentPage){
                    tempArray.push(currentArray.current.slice(i,i+props.currentPage))
                }
                slicedArray.current = tempArray;
                setNewData(tempArray[0]);
                setTotalRows(currentArray.current.length);
            }
        }
        
    },[props.currentPage,props.currentArray]);

    useEffect(() => {
        //console.log('useEffect is called since currentSlice value is changed',currentSlice,slicedArray.current);
        let tempArray : any[] = [];
        if(slicedArray.current){
            if(currentSlice <= 0){
                //console.log('current slice is less than 0');
                setPageState({isFirst:true,isLast:false});
                tempArray =  slicedArray.current[0];
            }
            if(currentSlice > slicedArray.current.length){  
                //console.log('current slice is greater than sliceArray');
                tempArray =  slicedArray.current[slicedArray.current.length -1];
            }
            if(currentSlice > 0 && currentSlice < slicedArray.current.length){
                tempArray =  slicedArray.current[currentSlice];
            }
            //console.log(tempArray,isFirst,isLast,totalRows);
            setNewData(() => tempArray);
        }
    },[currentSlice])


    return [setPage,pageState.isFirst,pageState.isLast,newData,totalRows,];
}

export default usePagination;