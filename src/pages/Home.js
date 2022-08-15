import React, { useEffect, useState, useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import { FETCH_POSTS_QUERY } from "../utils/graphql";
import { Grid } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

function Home() {
  const { user } = useContext(AuthContext);

  const { error, loading, data } = useQuery(FETCH_POSTS_QUERY);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (data) {
      console.log(data);
      setPosts(data.getPosts);
    }
  }, [data]);

  // const posts = data.getPosts;
  return (
    <Grid columns={3}>
      <Grid.Row className="page_title">
        <h1>Recent Post</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm></PostForm>
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading posts ...</h1>
        ) : (
          posts &&
          posts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 2 }}>
              <PostCard post={post}></PostCard>
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
