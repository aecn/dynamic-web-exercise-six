import React from 'react';

function LoginForm({ logInUser }) {
    return (
        <form className="FormElement" onSubmit={(e) => logInUser(e)}>
            <label htmlFor="email">User Email</label>
            <input type="text" name="email" />

            <label htmlFor="userPassword">Password</label>
            <input type="password" name="userPassword" />

            <button type="submit">Submit</button>
        </form> 
    );
}

export default LoginForm;