export const saveBook  = (bookData, token) => {
    return fetch ('/api/users', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application.json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(bookData)
    })
};

export const deleteBook = (bookId, token) => {
    return fetch (`/api/users/books/${bookId}`, {
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${token}`
        }
    });
}

export const searchGoogleBooks = (query) => {
    return fetch(`https://books.google.com/books/v1/volumes?q=${query}`)
}

// implement this later when we have the core functionality done
// export const getBooks = (bookData, token) => {
//     return fetch ()
// }