/**
 * Created by Oleksa on 9/21/2017.
 */
'use strict';
class SliderObj {
    constructor() {

    }

    variable() {
        this.mainContainer.prepend('<div id="slider-header"></div>');
        this.headerContainer = $("#slider-header");

        this.sliderContainer = $("#slider__container");
        this.sliderSlider = $(".slider__slider");
        this.sliderSliderLength = this.sliderSlider.length;


        this.mainContainer.append('<div id="slider-footer"> </div>');
        this.footerContainer = $("#slider-footer");
    }

    loadImages() {
        this.headerContainer.append('<div class="slider__inputFile"><span id="clickFile">' + this.textOfInputFile + '</span>' +
            '<input hidden type="file" id="inputFile" name="img" accept=".jpeg, .png, .jpg" multiple>' +
            '</div>');

        $("#clickFile").on("click", () => {
            $('#inputFile').click();
        })
    }

    //TODO: привязать загруженные картинки

    loaderSlider() {
        this.sliderContainer.css("width", 100 * (this.sliderSliderLength + 1) + "%");
        this.sliderSlider.css("width", 100 / ( this.sliderSliderLength + 1 ) + "%");
    }



    loadNextPrevButton() {
        if(this.buttonNextPrevInBlock){
            this.mainContainer.prepend('<div id="slider__prevBlock"></div>').append('<div id="slider__nextBlock"></div>');
            this.slidePrev = $("#slider__prevBlock");
            this.slideNext = $("#slider__nextBlock");
        }else{
            this.footerContainer.append('<div id="slider__button"><div id="slider__prev"></div><div id="slider__next"></div></div>');
            this.slidePrev = $("#slider__prev");
            this.slideNext = $("#slider__next");
        }

        this.nextSlider();
        this.prevSlider();
    }

    nextSlider() {
        this.slideNext.on("click", (e) => {
            const sign = +1;
            this.changeSlider(sign, "next");
        })
    }

    prevSlider() {
        this.slidePrev.on("click", (e) => {
            const sign = -1;
            this.changeSlider(sign, "prev");
        })
    }

    changeSlider(sign, route, numberOfImage = false) {
        this.numberOfSlide = numberOfImage ? numberOfImage : parseInt(this.sliderContainer.attr("data-currentSlider"));
        this.sliderWidth = this.sliderSlider.width();

        this.sliderContainer.stop();
        if (this.currentSLideTimeOut) {
            clearTimeout(this.currentSLideTimeOut);   this.currentSlide.remove();
        }

        if (this.numberOfSlide <= 0 && route === "prev") {
            this.animationOfFirstSlide(this.sliderSliderLength - 1)
        } else if (this.numberOfSlide === this.sliderSliderLength - 1 && route === "next") {
            this.animationOfLastSlide(0);
        } else if (this.numberOfSlide < this.sliderSliderLength) {
            this.sliderContainer.stop(false, true);
            this.numberOfSlide = Number(this.numberOfSlide) + sign;
            this.sliderContainer.animate({left: -( this.sliderWidth) * (this.numberOfSlide )}, this.timeToChangeSlider).attr("data-currentSlider", this.numberOfSlide);
        }
    }


    animationOfLastSlide(numberOfSlide) {
        this.currentSlide = this.sliderSlider.first().clone();
        this.sliderContainer
            .append( this.currentSlide)
            .animate({left: -( this.sliderWidth) * (this.numberOfSlide + 1 )}, this.timeToChangeSlider);
        this.sliderContainer
            .animate({left: 0}, 0)
            .attr("data-currentSlider", this.numberOfSlide = numberOfSlide);

        this.currentSLideTimeOut = setTimeout(() => {
            this.currentSlide.remove();
        }, this.timeToChangeSlider);
    }

    animationOfFirstSlide(numberOfSlide) {
        this.currentSlide =  this.sliderSlider.last().clone();
        this.sliderContainer
            .css("left", -(this.sliderWidth * 1))
            .prepend(  this.currentSlide)
            .animate({left: 0}, this.timeToChangeSlider);
        this.sliderContainer
            .animate({left: -( this.sliderWidth) * ( numberOfSlide )}, 0)
            .attr("data-currentSlider", this.numberOfSlide = numberOfSlide);

        this.currentSLideTimeOut = setTimeout(() => {
            this.currentSlide.remove();
        }, this.timeToChangeSlider);

    }

