var itemnode;

window.onload = function() {
    console.log("hello world");
    var template = document.querySelector('.item-template');
    itemnode = document.importNode(template.content, true);
    var input = document.querySelector('.search-input');
    var searchbtn = document.querySelector('.search-btn');
    searchbtn.addEventListener('click', e => {
        var value = input.value.trim().replace(/'/g, '');
        console.log(value);
        searchAndUpdate(value);
    })

}

function searchAndUpdate(value) {
    fetch(`/modify/${value}`).then(res => res.json()).then(data => {
        console.log(data);
    })
}