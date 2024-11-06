import React, { useEffect } from 'react';
import { json, Outlet, useFetcher, useLoaderData } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';
import { EXPIRED, getTokenDuration } from '../ulties/auth';

function Root(props) {
    const token = useLoaderData()
    const submit = useFetcher().submit
    useEffect(() => {
        if (!token)
            return
        else if (token === EXPIRED)
            submit(null, { action: '/logout', method: 'post' })

        // logout after token exprired
        const tokenDuration = getTokenDuration()
        setTimeout(() => {
            submit(null, { action: '/logout', method: 'post' })
        }, tokenDuration)

    }, [token, submit])
    return (
        <>
            <MainNavigation />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default Root;