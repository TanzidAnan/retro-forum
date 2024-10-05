const loadAllPost = async (category) => {
    console.log(category)
    if(category){
        console.log(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`)
    }
    else{
        console.log(`https://openapi.programming-hero.com/api/retro-forum/posts`)
    }
    // const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`)
    // const data = await res.json();
    // console.log(data.posts)
}
loadAllPost();

const handleSearchByCategory = () => {
    const searchText =document.getElementById('searchPosts').value;
    console.log(searchText);
    loadAllPost(searchText)
}