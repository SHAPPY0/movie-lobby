# movie-lobby

##### Tech Stack:
Node.js, Express.js, Typescript, MongoDB, Jest

##### Duration:
It took me more than 3 hours becuase I got version conflict issue and it took bit more time to write this document.

##### Instructions:
**Step 1:** Clone the repository.

**Step 2:** Run `npm install` to download all the dependencies.

**Step 3:** In source code rename `env.example` file to `.env` and enter the valid values.

**Step 4**: Run `npm run start` to start the nodejs server.

**Step 5**: Run `npm run test` to run the test cases.

### APIs

##### 1. Admin Login

**URL:** `http://localhost:8100/api/user/login`

**Method:** POST

**Request Body:** 
```json 
{"username": "", "password": ""}
```

**Note:** Make sure to pass the same admin username and password which you will have in your `.env` file in ADMIN_USERNAME and ADMIN_PASSWORD.

**Response Body:**
```json
    {"success": true, "token": <auth_token>}
```

##### 2. Add Movie

**URL:** `http://localhost:8100/api/movies`

**Method:** POST

**Request Headers** 
```json
{"Authorization": "Bearer <auth_token>"}
```

**Request Body:** 
```json 
{
    "title": "Gadar",
    "thumbnail": "https://google.com",
    "genre": ["action", "thriller"],
    "streamLink": "https://google.com",
    "rating": 5,
    "releaseDate": "2012-02-11"
}
```

**Response:**
```json
   {
    "success": true,
    "data": {
        "movie_id": "65a6923f0149d229432d87a1"
    },
    "message": "Movie added successfully"
}
```

##### 3. Get Movies List

**URL:** `http://localhost:8100/api/movies`

**Method:** GET

**Response:**
```json
  {
    "success": true,
    "data": [
        {
            "_id": "65a377630a8fb4360c01109c",
            "title": "Gadar",
            "thumbnail": "https://google.com",
            "genre": [
                "action"
            ],
            "streamLink": "https://google.com",
            "rating": 8,
            "releaseDate": "2012-02-11T00:00:00.000Z",
            "createdAt": "2024-01-14T05:53:53.306Z",
            "updatedAt": "2024-01-14T05:53:53.306Z",
            "__v": 0
        }
    ]
 }
```

##### 4. Update Movie

**URL:** `http://localhost:8100/api/movies/:id`

**Method:** PUT

**Request Headers** 

```json
{"Authorization": "Bearer <auth_token>"}
```

**Request Body:** 
```json 
{
    "title": "Gadar 2",
    "releaseDate": "2012-02-10"
}
```

**Response:**
```json
{"success": true, "message": "Movie updated successfully"}
```

##### 5. Delete Movie

**URL:** `http://localhost:8100/api/movies/:id`

**Method:** DELETE

**Request Headers** 

```json
{"Authorization": "Bearer <auth_token>"}
```

**Response:**
```json
{"success": true, "message": "Movie deleted successfully"}
```

##### 6. Search Movies

**URL:** `http://localhost:8100/api/search?q=gadar`

**Method:** GET

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "_id": "65a377630a8fb4360c01109c",
            "title": "Gadar",
            "thumbnail": "https://google.com",
            "genre": [
                "action"
            ],
            "streamLink": "https://google.com",
            "rating": 8,
            "releaseDate": "2012-02-11T00:00:00.000Z",
            "createdAt": "2024-01-14T05:53:53.306Z",
            "updatedAt": "2024-01-14T05:53:53.306Z",
            "__v": 0
        }
    ]
 }
```
