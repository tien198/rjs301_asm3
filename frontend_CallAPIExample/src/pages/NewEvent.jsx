import React from 'react';
import EventForm from '../components/EventForm';
import { json, redirect } from 'react-router-dom';
import { SERVER_BASE_URL } from '../ulties/http';
import { getAuthToken } from '../ulties/auth';

function NewEvent(props) {
    return (
        <EventForm method='POST' />
    );
}

export default NewEvent;


export async function action({ request, params }) {
    const { method } = request

    const formData = await request.formData()
    const data = Object.fromEntries(formData.entries())

    let actionUrl = `${SERVER_BASE_URL}/events`

    if (method === 'PATCH') {
        const { id = '' } = params
        actionUrl = `${SERVER_BASE_URL}/events/${id}`
    }

    const response = await fetch(actionUrl, {
        method: method,
        headers: {
            'Content-type': 'application/json',
            'authorization': 'bearer ' + getAuthToken()
        },
        body: JSON.stringify(data)
    });

    if (response.status === 422) {
        return response
    }

    if (!response.ok)
        return json({ message: 'could not post event' }, { status: 500 })

    return redirect('/events')
}