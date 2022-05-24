import React, { useState } from "react";
import PostCreateForms from "./components/PostCreateForms";
import PostUpdateForm from "./components/PostUpdateForm";
import Constatns from "./utilities/Constants";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [showingCreatePostForm, setShowingCreatePostForm] = useState(false);
  const [showingUpdatePostForm, setShowingUpdatePostForm] = useState(false);
  const [updatingPost, setUpdatingPost] = useState(null);

  function getPosts() {
    const url = Constatns.API_URL_GET_ALL_POSTS;
    const options = {
      method: "GET",
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((postsFromServer) => {
        console.log(postsFromServer);
        setPosts(postsFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }
  
  function deletePost(postId){
    const url =`${Constatns.API_URL_DELETE_POST_BY_ID}/${postId}` ;
    const options = {
      method: "DELETE",
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((resFromServer) => {
        console.log(resFromServer);
        onPostDeleted(postId);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  return (
    <div className="container">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          {(updatingPost===null && !showingCreatePostForm) && (
            <div>
              <h1>ASP.NET Core / React app</h1>
              <div className="mt-5">
                <button
                  onClick={getPosts}
                  className="btn btn-dark btn-lg w-100 "
                >
                  Get Post From server
                </button>
                <button
                  onClick={() => setShowingCreatePostForm(true)}
                  className="btn btn-dark btn-lg w-100 mt-3"
                >
                  Create Post
                </button>
              </div>
            </div>
          )}

          {posts.length > 0 && !showingCreatePostForm && updatingPost===null && renderPostsTable()}

          {showingCreatePostForm && (
            <PostCreateForms onPostCreated={onPostCreated} />
          )}

          {updatingPost !== null && <PostUpdateForm post={updatingPost} onPostUpdated={onPostUpdated}/>}
        </div>
      </div>
    </div>
  );

  function renderPostsTable() {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col">PostId</th>
              <th scope="col">Title</th>
              <th scope="col">Content</th>
              <th scope="col">CRUD Operaqtions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.postId}>
                <th scope="row">{post.postId}</th>
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td>
                  <button className="btn btn-secondary" onClick={()=>setUpdatingPost(post)}>Update</button>
                  <button className="btn btn-dark" onClick={()=>{if (window.confirm(`delete ${post.title} ?`)) deletePost(post.postId)}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => setPosts([])} className="btn btn-dark">
          Empty posts
        </button>
      </div>
    );
  }

  function onPostCreated(createdPost) {
    setShowingCreatePostForm(false)
    if (createdPost === null) {
      return;
    }
    alert(`whoohohohoh: ${createdPost.title}`);
    getPosts();
  }

  function onPostUpdated(updatedPost){
    setUpdatingPost(null)
    if(updatedPost===null){
      return
    }

    let postsCopy = [...posts]

    const index = postsCopy.findIndex((postsCopyPost, currentIndex)=>{
      if(postsCopyPost.postId===updatedPost.postId){
        return true
      }
    })

    if(index !== -1){
      postsCopy[index] = updatedPost
    }
    
    setPosts(postsCopy)
    alert('Post updated')

  }

  function onPostDeleted(deletedPostId){
    let postsCopy = [...posts]

    const index = postsCopy.findIndex((postsCopyPost, currentIndex)=>{
      if(postsCopyPost.postId===deletedPostId){
        return true
      }
    })

    if(index !== -1){
      postsCopy.splice(index, 1);
    }
    
    setPosts(postsCopy)
    alert('Post deleted')

  }
}
