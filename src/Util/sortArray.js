export const sortArray = (userArray) => {
    const sortedData = [...userArray];
    return sortedData.sort((a, b) => a.cases > b.cases ? -1 : 1)

};