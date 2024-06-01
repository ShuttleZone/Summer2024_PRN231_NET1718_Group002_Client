function formatTime(time?: string): string {
    if (!time) return "00:00";
    const timeFormat = "HH:mm";
    const result = time.substring(0, timeFormat.length);
    return result;
}

export default formatTime;
