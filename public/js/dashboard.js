

document.addEventListener("DOMContentLoaded", function () {

  const showDashboard = (event) => {
    document.location.replace('/dashboard')
  }
  
  document.querySelector('#dashboard').addEventListener('click', showDashboard);
  
  document
    .getElementById("add-post")
    .addEventListener("click", function () {
      $("#postModal").modal("show");
    });

  document
    .getElementById("save-post")
    .addEventListener("click", async function () {
      const postName = document.getElementById("postName").value.trim();
      const postText = document.getElementById("postText").value.trim();

      if (!postName) {
        console.log("missing postName");
        return;
      }
      if (!postText) {
        console.log("missing postText");
        return;
      }
      const postData = {
        title: postName,
        text: postText,
      };
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      if (response.ok) {
        $("#postModal").modal("hide");
        location.reload();
        } else {
        alert("failed to create post");
      }
    });
});