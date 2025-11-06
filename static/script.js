$("#add").on("click", function() {
    $(".modal").addClass("active");
});

$(".close-button").on("click", function() {
    $(".modal").removeClass("active");
});

$("#addForm").on("submit", function(e) {
    e.preventDefault();
    fetch("/add", {
        method: "POST",
        body: new FormData(e.target)
    }).then(() => {
        location.reload();
    });
});

// let wrapper = document.getElementById("wrapper");

// fetch("/ads", {
//     method: "get"
// })
// .then(async response => {
//     let ads = await response.json();
//     wrapper.innerHTML = '';
//     ads.forEach(ad => {
//         wrapper.innerHTML += `
//             <div class="ad">
//                 <h3>${ad.title}</h3>    
//                 <p>${ad.description}</p>    
//             </div>
//         `;
//     })
// });