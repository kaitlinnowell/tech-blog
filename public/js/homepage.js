const loadComments = (event) => {
  const linkText = `/comments/:${this.data.postId}`
  console.log(linkText)
    document.location.replace(linkText)
}

document
    .querySelector('.post')
    .addEventListener('click',  loadComments);