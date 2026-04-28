export type LetterVariant = {
    index: number,
    location: string,
    lat: string,
    lng: string,
}

export type LetterData ={
    [key: string]: LetterVariant[]
}