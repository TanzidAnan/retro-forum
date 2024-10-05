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
    console.log(posts)
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