import styles from '../styles/home.module.css';
import { FaUserAlt, FaRegHeart, FaRegComment } from "react-icons/fa";

import { Comment, CreatePost, FriendsList, Loader } from '../components';
import { useEffect, useState } from 'react';
import { getPosts } from '../api';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';


const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();
  //console.log(posts);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      //console.log('response', response);

      if(response.success) {
        setPosts(response.data.posts);
      }

      setLoading(false);
    };

     fetchPosts();
  }, []);

  if(loading){
    return <Loader />;
  }
  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
          <CreatePost />
          {posts.map((post) => (
            <div className={styles.postWrapper} key={`post-${post._id}`}>
              <div className={styles.postHeader}>
                <div className={styles.postAvatar}>
                  {/* <img
                    src=""
                    alt="user-pic"
                  /> */}
                  <FaUserAlt style={ {marginTop: 0, height: 35, width: 30} }/>
                  <div>
                    <Link 
                      to={{
                        pathname: `user/${post.user._id}`,
                        state: {
                          user: post.user,
                        },
                      }} 
                      className={styles.postAuthor}>
                      {post.user.name}
                      </Link>
                    <span className={styles.postTime}>a minute ago</span>
                  </div>
                </div>
                <div className={styles.postContent}>{post.content}</div>

                <div className={styles.postActions}>
                  <div className={styles.postLike}>
                    {/* <img
                      src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
                      alt="likes-icon"
                    /> */}
                    <FaRegHeart style={ {height: 18, cursor: "pointer" } }/>
                    <span>5</span>
                  </div>

                  <div className={styles.postCommentsIcon}>
                    {/* <img
                      src="https://image.flaticon.com/icons/svg/1380/1380338.svg"
                      alt="comments-icon"
                    /> */}
                    <FaRegComment style={ {height: 18, cursor: "pointer" } }/>
                    <span>{post.comments.length}</span>
                  </div>
                </div>
                <div className={styles.postCommentBox}>
                  <input placeholder="Start typing a comment" />
                </div>

                <div className={styles.postCommentsList}>
                  {post.comments.map((comment) => (
                    <Comment comment={comment} />
                  ))}
                </div>
              </div>
          </div>
          ))}
      </div>
    {auth.user && <FriendsList />}
    </div>
  );
};

// Home.propTypes = {
//     posts: PropTypes.array.isRequired,
// }

export default Home;
