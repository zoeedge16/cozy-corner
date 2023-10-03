const apiKey = 'AIzaSyArZOGWlXci67CNqCYxwddp-mNkoB7xiwQ'

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

// API for adding post
export const addPost  = (postData, token) => {
    return fetch ('/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(postData)
    })
};

// API for adding a comment on a post
export const addComment = (postId, commentData, token) => {
    return fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(commentData)
    });
};

export const searchGoogleBooks = (query) => {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`)
}

// implement this later when we have the core functionality done
// export const getBooks = (bookData, token) => {
//     return fetch ()
// }