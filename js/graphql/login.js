/* global $ JS_PAGE Cookies */

let loginMutation = `
    mutation AuthenticateUser($email: String!, $password: String!) {
        authenticateUser(email: $email, password: $password) {
            id,
            token
        }
    }`;

$(document).ready(function() {
    // Login View
    if (typeof JS_PAGE !== 'undefined' && JS_PAGE == 'login_view') {
        $('#login-button').on('click', (event) => {
            event.preventDefault();
            let username = $('#username').val(),
                password = $('#password').val();
                
            $.post({
                url: 'https://api.graph.cool/simple/v1/cjhk1cqby89yz0107u4hghp0k',
                data: JSON.stringify({
                    query: loginMutation,
                    variables: {
                        email: username,
                        password: password
                    }
                }),
                success: (response) => {
                    let user = response.data.authenticateUser;
                    if (user === null) {
                        alert('Login failed! Try again.');
                    } else {
                        Cookies.set('authorId', user.id, { expires: 7 });
                        Cookies.set('token', user.token, { expires: 7 });
                        // Redirect 
                        window.location = 'article_form.html';
                    }
                },
                contentType: 'application/json'
            });
        });
    }
});
