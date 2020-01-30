import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
import { m as messages } from './messages-3c2a7f4a.js';

const DISPLAY_AS = 'display-as';
const Feedback = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** to hold api result values */
        this.apiResult = [];
        /** holds average values of stars */
        this.avgStars = [];
        /** to store feedback item's values */
        this.feedbackListArray = [];
        /** feedback item display list */
        this.feedbackListDisplay = [];
        /** to hold api result for star count */
        this.starCountArray = [];
        /** prop for inject feedback item list */
        this.feedbackItemList = [];
        /** prop holds number of reviews to load more reviews */
        this.reviewsLimit = 10;
        /** prop holds username key */
        this.usernameKeyLocation = 'COOKIE';
    }
    /** actions to perform before component load */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Feedback', messages);
        this.stepCount = this.reviewsLimit;
        this.isSubmitDisabled = true;
    }
    /** actions to perform after component load */
    async componentDidLoad() {
        if (this.feedbackItemList) {
            this.feedbackDataChangeHandler();
        }
        if (this.feedbackListDisplay) {
            this.feedbackDataDisplay();
        }
        await this.loadFeedBack();
    }
    /** actions to be performed after component update */
    componentDidUpdate() {
        this.showAverageStars();
    }
    /** listen emitted feedback value */
    emittedFeedback(e) {
        const isPresent = this.feedbackListArray.find(feedback => feedback.ratingId === e.detail.feedbackId);
        isPresent ?
            this.feedbackListArray = this.feedbackListArray.map((feedback) => (feedback.ratingId === e.detail.feedbackId) ? Object.assign(Object.assign({}, feedback), { 'ratingValue': e.detail.feedbackValue }) : feedback)
            : this.feedbackListArray.push({ 'ratingId': e.detail.feedbackId, 'ratingValue': e.detail.feedbackValue });
        this.isSubmitDisabled = (this.feedbackItemList.length !== this.feedbackListArray.length) ? true : false;
    }
    /** click listener for cta button */
    async submitHandler(e) {
        if (e.target.getAttribute('btn-id') === 'load-more') {
            this.reviewsLimit = this.reviewsLimit + this.stepCount;
            await this.loadFeedBack();
        }
        if (e.target.getAttribute('btn-id') === 'cancel') {
            this.clearFeedbackForm();
        }
        if (e.target.getAttribute('btn-id') === 'submit') {
            if (this.loadMoreElement) {
                this.loadMoreElement.style.display = 'none';
            }
            if (this.itemContainerDisplay) {
                this.itemContainerDisplay.innerHTML = '';
            }
            const bodyData = {
                appId: this.appId,
                contentId: this.contentId,
                ratings: this.feedbackListArray,
                feedback: this.textareaValue,
                createdBy: this.getUserName()
            };
            const dataQueryString = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'appId': this.appId,
                    'contentId': this.contentId
                },
                body: JSON.stringify(bodyData)
            };
            this.textareaValue = '';
            if (this.apiUrl) {
                const addFeedbackResponse = await this.apiService(this.apiUrl, dataQueryString);
                if (addFeedbackResponse) {
                    await this.loadFeedBack();
                    this.clearFeedbackForm();
                }
            }
            else {
                if (bodyData.ratings[0]) {
                    Number.isInteger(bodyData.ratings[0]['ratingValue']) ?
                        this.feedbackListDisplay.unshift({
                            displayUserName: bodyData.createdBy,
                            starCount: Number(bodyData.ratings[0]['ratingValue']),
                            timeStamp: dxp.moment(new Date()).fromNow(),
                            feedbackAdditionalText: bodyData.feedback
                        }) : this.feedbackListDisplay.unshift({
                        displayUserName: bodyData.createdBy,
                        feedbackValue: bodyData.ratings[0]['ratingValue'],
                        timeStamp: dxp.moment(new Date()).fromNow(),
                        feedbackAdditionalText: bodyData.feedback
                    });
                }
                await this.loadFeedBack();
                this.clearFeedbackForm();
            }
        }
        this.isSubmitDisabled = true;
    }
    /** Common api service */
    async apiService(url, queryString) {
        if (queryString && queryString !== '') {
            return dxp.api(url, queryString);
        }
        return dxp.api(url);
    }
    /** method for clearing form */
    clearFeedbackForm() {
        this.feedbackDataChangeHandler();
        this.textAreaElement ?
            this.textAreaElement.querySelectorAll('textarea')[0].value = ''
            :
                this.textAreaElement.querySelectorAll('textarea')[0].value = '';
        this.feedbackListArray = [];
    }
    /**  feedbackItems data obj */
    feedbackDataChangeHandler() {
        if (this.feedbackItemList && this.feedbackItemList.length > 0) {
            this.base.createNestedMarkup(this.itemContainer, 'dxp-feedback-item', this.feedbackItemList);
        }
    }
    /**  feedbackItems display obj */
    feedbackDataDisplay() {
        if (this.feedbackListDisplay && this.feedbackListDisplay.length > 0) {
            this.base.createNestedMarkup(this.itemContainerDisplay, 'dxp-feedback-display', this.feedbackListDisplay.slice(0, this.reviewsLimit));
        }
    }
    /** get username  */
    getUserName() {
        let userName = 'Anonymous';
        if (this.usernameKeyLocation === 'COOKIE') {
            const cookiesValue = document.cookie.split(';');
            cookiesValue.forEach(cookie => {
                if (cookie.match(this.usernameKey)) {
                    const cookieMap = cookie.match(this.usernameKey).input.split('=');
                    userName = cookieMap[1];
                }
            });
        }
        if (this.usernameKeyLocation === 'SESSION') {
            userName = sessionStorage.getItem(this.usernameKey);
        }
        if (this.usernameKeyLocation === 'OTHER') {
            userName = 'Other';
        }
        userName = userName ? userName : 'Anonymous';
        return userName;
    }
    /** handle textarea values */
    handleTextarea(e) {
        this.textareaValue = e.target.value;
    }
    /** load feedback from api */
    async loadFeedBack() {
        let apiResultFeedbackList;
        const dataQueryString = {
            method: 'GET',
            headers: {
                'appId': this.appId,
                'contentId': this.contentId,
                'Content-Type': 'application/json'
            }
        };
        if (this.apiUrl && (this.feedbackItemList.length === 1)) {
            if (this.loadMoreElement) {
                this.loadMoreElement.style.display = 'none';
            }
            apiResultFeedbackList = await this.apiService(this.apiUrl, dataQueryString);
            let feedbackList;
            if (apiResultFeedbackList && apiResultFeedbackList.length > 0) {
                feedbackList = [...apiResultFeedbackList].reverse().filter((feedback) => feedback.ratings[0]).map((feedback) => Number.isInteger(feedback.ratings[0]['ratingValue']) ? ({
                    displayUserName: feedback.createdBy,
                    feedbackValue: feedback.ratings[0]['ratingValue'],
                    timeStamp: dxp.moment(`${feedback.createdDate.replace('T', ' ')}Z`).fromNow(),
                    feedbackAdditionalText: feedback.feedback
                }) : ({
                    displayUserName: feedback.createdBy,
                    starCount: Number(feedback.ratings[0]['ratingValue']),
                    feedbackValue: feedback.ratings[0]['ratingValue'],
                    timeStamp: dxp.moment(`${feedback.createdDate.replace('T', ' ')}Z`).fromNow(),
                    feedbackAdditionalText: feedback.feedback
                }));
            }
            this.feedbackListDisplay = feedbackList && feedbackList.length > 0 ? [...feedbackList] : [];
            this.avgStars = [];
            const starValues = this.feedbackListDisplay.reduce((init, next) => (Object.assign(Object.assign({}, init), { [next.starCount]: ((init[next.feedbackValue] | 0) + 1), total: ((init['total'] | 0) + 1) })), {});
            for (let i = 0; i < this.feedbackItemList[0]['star-count']; i++) {
                this.avgStars.push({ star: i + 1, rating: 0 });
            }
            this.avgStars.forEach(avgStar => {
                for (const key of Object.keys(starValues)) {
                    if (key !== 'total' && avgStar.star === Number(key)) {
                        avgStar.rating = Math.round((starValues[key] / starValues.total) * 100);
                    }
                }
            });
            this.avgStars.sort((a, b) => b.star - a.star);
        }
        this.feedbackDataDisplay();
        if (this.averageDisplayElement) {
            this.showAverageDisplayElement();
        }
        if (this.countDisplayElement) {
            this.countDisplayElement.innerHTML = this.feedbackListDisplay.length > 0 ?
                ` ${this.feedbackListDisplay.length} <span class="feedback-heading">${(this.feedbackListDisplay.length > 1) ?
                    dxp.i18n.t('Feedback:Reviews') : dxp.i18n.t('Feedback:Review')}</span>` : '';
        }
        if (this.loadMoreElement) {
            this.loadMoreElement.style.display = (this.feedbackListDisplay.length > this.reviewsLimit) ? 'block' : 'none';
        }
    }
    /** to render stars */
    renderStars() {
        let star = '';
        let isHalfStar = false;
        isHalfStar = this.starFillIndex - Math.floor(this.starFillIndex) !== 0 ? true : false;
        this.starFillIndex = isHalfStar ? Math.ceil(this.starFillIndex) : Math.floor(this.starFillIndex);
        for (let i = 1; i <= this.avgStars.length; i++) {
            star = `${star}<span class= ${(i === this.starFillIndex && isHalfStar) ? 'half-star' : (i >= 0 && i <= this.starFillIndex) ? ' active ' : ''} custom-id={${i}} > </span>`;
        }
        return star;
    }
    /** show average display element that is star */
    showAverageDisplayElement() {
        if (this.feedbackItemList.length === 1 && this.feedbackItemList[0][DISPLAY_AS] === 'star') {
            const totalStar = this.feedbackListDisplay.reduce((init, next) => ((init | 0) + next.starCount), 0);
            const avgStar = (totalStar / this.feedbackListDisplay.length).toFixed(1);
            const avgStarCheck = avgStar.split('.');
            if (avgStarCheck[1] && Number(avgStarCheck[1]) >= 8) {
                this.starFillIndex = Math.round(Number(avgStar));
            }
            else if (avgStarCheck[1] && Number(avgStarCheck[1]) >= 3 && Number(avgStarCheck[1]) <= 7) {
                avgStarCheck.splice(1, 1, '5');
                this.starFillIndex = avgStarCheck.join('.');
            }
            else {
                this.starFillIndex = Math.round(Number(avgStar));
            }
            this.averageDisplayElement.innerHTML = this.feedbackListDisplay.length > 0 ? ` <span class="count-display">${avgStar}</span>
        <div class='render-stars' role='img' aria-label= ${dxp.i18n.t('Feedback:star')}>  ${this.renderStars()} </div>
        ${dxp.i18n.t('Feedback:basedOn')} ${this.feedbackListDisplay.length} ${(this.feedbackListDisplay.length > 1) ?
                dxp.i18n.t('Feedback:ratings') : dxp.i18n.t('Feedback:rating')}.` : '';
        }
    }
    /** show average star rating progress bar */
    showAverageStars() {
        this.avgStars.forEach((avgStar, index) => {
            if (this.starAverageDisplay && this.starAverageDisplay.getElementsByClassName('average-line')[index]) {
                this.starAverageDisplay.getElementsByClassName('average-line')[index].style.width = `${avgStar.rating}%`;
            }
        });
    }
    /** Render the feedback */
    render() {
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && (h("link", { rel: "stylesheet", href: `` }))],
            [this.theme && (h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-feedback.min.css` }))]
        ];
        return (h("div", { class: `container ${this.base.componentClass()}`, dir: this.dir, "data-theme": this.theme }, styles, h("h3", { class: "feedback-title-display" }, this.feedbackTitle), h("div", { class: "feedback-item-wrapper" }, h("div", { class: "feedback-items", ref: el => (this.itemContainer = el) }, h("slot", null)), this.isAdditionalCommentRequired &&
            h("div", null, this.feedbackAdditionalText, h("div", { class: "textarea-wrapper" }, h("dxp-textarea", { rows: 3, "max-length": 500, placeholder: this.feedbackAdditionalTextPlaceholder, onInput: e => this.handleTextarea(e), ref: el => this.textAreaElement = el }))), h("div", { class: "btn-wrapper" }, h("div", { class: "submit-btn" }, h("dxp-cta-list", null, h("dxp-cta", { type: "button", "btn-id": "submit", "button-type": "primary", text: "Submit", disabled: this.isSubmitDisabled, onClick: e => this.submitHandler(e) }), h("dxp-cta", { type: "button", "btn-id": "cancel", "button-type": "secondary", text: "Cancel", onClick: e => this.submitHandler(e) }))))), this.feedbackItemList.length === 1 ?
            h("div", { class: "display-wrapper" }, this.feedbackItemList[0][DISPLAY_AS] === 'star' ? h("div", { class: "avg-rating-wrapper" }, h("div", { class: "average-rating", ref: el => this.averageDisplayElement = el }), h("div", { class: "star-rating", ref: el => this.starAverageDisplay = el }, this.avgStars.map(avgStar => {
                return (h("div", { class: "star-line" }, h("span", null, avgStar.star, h("i", { class: "active", role: "img", "aria-label": `${dxp.i18n.t('Feedback:starRatedBy')} ${avgStar.rating} ${dxp.i18n.t('Feedback:percentageUsers')}` })), h("div", { class: "grey-line" }, h("div", { class: "average-line" }))));
            }))) : '', this.feedbackItemList[0][DISPLAY_AS] !== 'star' ? h("h3", { ref: el => this.countDisplayElement = el }) : '', h("div", { class: "feedback-display", ref: el => (this.itemContainerDisplay = el) }), h("div", { class: "load-more", ref: el => (this.loadMoreElement = el) }, h("dxp-cta", { type: "button", "btn-id": "load-more", "button-type": "secondary", text: dxp.i18n.t('Feedback:showMoreReview'), onClick: e => this.submitHandler(e) }))) : ''));
    }
    get element() { return getElement(this); }
    static get style() { return "div.dxp.dxp-feedback{padding:.93rem}div.dxp.dxp-feedback .btn-wrapper{display:-ms-flexbox;display:flex;margin-top:1.5rem}div.dxp.dxp-feedback .textarea-wrapper{margin:1rem 0}div.dxp.dxp-feedback .feedback-title-display{margin-top:1rem;margin-bottom:2rem}div.dxp.dxp-feedback .display-wrapper{margin-top:1.5rem}div.dxp.dxp-feedback .display-wrapper .average-rating{margin-bottom:2rem;width:50%}div.dxp.dxp-feedback .display-wrapper .average-rating .count-display{display:block;padding-right:1rem}div.dxp.dxp-feedback .display-wrapper .star-rating{width:50%}div.dxp.dxp-feedback .display-wrapper .star-rating span{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding:0 .5rem}div.dxp.dxp-feedback .display-wrapper .star-rating .star-line{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;place-content:flex-end}div.dxp.dxp-feedback .display-wrapper .star-rating .star-line .grey-line{width:50%;height:.25rem}div.dxp.dxp-feedback .display-wrapper .star-rating .star-line .grey-line .average-line{width:0;height:100%;-webkit-transition:width .6s ease-out;transition:width .6s ease-out}div.dxp.dxp-feedback .display-wrapper .avg-rating-wrapper{display:-ms-flexbox;display:flex}div.dxp.dxp-feedback .display-wrapper .feedback-heading{display:inline-block}div.dxp.dxp-feedback .display-wrapper .feedback-heading:first-letter{text-transform:capitalize}div.dxp.dxp-feedback .display-wrapper .load-more{margin-bottom:1.75rem}"; }
};

export { Feedback as dxp_feedback };
