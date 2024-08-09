// Fetch the JSON data
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        initializeBlog(data.blog);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

let currentPostIndex = 0;
const postsPerLoad = 4;
let filteredPosts = [];
let selectedCategory = '';
let selectedTopic = '';

// Initialize the blog with posts, filters, and event listeners
function initializeBlog(blog) {
    populatePillButtons(blog);
    setupToggleEventListeners(blog);
    applyFilters(blog); // Load the initial set of filtered posts
}

// Populate pill buttons with categories and topics
function populatePillButtons(blog) {
    const categoryOptions = document.getElementById('category-options');
    const topicOptions = document.getElementById('topic-options');

    // Add "All Categories" option
    const allCategoriesPill = document.createElement('div');
    allCategoriesPill.className = 'pill selected'; // Pre-select "All Categories" by default
    allCategoriesPill.textContent = 'All Categories';
    allCategoriesPill.addEventListener('click', () => selectFilter('category', '', blog));
    categoryOptions.appendChild(allCategoriesPill);

    // Create category pill buttons
    blog.categories.forEach(category => {
        const pill = document.createElement('div');
        pill.className = 'pill';
        pill.textContent = category;
        pill.addEventListener('click', () => selectFilter('category', category, blog));
        categoryOptions.appendChild(pill);
    });

    // Add "All Topics" option
    const allTopicsPill = document.createElement('div');
    allTopicsPill.className = 'pill selected'; // Pre-select "All Topics" by default
    allTopicsPill.textContent = 'All Topics';
    allTopicsPill.addEventListener('click', () => selectFilter('topic', '', blog));
    topicOptions.appendChild(allTopicsPill);

    // Create topic pill buttons
    blog.tags.forEach(tag => {
        const pill = document.createElement('div');
        pill.className = 'pill';
        pill.textContent = tag;
        pill.addEventListener('click', () => selectFilter('topic', tag, blog));
        topicOptions.appendChild(pill);
    });
}

// Setup toggle buttons for displaying options
function setupToggleEventListeners(blog) {
    const toggleCategories = document.getElementById('toggle-categories');
    const categoryOptions = document.getElementById('category-options');
    const toggleTopics = document.getElementById('toggle-topics');
    const topicOptions = document.getElementById('topic-options');

    // Ensure options are hidden initially
    categoryOptions.style.display = 'none';
    topicOptions.style.display = 'none';

    // Helper function to slide down/up
    function slideToggle(element) {
        if (element.style.display === 'none' || element.style.maxHeight === '0px') {
            element.style.display = 'flex';
            element.style.maxHeight = element.scrollHeight + 'px';
            element.style.opacity = '1';
        } else {
            element.style.maxHeight = '0';
            element.style.opacity = '0';
            setTimeout(() => {
                element.style.display = 'none';
            }, 500); // Match this with the transition duration
        }
    }

    // Toggle categories
    toggleCategories.addEventListener('click', () => {
        const chevron = toggleCategories.querySelector('.chevron');
        slideToggle(categoryOptions);
        if (categoryOptions.style.maxHeight === '0px') {
            chevron.classList.remove('rotate');
            toggleCategories.classList.remove('open-button');
        } else {
            topicOptions.style.maxHeight = '0';
            topicOptions.style.opacity = '0';
            setTimeout(() => {
                topicOptions.style.display = 'none';
            }, 500); // Match this with the transition duration
            chevron.classList.add('rotate');
            toggleCategories.classList.add('open-button');
            toggleTopics.querySelector('.chevron').classList.remove('rotate');
            toggleTopics.classList.remove('open-button');
        }
    });

    // Toggle topics
    toggleTopics.addEventListener('click', () => {
        const chevron = toggleTopics.querySelector('.chevron');
        slideToggle(topicOptions);
        if (topicOptions.style.maxHeight === '0px') {
            chevron.classList.remove('rotate');
            toggleTopics.classList.remove('open-button');
        } else {
            categoryOptions.style.maxHeight = '0';
            categoryOptions.style.opacity = '0';
            setTimeout(() => {
                categoryOptions.style.display = 'none';
            }, 500); // Match this with the transition duration
            chevron.classList.add('rotate');
            toggleTopics.classList.add('open-button');
            toggleCategories.querySelector('.chevron').classList.remove('rotate');
            toggleCategories.classList.remove('open-button');
        }
    });
    const loadMoreButton = document.getElementById('load-more');
    let accumulatedScroll = 0;

    // loadMoreButton.addEventListener('click', () => {
    //     loadMoreFilteredPosts(blog);

    //     // Increase the accumulated scroll by 1948px
    //     accumulatedScroll += 750;

    //     // Calculate the new scroll position based on the accumulated scroll
    //     const scrollPosition = window.pageYOffset + accumulatedScroll;

    //     // Scroll to the new position
    //     window.scrollTo({
    //         top: scrollPosition,
    //         behavior: 'smooth'
    //     });
    // });

    loadMoreButton.addEventListener('click', () => {
        loadMoreFilteredPosts(blog);

        // Determine the scroll increment based on screen width, for mobile 800px, and desktop 750px
        const scrollIncrement = window.innerWidth <= 768 ? 800 : 750;

        // Increase the accumulated scroll by the appropriate amount
        accumulatedScroll += scrollIncrement;

        // Calculate the new scroll position based on the accumulated scroll
        const scrollPosition = window.pageYOffset + accumulatedScroll;

        // Scroll to the new position
        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        });
    });
}



