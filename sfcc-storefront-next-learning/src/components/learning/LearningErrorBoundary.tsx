
import { isRouteErrorResponse, useRouteError } from 'react-router';

/**
 * Displays a friendly error message when the learning route fails.
 *
 * React Router renders this component when the route throws
 * an error, such as a 400 or 404 Response.
 */
export default function LearningErrorBoundary() {
    // Get the error thrown by the loader or route.
    const error = useRouteError();

    // Check whether the error represents an HTTP response.
    if (isRouteErrorResponse(error)) {
        return (
            <main>
                <h1>Something went wrong</h1>

                {/* Display the HTTP status, such as 400 or 404. */}
                <p>Error code: {error.status}</p>

                {/* Display the message thrown by our loader. */}
                <p>{error.data}</p>

                <a href="/global/en-GB/learning/2">
                    Return to the working example
                </a>
            </main>
        );
    }

    // Handle unexpected errors that are not HTTP responses.
    return (
        <main>
            <h1>Unexpected error</h1>
            <p>Something went wrong while loading this page.</p>

            <a href="/global/en-GB/learning/2">
                Return to the working example
            </a>
        </main>
    );
}
