function formatTime(time?: string): string {
    if (!time) return "00:00";
    const timeFormat = "HH:mm";
    const result = time.substring(0, timeFormat.length);
    return result;
}

export function formattedTimeToDateTime(timeString: string, date: Date): Date {
    const result = new Date();
    result.setDate(date.getDate());
    const [hours, minutes] = timeString.split(":").map(Number);
    result.setHours(hours, minutes, 0, 0);
    return result;
}

export default formatTime;
