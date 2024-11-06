import React, { Suspense } from 'react';
import EventsList from '../components/EventsList';
import { Await, defer, json, useLoaderData } from 'react-router-dom';
import { SERVER_BASE_URL } from '../ulties/http';

function Events() {
    const data = useLoaderData()
    const { events } = data
    if (events.isError)
        return <p>{events.message}</p>

    return (
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading ...</p>}>
            <Await resolve={events}>
                {(loadedEvents) => <EventsList events={loadedEvents} />}
            </Await>
        </Suspense>
    )
}

export default Events;

async function eventsLoader() {
    const response = await fetch(`${SERVER_BASE_URL}/events`);

    if (!response.ok) {
        throw json({ message: 'Fail to fetch events!' }, { status: 500 })
        // throw new Response(JSON.stringify({ message: 'Fail to fetch events!' }), { status: 500 })
    } else {
        const eventsRes = await response.json()
        return eventsRes.events;
    }
}

export function loader() {
    return defer({
        events: eventsLoader()
    })
}