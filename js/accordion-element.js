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

.accordion-image-container {
  display: flex;
  vertical-align: middle !important;
}

.accordion-image img {
  width: 2.5em;
  height: 2.5em;
  margin-left:0.2em;
  margin-right: 0.2em;
  margin-top:0.3em;
  margin-bottom:0.2em;
  background: rgba(0,0,0,0);
}

@media only screen and (max-width: 37.5em) {
  .accordion-image img {
    float:left;
    width: 3em;
    height: 3em;
  }

.accordion-image {
     vertical-align: middle !important;
     width: 33.33%
     float:left;
     text-align: center;
  }

}

@media only screen and (max-width: 200px) {
.accordion-image img {
    display:none;
  }
}
</style>

<div class="col mb-5">
  <div class="container">
  <div class="row">
    <div class="accordion-image" >
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

class AccordionElement extends HTMLElement {

    SH(query) {
        return this.shadowRoot.querySelector(query);
    }
    SH_classes(query) {
        return this.SH(query).classList;
    }

    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        var shadow = this.shadowRoot;
        shadow.appendChild(template.content.cloneNode(true));
        this.populateElement();
    }

    populateElement() {
        this.handleImage();
        this.SH('[name="title"]').innerText = this.getAttribute("title");
        this.SH('[name="content"]').innerHTML = this.innerHTML;
        this.SH_classes('[name="content"]').add(this.getAttribute('content-orientation'));
        this.checkForOpen();
    }

    appendContent(text)
    {
        var content = document.createElement('div');
        content.innerHTML=text;
        this.SH('[name="content"]').appendChild(content);
    }

    handleImage() {
        var img = this.getAttribute("img");
        if (img == null) {
            this.SH('[name="img"]').remove();
            return;
        }
        this.SH('[name="img"]').setAttribute("src", img);
    }

    toggleDetailsVisible() {
        this.SH_classes(".click-icon").toggle("icon-clicked");
        this.SH_classes(".content").toggle("d-none");
    }

    setDetailsVisible() {
        this.SH_classes(".click-icon").add("icon-clicked");
        this.SH_classes(".content").remove("d-none");
    }

    checkForOpen() {
        if (this.getAttribute('open') == null) {
            return;
        }
        this.setDetailsVisible();
        this.removeAttribute('open');
    }

    connectedCallback() {
        this.shadowRoot.addEventListener('click', _e => {
            this.toggleDetailsVisible();
        });
    }
}

window.customElements.define('accordion-element', AccordionElement);
