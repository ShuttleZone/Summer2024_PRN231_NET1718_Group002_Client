function formatTime(time: string): string {
    const timeFormat = "HH:mm";
    const result = time.substring(0, timeFormat.length);
    return result;
}

export default formatTime;
