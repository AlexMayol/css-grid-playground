if (document.getElementById("gallery")) {
  new Vue({
    el: "#gallery",
    data: {
      number: 6,
      images: [],
      gaps:true 
    },
    mounted() {
      this.modifyImages();
    },
    watch: {
      number: function() {
        this.modifyImages();
      }
    },
    methods: {
      modifyImages(){
        if(this.number < this.images.length){
          let dif = Math.abs(this.number - this.images.length);
          for(let x = 0; x < dif; x++){
            this.images.shift();
          }          
        }else{
          let dif = Math.abs(this.number - this.images.length);
          let obj;
          for(let x = 0; x < dif; x++){
             obj = {
              src: ` https://placeimg.com/${this.random(250,300)}/${this.random(250, 300)}/animals`,
              alt: `Alt attribute for this image`,
              desc: `Description for this image`,
              classes: this.randomClasses(),
              showImg:false
            };
            this.images.unshift(obj);
          }                    
        }
      },
        imgLoad(el) {
        el.showImg = true;
        console.log('load')
      },
      random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      },
      randomClasses() {
        let a = crypto.getRandomValues(new Uint8Array(3));

        //let [wide, tall, large] = obj;
        let obj;
        if (a[0] <= 127 && a[1] <= 127 && a[2] > 127) {
          obj = { wide: false, tall: false, large: true };
        } else {
          obj = { wide: a[0] > 127, tall: a[1] > 127, large: false };
        }
        return obj;
      }
    }
  });
}
