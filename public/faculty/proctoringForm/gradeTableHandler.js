function populateGradeTables() {
    var grade_table_template = document.querySelector('.grade-table-template');
    var grade_table_node = document.importNode(grade_table_template.content, true);
    var grade_table_container = document.querySelector('.grade-tables');
    var tableyearrfields = [
        "1st Year", "2nd Year", "3rd Year", "4th Year"
    ];
    for (var i = 0; i < 4; i++) {
        var node = grade_table_node.cloneNode(true);
        node.querySelector('.year-label').innerHTML = tableyearrfields[i];
        console.log(node);
        // tweakId(node, i + 1);
        grade_table_container.appendChild(node);
    };


}