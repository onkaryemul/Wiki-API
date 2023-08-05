
# WikiAPI Project

The WikiAPI project is a RESTful API that allows users to perform CRUD (Create, Read, Update, Delete) operations on articles. It serves as a basic backend for managing articles, where each article contains a title and content.

### Project Description:
The wikiAPI project is a RESTful API that allows users to perform CRUD (Create, Read, Update, Delete) operations on a collection of articles. The API is built using Node.js, Express.js, and MongoDB with Mongoose as the ODM (Object-Document Mapping) library. It follows the principles of REST (Representational State Transfer) and provides endpoints to access and manipulate article data. Users can retrieve a list of all articles, access a specific article by its title, add new articles, update existing articles, and delete articles as needed.

### Features:

- Create a new article: Users can send a POST request to `/articles` with a JSON body containing the `title` and `content` of the new article. The server will save the article in the MongoDB database.
- Read articles (all or specific article): Users can fetch all articles or a specific article by sending a GET request to `/articles` or `/articles/:articleTitle`, respectively. The server retrieves the articles from the database and sends them as a response.
- Update an article: Users can update an existing article by sending a PUT request to `/articles/:articleTitle` with a JSON body containing the updated `title` and `content`. The server will find the article based on the provided `:articleTitle` and update it in the database.
- Partial update of an article: Users can perform a partial update of an article by sending a PATCH request to `/articles/:articleTitle` with a JSON body containing the fields they want to update. The server will use the `$set` operator to apply the partial update to the article.
- Delete an article: Users can delete an article by sending a DELETE request to `/articles/:articleTitle`. The server will find the article based on the provided `:articleTitle` and remove it from the database.

### Technologies Used:

- Node.js: A JavaScript runtime that allows us to run server-side applications using JavaScript.
- Express.js: A web application framework for Node.js that simplifies the process of building robust APIs.
- MongoDBB: A NoSQL database that stores the articles as JSON-like documents.
- Mongoose (Object-Document Mapping library): A MongoDB object modeling tool that provides a schema-based solution to interact with the MongoDB database.
- Postman (API testing tool): An API testing tool that allows users to test API endpoints by sending HTTP requests and receiving responses.

## How to Run the Project

1. Install Node.js and MongoDB on your system.
2. Clone the repository and navigate to the project directory in the terminal.
3. Run `npm install` to install the required dependencies.
4. Create a `.env` file in the project root and set the environment variables for MongoDB (DB_USERNAME, DB_PASSWORD).
5. Start the server by running `node app.js`.
6. Use Postman or any other API testing tool to interact with the API endpoints.

## Project Structure

- `app.js`: Main file that sets up the Express server and defines the API endpoints.
- `views/`: Contains the EJS views for rendering the home page and other routes (if applicable).
- `public/`: Contains static assets like CSS and client-side JavaScript (if applicable).

### Getting Started:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up a MongoDB database and update the connection URL in `app.js` using `mongoose.connect()`.
4. Start the server using `node app.js`.
5. Access the API endpoints using a tool like Postman or by making HTTP requests using a client application.

### API Endpoints:

- *GET `/articles`*: Fetches all the articles in the database.
- *POST `/articles`*: Creates a new article in the database.
- *DELETE `/articles`*: Delete all articles in the database.
- *GET `/articles/:articleTitle`*: Fetches a specific article by its title.
- *PUT `/articles/:articleTitle`*: Updates an existing article by its title (full replacement).
- *PATCH `/articles/:articleTitle`*: Updates an existing article partially by its title (Partial update of a specific article).
- *DELETE `/articles/:articleTitle`*: Deletes an article by its title.

#### Fetch All Articles
- *URL*: `/articles`
- *Method*: GET
- *Description*: Fetches all the articles in the database.
- *Response*: An array of article objects.

#### Create a New Article
- *URL*: `/articles`
- *Method*: POST
- *Description*: Creates a new article in the database.
- *Request Body*: JSON object with `title` and `content` properties.
- *Response*: A success message or an error message.

#### Fetch a Specific Article
- *URL*: `/articles/:articleTitle`
- *Method*: GET
- *Description*: Fetches a specific article by its title.
- *Response*: An article object or a "Not found" message.

#### Update an Article (Full Replacement)
- *URL*: `/articles/:articleTitle`
- *Method*: PUT
- *Description*: Updates an existing article by its title (full replacement).
- *Request Body*: JSON object with `title` and `content` properties.
- *Response*: A success message or an error message.

#### Update an Article (Partial Update)
- *URL*: `/articles/:articleTitle`
- *Method*: PATCH
- *Description*: Updates an existing article partially by its title.
- *Request Body*: JSON object with the properties to be updated.
- *Response*: A success message or an error message.

#### Delete an Article
- *URL*: `/articles/:articleTitle`
- *Method*: DELETE
- *Description*: Deletes an article by its title.
- *Response*: A success message or an error message.

### Contributors:

- Onkar

---
For more details about the code implementation and routes, refer to the `app.js` file.
