export function Login ({loginHandle}){
    return(
        <div className="login">
            <h2>Авторизация</h2>
            <form>
                <input type="text" placeholder="login" name="login"></input>
                <input type="text" placeholder="password" name="password"></input>
                <button type="submit" onClick={loginHandle}>Login</button>
            </form>
        </div>
    )
}