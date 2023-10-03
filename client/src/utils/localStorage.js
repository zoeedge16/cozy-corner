export const getSavedBookIds = () => {
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : [];

  return savedBookIds;
};

export const saveBookIds = (bookIdArr) => {
  if (bookIdArr.length) {
    localStorage.setItem('saved_books', JSON.stringify(bookIdArr));
  } else {
    localStorage.removeItem('saved_books');
  }
};

export const removeBookId = (bookId) => {
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : null;

  if (!savedBookIds) {
    return false;
  }

  const updatedSavedBookIds = savedBookIds?.filter((savedBookId) => savedBookId !== bookId);
  localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));

  return true;
};

export const getSavedPosts = () => {
  const savedPosts = localStorage.getItem('saved_posts')
    ? JSON.parse(localStorage.getItem('saved_posts'))
    : [];

  return savedPosts;
};

export const savePost = (post) => {
  const savedPosts = getSavedPosts();
  savedPosts.push(post);
  localStorage.setItem('saved_posts', JSON.stringify(savedPosts));
};

export const removePost = (postId) => {
  const savedPosts = getSavedPosts();
  const updatedSavedPosts = savedPosts.filter((post) => post.id !== postId);
  localStorage.setItem('saved_posts', JSON.stringify(updatedSavedPosts));
};
