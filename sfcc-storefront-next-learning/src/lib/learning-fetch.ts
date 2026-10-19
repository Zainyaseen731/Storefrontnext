
/**
 * A reusable function for making API requests.
 *
 * The <T> generic lets the caller define the expected response type.
 *
 * @param path - API endpoint path, such as '/todos/1'.
 * @param headers - Optional HTTP headers to send with the request.
 * @returns The parsed API response.
 */
export async function learningFetch<T>(
    path: string,
    headers: Record<string, string> = {}
): Promise<T> {
    // Read the API base URL from environment configuration.
    const baseUrl = process.env.LEARNING_API_URL;

    // Stop early if the API URL has not been configured.
    if (!baseUrl) {
        throw new Error('LEARNING_API_URL is not configured');
    }

    let response: Response;

    try {
        // Send the request with any headers supplied by the caller.
        // Headers can contain information such as Accept or Authorization.
        response = await fetch(`${baseUrl}${path}`, {
            headers: headers,
        });
    } catch (error) {
        // Handle network failures where fetch() cannot obtain a response.
        throw new Error('Network error: unable to reach the API', {
            cause: error,
        });
    }

    // fetch() does not automatically throw for HTTP errors such as 404 or 500.
    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
    }

    // Parse the JSON response and tell TypeScript its expected type.
    // This assertion does not validate the response at runtime.
    return (await response.json()) as T;
}
