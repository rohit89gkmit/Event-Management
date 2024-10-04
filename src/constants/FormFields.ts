interface fieldType{
    fieldName: string,
    type: string,
    required: boolean,
    errorMessage?: string,
    name : string
}

export const formFieldArr : fieldType[] = [
    {
        fieldName: 'Title',
        type: 'text',
        required: true,
        errorMessage: 'Title is required',
        name: 'title'
    },
    {
        fieldName: 'Date',
        type: 'datetime-local',
        required: true,
        errorMessage: 'Date is required',
        name: 'date'
    },
    {
        fieldName: 'Description',
        type: 'text',
        required: false,
        name: 'description'
    },
    {
        fieldName: 'Attendees Limit',
        type: 'number',
        required: false,
        name: 'limit'
    },
    {
        fieldName: 'Location',
        type: 'text',
        required: true,
        errorMessage: 'Location is required',
        name: 'location'
    },
]