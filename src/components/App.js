import AppRouter from "components/Router";
import {useEffect, useState} from "react";
import {authService} from "fbase";

function App() {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(user);
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
            {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "initializing..."}
            <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
            {/*JSX에 자바스크립트 코드를 삽입할 때는 코드를 중괄호로 감싸줘야 해
        주석도 자바스크립트 코드구나*/}
        </>
    );
}

export default App;
