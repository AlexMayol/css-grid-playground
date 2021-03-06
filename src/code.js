if (document.getElementById("gallery")) {
  new Vue({
    el: "#gallery",
    data: {
      number: 6,
      images: [],
      type: 'any',
      filter: 'none',
      gaps: true
    },
    mounted() {
      this.modifyImages();
    },
    watch: {
      number: function () {
        this.modifyImages();
      }
    },
    computed: {
      addFilter: function () {
        if (this.filter == 'none')
          return ''
        return `/${this.filter}`
      }
    },
    methods: {
      modifyImages() {
        if (this.number < this.images.length) {
          let dif = Math.abs(this.number - this.images.length);
          for (let x = 0; x < dif; x++) {
            this.images.shift();
          }
        } else if (this.number > this.images.length) {
          let dif = Math.abs(this.number - this.images.length);
          let obj;
          for (let x = 0; x < dif; x++) {
            obj = {
              src: `https://placeimg.com/${this.random(250, 300)}/${this.random(250, 300)}/${this.type}${this.addFilter}`,
              alt: `Alt attribute for this image`,
              desc: `Description for this image`,
              classes: this.randomClasses(),
              showImg: false
            };
            this.images.push(obj);
          }
        }
      },
      updateType() {
        for (let img of this.images) {
          img.src = ` https://placeimg.com/${this.random(250, 300)}/${this.random(250, 300)}/${this.type}${this.addFilter}`;
        }
      },
      imgLoad(el) {
        el.showImg = true;
      },
      random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      },
      randomClasses() {
        let a = crypto.getRandomValues(new Uint8Array(3));
        let obj;
        if (a[0] <= 127 && a[1] <= 127 && a[2] > 127) {
          obj = {
            wide: false,
            tall: false,
            large: true
          };
        } else {
          obj = {
            wide: a[0] > 127,
            tall: a[1] > 127,
            large: false
          };
        }
        return obj;
      }
    }
  });
}

if (document.getElementById('mosaic'))
  new Vue({
    el: '#mosaic'
  })
