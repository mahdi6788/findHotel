import { useReducer } from "react"
import { useContext } from "react"
import { createContext } from "react"

const FakeUser = {
    name: "User",
    email: "user@gmail.com",
    password: "1234"
}



const AuthContext = createContext()

const initialState = {
    user: null,
    isAuthenticated: false
}

function authReducer(state, action){
    switch(action.type){
        case "login": return {
            user: action.payload,
            isAuthenticated: true
        }
        case "logout": return {
            user: null,
            isAuthenticated: false
        }
        default: throw new Error("Unknown action");
        
    }
}

function AuthContextProvider({children}) {
    const [{user, isAuthenticated}, dispatch] = useReducer(authReducer,initialState)

    function login(email, password){
        if((email === FakeUser.email) && (password === FakeUser.password)){
            dispatch({type: "login", payload: FakeUser})
        }
    }

    function logout(){
        dispatch({type: "logout"})
    }


    return(
        <AuthContext.Provider value={{user, isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider


export function useAuth(){
    return useContext(AuthContext)
}