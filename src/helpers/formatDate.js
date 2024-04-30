export function formatDate(dateParam) {

    const date = new Date(dateParam);
    
    // Get the date components
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    // Construct the formatted date string
    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
}