const AddButton =() =>{
  window.location.href="add.html";
}

const loadAllPost = async (category) => {
    console.log(category)
    console.log(`https://openapi.programming-hero.com/api/retro-forum/posts${category ? `?category=${category}` : ''}`)



    // if(category){
    //     console.log(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`)
    // }
    // else{
    //     console.log(`https://openapi.programming-hero.com/api/retro-forum/posts`)
    // }


    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${category ? `?category=${category}` : ''}`)
    const data = await res.json();
    displayAllPost(data.posts)
}

const displayAllPost = (posts) => {
    const postContainer = document.getElementById('post-container');
    postContainer.innerHTML = " "
    posts.forEach(post => {
        // console.log(post)
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="p-6 lg:p-12 flex lg:flex-row flex-col items-center lg:items-start
      bg-slate-300 rounded-3xl">
      <div class="indicator ">
        
        <div class="avatar mr-8">
          <div class="w-24 rounded-full">
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
          <div  class="opacity-100 btn px-5">
            <button id="addToList"  onclick="markAsRead('${post.description}','${post.view_count}')" data-post=${JSON.stringify(post)} class="addToList btn btn-circle bg-green-500 btn-sm">
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
const markAsRead = (description, view_count) => {
    // console.log(description,view_count)
    const markAsReadContainer = document.getElementById('markAsReadContainer');
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="flex justify-between px-5 lg:p-3 bg-white rounded-2xl items-center gap-3">
            <div class="lg:w-4/5 w-11/12 ">
                <p>${description}</p>
                <div class="lg:w-full w-4/12 flex justify-between gap-5 mt-3">
                <p><i class="fa-solid fa-cart-shopping"></i><span class="text-red-700 ml-3">${view_count}<span/></p>
                </div>
            </div>
        </div>
    `;
    markAsReadContainer.appendChild(div)

    handleCount()

}

const handleCount = () => {
    const preveCount = document.getElementById('markAsReadCounter').innerText;
    const convertedCounter = parseInt(preveCount);
    const sum = convertedCounter + 1;
    document.getElementById('markAsReadCounter').innerText = sum
}

const loadData2 = async() => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const data = await res.json();
    displayData2(data)
}
const displayData2 =(data) =>{
    const cardContainer =document.getElementById('latest-post-container')
    // console.log(data)
    data.forEach(item =>{
        console.log(item)
        const div =document.createElement('div');
        div.innerHTML =`
        <div class="card lg:w-96 pb-5 bg-base-100 shadow-2xl">
          <figure class="lg:px-6 px-4 pt-4 lg:pt-8">
              <img
                  src=${item.cover_image}
                  alt="Shoes"
                  class="rounded-xl"
              />
          </figure>
          <div class="p-5 lg:p-10 space-y-4 lg:space-y-5">
              <p class="opacity-50 text-start">
                  <i class="fa-solid fa-calendar-days me-2"></i>${item.author?.posted_date ? item.author?.posted_date :'No Publish Date'}
              </p>
              <h2 class="card-title text-start">${item.title}</h2>
              <p class="text-start">
                  ${item.description}
              </p>
              <div class="card-actions flex gap-5 items-center">
                  <div class="avatar">
                      <div
                          class="lg:w-12 w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                      >
                          <img
                          src=${item.profile_image}
                          />
                      </div>
                  </div>
              <div>
              <h3 class="text-start font-extrabold">author.name</h3>
              <p class="text-start opacity-60">${item.author?.designation ? item.author?.designation : "Unknown"}</p>
          </div>
      </div>
          <span
            id="latestPostLoader"
            class="loading loading-infinity loading-lg lg:mt-24 text-primary hidden"
          >
        </span>
          <!-- dynamic content -->
        </div>
         </div>
        
        `
        cardContainer.appendChild(div)
    })
}

loadAllPost();
loadData2()

const handleSearchByCategory = () => {
    const searchText = document.getElementById('searchPosts').value;
    console.log(searchText);
    if (typeof searchText !== "string") {
        alert('No text')
    }
    loadAllPost(searchText)
}