import { useState } from "react";
import { useToasts } from "react-toast-notifications";
import { addPost } from "../api";
import styles from "../styles/home.module.css";

const CreatePost = () => {
    const [post, setPost] = useState('');
    const [addingPost, setAddingPost] = useState(false);
    const { addToast } = useToasts();

    const handleAddPostClick = async () => {
        setAddingPost(true);

        const response = await addPost(post);
        if(response.success){
            setPost('');
            addToast('Post added successfully', {
                appearance: 'success',
            });
        }else {
            addToast(response.message, {
                appearance: 'error',
            });
        }
        setAddingPost(false);
    };
    return(
        <div className={styles.createPost}>
            <textarea
                className={styles.addPost}
                value={post}
                onChange={(e) => setPost(e.target.value)}
            />

            <div>
                <button
                    className={styles.addPostBtn}
                    onClick={handleAddPostClick}
                    disabled={addingPost}
                >
                    {addingPost ? 'Adding Post...' : 'Add Post'}
                </button>
            </div>
        </div>
    );
};

export default CreatePost;