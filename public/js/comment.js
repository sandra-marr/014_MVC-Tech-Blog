const commentFormHandler = async (event) => {
  event.preventDefault();


  const str = window.location.pathname;
  const id = str.split("/").reverse().join().split(",",1);
  
  const comment_body = document.querySelector('#comment_body').value.trim();

  if (comment_body && id) {
    const response = await fetch(`/api/post/${id}`, {
      method: 'POST',
      body: JSON.stringify({ comment_body, id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.replace(`/api/post/${id}`);
    } else {
      alert('Failed to add comment');
    }
  }
  else { 
    alert("No comment entered");
  }
};

const deleteCommentHandler = async (event) => {
  event.preventDefault();

  const currentUserId = document.querySelector('.sessUserId').getAttribute('data-id');


  if (event.target.hasAttribute('data-id')) {
    const deleteData = event.target.getAttribute('data-id');

    var deleteDataArr = deleteData.split(",");

    var id = deleteDataArr[0]
    var user_id = deleteDataArr[1];
    var sess_user_id = currentUserId;

    if(user_id === sess_user_id) { 
      const response = await fetch(`/api/comment/${id}`, {
      method: 'DELETE',
      });

      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to delete comment.');
      }
    } else {
      alert('Failed to delete comment. Current user does not own this comment. Cannot delete.');
    }
  }
};

document
  .querySelector('.commentForm')
  .addEventListener('submit', commentFormHandler);

document
  .querySelectorAll('.delete-btn').forEach(item => {
    item.addEventListener('click', deleteCommentHandler);
  });