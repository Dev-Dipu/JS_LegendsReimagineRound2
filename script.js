const loco = ()=>{
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

var mouseFollowers = document.querySelector("#mousefollower")
const mouseFollower = ()=>{

window.addEventListener("mousemove", (e) => {

  gsap.to(mouseFollowers,{
    x: e.clientX,
    y: e.clientY,
  })

});


}


const magnetoAnimation = ()=>{

  
  var magnetoAll = document.querySelectorAll(".magnetoAll")
  
  magnetoAll
      .forEach((m) => {
  
          var magnetoAllIcon = m.querySelectorAll(".magnetoAllIcon")
  
          m.addEventListener("mousemove", (e) => {
                  let boundBox = e.target.getBoundingClientRect()
                  const magnetoStrength = 30
                  const magnetoTextStrength = 20
                  const newX = ((e.clientX - boundBox.left) / m.offsetWidth) - 0.5
                  const newY = ((e.clientY - boundBox.top) / m.offsetHeight) - 0.5
  
                  gsap.to(m, {
                      duration: 1,
                      x: newX * magnetoStrength,
                      y: newY * magnetoStrength,
                      ease: Power4.easeOut
                  })
  
                  gsap.to(magnetoAllIcon, {
                      duration: 1,
                      x: newX * magnetoTextStrength,
                      y: newY * magnetoTextStrength,
                      ease: Power4.easeOut
                  })
              })
  
  
          m.addEventListener("mouseleave", () => {
                  gsap.to(m, {
                      duration: 2.5,
                      x: 0,
                      y: 0,
                      ease: "elastic.out(1.2,0.2)"
                  })
  
  
                  gsap.to(magnetoAllIcon, {
                      duration: 2.5,
                      x: 0,
                      y: 0,
                      ease: "elastic.out(1.2,0.2)"
                  })
              })
  
      })
  
  }

const section1Animation = ()=>{

let hoverAnm = document.querySelectorAll(".hover-anm1")

hoverAnm.forEach(elem=>{

  elem
  .addEventListener("mouseenter", ()=>{
    elem.style.setProperty("--transform-origin", "right")
    elem.style.setProperty("--scaleX", 1)

  })

  elem
  .addEventListener("mouseleave", ()=>{
    elem.style.setProperty("--transform-origin", "left")
    elem.style.setProperty("--scaleX", 0)
  });


})

let hoverAnm2 = document.querySelectorAll(".hover-anm2")

hoverAnm2.forEach(elem=>{

  elem
  .addEventListener("mouseenter", ()=>{
    elem.style.setProperty("--transform-origin2", "left")
    elem.style.setProperty("--scaleX", 1)

  })

  elem
  .addEventListener("mouseleave", ()=>{
    elem.style.setProperty("--transform-origin2", "right")
    elem.style.setProperty("--scaleX", 0)
  });


})


  gsap.to(".text-move-left", {
    duration: 8,
    ease: "none",
    x: "+=100%", 
    modifiers: {
      x: gsap.utils.unitize(x => parseFloat(x) % 100)
    },
    repeat: -1
  });

  gsap.to(".text-move-right", {
    duration: 8,
    ease: "none",
    x: "-=100%", 
    modifiers: {
      x: gsap.utils.unitize(x => parseFloat(x) % 100)
    },
    repeat: -1
  });


  gsap.from("#flot-bottle",{
    y: "5%",
    ease: Power4,
    yoyo: true,
    duration:1.2,
    repeat:-1,
  })

  let mobileNav = ()=>{

    var menuText = document.querySelectorAll(".menuText")
    var mline = gsap.timeline()
    menuText
    .forEach((mt)=>{
        var culter = ""
        mt.textContent.split("").forEach((e)=>{
            culter += `<span class="inline-block mtspan translate-y-[101%]">${e}</span>`
            mt.innerHTML = culter
        })
    
        mline.pause()
        mline.to(".mtspan",{
            y: "0%",
            stagger: 0.009,
            duration: .3,
            ease: Power4,
        })
    
    })
  
  
    var tmenu = gsap.timeline()
  var menu = document.querySelector(".menu")
  var menuSction = document.querySelector(".menuSction")
  var menuClose = document.querySelector(".menuClose")
  menu
  .addEventListener("click", ()=>{
      tmenu.to(menu,{
          gap: 0,
          duration: .1
      })
  
      tmenu.to(menuSction,{
          visibility: "visible",
          left: "0%",
          duration: .7,
          ease: Power1
      })
  
  
      tmenu.to(menuClose.children[0],{
          rotate: "45deg",
          ease: Power1,
          duration: .1
      },"mcut")
      tmenu.to(menuClose.children[1],{
          rotate: "-45deg",
          ease: Power1,
          duration: .1
      },"mcut")
  
      mline.play()
      tmenu.play()
  
  })
  
  
  menuClose
  .addEventListener("click", ()=>{
      mline.reverse()
      tmenu.reverse()
  })
  }
  
  mobileNav()


  let textHeroAnimations =  ()=>{


    var textTimline = gsap.timeline()
    var textYAnm = document.querySelectorAll(".text-y-anm") 


    textYAnm
    .forEach((elem)=>{

    var culter = "";


      elem.innerText.split("").forEach((e)=>{
        culter += `<span class="inline-block text-y-anm-span translate-y-[101%] opacity-0">${e}</span>`
        elem.innerHTML = culter
  
      })


  
      textTimline.to(".text-y-anm-span",{
        y: "0%",
        opacity: 1,
        stagger: 0.04,
        duration: 1,
        ease: Power4,
      },"textTimline")

    })


    textTimline.from(".nav",{
      borderBottom: "0px solid #eeeeee",
      opacity: 0,
      duration: 5,
      delay: 3,
      ease: Power4,
    },"textTimline")

    textTimline.from(".nav-anm",{
      y: "200%",
      duration: 2,
      delay: 3,
      ease: Power4,
    },"textTimline")


    textTimline.from("#flot-bottle",{
      height: 0,
      opacity:0,
      duration:1.3,
      delay: 3,
      ease: Power1,
    },"textTimline")

    textTimline.from(".flower1",{
      height: 0,
      width: 0,
      opacity: 0,
      filter: "blur(0)",
      duration:1.2,
      delay: 3,
      ease: Power1,
    },"textTimline")

  }

  textHeroAnimations()

}


const section2Animation = ()=>{

  let trailerVideo = document.querySelector("#trailerVideo")

  let tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".section2",
      scroller: "#main",
      start: "top 80%",
      end: "bottom bottom",
      // markers: true,
      scrub: 1
    }
  })

  tl2.to("#main",{
    "--bg1": "#89a96f00", 
    duration: 6,
    ease: Power4
  },"tl2")


  tl2.to("#flot-bottle",{
    scale: ".5",
    duration: 5,
    ease: Power4,
  },"tl2")


  tl2.to(".text-move-right-P",{
    x: "-110%",
    duration: 5,
    ease: Power4,
  },"tl2")

  tl2.to(".text-move-left-P",{
    x: "110%",
    duration: 5,
    ease: Power4,
  },"tl2")

  tl2.to(".flower1", {
    y: "10rem",
    duration: 4,
    ease: Power4
  },"tl2")

  tl2.to(".flower2", {
    y: "100%",
    rotate: "-70deg",
    duration: 4,
    ease: Power4
  },"tl2")

