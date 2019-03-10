var template =(str)=> `
  <div class="model-container">
     <div class="model-card">
        <div class="close">
            <div class="span"></div>
            <div class="span"></div>
        </div>
       <div class="model-content">${str}</div>
    </div>
  </div>
  <style>
  .model-container{
  position:fixed;
  background:blue;
  width:50%;
  height:50%;
  top:50%;
  left:50%;
  transform :translate(-50%,-50%);
  animation:anime 1s linear 1;
}
@keyframes anime{
  0%{
    width:0%;
    height:0%;
  }
}
.model-content{
  animation:visi 1s linear;
  display:none;
}
@keyframes visi{
  100%{
    display:block;
  }
}
  </style>
`;
function Model_Center(str){
    model = document.createElement('div')
    model.innerHTML=template(str);
    document.body.appendChild(model)
}
