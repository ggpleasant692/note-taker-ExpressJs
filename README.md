# note-taker-expressJs

## Skills and Learnings from the Express.js Project

### Express.js Fundamentals

- **Hands-on Experience**: Gained practical experience with Express.js for building backend services.
- **Routing**: Implemented routes to handle different HTTP requests, including GET, POST, and DELETE.

### RESTful API Design

- **API Endpoints**: Designed RESTful API endpoints to manage note data:
  - **GET /api/notes**: Retrieve all notes.
  - **POST /api/notes**: Add a new note with a unique UUID.
  - **DELETE /api/notes/:id**: Delete a note by its UUID.

### File Operations

- **Data Storage**: Used the fs module to read from and write to a db.json file.
- **Error Handling**: Implemented error handling for file read/write operations.

### UUIDs

- **Unique Identifiers**: Utilized the uuid package to generate unique IDs for notes.
- **ID Handling**: Managed note retrieval and deletion using UUIDs in URLs.


### Deployment

- **Deployment to Render**: Deployed the application to Render.
  - **Challenges**: Faced issues where functions stopped working post-deployment.
  - **Solutions**: Required reworking the code and deployment settings to resolve functionality problems.
