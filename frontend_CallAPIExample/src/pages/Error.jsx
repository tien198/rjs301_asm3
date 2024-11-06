import React from 'react';
import PageContent from '../components/PageContent'
import { useRouteError } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

function Error(props) {
    const error = useRouteError()
    let title = 'An error has occurred!'
    let message = 'Something went wrong!'
    console.error(error);



    // message = JSON.parse(error.data).message
    if (error.status === 404) {
        title = 'Not Found!'
        message = 'Could not find resoure or page.'
    }
    else if (error.status === 401) {
        title = 'Not Authorize!'
        message = error.data.message || 'You do not have permission for this resoure.'
        // message = error.data.message
    }
    else if (error.status === 500)
        message = error.data.message

    return (
        <>
            <MainNavigation />
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>
        </>
    );
}

export default Error;