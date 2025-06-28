## To run this API, follow these steps:

1. **Initialize a Node.js project**:
- Create a new directory and run `npm init -y` to create a `package.json`.
- Install dependencies: `npm install express body-parser`.
2. **Save the code**:
- Save the above code in a file named `server.js`.
3. **Run the server**:
- Execute `node server.js` in your terminal.
- The server will start on `http://localhost:3000`.
4. **Test the API**:
- Use tools like Postman or curl to test the endpoints:
    - GET `/api/products` - Retrieve all products.
    - GET `/api/products/:id` - Retrieve a product by ID.
    - POST `/api/products` - Create a new product (send JSON like `{"name": "Tablet", "price": 299.99}`).
    - PUT `/api/products/:id` - Update a product (send JSON with updated fields).
    - DELETE `/api/products/:id` - Delete a product.