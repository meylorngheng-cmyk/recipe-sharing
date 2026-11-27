# Tasteit – Recipe Sharing System

## M1 – What state lives in a store and what stays inside a component? Why?

In my Tasteit project, I put shared application data in Pinia stores when multiple components need to access or update the same data.

For example:
- `recipeStore.ts` manages recipes.
- `authStore.ts` manages the current user and authentication.
- `collectionStore.ts` manages collections and saved recipe IDs.

On the other hand, I keep component-specific state inside a component when it is only needed by that component, such as whether a menu is open or whether a password is visible.

I use this approach because it gives each piece of data one clear owner, avoids unnecessary duplication, and makes the application easier to maintain. Components can receive data through props and communicate changes through events instead of directly modifying shared data.

**In short:** If multiple parts of the application need the data, use a store. If only one component needs it, keep it inside that component.

---

## How to Run the Project

### 1. Install Dependencies

Open the project folder in the terminal and run:

```bash
npm install
```

### 2. Start the Mock API

Open the first terminal and run:

```bash
npm run api
```

The JSON Server mock API runs at:

`http://localhost:3000`

### 3. Start the Frontend

Open a second terminal in the project folder and run:

```bash
npm run dev
```

Open the local URL displayed in the terminal to access Tasteit.

### Important Note

This project uses JSON Server as a mock API for the M1 frontend prototype. It is not the final backend implementation.