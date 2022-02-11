import { authService } from "../fbase";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
const Profile = ({ userObj, refreshUser }) => {
    const navigate = useNavigate();

    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName === null ? "이름없음" : userObj.displayName);

    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    };

    const onChange = (event) => {
        const {
            target: {value},
        } = event;

        setNewDisplayName(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({displayName: newDisplayName});
            refreshUser();
        }
    }

    // const getMyNweets = async () => {
    //     const nweets = await dbService
    //         .collection("nweets")
    //         .where("creatorId", "==", userObj.uid)
    //         .orderBy("createdAt", "asc")
    //         .get();
    //
    //     console.log(nweets.docs.map((doc) => doc.data()));
    // }
    //
    // useEffect(() => {
    //     getMyNweets();
    // }, []);

    return (
        <>
            <form onSubmit={onSubmit}>
                <input type={"text"} onChange={onChange} placeholder={"Display name"} value={newDisplayName}/>
                <input type={"submit"} value={"Update Profile"} />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};

export default Profile;