export interface formDataType{
    readonly id: string,
    title: string,
    date: Date,
    description: string,
    limit: number,
    location: string,
    attendees: attendeeType[]
}
export interface attendeeType {
    name: string;
    email: string;
}