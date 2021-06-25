
const delCommentHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/comment/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/posts');
    } else {
      alert('Failed to delete comment');
    }
  }
};

document
  .querySelector('.comment-list')
  .addEventListener('click', delCommentHandler);
