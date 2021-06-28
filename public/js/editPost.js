const updatePostHandler = async (event) => {
  event.preventDefault();

  const post_title = document.querySelector('#post_title').value.trim();
  const post_body = document.querySelector('#post_body').value.trim();

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/edit/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ post_title, post_body }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update post');
    }
  }
};

const deletePostHandler = async (event) => {
  event.preventDefault();

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/edit/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
};

const cancelBtnHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute('data-id')){
  document.location.replace('/dashboard');
}};

document
.querySelector('.update-btn')
.addEventListener('click', updatePostHandler);

document
.querySelector('.delete-btn')
.addEventListener('click', deletePostHandler);

document
.querySelector('.cancel-btn')
.addEventListener('click', cancelBtnHandler);