tl2.from(trailerVideo, {
    scale: "0.2",
    ease: Power4,
    duration: 6,
    onUpdate: function(){
      trailerVideo.play()
    } 

},"tl2")



let videoUnmuted = ()=>{

  var videoUnmuted = document.querySelector(".video-unmuted")

  videoUnmuted
  .addEventListener("mouseenter", ()=>{

    mouseFollowers.innerHTML = `<i class="ri-volume-up-line"></i>`

    gsap.to(mouseFollowers,{
      padding: '1.5rem',
      fontSize: '1rem',
      width: 'fit-contant',
      height: 'fit-contant',
      opacity: 1,
      rotate: '360deg'
    })
    

  })

  videoUnmuted
  .addEventListener("mouseleave", ()=>{

    mouseFollowers.innerHTML = ""

    gsap.to(mouseFollowers,{
      padding: '0',
      fontSize: '1rem',
      width: '1rem',
      height: '1rem',
      opacity: 0,
      rotate: '0deg'
    })
    

  })


  videoUnmuted
  .addEventListener("click", ()=>{

    trailerVideo.muted = trailerVideo.muted ? false : true
    mouseFollowers.innerHTML = ! trailerVideo.muted ? '<i class="ri-volume-mute-line"></i>' : '<i class="ri-volume-up-line"></i>';

  })
 
} 


