import { Sorting, SortOptions } from "../types";

const useSort = ({sortArray, stortKey, sortDirection = Sorting.ASC} : SortOptions) : any[] => {
    switch (sortDirection) {
        case Sorting.ASC:
            return sortArray.sort((a: any, b: any) => {
                if (a[stortKey] < b[stortKey]) return -1;
                if (a[stortKey] > b[stortKey]) return 1;
                return 0;
            });
        case Sorting.DESC:
            return sortArray.sort((a: any, b: any) => {
                if (a[stortKey] < b[stortKey]) return 1;
                if (a[stortKey] > b[stortKey]) return -1;
                return 0;
            });
    }
}
export default useSort;