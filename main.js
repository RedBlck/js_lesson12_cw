// 1.
// Отримати відповідь з цього ресурсу відповідь, та вивести в документ як в прикладі на занятті
// https://jsonplaceholder.typicode.com/posts
//     зробити кнопку до кожного поста. при кліку на яку виводяться в окремий блок всі коментарі поточного поста
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(value => value.json())
    .then(posts => {
        for (const post of posts) {
            let postDiv = document.createElement('div');
            postDiv.classList.add('post');
            let title = document.createElement('div');
            title.innerText = `title : ${post.title}`;
            let body = document.createElement('div');
            body.innerText = `body : ${post.body}`;
            let button = document.createElement('button');
            button.innerText = 'comments';
            let commentContainer = document.createElement('div');
            commentContainer.classList.add(`container`);
            fetch('https://jsonplaceholder.typicode.com/comments')
                .then(value => value.json())
                .then(comments => {
                    for (const comment of comments) {
                        if (comment.postId === post.id) {
                            let commentDiv = document.createElement('div');
                            commentDiv.classList.add('comment')
                            let nameComment = document.createElement('div');
                            nameComment.innerText = `name : ${comment.name}`;
                            let emailComment = document.createElement('div');
                            emailComment.innerText = `email : ${comment.email}`;
                            let bodyComment = document.createElement('div');
                            bodyComment.innerText = `body : ${comment.body}`;

                            commentDiv.append(nameComment, emailComment, bodyComment);
                            commentContainer.append(commentDiv);
                        }
                    }
                })

            button.addEventListener('click', function () {
                commentContainer.classList.toggle('container');
                // fetch('https://jsonplaceholder.typicode.com/comments')
                //     .then(value => value.json())
                //     .then(comments => {
                //         for (const comment of comments) {
                //             if (comment.postId === post.id) {
                //                 let commentDiv = document.createElement('div');
                //                 commentDiv.classList.add('comment')
                //                 let nameComment = document.createElement('div');
                //                 nameComment.innerText = `name : ${comment.name}`;
                //                 let emailComment = document.createElement('div');
                //                 emailComment.innerText = `email : ${comment.email}`;
                //                 let bodyComment = document.createElement('div');
                //                 bodyComment.innerText = `body : ${comment.body}`;
                //
                //                 commentDiv.append(nameComment, emailComment, bodyComment);
                //                 postDiv.append(commentDiv);
                //                 button.disabled = true;
                //             }
                //         }
                //     });
            });

            postDiv.append(title, body, button, commentContainer);
            document.body.append(postDiv);
        }
    });