    opacitySlider() {
        this.footerContainer.append('<div id="slider__opacity"><div class="opacity__block"><span class="opacity__circle"></span></div></div>');
        this.opacityCircle = $(".opacity__circle");
        this.opacityBlock = $(".opacity__block");
        this.sliderContainerOpacity = $(".slider__container--opacity");

        this.opacityBlock.on("mousemove", (e) => {
            if (e.buttons === 1) {
                this.sliderContainerOpacity.css("opacity", this.variableOfOpacity(e));
            }
        });
        this.opacityBlock.on("click", (e) => {
            this.sliderContainerOpacity.css("opacity",   this.variableOfOpacity(e));
        });
    }

    variableOfOpacity(e) {
        let x = e.clientX;
        let a = this.opacityBlock.get(0).getBoundingClientRect().left;
        let position = x - a;
        this.opacityCircle.css("width", position);
        return position / this.opacityBlock.width();
    }

    changeOpacity(e) {
        let x = e.clientX;
        let a = this.wrapOfSlider.get(0).getBoundingClientRect().left;
        return x - a;
    }

    moveOfOpacitySlider() {
        this.sliderSlider.on("mousemove", (e) => {
            if (e.buttons === 1) {
                $(e.currentTarget).find(".slider__container--opacity").css("width", this.changeOpacity(e));
            }
        });
        this.sliderSlider.on("click", (e) => {
            $(e.currentTarget).find(".slider__container--opacity").css("width", this.changeOpacity(e));
        });
    }

    paginationSlider() {
        this.footerContainer.append('<div id="slider__pagination"></div>');
        let pagination = $("#slider__pagination");
        this.sliderSlider.each((key, value) => {
            let imageToPagination = $(value).find("img").clone();
            let blockForPagination = $("<div/>", {
                "class": "paginationImageBlock",
                'data-pagination': key
            }).html(imageToPagination);
            pagination.append(blockForPagination);
        });
        this.paginationSliderAction();
    }

    paginationSliderAction() {
        $(".paginationImageBlock").on("click", (e) => {
            let numberOfImage = $(e.currentTarget).attr("data-pagination");
            this.changeSlider(0, "next", numberOfImage)
        })
    }

    timerTimeOut() {
        this.slideTimer = setInterval(() => this.changeSlider(+1, "next"), this.slideTime);
        this.mainContainer.hover(() => {
                clearInterval(this.slideTimer);
            },
            () => {
                this.slideTimer = setInterval(() => this.changeSlider(+1, "next"), this.slideTime);
            }
        )
    }

    //TODO: добавить изменение размера картинки и перемещение по ней с помощью мышки...если отключить прозрачность. прозрачность включать по чекбоксу.

    init(ParamOfSliderObj) {

        ({
            mainContainer: this.mainContainer = $("body"),
            wrapOfSlider: this.wrapOfSlider = this.mainContainer.children(":first"),

            loadNextPrevButtonMod: this.loadNextPrevButtonMod = true,
            buttonNextPrevInBlock: this.buttonNextPrevInBlock = false,
            paginationMod: this.paginationMod = false,
            opacityMod: this.opacityMod = false,
            addedImageMod: this.addedImageMod = false,
            textOfInputFile: this.textOfInputFile = "+ Load Photo",

            timeToChangeSlider: this.timeToChangeSlider = 0,
            timer: this.timerMOd = false,
            speedOfTimer: this.slideTime = 6000

        } = ParamOfSliderObj);

        this.variable();
        this.loaderSlider();

        if (this.loadNextPrevButtonMod) {
            this.loadNextPrevButton();
        }
        if (this.opacityMod) {
            this.opacitySlider();
            this.moveOfOpacitySlider();
        }
        if (this.paginationMod) {
            this.paginationSlider();
        }
        if (this.timerMOd) {
            this.timerTimeOut();
        }
        if (this.addedImageMod) {
            this.loadImages();
        }
    }
}






