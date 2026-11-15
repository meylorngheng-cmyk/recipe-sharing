## M1  What state lives in a store and what stays inside a component? why?

In my Tasteit project, I put shared application data in Pinia stores when multiple components need to access or update the same data. For example, `recipeStore.ts` manages recipes, `authStore.ts` manages the current user and authentication, and `collectionStore.ts` manages collections and saved recipe IDs.

On the other hand, I keep component-specific state inside a component when it is only needed by that component, such as whether a menu is open or whether a password is visible.

I use this approach because it gives each piece of data one clear owner, avoids unnecessary duplication, and makes the application easier to maintain. Components can receive data through props and communicate changes through events instead of directly modifying shared data.

**if multiple parts of the application need the data, use a store; if only one component needs it, keep it inside that component.**
