/**
 * Created by Oleksa on 9/21/2017.
 */
'use strict';
class SliderObj {
    constructor() {

    }

    variable() {
        this.sliderContainer = $("#slider__container");
        this.sliderSlider = $(".slider__slider");
        this.sliderSliderLength = this.sliderSlider.length;

        this.slidePrev = $("#slider__prev");
        this.slideNext = $("#slider__next");

        this.opacityCircle = $(".opacity__circle");
        this.opacityBlock = $(".opacity__block");
        this.sliderContainerOpacity = $(".slider__container--opacity");

    }

    loaderSlider() {
        this.sliderContainer.css("width", 100 * (this.sliderSliderLength + 1) + "%");
        this.sliderSlider.css("width", 100 / ( this.sliderSliderLength + 1 ) + "%");
        this.sliderWidth = this.sliderSlider.width();
    }

    lenghtOfAddedImages() {
        let fileImage = $("#file");
        fileImage.on("change", () => {
            let fileImagesLenghts = fileImage.get(0).files.length;
            let submitImages = $("#slider__submitImages");
            if (fileImagesLenghts >= 2) {
                submitImages.attr("value", "submit images");
            } else if (fileImagesLenghts <= 1) {
                submitImages.attr("value", "submit image");
            }
        });
    }


    addedSliderToBD() {

    }


    changeSlider(sign) {
        this.numberOfSlide = parseInt(this.sliderContainer.attr("data-currentSlider"));

        // function nextSlide() {
        //     if (slideNow == slideCount || slideNow <= 0 || slideNow > slideCount) {
        // }

        if (this.numberOfSlide === this.sliderSliderLength - 1) {
            let lastSlide = this.sliderSlider.first().clone();
            lastSlide.appendTo(this.sliderContainer);

            this.sliderContainer.animate({left: "-" + ( this.sliderWidth) * (this.numberOfSlide + 1 )}, this.timeToChangeSlider);


                setTimeout(() => {
                    this.sliderContainer.animate({left: 0}, 0).attr("data-currentSlider", 0);
                    lastSlide.remove();
                }, this.timeToChangeSlider);


        } else if (this.numberOfSlide < this.sliderSliderLength) {
            this.numberOfSlide = Number(this.numberOfSlide + sign);
            this.sliderContainer.animate({left: "-" + ( this.sliderWidth) * (this.numberOfSlide )}, this.timeToChangeSlider).attr("data-currentSlider", this.numberOfSlide);

        }

    }


    nextSlider() {
        this.slideNext.on("click", (e) => {
            e.preventDefault();
            let sign = +1;
            this.changeSlider(sign);
        })
    }


    prevSlider() {
        this.slidePrev.on("click", (e) => {
            e.preventDefault();
            let sign = -1;
            this.changeSlider(sign);
        })
    }


    firstSlide() {


    }

    paginationSlider() {


    }

    variableOfOpacity(e) {
        let x = e.clientX;
        let a = this.opacityBlock.get(0).getBoundingClientRect().left;
        let position = x - a;
        this.opacityCircle.css("width", position);
        this.opacity = position / this.opacityBlock.width();
        return position / this.opacityBlock.width();
    }


    opacitySlider() {
        this.opacityBlock.on("mousemove", (e) => {
            if (e.buttons === 1) {
                this.sliderContainerOpacity.css("opacity", this.variableOfOpacity(e));
            }
        });
        this.opacityBlock.on("click", (e) => {
            this.variableOfOpacity(e);
            this.sliderContainerOpacity.css("opacity", this.opacity);
        });
    }

    timerTimeOut() {
        this.slideTimer = setInterval(() => this.changeSlider(+1), this.slideTime);
        this.mainContainer.hover(() => {
                clearInterval(this.slideTimer);
            },
            () => {
                this.slideTimer = setInterval(() => this.changeSlider(+1), this.slideTime);
            }
        )
    }

    init(ParamOfSliderObj) {
        this.variable();
        ({
            mainContainer: this.mainContainer = $("body"),
            timeToChangeSlider: this.timeToChangeSlider = 0,
            timer: this.timerTrue = false,
            speedOfTimer: this.slideTime = 6000
        } = ParamOfSliderObj);

        this.loaderSlider();
        this.opacitySlider();
        this.lenghtOfAddedImages();
        this.nextSlider();
        this.prevSlider();

        if (this.timerTrue) {
            this.timerTimeOut();
        }
    }
}
/*
 instanceof
 .constructor*/
// f.paginationSlider();


$(function () {
    let f = new SliderObj();
    f.init({
        mainContainer: $("#slider"),
        timeToChangeSlider: 1000,
        timer: false,
        speedOfTimer: 40000
    })
});

//
// $(function () {
//     let promise = new Promise((resolve, reject) => {
//         let f = new SliderObj();
//         resolve(f.init())
//     });
//     promise
//         .then(
//             result => {
//                 let fe = new SlidInterval();
//                 fe.timerTimeOut();
//             },
//             error => {
//                 alert("bad: " + error.message)
//             }
//         );
// });








