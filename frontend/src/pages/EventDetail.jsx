import React, { Suspense } from 'react';
import { Await, defer, json, redirect, useRouteLoaderData } from 'react-router-dom';
import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';
import { SERVER_BASE_URL } from '../ulties/http';
import { getAuthToken } from '../ulties/auth';

function EventDetail() {
    const data = useRouteLoaderData('event-detail')
    const { event, events } = data

    return (
        <>
            <Suspense fallback={<p className='text-center'>Loading ...</p>}>
                <Await resolve={event}>
                    {loaded => <EventItem event={loaded} />}
                </Await>
            </Suspense>
            <Suspense fallback={<p className='text-center'>Loading ...</p>}>
                <Await resolve={events}>
                    {loaded => <EventsList events={loaded} />}
                </Await>
            </Suspense>
        </>
    );
}

export default EventDetail;


async function eventLoader(id) {
    const response = await fetch(`${SERVER_BASE_URL}/events/${id}`);
    if (!response.ok)
        throw json({ message: `Fail to fetch event with id "${id}"` }, { status: 500 })
    const eventRes = await response.json()
    return eventRes.event
}

async function eventsLoader() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        throw json({ message: 'Fail to fetch events!' }, { status: 500 })
        // throw new Response(JSON.stringify({ message: 'Fail to fetch events!' }), { status: 500 })
    } else {
        const eventsRes = await response.json()
        return eventsRes.events;
    }
}

export async function loader({ request, params }) {
    const { id } = params
    return defer({
        event: await eventLoader(id),
        events: eventsLoader()
    })
}




export async function deleteAction({ params, request }) {
    const { id } = params
    const response = await fetch(`${SERVER_BASE_URL}/events/${id}`, {
        method: request.method,
        headers: {
            'authorization': 'Bearer ' + getAuthToken()
        }
    });

    if (response.status === 401) {
        throw response

    }
    if (!response.ok) {
        throw json({ message: `Could not delete event with id ${id}` }, { status: 500 })
    }

    return redirect('/events')
}