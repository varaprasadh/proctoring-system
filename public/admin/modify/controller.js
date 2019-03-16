var itemnode;

window.onload = function() {
    console.log("hello world");
    var template = document.querySelector('.item-template');
    itemnode = document.importNode(template.content, true);
    var input = document.querySelector('.search-input');
    var searchbtn = document.querySelector('.search-btn');
    searchbtn.addEventListener('click', e => {
        clearContainer();
        var value = input.value.trim().replace(/'/g, '');
        console.log(value);
        (value != '') ? searchAndUpdate(value):alert("type something..");
    })

}

function searchAndUpdate(value) {
    fetch(`/modify/${value}`).then(res => res.json()).then(data => {
        var dataobjs = data.data;
        // console.log(dataobjs);
        if (dataobjs.length) {
            dataobjs.forEach(obj => {
                var node = itemnode.cloneNode(true);
                node.querySelector('.name').innerHTML = obj.name;
                node.querySelector('.department').innerHTML = obj.department;
                node.querySelector('.regdNo').innerHTML = obj.regdNo;
                node.querySelector('.regdNo').dataset.regdNo = obj.regdNo;
                document.querySelector('.list').appendChild(node);
            });
            addEventHandlers();
        } else {
            document.querySelector('.list').innerHTML = `
             <div class="message">
                   nothing found on server
                </div> `
        }
        /**
         *   <div class="message">
                    you can remove the faculty here!
                </div>
         * 
         */

    }).catch(err => err);
}

function addEventHandlers() {
    var cards = document.querySelectorAll('.item');
    cards.forEach(card => {
        card.querySelector('.delete').addEventListener('click', e => {
            var regdNo = card.querySelector('.regdNo').dataset.regdNo;
            fetch(`/modify/delete/${regdNo}`).then(res => res.json()).then(log => {
                if (log.status == 'success') {
                    card.remove();
                }
            }).catch(err => err)
        })
    })
}

function clearContainer() {
    document.querySelector('.list').innerHTML = '';
}