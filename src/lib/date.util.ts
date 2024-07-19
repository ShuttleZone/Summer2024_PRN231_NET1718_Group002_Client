function formatUtcDate(dateString: string) {
    // Create a Date object from the date string
    const date = new Date(dateString);

    // Function to pad single digit numbers with leading zeros
    const pad = (num: number) => num.toString().padStart(2, "0");

    // Extract individual components
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); // Months are zero-indexed
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    // Format the date as desired
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
}

export default formatUtcDate;
