const template = document.createElement('template');
template.innerHTML = `
<style>
.title {
  padding: 0.2em;
  background-color: rgba(0,0,0,0.2);
  padding-left: 0.5em;
  width: 100%;
  margin: 0;
  display:flex;
  overflow:hidden;
}

.headline {
  width:100%;
  margin-top:0.5em;
  font-size: 1.2em;
  font-weight: bold;
  float: left;
}

.click-icon {
   float:right;
   background: rgba(0,0,0,0);
   color: rgba(0,0,0,0.3);
   font-size:2em;
   margin-right:0.5em;
   margin-bottom:0.1em;
   transition: 0.5s;
   overflow:hidden;
}

.icon-clicked {
   transform: rotate(-45deg);
   transition: 0.5s;
}

.d-none {
    display: none !important;
}

.container {
    width:100%;
}

.row {
    display:flex;
    width:100%;
}

.content {
  border: solid 1px #ccc;
  padding-left:0.5em;
  padding-right:0.5em;
  padding-top:0.5em;
  margin-bottom:0.5em;
  overflow: hidden;
  overflow-y: hidden;

}

.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

.title:hover {
    background-color:#5bf;
    cursor: pointer;
    transition: 0.6s;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.folded-image-container {
  display: flex;
  vertical-align: middle !important;
}

.folded-image img {
  width: 2.5em;
  height: 2.5em;
  margin-left:0.2em;
  margin-right: 0.2em;
  margin-top:0.3em;
  margin-bottom:0.2em;
  background: rgba(0,0,0,0);
}

@media only screen and (max-width: 37.5em) {
  .folded-image img {
    float:left;
    width: 3em;
    height: 3em;
  }

.folded-image {
     vertical-align: middle !important;
     width: 33.33%
     float:left;
     text-align: center;
  }

}

@media only screen and (max-width: 200px) {
.folded-image img {
    display:none;
  }
}
</style>

<div class="col mb-5">
  <div class="container">
  <div class="row">
    <div class="folded-image" >
      <img name="img"/></div>
      <div class="title" >
        <div class="headline" name="title"></div>
        <div class="click-icon">+</div>
      </div>
    </div>
      <div class="content d-none" name="content"></div>
  </div>
</div>
`;

class FoldedElement extends HTMLElement{


 constructor(){
     super();
     this.attachShadow({ mode: 'open'});
     var shadow = this.shadowRoot;
     shadow.appendChild(template.content.cloneNode(true));

     var title = this.getAttribute("title");

     var img = this.getAttribute("img");
     if (img == null) {
        shadow.querySelector('[name="img"]').classList.add("d-none");
     } else
     {
        shadow.querySelector('[name="img"]').setAttribute("src", img);
     }



     shadow.querySelector('[name="title"]').innerText = title;
     shadow.querySelector('[name="content"]').innerHTML = this.innerHTML;

     if (this.getAttribute('content-orientation') != null) {
        shadow.querySelector('[name="content"]').classList.add(this.getAttribute('content-orientation'));
        }

     }

 connectedCallback(){
   this.shadowRoot.addEventListener('click', _e => {
             this.shadowRoot.querySelector(".click-icon").classList.toggle("icon-clicked");
             this.shadowRoot.querySelector(".content").classList.toggle("d-none");
       });
     }
}

window.customElements.define('folded-element', FoldedElement);