import React from 'react';
import EventForm from '../components/EventForm'
import { useRouteLoaderData } from 'react-router-dom';

function EditEvent(props) {
    const data = useRouteLoaderData('event-detail')
    const { event } = data

    return <EventForm method='patch' event={event} />
}

export default EditEvent;