import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    token : '',
    user : {
        id : '',
        email : '',
        username : '',
    }
}

function getStoredAuthState (){
    const storedToken = localStorage.getItem('token')
    const storedUserString = localStorage.getItem('user')

    if (storedToken){
        return {
            token: storedToken,
            user: JSON.parse(storedUserString)
        }
    }

    return {...initialState}
}


const authSlice = createSlice({
    name :'auth',
    initialState: getStoredAuthState(),
    reducers : {
        setToken (state, action){
            const token = action.payload
            state.token = token
            localStorage.setItem('token', token) 
        },
        setUser (state, action){
            const {id, email, username} = action.payload
            
            state.user.id = id
            state.user.email = email 
            state.user.username = username
            localStorage.setItem('user', JSON.stringify({id, email, username})) 
        },

        resetAuthData() {
            return { ...initialState}
        }
    }
})

export const {setToken, setUser, resetAuthData} = authSlice.actions
export default authSlice.reducer
