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
        this.sliderContainer.css("width", 100 * (this.sliderSliderLength) + "%");
        this.sliderSlider.css("width", 100 / ( this.sliderSliderLength ) + "%");
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


    changeSlider( sign) {
        this.sliderSliderWidth = this.sliderSlider.width();
        this.numberOfSlide = parseInt(this.sliderContainer.attr("data-currentSlider"));

        // function nextSlide() {
        //     if (slideNow == slideCount || slideNow <= 0 || slideNow > slideCount) {
        // }

        if (this.numberOfSlide === this.sliderSliderLength - 1) {
            this.firstSlide();
        } else if (this.numberOfSlide < this.sliderSliderLength) {
            this.numberOfSlide = Number(this.numberOfSlide + sign);
        }

        this.sliderContainer.animate({left: "-" + (this.sliderSliderWidth) * (this.numberOfSlide )}, 300).attr("data-currentSlider", this.numberOfSlide);
    }


    nextSlider() {
        this.slideNext.on("click", (e) => {
            e.preventDefault();
            let sign = +1;
            this.changeSlider( sign);
        })
    }


    prevSlider() {
        this.slidePrev.on("click", (e) => {
            e.preventDefault();
            let sign = -1;
            this.changeSlider( sign);
        })
    }


    firstSlide() {

        this.numberOfSlide = 0;
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


    init() {
        this.variable();

        this.loaderSlider();
        this.opacitySlider();
        this.lenghtOfAddedImages();
        this.nextSlider();
        this.prevSlider();
    }
}
/*
 instanceof
 .constructor*/
// f.paginationSlider();




class SlidInterval extends SliderObj {
    constructor() {
        super();
        this.variable();
        this.slideTime = 4000;
        this.slideTimer = setInterval(this.changeSlider(+1), this.slideTime);
    }

    timerTimeOut() {

        this.sliderSlider.on("hover", () => {
                clearInterval(this.slideTimer);
            }, () => {
                this.slideTimer = setInterval(this.changeSlider(+1), this.slideTime);
            }
        )
    }


}
/*
 instanceof
 .constructor*/


$(function () {
    let promise = new Promise((resolve, reject) => {
        let f = new SliderObj();
        resolve(  f.init() )
    });
    promise
        .then(
            result => {
                let fe = new SlidInterval();
                fe.timerTimeOut();
            },
            error => {
                alert("bad: " + error.message)
            }
        );
});







