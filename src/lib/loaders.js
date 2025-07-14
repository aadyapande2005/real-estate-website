//import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest("/posts/" + params.id);
  return res.data;
};
export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const response = await apiRequest("/posts?" + query);
  return response.data;
};

export const profilePageLoader = async () => {
  //const posts = apiRequest("/users/profilePosts");
  //const chatPromise = apiRequest("/chats");  
  const posts = await apiRequest("/posts/myposts")
  const chats = await apiRequest("/chats");
  const savedposts = await apiRequest("/posts/savedposts");
  return {
    posts : posts.data,
    chats: chats.data,
    savedposts: savedposts.data
  }
};