![Banner](https://www.upload.ee/image/17000518/blogapp.png)

# Blog App

This project is a minimalist blog application developed using SvelteKit and Tailwind CSS. Pocketbase is used as the database.

## Features

- List posts
- View post details
- Search and filter posts
- Pagination
- Responsive design

## Setup

1. **Clone the Project:**
    ```bash
    git clone https://github.com/queaxtra/blog-app.git
    cd blog-app
    ```

2. **Install Dependencies:**
    ```bash
    bun install
    ```

3. **Set Up Pocketbase:**
    - Download and install Pocketbase from [here](https://pocketbase.io/docs/).
    - Start Pocketbase:
        ```bash
        ./pocketbase serve
        ```

4. **Create a .env File:**
    - Create a `.env` file in the project root directory and add the Pocketbase URL:
        ```env
        VITE_APP_POCKETBASE=http://localhost:8090
        ```

5. **Set Up the Database:**
    - Use the Pocketbase admin panel to create a `posts` collection and add the necessary fields (title, content, author, tag, created).

## Running the Project

1. **Start the Development Server:**
    ```bash
    bun run dev
    ```

2. **View in Browser:**
    - Go to `http://localhost:5173` in your browser.

## Project Structure

- **`src/routes`**: Contains SvelteKit routes.
- **`src/lib`**: Contains helper functions and Pocketbase connection.
- **`src/app.css`**: For Tailwind CSS and custom styles.
- **`db.ts`**: For Pocketbase connection and database operations.

## Contributing

1. Fork the project.
2. Create a new branch:
    ```bash
    git checkout -b new-feature
    ```
3. Make your changes and commit them:
    ```bash
    git commit -am 'Added new feature'
    ```
4. Push to the branch:
    ```bash
    git push origin new-feature
    ```
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.