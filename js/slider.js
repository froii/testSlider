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

    lengthOfAddedImages() {
        let fileImage = $("#file");
        fileImage.on("change", () => {
            let fileImagesLength = fileImage.get(0).files.length;
            let submitImages = $("#slider__submitImages");
            if (fileImagesLength >= 2) {
                submitImages.attr("value", "submit images");
            } else if (fileImagesLength <= 1) {
                submitImages.attr("value", "submit image");
            }
        });
        this.addedSliderToBD()
    }

    addedSliderToBD() {


    }

    loaderSlider() {
        this.sliderContainer.css("width", 100 * (this.sliderSliderLength + 1) + "%");
        this.sliderSlider.css("width", 100 / ( this.sliderSliderLength + 1 ) + "%");

        this.identifyImageSize()
    }

    identifyImageSize() {
        let img = this.sliderSlider.find("img");
        img.each((key, value) => {
            if (value.width < value.height) {
                $(value).css("max-height", "100%");
            } else {
                $(value).css("max-width", "99%");
            }
        })
    }


    changeSlider(sign) {
        this.numberOfSlide = parseInt(this.sliderContainer.attr("data-currentSlider"));
        this.sliderWidth = Math.ceil(this.sliderSlider.width());

        if (this.numberOfSlide < 0) {

        } else if (this.numberOfSlide === this.sliderSliderLength - 1) {
            this.animationOfLateralSlide();

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

    animationOfLateralSlide() {

        let promise = new Promise((resolve, reject) => {
            var lastSlide = this.sliderSlider.first().clone();
            $(".i").append(lastSlide);
            this.sliderContainer.append(this.sliderSlider.first().clone());
            this.sliderContainer.animate({left: "-" + ( this.sliderWidth) * (this.numberOfSlide + 1 )}, this.timeToChangeSlider);
            resolve(lastSlide);
        });
        promise.then(
            (lastSlide) => {
                this.sliderContainer.animate({left: 0}, 1).attr("data-currentSlider", this.numberOfSlide = 0);
                lastSlide.remove();
            }, () => {
            }
        );
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
            sliderContainerBlock: this.sliderContainerBlock = this.mainContainer.children(":first"),
            timeToChangeSlider: this.timeToChangeSlider = 0,
            timer: this.timerTrue = false,
            speedOfTimer: this.slideTime = 6000
        } = ParamOfSliderObj);

        this.loaderSlider();
        this.opacitySlider();
        this.lengthOfAddedImages();
        this.nextSlider();
        this.prevSlider();

        if (this.timerTrue) {
            this.timerTimeOut();
        }
    }
}

$(function () {
    let f = new SliderObj();
    f.init({
        mainContainer: $("#slider"),
        sliderContainerBlock: $("#slider__containerBlock"),
        timeToChangeSlider: 1000,
        timer: false,
        speedOfTimer: 40000
    })
});








