**_TestContextProvider_**

///Define Types:
type TestContextType = ...

type PropsType = { children: ReactNode }

type StateType = {...}

type ActionType = {...}

/// if there is not initial value:
const TestContext = createContext<TestContextType | null>(null)

/// if there is an initial value:
const testContext = createContext<TestContextType>(initialValue)

const initalState: StateType = {...}

const testReducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case ... :
            return ...
        case ... :
            return ...
        default: 
            throw new Error("...")
    }
}

const TestProvider: React.FC<PropsType> = ({children}) => {

const [{state1, state2}, dispatch] = useReducer(testReducer, initialState)

const value: TestContextType = {state, dispatch}
return(
<TestContext.Provider value={value}>
{children}
</TestContext.Provider>
)}

export default TestProvider

export function useTest(){
const context = useContext(TestContext)
if(!context) throw new Error("useTest must be used within a TestProvider")
return context
}




---
