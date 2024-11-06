import React from 'react';
import EventsNavigation from '../components/EventsNavigation'
import { Outlet } from 'react-router-dom';

function EventsRoot(props) {
    return (
        <>
            <EventsNavigation />
            <Outlet />
        </>
    );
}

export default EventsRoot;