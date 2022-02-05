/* event  //  v-model  //  v-cloak */

setTimeout(() => {
    
}, 5000);
    new Vue({
        el:'#app',
        data:{
            count:0,
            time:60,
            timeIntrval:null,
            win:false,
            lost:false,
            colorCo:"red",
            colorTi:"green",
            carts:[
                {
                    id:0,
                    style:'rotatey(0deg)',
                    img:"img/1.jpg"
                },
                {
                    id:1,
                    style:'rotatey(0deg)',
                    img:"img/1.jpg"
                },
                {
                    id:2,
                    style:'rotatey(0deg)',
                    img:"img/2.jpg"
                },
                {
                    id:3,
                    style:'rotatey(0deg)',
                    img:"img/2.jpg"
                },
                {
                    id:4,
                    style:'rotatey(0deg)',
                    img:"img/3.jpg"
                },
                {
                    id:5,
                    style:'rotatey(0deg)',
                    img:"img/3.jpg"
                },
                {
                    id:6,
                    style:'rotatey(0deg)',
                    img:"img/4.jpg"
                },
                {
                    id:7,
                    style:'rotatey(0deg)',
                    img:"img/4.jpg"
                },
                {
                    id:8,
                    style:'rotatey(0deg)',
                    img:"img/5.jpg"
                },
                {
                    id:9,
                    style:'rotatey(0deg)',
                    img:"img/5.jpg"
                },
                {
                    id:10,
                    style:'rotatey(0deg)',
                    img:"img/6.jpg"
                },
                {
                    id:11,
                    style:'rotatey(0deg)',
                    img:"img/6.jpg"
                },
                {
                    id:12,
                    style:'rotatey(0deg)',
                    img:"img/7.jpg"
                },
                {
                    id:13,
                    style:'rotatey(0deg)',
                    img:"img/7.jpg"
                },
                {
                    id:14,
                    style:'rotatey(0deg)',
                    img:"img/8.png"
                },
                {
                    id:15,
                    style:'rotatey(0deg)',
                    img:"img/8.png"
                },
                {
                    id:16,
                    style:'rotatey(0deg)',
                    img:"img/9.jpg"
                },
                {
                    id:17,
                    style:'rotatey(0deg)',
                    img:"img/9.jpg"
                },
            ],
            otherCarts:[
                {
                    id:18,
                    style:'rotatey(0deg)',
                    img:"img/10.jpg"
                },
                {
                    id:19,
                    style:'rotatey(0deg)',
                    img:"img/10.jpg"
                },
                {
                    id:20,
                    style:'rotatey(0deg)',
                    img:"img/11.jpg"
                },
                {
                    id:21,
                    style:'rotatey(0deg)',
                    img:"img/11.jpg"
                },
                {
                    id:22,
                    style:'rotatey(0deg)',
                    img:"img/12.jpg"
                },
                {
                    id:23,
                    style:'rotatey(0deg)',
                    img:"img/12.jpg"
                },
            ],
            openItems:[],
            show:false,
            interval:true,
            level:false,
        },
        created() {
            this.btnRet()
        },
        methods: {
            reSortCarts(){
                let carts = this.carts
                var currentIndex = carts.length,tvalue,rendomindex;
                while (0 !== currentIndex) {
                    rendomindex = Math.floor(Math.random()*currentIndex)
                    currentIndex--
                    tvalue=carts[currentIndex]
                    carts[currentIndex]=carts[rendomindex]
                    carts[rendomindex]=tvalue
                }
            },
            image(){

                var img= "img/" + (Math.floor(Math.random() * 9) +1) +".jpg" ;  
                return img
                
            },
            changeShape(id){
                if (this.time > 0 && this.interval) {
                    this.carts.forEach(cart => {
                        if (cart.id == id) {
                            var idIndex = this.carts.indexOf(cart);
                            if (this.carts[idIndex].style == "rotatey(0deg)") {
            
                                this.carts[idIndex].style="rotatey(180deg)";
            
                                this.openItems.push({
                                    id:this.carts[idIndex].id,
                                    img:this.carts[idIndex].img,
                                    style:this.carts[idIndex].style,
                                });
                            }
                        }
                    });
                }
            },
            levelHard(){
                if (this.carts.length == 18) {
                    this.level=true;
                    this.otherCarts.forEach(cart => {
                        this.carts.push(cart)
                    });

                    this.btnRet()
                }
                
            },
            levelEasy(){
                if (this.carts.length == 24) {
                    this.level=false;
                    for (let i = 0; i < this.carts.length; i++) {
                        let cart = this.carts[i]
                        if(cart.id >= 18){
                            this.carts.splice(i , 1) 
                            i--;
                        }    
                    } 

                    console.log(this.carts)
                    this.btnRet()
                }
            },
            btnRet(){
                this.reSortCarts()
                this.openItems=[];
                this.time=60;
                clearInterval(this.timeIntrval);
                this.win=false;
                this.lost=false;
                this.colorTi="green";
                this.colorCo="red";
                this.count=0;
                this.show=false;
                this.interval=true;
                this.carts.forEach(item => {
                    item.style="rotatey(0deg)";
                });
                setTimeout(() => {    
                    this.carts.forEach(item => {
                        item.style="rotatey(180deg)";
                }, 1000);
                });
                setTimeout(() => {
                    this.carts.forEach(item => {
                    item.style="rotatey(0deg)";
                    });
                }, 2500);
            }
        },
        computed: {
            
        },
        watch: {
            openItems(){
                if (this.openItems.length == 2){
                    if (this.openItems[0].img != this.openItems[1].img) {
                        this.interval = false;
                        this.openItems.forEach(item => {
                            this.carts.forEach(cart => {

                                if (item.id == cart.id) {
                                    var idIndex = this.carts.indexOf(cart);

                                    setTimeout(() => {
                                        this.interval=true;
                                        this.carts[idIndex].style="rotatey(0deg)"
                                    }, 1000);
                                }
                            });
                        });
                    }else{
                        setTimeout(() => {
                            this.count+=1
                        }, 600);
                    }
                    this.openItems=[];
                };
                if (this.openItems.length==1 && this.time == 60 ) {
                    this.show=true
                    this.timeIntrval = setInterval(() => {
                        if (this.show) {
                            this.time--
                        }
                    }, 1000);
                }
            },
            count(){
                if (this.level) {
                    if (this.count == 12) {
                        this.colorCo = "green";
                        this.show=false;
                        this.win=true;
                    }else if (this.count >= 7) {
                        this.colorCo = "yellow";
                    } 
                }else{
                    if (this.count == 9) {
                        this.colorCo = "green";
                        this.show=false;
                        this.win=true;
                    }else if (this.count >= 5) {
                        this.colorCo = "yellow";
                    }
                }
            },
            time(){
                if (this.time <= 10) {
                    this.colorTi = "red"
                }else if (this.time <= 30) {
                    this.colorTi = "yellow"
                };
                if (this.time == 0) {
                    clearInterval(this.timeIntrval)
                    this.lost=true
                };
            }
        },
    });