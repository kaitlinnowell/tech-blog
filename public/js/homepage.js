document.addEventListener("DOMContentLoaded", function () {
  const addComments = async (event) => {
    event.preventDefault();
    
    //Get user input values
    const text = document.querySelector('#comment-text').value.trim();
    const queryString = window.location.href;
    const splitString = queryString.split('/')
    const postId = splitString[splitString.length -1]
    console.log(postId);
    if (text) {
      // Call the signup route with the user input provided
      const response = await fetch('/api/comments/add', {
        method: 'POST',
        body: JSON.stringify({ text: text, post_id: postId }),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response.ok)
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to add comment');
      }
    }
  };

  // Ensure the DOM elements are available before adding event listeners
  const addCommentButton = document.querySelector('#add-comment');
  const homeButton = document.querySelector('#home');

  if (addCommentButton) {
    addCommentButton.addEventListener('click', addComments);
  } else {
    console.error('Add comment button not found');
  }

  if (homeButton) {
    homeButton.addEventListener('click', (event) => {
      event.preventDefault();
      document.location.replace('/');
    });
  } else {
    console.error('Home button not found');
  }
});
