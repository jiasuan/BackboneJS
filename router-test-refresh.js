$(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Model
    var Pages = Backbone.Model.extend({

        defaults:{
            name: null,
            postion: null,
        },

        initialize: function(){
            console.log("Model");
        }

    });


        ////////////////////////////////////////////////////////////////////////////////////
        var member1 = new Pages({
            image: "<img src='images/user1.png' alt='person1' class='personimage'>",
            name: "Abba",
            position: "Founder"
        });
    
        var member2 = new Pages({
            image: "<img src='images/user2.png' alt='person1' class='personimage'>",
            name: "Benjamin",
            position: "Co-Founder"
        });
    
        var member3 = new Pages({
            image: "<img src='images/user1.png' alt='person1' class='personimage'>",
            name: "Cindy",
            position: "Head of Department"
        });
        //////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Collection
    
    var MemberCollection = Backbone.Collection.extend({
        model: Pages
    });

    var membercollection = new MemberCollection([member1, member2, member3]);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Router

    //Page 1
    var Webpage1 = Backbone.View.extend({

        el:"#content",
        initialize: function(){
            this.render();
        },
        render: function(){
            this.$el.html("<h2>Future is Now!</h2>")
            this.$el.append("<img src='images/home.png' alt='home' class='home-image'>")
            this.$el.append("<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>");
            return this;
        }

    });

    //Page 2
    var Webpage2 = Backbone.View.extend({

        el:"#content",
        collection: membercollection,
        template: _.template($("#aboutcontent").html()),

        initialize: function(){
            this.render();
        },
        render: function(){

            this.$el.html(this.template({
                aboutcollection: this.collection.toJSON()
                
            }));
            
            return this;
        }

    });
    
    //Page 3
    var Webpage3 = Backbone.View.extend({

        el:"#content",
        
        //template: _.template("<button id='showheader'>Request Now</button>"),
        template: _.template($("#callrequest").html()),
        

        events: {
            //"mouseover button#showheader":"OnClick",
            "click button":"OnClick"
        },
        
        OnClick: function(){

            this.close();
            this.loader(); 
            var t = this;
            setTimeout( function(){
                t.$el.html("<p class='request'><h1>Request Sent!</h1></p></br><img src='images/success.png' class='success'>")
            }, 5000);
            // setTimeout(()=>{
            //     this.$el.html("<p class='request'><h1>Request Sent!</h1></p></br><img src='images/success.png' class='success'>")
            // }, 5000)
            this.close();

            },

        initialize: function(){

            this.render();
        },

        render: function(){
            this.$el.html(this.template());
            return this;
        },

        close: function(){
            this.undelegateEvents();
            $(this).empty;
            this.unbind();

        },
        
        loader: function(){
            this.$el.html("<p class='request'><div class='loader'></div></br><h2>Sending...</h2></p>");
            //this.$el.html("<p class='request'><h1>Request Loading</h1></p>");
        }
  
    });
    /*
    //Page 3
    var Webpage3 = Backbone.View.extend({

        el:"#content",
        
        template: _.template("<button id='showheader'>Request Now</button>"),

        events: {
            //"mouseover button#showheader":"OnClick",
            "click button#showheader":"OnClick"
        },
        
        OnClick: function(number){
            this.close();
            this.removecontent();
            this.$el.html("<p class='request'><h1>Request Sent!</h1></p>")
        },

        initialize: function(){
            var number = 1;
            this.render();
        },

        render: function(){
            this.$el.html("<h2>Call Us Now!</h2>")
            this.$el.append("<img src='images/call.jpg' alt='product-1' class='product-image'>");
            this.$el.append("<p class='product'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>");  
            this.$el.append(this.template());
            return this;
        },

        close: function(){
            this.undelegateEvents();
            $(this).empty;
            this.unbind();
        },

        removecontent: function(){
            this.$el.html("<h1>Feedback Sent!</h1>");
        },

        setFunction: function(){

        }   
    });
    */    
    //Page 4
    var Webpage4 = Backbone.View.extend({

        el:"#content",
        template: _.template($("#clickcontent").html()),
        
        events:{
            "click button":"clickok"
        },

        clickok: function(){
           
            this.close();
            this.removecontent();
            
        },

        initialize: function(){
            this.render();
        },

        render: function(){            
            
            this.$el.html("<h2>Send Us Feedback!</h2><input type='text'>");
            this.$el.append(this.template);
            
            return this;  
        },

        close: function(){
            this.undelegateEvents();
            $(this).empty;
            this.unbind();
        },

        removecontent: function(){
            this.$el.html("<p class='request'><h1>Feedback Sent!</h1></p>");
        }
      

    });


    var PageRouter = Backbone.Router.extend({
        routes:{
            //url: function name
            "" : "Page1",
            "about": "Page2",
            "join-us": "Page3",
            "contact": "Page4"
        },

        Page1 :function(){
            var page1Obj = new Webpage1();
        },

        Page2: function(){
            var page2Obj = new Webpage2();
        },

        Page3: function(){
            var page3Obj = new Webpage3();
        },

        Page4: function(){
            
            var page4Obj = new Webpage4();     
        }
        
    });      

    var PagesObj = new Pages();
    var pagerouterObj = new PageRouter();
    
    Backbone.history.start();
    

    
});

