function registerUser(data) {
    console.log(data);
    var url = "/PendingFaculty";
    console.log(data);
    fetch(url, {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
            }
        }).then(res => res.json()).then(resData => {
          console.log(resData);  
          updateUi(resData)  ;
        })
        .catch(err => err);
}