const loadAllPost = async (category) => {
    console.log(category)
    console.log(`https://openapi.programming-hero.com/api/retro-forum/posts${category?`?category=${category}`:''}`)



    // if(category){
    //     console.log(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`)
    // }
    // else{
    //     console.log(`https://openapi.programming-hero.com/api/retro-forum/posts`)
    // }


    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${category?`?category=${category}`:''}`)
    const data = await res.json();
    displayAllPost(data.posts)
}

const displayAllPost =(posts) =>{
    const postContainer =document.getElementById('post-container');
    posts.forEach(post =>{
        // console.log(post)
        const div =document.createElement('div');
        div.innerHTML =`
        <div class="p-6 lg:p-12 flex lg:flex-row flex-col items-center lg:items-start
      bg-slate-300 rounded-3xl">
      <div class="indicator ">
        <span class="indicator-item badge  ${post.isActive ? "bg-green-400":"bg-red-300"}"></span>
        <div class="avatar">
          <div class="w-24 rounded-xl">
            <img src=${post.image} alt="">
          </div>
        </div>
        <div class="space-y-4 w-full">
          <div class="flex gap-4 *:opacity-60">
            <p># category</p>
            <p>Author: ${post.author.name}</p>
          </div>
          <h3 class="text-2xl font-bold opacity-70">${post.title}</h3>
          <p class="opacity-40">${post.description}</p>
          <hr class="border border-gray-300">
          <div class="flex justify-between *:font-bold [&>*:not(:last-child)]:opacity-45">
            <div class="flex gap-4">
              <div class="space-x-2 flex items-center ">
                <i class="fa-regular fa-comment-dots"></i>
                <p>${post.comment_count}</p>
              </div>
              <div class="space-x-2 flex items-center">
                <i class="fa-regular fa-eye"></i>
                <p>${post.view_count}</p>
              </div>
              <div class="space-x-2 flex items-center">
                <i class="fa-regular fa-eye"></i>
                <p>${post.posted_time}</p>
              </div>
            </div>
          </div>
          <div class="opacity-100">
            <button id="addToList" onclick="markAsRead()" data-post=${JSON.stringify(post)} class="addToList btn btn-circle bg-green-500 btn-sm">
            <i class="fa-solid fa-landmark text-white"></i>
           
            </button>
          </div>
        </div>
      </div>
      </div>
        `
        postContainer.appendChild(div)
    })
}

loadAllPost();

const handleSearchByCategory = () => {
    const searchText =document.getElementById('searchPosts').value;
    console.log(searchText);
    if(typeof searchText !== "string"){
        alert('No text')
    }
    loadAllPost(searchText)
}