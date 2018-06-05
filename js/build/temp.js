/* global $ JS_PAGE Cookies */

let getAllArticles = `
    query AllArticles {
      allArticles {
        id,
        title,
        content
      }
    }
`;

let CreateArticle = `
    mutation CreateArticle($authorId: ID!, $title: String!, $content: String) {
        createArticle(authorId: $authorId, title: $title, content: $content) {
            id,
            title
        }
    }
`;

$(document).ready(function () {
    // List View
    if (typeof JS_PAGE !== 'undefined' && JS_PAGE == 'list_view') {
        $.post({
            url: 'https://api.graph.cool/simple/v1/cjhk1cqby89yz0107u4hghp0k',
            data: JSON.stringify({
                query: getAllArticles
            }),
            success: response => {
                let articles = response.data.allArticles;
                let html = '';
                for (let article of articles) {
                    html += `<h2>${article.title}</h2>
                             <p>${article.content}</p>`;
                }
                $('#main-content').html(html);
            },
            contentType: 'application/json'
        });
    }

    // Form View
    if (typeof JS_PAGE !== 'undefined' && JS_PAGE == 'form_view') {
        $('#save-article-button').on('click', event => {
            event.preventDefault();
            let title = $('#title').val(),
                content = $('#content').val(),
                authorId = Cookies.get('authorId');

            $.post({
                url: 'https://api.graph.cool/simple/v1/cjhjspp3l43x40186ohece9if',
                data: JSON.stringify({
                    query: CreateArticle,
                    variables: {
                        title: title,
                        content: content,
                        authorId: authorId
                    }
                }),
                headers: {
                    Authorization: 'Bearer ' + Cookies.get('token')
                },
                success: response => {
                    let article = response.data;
                    console.log(article);
                },
                contentType: 'application/json'
            });
        });
    }
});

/* global $ JS_PAGE Cookies */

let loginMutation = `
    mutation AuthenticateUser($email: String!, $password: String!) {
        authenticateUser(email: $email, password: $password) {
            id,
            token
        }
    }`;

$(document).ready(function () {
    // Login View
    if (typeof JS_PAGE !== 'undefined' && JS_PAGE == 'login_view') {
        $('#login-button').on('click', event => {
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
                success: response => {
                    let user = response.data.authenticateUser;
                    if (user === null) {
                        alert('Login failed! Try again.');
                    } else {
                        console.log(user);
                    }
                },
                contentType: 'application/json'
            });
        });
    }
});
