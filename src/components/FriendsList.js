import { Link } from "react-router-dom";
import { useAuth } from "../hooks";
import styles from "../styles/home.module.css"

const FriendsList = () => {
    const auth = useAuth();
    const { friends = [] } = auth.user;

    return(
        <div className={styles.friendsList}>
            <div className={styles.header}>Friends</div>

            {friends && friends.length == 0 && (
                <div className={styles.noFriends}>No Friend found!</div>
            )}

            {friends && 
                friends.map((friend) => (
                    <div key={`friend-${friend._id}`}>
                        <Link className={styles.friendsItem} to={`/user/${friend._id}`}>
                            <div className={styles.friendsImg}>
                                <img
                                    src="../assets/man.png"
                                    alt="Friend image"
                                />
                            </div>

                            <div className={styles.friendsName}>{friend.to_user.email}</div>
                        </Link>
                    </div>
                ))}
        </div>
    )
};

export default FriendsList;