{
  // Method to create post
  let createPost = function () {
    // get the form
    let newPostForm = $("#new-post-form");

    // stop default submit and create ajax
    newPostForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: "post",
        url: "/posts/create",
        data: newPostForm.serialize(),
        success: function (data) {
          let newPost = newPostDOM(data.data.post);
          $("#posts-list-container>ul").prepend(newPost);

          deletePost($(" .delete-post-button", newPost));
          // newPost has that class inside of that. the fun will be called on that
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  //Method to add post in DOM
  let newPostDOM = function (post) {
    return $(`<li id="post-${post._id}">
    <div id="post">

      <small>
        <a class="delete-post-button" href="/posts/destroy/${post._id} ">X</a>
      </small>

      <p>${post.content}</p>
      <small> 
      ${post.user.name}
       </small>

      <div class="post-comments">

        <form action="/comments/create" method="post">
          <input
            type="text"
            name="content"
            placeholder="Type Here to add Comment...."
            required
          />
          <input type="hidden" name="post" value=" ${post._id}" />
          <input type="submit" value="Add Comment" />
        </form>

        <div class="post-comments-list">
          <ul id="post-comments-${post._id}">

          </ul>
        </div>

      </div>
    </div>
  </li>`);
  };

  // Method to delete post
  let deletePost = function (deleteLink) {
    $(deleteLink).click(function (e) {
      // console.log("called");
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"), //  get the link that will be called for delete post

        success: function (data) {
          $(`#post-${data.data.post_id}`).remove();
        },

        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };
  // let deletePost = function (deleteLink) {
  //   $(deleteLink).click(function (e) {
  //     e.preventDefault();

  //     $.ajax({
  //       type: "get",
  //       url: $(deleteLink).prop("href"),
  //       success: function (data) {
  //         $(`#post-${data.data.post_id}`).remove();
  //       },
  //       error: function (error) {
  //         console.log(error.responseText);
  //       },
  //     });
  //   });
  // };

  createPost();
}
