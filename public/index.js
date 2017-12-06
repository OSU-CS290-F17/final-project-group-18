// getting the filter update button here
var button = document.getElementById('filter-update-button');
var textInput = document.getElementById('filter-text');

// Adding an event listener to filter update button
button.addEventListener('click',function() {
  // filter through each post
  document.querySelectorAll('.post').forEach(function(post) {
    // get value from text search
    var textValue = textInput.value;
    var postTitle = post.querySelector('.post-title').innerText;

    // if value doesn't show up in node, blow it away
    if (!postTitle.toLowerCase().includes(textValue.toLowerCase()))  {
      post.remove();
    }
  });
});

// get the post-something-button/modal & modal-backdrop
var postSomethingButton = document.getElementById('post-something-button');
var postSomethingModal = document.getElementById('post-something-modal');
var modalBackDrop = document.getElementById('modal-backdrop');

// accessing modal close and cancel button/'x'
var closeModalButton = document.getElementById('modal-close');
var cancelPostButtonInModal = document.getElementById('modal-cancel');

// getting the values input into modal
var postTextInput = document.getElementById('post-text-input');
var postPhotoInput = document.getElementById('post-photo-input');
var postCommentInput = document.getElementById('post-comment-input');

// getting elements needed to clone the node
var createPostButton = document.getElementById('modal-accept');
var node = document.querySelector('.post');
var posts = document.getElementById('posts');

/*--------------------functions to show,hide & clear modal--------------------------*/
function showModal() {
  postSomethingModal.classList.remove('hidden');
  modalBackDrop.classList.remove('hidden');
}

function hideModal() {
  postSomethingModal.classList.add('hidden');
  modalBackDrop.classList.add('hidden');
}

function clearModalInput() {
  var modalInputElements = document.querySelectorAll('#post-something-modal input')
  for (var i = 0; i < modalInputElements.length; i++) {
    modalInputElements[i].value = "";
  }
}

// event listener to button, access to modal/backdrop, remove hidden class
postSomethingButton.addEventListener('click', function () {
  showModal();
});

// event listener to modal close button and cancel button, adds hidden class
closeModalButton.addEventListener('click', function() {
  hideModal();
  clearModalInput();
});

cancelPostButtonInModal.addEventListener('click', function() {
  hideModal();
  clearModalInput();
});

function insertNewPost(description, photoURL, comment) {

  var postTemplateArgs = {
    description: description,
    photoURL: photoURL,
    comment: comment,
  };
  var postHTML = Handlebars.templates.post(postTemplateArgs);

    var postsSection = document.getElementById('posts');
    postsSection.insertAdjacentHTML('beforeend', postHTML);
}

// event listener to post button and cloning first node then formatting to input
createPostButton.addEventListener('click', function() {

  // doing a deep clone on the node to get desired structure, true gets deep copy
  // var nodeClone = node.cloneNode(true);
  //
  // // assigning values and to the newly created node
  // nodeClone.querySelector('.post-title').innerText = postTextInput.value;
  // nodeClone.querySelector('img').src = postPhotoInput.value;
  // nodeClone.querySelector('img').alt = postTextInput.value;
  // nodeClone.querySelector('p').innerText = postCommentInput.value;
  //
  // // appendChild to add node to DOM and then hide/clear modal
  // posts.appendChild(nodeClone);
  insertNewPost();
  hideModal();
  clearModalInput();
});
