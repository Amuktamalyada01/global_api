# Global API Assignment

This is a simple Node.js + Express app that uses the JSONPlaceholder public API.

## Setup

1. Clone the repo.
2. Run `npm install`.
3. Run `npm start`.
4. Open `http://localhost:3000/` in the browser.

## Endpoints

- `GET /api/posts` – list all posts.
- `GET /api/posts?userId=1` – list posts filtered by userId.
- `GET /api/posts/:id` – get one post by id.

## Notes

- Uses https://jsonplaceholder.typicode.com as the public API.
- Handles basic errors like invalid id, network errors, and timeouts.
