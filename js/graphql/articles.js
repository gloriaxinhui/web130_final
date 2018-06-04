let getAllArticles = `
    query AllArticle {
      allArticles {
        id,
        title,
        content
      }
    }
`;

$(document).ready(function() {
    $.post({
        url: 'https://api.graph.cool/simple/v1/cjhk1cqby89yz0107u4hghp0k',
        data: JSON.stringify({
            query: getAllArticles
        }),
        success: (response) => {
            let articles = response.data.allArticles;
            console.log(articles);
            let html = '';
            for (let article of articles) {
                html += `<h2>${article.title}</h2>
                         <p>${article.content}</p>`;
            }
            $('#main-content').html(html);
        },
        contentType: 'application/json'
    });
});