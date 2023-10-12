$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    autoplay:true,
    autoplayTimeout: 2000,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        1536:{
            items: 3,
            nav:false
        },
        1920:{
            items:2,
            nav:true,
            loop:false
        }
    }
})