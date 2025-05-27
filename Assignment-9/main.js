document.addEventListener('DOMContentLoaded', function() {
    const fetchPostsBtn = document.getElementById('fetchPosts');
    const fetchUsersBtn = document.getElementById('fetchUsers');
    const clearDataBtn = document.getElementById('clearData');
    const dataContainer = document.getElementById('dataContainer');
    const loadingElement = document.getElementById('loading');

    // Fetch posts from JSONPlaceholder
    fetchPostsBtn.addEventListener('click', function() {
        showLoading();
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(posts => {
                displayPosts(posts);
                hideLoading();
            })
            .catch(error => {
                showError(error);
                hideLoading();
            });
    });

    // Fetch users from JSONPlaceholder
    fetchUsersBtn.addEventListener('click', function() {
        showLoading();
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(users => {
                displayUsers(users);
                hideLoading();
            })
            .catch(error => {
                showError(error);
                hideLoading();
            });
    });

    // Clear displayed data
    clearDataBtn.addEventListener('click', function() {
        dataContainer.innerHTML = '';
    });

    // Display posts in the container
    function displayPosts(posts) {
        dataContainer.innerHTML = '';
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.body}</p>
                <p><strong>User ID:</strong> ${post.userId}</p>
                <p><strong>Post ID:</strong> ${post.id}</p>
            `;
            dataContainer.appendChild(postElement);
        });
    }

    // Display users in the container
    function displayUsers(users) {
        dataContainer.innerHTML = '';
        users.forEach(user => {
            const userElement = document.createElement('div');
            userElement.className = 'user';
            userElement.innerHTML = `
                <h2>${user.name}</h2>
                <p><strong>Username:</strong> ${user.username}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>Website:</strong> ${user.website}</p>
                <p><strong>Company:</strong> ${user.company.name}</p>
                <p><strong>Address:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
            `;
            dataContainer.appendChild(userElement);
        });
    }

    // Show error message
    function showError(error) {
        dataContainer.innerHTML = `
            <div class="error">
                <p>Error fetching data: ${error.message}</p>
                <p>Please try again later.</p>
            </div>
        `;
    }

    // Show loading indicator
    function showLoading() {
        loadingElement.style.display = 'block';
        dataContainer.innerHTML = '';
    }

    // Hide loading indicator
    function hideLoading() {
        loadingElement.style.display = 'none';
    }
});