import { useSelector } from "react-redux"

export default function Admin () {
    const user = useSelector(state => state.auth.user)


    return <>
        <h1>Ini Admin</h1>
        <h3> Logged in User</h3>
        <p>ID : {user.id}</p>
        <p>email : {user.email}</p>
        <p>username : {user.username}</p>
    </>
}
