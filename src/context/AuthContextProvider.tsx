import { ReactNode, useReducer } from "react";
import { useContext } from "react";
import { createContext } from "react";

/// Note: To use useReducer across multiple components, integrate it with the Context API.

type User = {
  name: string;
  email: string;
  password: string;
};

/// desfine the structure of the data and functions stored in the context.
type AuthContext = {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => void;
    logout: () => void;
  };

type InitialState = {
  user: User | null;
  isAuthenticated: boolean;
};

type Action = 
| { type: "login", payload: User }
| { type: "logout" }

type PropsType = {
    children: ReactNode
}
/// ReactNode: Covers all possible children types, including string, number, arrays, fragments, etc.

const fakeUser: User = {
  name: "User",
  email: "user@gmail.com",
  password: "1234",
};


/// initial state
const initialState: InitialState = {
    user: null,
    isAuthenticated: false,
};

/// reducer function
function authReducer(state: InitialState, action: Action): InitialState {
    switch (action.type) {
        case "login":
            return {
                user: action.payload,
                isAuthenticated: true,
            };
            case "logout":
                return {
        user: null,
        isAuthenticated: false,
    };
    default:
        throw new Error("Unknown action");
    }
}

/// create context with type of context
const AuthContext = createContext<AuthContext | null>(null);

const AuthContextProvider: React.FC<PropsType> = ({ children }) => {
  const [{user, isAuthenticated}, dispatch] = useReducer(
    authReducer,
    initialState
  );

  function login(email: string, password: string) {
    if (email === fakeUser.email && password === fakeUser.password) {
      dispatch({type:"login", payload:fakeUser});
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  const values: AuthContext = { user, isAuthenticated, login, logout };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

export function useAuth() {
  return useContext(AuthContext);
}
