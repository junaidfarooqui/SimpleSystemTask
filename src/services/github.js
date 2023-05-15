const GITHUB_API_URL = 'https://api.github.com';

export const searchUsersByUsername = async (username, perPage = 5) => {
    const response = await fetch(`${GITHUB_API_URL}/search/users?q=${username}&per_page=${perPage}`);
    if (!response.ok) {
        throw new Error('Failed to search users');
    }
    const data = await response.json();
    return data.items;
};

export const fetchRepositoriesByUser = async (username) => {
    const response = await fetch(`${GITHUB_API_URL}/users/${username}/repos`);
    if (!response.ok) {
        throw new Error('Failed to fetch repositories');
    }
    return await response.json();
};
