import axios from "axios";

interface Post {
  userId: Number;
  id: Number;
  title: String;
  body: String;
}

export const get = async () => {
  // get some posts
  let result = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
    headers: { "Accept-Encoding": "gzip,deflate,compress" },
  });
  let posts: [Post] = result.data;
  return posts;
};
