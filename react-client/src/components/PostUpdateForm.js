import React, { useState } from "react";
import Constants from "../utilities/Constants";

function PostUpdateForm(props) {
  const initialFormData = Object.freeze({
    title: props.post.title,
    content: props.post.content,
  });

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    const postToUpdate = {
      postId: props.post.postId,
      title: formData.title,
      content: formData.content,
    };

    const url = Constants.API_URL_UPDATE_POST;
    const options = {
        method: "PUT",
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(postToUpdate)
      }

    fetch(url, options)
      .then((response) => response.json())
      .then((resFromServer) => {
        console.log(resFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

      props.onPostUpdated(postToUpdate);
  };

  return (
 
      <form className="w-100 px-5">
        <h1 className="mt-5">Update post {props.post.title}</h1>

        <div className="mt-5">
          <label className="h3 form-label">Post title</label>
          <input
            className="form-control"
            onChange={handleChange}
            value={formData.title}
            name="title"
            type="text"
          ></input>
        </div>
        <div className="mt-5">
          <label className="h3 form-label">Post content</label>
          <input
            className="form-control"
            onChange={handleChange}
            value={formData.content}
            name="content"
            type="text"
          ></input>
        </div>
        <button onClick={handleSubmit} className="btn btn-dark mt-5 w-100 btn-lg">
          Submit
        </button>
        <button
          onClick={() => props.onPostUpdated(null)}
          className="btn mt-3 btn-secondary btn-lg w-100"
        >
          Cancel
        </button>
      </form>
    
  );
}

export default PostUpdateForm;
