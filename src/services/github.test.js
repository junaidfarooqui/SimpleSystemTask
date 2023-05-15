import {
    searchUsersByUsername,
    fetchRepositoriesByUser,
} from './github';

describe('Github API', () => {
    const mockFetch = jest.fn();
    global.fetch = mockFetch;

    afterEach(() => {
        mockFetch.mockReset();
    });

    describe('searchUsersByUsername', () => {
        test('fetches users by username and returns the items', async () => {
            const username = 'john_doe';
            const perPage = 5;
            const responseData = {
                items: [
                    { id: 1, login: 'john_doe' },
                    { id: 2, login: 'jane_smith' },
                ],
            };

            mockFetch.mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(responseData),
            });

            const users = await searchUsersByUsername(username, perPage);

            expect(mockFetch).toHaveBeenCalledWith(
                `https://api.github.com/search/users?q=${username}&per_page=${perPage}`
            );
            expect(users).toEqual(responseData.items);
        });

        test('throws an error when the fetch fails', async () => {
            const username = 'john_doe';

            mockFetch.mockResolvedValue({
                ok: false,
            });

            await expect(searchUsersByUsername(username)).rejects.toThrow(
                'Failed to search users'
            );
        });
    });

    describe('fetchRepositoriesByUser', () => {
        test('fetches repositories by username and returns the data', async () => {
            const username = 'john_doe';
            const responseData = [
                { id: 1, name: 'Repo 1', description: 'Description 1', stargazers_count: 10 },
                { id: 2, name: 'Repo 2', description: 'Description 2', stargazers_count: 20 },
            ];

            mockFetch.mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(responseData),
            });

            const repositories = await fetchRepositoriesByUser(username);

            expect(mockFetch).toHaveBeenCalledWith(
                `https://api.github.com/users/${username}/repos`
            );
            expect(repositories).toEqual(responseData);
        });

        test('throws an error when the fetch fails', async () => {
            const username = 'john_doe';

            mockFetch.mockResolvedValue({
                ok: false,
            });

            await expect(fetchRepositoriesByUser(username)).rejects.toThrow(
                'Failed to fetch repositories'
            );
        });
    });
});
