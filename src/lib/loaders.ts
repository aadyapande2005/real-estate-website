//import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";
import type { LoaderFunctionArgs } from "react-router-dom";
import type { Post, ProfileLoaderData } from "../types";

export const singlePageLoader = async ({ params }: LoaderFunctionArgs): Promise<Post> => {
  const res = await apiRequest("/posts/" + params.id);
  return res.data;
};
export const listPageLoader = async ({ request }: LoaderFunctionArgs): Promise<Post[]> => {
  const query = request.url.split("?")[1];
  const response = await apiRequest("/posts?" + query);
  return response.data;
};

export const profilePageLoader = async (): Promise<ProfileLoaderData> => {
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