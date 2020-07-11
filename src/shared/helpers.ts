

export const getShortenedString = (string: string) => {
    if(string.length > 30) {
        return string.substring(0, 45) + "...";
    };

    return string;
}