videoUnmuted()
}


const section3Animation = ()=>{

  let cardsAnimation = ()=>{


    var cardsTimline = gsap.timeline({
      scrollTrigger: {
        trigger: ".cards1",
        scroller: "#main",
        start: "top bottom",
        end: "bottom bottom",
        // markers: true,
        scrub: 1
      }
    })
  
  
    cardsTimline.from(".ctext1",{
      y: "100%",
      ease: Power4
    },"cardsTimline")
  
    cardsTimline.from(".ctext2",{
      y: "-100%",
      ease: Power4
    },"cardsTimline")
  
  
    cardsTimline.from(".cards1",{
      y: "80%",
      ease: Power4
    },"cardsTimline")
  
    cardsTimline.from(".cards2",{
      y: "-100%",
      ease: Power4
    },"cardsTimline")
  
    cardsTimline.from(".cards3",{
      x: "100%",
      ease: Power4
    },"cardsTimline")
  
    cardsTimline.from(".cards4",{
      x: "-100%",
      ease: Power4
    },"cardsTimline")
  
  }


  let curculArrowBtnAnimation = ()=>{

    var curcurArrowbtn = document.querySelector(".curcur-arrow-btn")
    var curcurArrowbtnTimline = gsap.timeline()
    var curcurArrowbtnTimline2 = gsap.timeline()

    curcurArrowbtn
   .addEventListener("mouseenter", ()=>{

    curcurArrowbtnTimline.pause()
    curcurArrowbtnTimline.to(".curcur",{
      rotate: '360deg',
      duration: 4,
      ease: "none",
      repeat: -1
    })


    curcurArrowbtnTimline2.to(".arrow",{
      scale: .9,
      x: 0,
      duration: .4,
      ease: "none"
    })

    curcurArrowbtnTimline2.to(".curcur",{
      scale: 1.3,
      duration: .4,
      ease: "none",
    })

    curcurArrowbtnTimline2.play()
    curcurArrowbtnTimline.play()
    

   })

   curcurArrowbtn
   .addEventListener("mouseleave", ()=>{
     curcurArrowbtnTimline2.reverse()
    curcurArrowbtnTimline.pause()

    gsap.set(".curcur",{
      scale: 1,
      rotate: "0deg",
      duration: .2,
      ease: Power4
    })
    


   })

  }


  let gooeyAnimation = ()=>{

    Shery.imageEffect(".gooey",{
      style: 5,
      config:{"a":{"value":2.29,"range":[0,30]},"b":{"value":-0.65,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":1.0726114649681529},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1.26,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.15,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":false},"onMouse":{"value":1},"noise_speed":{"value":0.92,"range":[0,10]},"metaball":{"value":0.7,"range":[0,2]},"discard_threshold":{"value":0.11,"range":[0,1]},"antialias_threshold":{"value":0.01,"range":[0,0.1]},"noise_height":{"value":0.47,"range":[0,2]},"noise_scale":{"value":61.07,"range":[0,100]}},
      gooey: true,
    })

  }


  let mobileAnimation = ()=>{

    if(window.innerWidth <=425){
      gsap.from(".section3Card4",{
        height: "0",
        duration: 10,
        ease: "power1.in",
        scrollTrigger: {
          trigger: ".section3Card4",
          scroller: "#main",
          start: "top 95%",
          end: "bottom bottom",
          // markers: true,
          scrub: 1
        }
    });

  }

}
  cardsAnimation()
  curculArrowBtnAnimation()
  gooeyAnimation()
  window.onload = mobileAnimation

  window.addEventListener("resize", function(){
    mobileAnimation()
  })

}


const section4Animation = ()=>{

  let showText_Rotate = ()=>{

    var showTextTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".section4",
        scroller: "#main",
        start: "top 50%",
        end: "bottom bottom",
        // markers: true,
        scrub: 1
      }
    })

    showTextTimeline.from(".show-text",{
      x: "-200%",
      ease: "expoScale(0.5,7,none)"
    })

    gsap.from(".show-text-rotate",{
      rotate: "-360deg",
      ease: "none",
      duration: 5,
      repeat: -1
    })

  }


  showText_Rotate()
}




loco()
mouseFollower()
magnetoAnimation()
section1Animation()
section2Animation()
section3Animation()
section4Animation()