let tableBody = document.getElementById("table-body")
let tableBody1 = document.getElementById("table-body1")
let productContainer = document.getElementById("productContainer");
let todoList = document.getElementById('todo-list');
let post = document.querySelector(".post");
let prod = document.querySelector(".prod");
let list = document.querySelector(".list");


function fetchData(url, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        }, delay);
    });
}
function displayData1(data) {
    post.style.display = "block";
    let html = '';
    html += `<thead>
    <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Body</th>
        <th>UserID</th>
        <th>Tags</th>
        <th>Reactions</th>
    </tr>
</thead>`
    data.posts.forEach(post => {
        html += `<tr>
           <td>${post.id}</td>
           <td>${post.title}</td>
           <td>${post.body}</td>
           <td>${post.userId}</td>
           <td>${post.tags.join(', ')}</td>
           <td>${post.reactions}</td>
         </tr>`;
    });

    tableBody.innerHTML = html;
    document.getElementById('fetchButton').style.display = "none";
}

function displayData2(data) {
    prod.style.display = "block";
    let html1 = '';

    data.products.forEach(product => {

        html1 += `<div class="product">
       <img class="thumbnail" src ="${product.thumbnail}"</img>
       
        <h3>${product.title}</h3>
        <p class="para">${product.description}</p>
        <p class="para">Price: $${product.price.toFixed(2)} | Discount: ${product.discountPercentage}% | Rating: ${product.rating}</p>
        <p class="para">Stock: ${product.stock} | Brand: ${product.brand} | category: ${product.category}</p>
        </div>`
    });
    productContainer.innerHTML = html1;

}



function displayData3(data) {
    list.style.display = "block";
    let html2 = '';

    data.todos.forEach(todo => {
        var className = todo.completed ? 'completed' : 'not-completed';
        html2 += `<li class="${className}">${todo.id}.${todo.todo}</li>`;
    });

    todoList.innerHTML = html2;

}

function promiseAPI1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fetchData('https://dummyjson.com/posts', 0)
                .then(data => {
                    displayData1(data);
                    resolve(true);
                    console.log(data)
                })
                .catch(error => {
                    reject(error);
                });
        }, 1000);
    });
}

function promiseAPI2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fetchData('https://dummyjson.com/products', 0)
                .then(data => {
                    displayData2(data);
                    console.log(data)
                    resolve(true);
                })
                .catch(error => {
                    reject(error);
                });
        }, 2000);
    });
}

function promiseAPI3() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fetchData('https://dummyjson.com/todos', 0)
                .then(data => {
                    displayData3(data);
                    console.log(data)
                    resolve(true);
                })
                .catch(error => {
                    reject(error);
                });
        }, 3000);
    });
}

function initiatePromiseChain() {
    promiseAPI1()
        .then(result => {
            if (result) {
                return promiseAPI2();
            }
        })
        .then(result => {
            if (result) {
                return promiseAPI3();
            }
        })
        .catch(error => {
            console.log('Error:', error);
        });
}

document.getElementById('fetchButton').addEventListener('click', initiatePromiseChain);