// Handle pill button selection
function selectFilter(type, value, blog) {
    if (type === 'category') {
        selectedCategory = value;
        togglePillSelection('category-options', value);
    } else if (type === 'topic') {
        selectedTopic = value;
        togglePillSelection('topic-options', value);
    }
    applyFilters(blog);
}

// Toggle pill selection style
function togglePillSelection(containerId, value) {
    const container = document.getElementById(containerId);
    Array.from(container.children).forEach(pill => {
        if ((value === '' && pill.textContent.includes('All')) || pill.textContent === value) {
            pill.classList.add('selected');
        } else {
            pill.classList.remove('selected');
        }
    });
}

// Apply selected filters and update displayed posts
function applyFilters(blog) {
    // Filter posts based on selected category and topic
    filteredPosts = blog.posts.filter(post => {
        const categoryMatch = !selectedCategory || post.categories.includes(selectedCategory);
        const topicMatch = !selectedTopic || post.tags.includes(selectedTopic);
        return categoryMatch && topicMatch;
    });

    // Reset current post index and clear existing content
    currentPostIndex = 0;
    document.getElementById('blog-content').innerHTML = '';
    document.getElementById('load-more').style.display = filteredPosts.length > postsPerLoad ? 'block' : 'none';

    // Load the initial set of filtered posts
    loadMoreFilteredPosts(blog);
}

// Load and display more filtered posts
function loadMoreFilteredPosts(blog) {
    const blogContent = document.getElementById('blog-content');
    const postsToLoad = filteredPosts.slice(currentPostIndex, currentPostIndex + postsPerLoad);

    postsToLoad.forEach(post => {
        const author = blog.authors.find(a => a.id === post.author_id);
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        postElement.innerHTML = `
            <div class="image-wrapper">
            <span>${post.categories}</span>
            <img src="${post.image_url}" alt="${post.title}">
            </div>
            <h2>${post.title}</h2>
         
            <p>${post.content.length > 200 ? post.content.substring(0, 200) + '...' : post.content.substring(0, 200)}</p>

            <div class="tags-category-wrapper">
            <a href="#" class="category-pill-body">${post.categories}</a>
            <div class="tags-pills">
                ${post.tags.map(tag => `<a href="#" class="tag-pill-body">${tag}</a>`).join('')}
            </div>
            </div>
           <!-- <p class="author">by ${author.name} on ${post.date}</p> -->
        `;

        blogContent.appendChild(postElement);
    });

    currentPostIndex += postsPerLoad;


    // Hide the "Load More" button if there are no more posts to display
    if (currentPostIndex >= filteredPosts.length) {
        document.getElementById('load-more').style.display = 'none';
    }
}
