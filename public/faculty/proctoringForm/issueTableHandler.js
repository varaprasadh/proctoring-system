function populateIssuesTable(year){
    var template = document.querySelector('.issues-table-template');
    var node=document.importNode(template.content,true);
    var container = document.querySelector('.issue-tables');
    var yearfields=["first year","second year","third year","fourth year"];
    node.querySelector('.year-label>div').innerHTML=yearfields[year-1];
    container.appendChild(node);
}