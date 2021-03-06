
 async function attachEvents() {

    document.getElementById('btnLoadPosts').addEventListener('click', getAllPosts);
    document.getElementById('btnViewPost').addEventListener('click', displayPost);
}

attachEvents();

async function displayPost() {
    //get selected value from the list
    // load post 
    // load comments from posts  
    // render data 

    const selectedId = document.getElementById('posts').value;

 const [post,comments]=  await  Promise.all([
         getPostByPostId(selectedId),
         getCommentsByPostId(selectedId)
    ]);

   
    document.getElementById('post-title').textContent = post.title;
    document.getElementById('post-body').textContent = post.body;

    const ulElement = document.getElementById('post-comments');
    ulElement.replaceChildren();

    comments.forEach(c => {
        const liElement = document.createElement('li');
        liElement.textContent = c.text;
        ulElement.appendChild(liElement);
    });

}

async function getAllPosts() {
    const url = 'http://localhost:3030/jsonstore/blog/posts';

    const response = await fetch(url);
    const data = await response.json();

    //parse data and populate in list 

    const selectElement = document.getElementById('posts');
    selectElement.textContent = '';
    Object.values(data).forEach(p => {
        const optionElement = document.createElement('option');
        optionElement.textContent = p.title;
        optionElement.value = p.id;

        selectElement.appendChild(optionElement);

    });

}

async function getPostByPostId(postId) {

    const url = 'http://localhost:3030/jsonstore/blog/posts/' + postId;

    const response = await fetch(url);
    const data = await response.json();
    return data; 




}

async function getCommentsByPostId(postId) {

    const url = 'http://localhost:3030/jsonstore/blog/comments';
    const response = await fetch(url);
    const data = await response.json();

    const comments = Object.values(data).filter(c => c.postId == postId)

    return comments;
}