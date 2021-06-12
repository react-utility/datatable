export const getClassesAsArray = (classes: string): string[] => {
    return classes.split(" ");
}

export const addClass = (element: HTMLTableRowElement | HTMLTableCellElement, classArray: string[]) => {
    classArray.forEach(item => {
        element.classList.add(item);
    });
}

export const removeClass = (element: HTMLTableRowElement | HTMLTableCellElement, classArray: string[]) => {
    classArray.forEach(item => {
        element.classList.remove(item);
    });
}