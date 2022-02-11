import AppRouter from "components/Router";
import {useEffect, useState} from "react";
import {authService} from "fbase";

function App() {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userObj, setUserObj] = useState(null);

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(user);
                setUserObj(user);
            }
            else{
                setIsLoggedIn(false);
            }
            setInit(true);
        });
    }, []);
    // deps 를 [] 로 한 것은 최초로 렌더링이 완료되었을 때 1회만 동작
    return (
        <>
            {init ? (
                <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
                ) : (
                    "initializing..."
            )}
        </>
    );
}

export default App;
