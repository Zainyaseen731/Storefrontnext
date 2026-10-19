
import { learningFetch } from '@/lib/learning-fetch';

// Defines the structure of the task data we expect from the sample API.
// These types help TypeScript understand the response fields.
type LearningApiResponse = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};


/**
 * Checks whether an unknown value has the fields we expect
 * from the sample API.
 *
 * "value is LearningApiResponse" tells TypeScript that the
 * value has this type when the function returns true.
 */
function isLearningApiResponse(
    value: unknown
): value is LearningApiResponse {
    // First, make sure the value is an object and not null.
    if (typeof value !== 'object' || value === null) {
        return false;
    }

    // Treat the object as a key-value record so we can
    // safely check each expected property.
    const data = value as Record<string, unknown>;

    // Check that every required property has the correct type.
    return (
        typeof data.userId === 'number' &&
        typeof data.id === 'number' &&
        typeof data.title === 'string' &&
        typeof data.completed === 'boolean'
    );
}


/**
 * Fetches task data from the sample API.
 *
 * This function defines which endpoint to call and which response type
 * to expect. The shared learningFetch() function handles the HTTP request
 * and common error handling.
 *
 * @returns The task data returned by the API.
 */

export async function getLearningData(
    todoId: number
): Promise<LearningApiResponse[]> {
    // Keep the request headers separate from the endpoint.
    const headers = {
        Accept: 'application/json',
    };

    // Safely create the query string, for example "?id=2".
    const queryParams = new URLSearchParams({
        id: String(todoId),
    });

    // Treat the API response as unknown until we validate it.
    const response = await learningFetch<unknown>(
        `/todos?${queryParams.toString()}`,
        headers
    );

    // We expect the API to return an array of todos.
    if (!Array.isArray(response)) {
        throw new Error('Invalid API response: expected an array');
    }

    // Check every item before trusting its TypeScript type.
    const todos: LearningApiResponse[] = response.map((item) => {
        if (!isLearningApiResponse(item)) {
            throw new Error('Invalid API response: todo has unexpected fields');
        }

        return item;
    });

    // Return the data only after validation succeeds.
    return todos;
}

