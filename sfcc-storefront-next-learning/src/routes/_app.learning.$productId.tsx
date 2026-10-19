
import { useLoaderData } from 'react-router';
import { getLearningData } from '@/lib/learning-api';
import LearningErrorBoundary from '@/components/learning/LearningErrorBoundary';


// React Router passes the URL parameters to the loader.
// Load the todo that matches the ID in the URL.
export async function loader({
    params,
}: {
    params: { productId?: string };
}) {
    // Convert the URL parameter to a number.
    const todoId = Number(params.productId);

    // Reject invalid IDs before making the API request.
    if (!params.productId || !Number.isInteger(todoId) || todoId <= 0) {
        throw new Response('Invalid todo ID', { status: 400 });
    }

    // Fetch matching todos from our sample API.
    const todos = await getLearningData(todoId);

    // The API returns an array, so get the first result.
    const todo = todos[0];

    // Handle an ID that doesn't match any todo.
    if (!todo) {
        throw new Response('Todo not found', { status: 404 });
    }

    // Send the single todo object to the page.
    return todo;
}


export default function LearningPage() {
    const todo  = useLoaderData<typeof loader>();

    return (
        <main>
            <h1>My API Learning Page</h1>
            <p>Task: {todo.title}</p>
            <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
            <p>User ID: {todo.userId}</p>
        </main>
    );
}

export { LearningErrorBoundary as ErrorBoundary };