import { r as registerInstance, c as createEvent, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
var KEY_CODES = {
    'TAB': 9,
    'ENTER': 13,
    'ESC': 27,
    'SPACE': 32,
    'LEFT': 37,
    'UP': 38,
    'RIGHT': 39,
    'DOWN': 40
};
var messages = {
    'af': {
        monthList: ['Januarie', 'Februarie', 'Maart', 'April', 'Mei', 'Junie', 'Julie', 'Augustus', 'September', 'Oktober', 'November', 'Desember']
    },
    'ar-DZ': {
        monthList: ['جانفي', 'فيفري', 'مارس', 'أفريل', 'ماي', 'جوان', 'جويلية', 'أوت', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
    },
    'ar': {
        monthList: ['كانون الثاني', 'شباط', 'آذار', 'نيسان', 'مايو', 'حزيران', 'تموز', 'آب', 'أيلول', 'تشرين الأول', 'تشرين الثاني', 'كانون الأول']
    },
    'az': {
        monthList: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun', 'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr']
    },
    'bg': {
        monthList: ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември']
    },
    'bs': {
        monthList: ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Juni', 'Juli', 'August', 'Septembar', 'Oktobar', 'Novembar', 'Decembar']
    },
    'ca': {
        monthList: ['gener', 'febrer', 'març', 'abril', 'maig', 'juny', 'juliol', 'agost', 'setembre', 'octubre', 'novembre', 'desembre']
    },
    'cs': {
        monthList: ['leden', 'únor', 'březen', 'duben', 'květen', 'červen', 'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec']
    },
    'cy-GB': {
        monthList: ['Ionawr', 'Chwefror', 'Mawrth', 'Ebrill', 'Mai', 'Mehefin', 'Gorffennaf', 'Awst', 'Medi', 'Hydref', 'Tachwedd', 'Rhagfyr']
    },
    'da': {
        monthList: ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December']
    },
    'de': {
        monthList: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
    },
    'el': {
        monthList: ['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος']
    },
    'en-AU': {
        monthList: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    'en-GB': {
        monthList: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    'en-NZ': {
        monthList: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    'eo': {
        monthList: ['Januaro', 'Februaro', 'Marto', 'Aprilo', 'Majo', 'Junio', 'Julio', 'Aŭgusto', 'Septembro', 'Oktobro', 'Novembro', 'Decembro']
    },
    'et': {
        monthList: ['Jaan', 'Veebr', 'Märts', 'Apr', 'Mai', 'Juuni', 'Juuli', 'Aug', 'Sept', 'Okt', 'Nov', 'Dets']
    },
    'eu': {
        monthList: ['urtarrila', 'otsaila', 'martxoa', 'apirila', 'maiatza', 'ekaina', 'uztaila', 'abuztua', 'iraila', 'urria', 'azaroa', 'abendua']
    },
    'en-US': {
        monthList: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        accessibilityDateInputText: 'date input press spacebar or enter to open calendar modal',
        accessibilityIconText: 'datepicker press spacebar or enter to open calendar modal',
        accessibilitySelectedMonthText: 'currently {{ selectedMonth }} is selected please press spacebar or enter to toggle month list',
        accessibilitySelectedYearText: 'currently {{ selectedYear }} is selected please press spacebar or enter to toggle year list',
        accessibilityPrevIconText: 'move to previous month button',
        accessibilityNextIconText: 'move to next month button',
        accessibilityCloseButton: 'close calendar popup button',
        currentDate: 'current date',
        arrowKeysToMove: 'use arrow keys to move among dates',
        informationIconLabel: 'information icon'
    },
    'fa': {
        monthList: ['فروردين', 'ارديبهشت', 'خرداد', 'تير', 'مرداد', 'شهريور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند']
    },
    'fi': {
        monthList: ['Tammikuu', 'Helmikuu', 'Maaliskuu', 'Huhtikuu', 'Toukokuu', 'Kesäkuu', 'Heinäkuu', 'Elokuu', 'Syyskuu', 'Lokakuu', 'Marraskuu', 'Joulukuu']
    },
    'fo': {
        monthList: ['Januar', 'Februar', 'Mars', 'Apríl', 'Mei', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember']
    },
    'fr-CH': {
        monthList: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    },
    'fr': {
        monthList: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    },
    'gl': {
        monthList: ['Xaneiro', 'Febreiro', 'Marzo', 'Abril', 'Maio', 'Xuño', 'Xullo', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Decembro']
    },
    'he': {
        monthList: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר']
    },
    'hi': {
        monthList: ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर']
    },
    'hr': {
        monthList: ['Siječanj', 'Veljača', 'Ožujak', 'Travanj', 'Svibanj', 'Lipanj', 'Srpanj', 'Kolovoz', 'Rujan', 'Listopad', 'Studeni', 'Prosinac']
    },
    'hu': {
        monthList: ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December']
    },
    'hy': {
        monthList: ['Հունվար', 'Փետրվար', 'Մարտ', 'Ապրիլ', 'Մայիս', 'Հունիս', 'Հուլիս', 'Օգոստոս', 'Սեպտեմբեր', 'Հոկտեմբեր', 'Նոյեմբեր', 'Դեկտեմբեր']
    },
    'id': {
        monthList: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'Nopember', 'Desember']
    },
    'is': {
        monthList: ['Janúar', 'Febrúar', 'Mars', 'Apríl', 'Maí', 'Júní', 'Júlí', 'Ágúst', 'September', 'Október', 'Nóvember', 'Desember']
    },
    'it': {
        monthList: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']
    },
    'ja': {
        monthList: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    },
    'ka': {
        monthList: ['იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი', 'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი']
    },
    'kk': {
        monthList: ['Қаңтар', 'Ақпан', 'Наурыз', 'Сәуір', 'Мамыр', 'Маусым', 'Шілде', 'Тамыз', 'Қыркүйек', 'Қазан', 'Қараша', 'Желтоқсан']
    },
    'km': {
        monthList: ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ']
    },
    'ko': {
        monthList: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
    },
    'lb': {
        monthList: ['Januar', 'Februar', 'Mäerz', 'Abrëll', 'Mee', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
    },
    'lt': {
        monthList: ['Sausis', 'Vasaris', 'Kovas', 'Balandis', 'Gegužė', 'Birželis', 'Liepa', 'Rugpjūtis', 'Rugsėjis', 'Spalis', 'Lapkritis', 'Gruodis']
    },
    'lv': {
        monthList: ['Janvāris', 'Februāris', 'Marts', 'Aprīlis', 'Maijs', 'Jūnijs', 'Jūlijs', 'Augusts', 'Septembris', 'Oktobris', 'Novembris', 'Decembris']
    },
    'mk': {
        monthList: ['Јануари', 'Февруари', 'Март', 'Април', 'Мај', 'Јуни', 'Јули', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември']
    },
    'ml': {
        monthList: ['ജനുവരി', 'ഫെബ്രുവരി', 'മാര്‍ച്ച്', 'ഏപ്രില്‍', 'മേയ്', 'ജൂണ്‍', 'ജൂലൈ', 'ആഗസ്റ്റ്', 'സെപ്റ്റംബര്‍', 'ഒക്ടോബര്‍', 'നവംബര്‍', 'ഡിസംബര്‍']
    },
    'ms': {
        monthList: ['Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun', 'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember']
    },
    'nl-BE': {
        monthList: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december']
    },
    'no': {
        monthList: ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember'],
    },
    'pl': {
        monthList: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']
    },
    'pt-BR': {
        monthList: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    },
    'pt': {
        monthList: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    },
    'rm': {
        monthList: ['Schaner', 'Favrer', 'Mars', 'Avrigl', 'Matg', 'Zercladur', 'Fanadur', 'Avust', 'Settember', 'October', 'November', 'December']
    },
    'ro': {
        monthList: ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie']
    },
    'ru': {
        monthList: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    },
    'sk': {
        monthList: ['Január', 'Február', 'Marec', 'Apríl', 'Máj', 'Jún', 'Júl', 'August', 'September', 'Október', 'November', 'December']
    },
    'sl': {
        monthList: ['Januar', 'Februar', 'Marec', 'April', 'Maj', 'Junij', 'Julij', 'Avgust', 'September', 'Oktober', 'November', 'December']
    },
    'sq': {
        monthList: ['Janar', 'Shkurt', 'Mars', 'Prill', 'Maj', 'Qershor', 'Korrik', 'Gusht', 'Shtator', 'Tetor', 'Nëntor', 'Dhjetor']
    },
    'sr-SR': {
        monthList: ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar']
    },
    'sr': {
        monthList: ['Јануар', 'Фебруар', 'Март', 'Април', 'Мај', 'Јун', 'Јул', 'Август', 'Септембар', 'Октобар', 'Новембар', 'Децембар']
    },
    'sv': {
        monthList: ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December']
    },
    'ta': {
        monthList: ['தை', 'மாசி', 'பங்குனி', 'சித்திரை', 'வைகாசி', 'ஆனி', 'ஆடி', 'ஆவணி', 'புரட்டாசி', 'ஐப்பசி', 'கார்த்திகை', 'மார்கழி']
    },
    'th': {
        monthList: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
    },
    'tj': {
        monthList: ['Январ', 'Феврал', 'Март', 'Апрел', 'Май', 'Июн', 'Июл', 'Август', 'Сентябр', 'Октябр', 'Ноябр', 'Декабр']
    },
    'tr': {
        monthList: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']
    },
    'uk': {
        monthList: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень']
    },
    'vi': {
        monthList: ['Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu', 'Tháng Bảy',
            'Tháng Tám', 'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Mười Hai']
    },
    'zh-CN': {
        monthList: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    },
    'zh-HK': {
        monthList: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    },
    'zh-TW': {
        monthList: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    },
    'en': {
        monthList: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        accessibilityDateInputText: 'date input press spacebar or enter to open calendar modal',
        accessibilityIconText: 'datepicker press spacebar or enter to open calendar modal',
        accessibilitySelectedMonthText: 'currently {{ selectedMonth }} is selected please press spacebar or enter to toggle month list',
        accessibilitySelectedYearText: 'currently {{ selectedYear }} is selected please press spacebar or enter to toggle year list',
        accessibilityPrevIconText: 'move to previous month button',
        accessibilityNextIconText: 'move to next month button',
        accessibilityCloseButton: 'close calendar popup button',
        currentDate: 'current date',
        arrowKeysToMove: 'use arrow keys to move among dates'
    },
    'es': {
        monthList: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    }
};
var CLOSE_CALENDAR = 'close-calendar';
var DISABLED_DATES = 'disabled-date';
var Calendar = /** @class */ (function () {
    function Calendar(hostRef) {
        registerInstance(this, hostRef);
        /** calendar days */
        this.calDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        /** used for preparing calendar overlay body [need to check again] */
        this.calDivList = [];
        /** used to hold months list, should be initialized according to locale */
        this.months = [];
        /** current date */
        this.now = new Date();
        /** selector calendar icon */
        this.selectorCalendarIcon = 'calendar-icon';
        /** selector calendar view */
        this.selectorCalendarView = 'calendar-view';
        /** selector date */
        this.selectorDate = 'date';
        /** selected date input selector */
        this.selectorInputSelectedDate = 'input-selected-date';
        /** month list selector */
        this.selectorMonth = 'month-list-select';
        /** year list selector */
        this.selectorYear = 'year-list-select';
        /** current year */
        this.year = this.now.getFullYear();
        /** year list */
        this.yearDropdownDataList = [];
        /** a flag responsible for opening and closing calendar dialog/overlay */
        this.isCalendarOpen = false;
        /** just a configuration if consumer wants to disable the future date ( will be useful in currency converter) */
        this.futureDate = true;
        /** row with message available at footer of calendar overlay */
        this.message = '';
        this.calendarClick = createEvent(this, "calendarClick", 7);
        this.dateSelected = createEvent(this, "dateSelected", 7);
    }
    /** actions to be performed prior to component loading */
    Calendar.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Calendar', messages);
        var shadow = this.element ? this.element : this.element;
        var href = "";
        dxp.util.appendLinkElement(shadow, href);
        href = "";
        dxp.util.appendLinkElement(shadow, href);
        href = dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-calendar.min.css";
        dxp.util.appendLinkElement(shadow, href);
        this.month = this.now.getMonth();
        this.throughYear = this.throughYear ? this.throughYear : this.now.getFullYear();
        var fromYear = this.fromYear;
        if (this.throughYear < this.fromYear) {
            this.throughYear = this.now.getFullYear();
        }
        for (fromYear; fromYear <= this.throughYear; fromYear++) {
            this.yearDropdownDataList.push(fromYear);
        }
        // To prepare div list for inserting appropriate div in cal body (reference from)
        for (var i = 0; i < 49; i++) {
            this.calDivList.push(i);
        }
        // if through year is less than current year then year dropdown should have from year as default first month as default
        if (this.throughYear < this.now.getFullYear()) {
            this.year = this.fromYear;
            this.month = 0;
        }
        this.setDefaultDate();
    };
    /** life cycle hook called after render method when any state variable changes it's state or after force call of render */
    Calendar.prototype.componentDidUpdate = function () {
        if (this.isCalendarOpen) {
            // to initialize calendar data
            this.initCalendarData();
        }
    };
    /** listen to another calendar on the page */
    Calendar.prototype.onCalendarClickHandler = function (event) {
        if (event.detail.calendarId !== this.calendarId) {
            this.isCalendarOpen = false;
        }
    };
    /** perform appropriate action on click event */
    Calendar.prototype.onClickHandler = function (event) {
        this.base.routingEventListener(event);
        var target = event.target ? event.composedPath()[0] : event.target;
        if (target.classList.contains('next-icon')) {
            this.handleNext();
        }
        if (target.classList.contains('prev-icon')) {
            this.handlePrev();
        }
        if (target.classList.contains(CLOSE_CALENDAR) || target.classList.contains('dxp-icon-close')) {
            this.isCalendarOpen = false;
            this.setFocusBySelector(this.selectorCalendarIcon);
        }
        if (target.classList.contains(this.selectorDate)) {
            this.selectedDateFromCalendar = Number(target.innerText);
            this.selectedMonthFromCalendar = this.month;
            this.selectedYearFromCalendar = this.year;
            /** emit an event with the selected date for the consumer use */
            var dateObj = { 'date': target.innerText, 'month': this.month, 'year': this.year, 'target': this.element };
            this.dateSelected.emit(dateObj);
            dxp.log.info(this.element.tagName, 'onClickHandler()', dateObj);
            this.isCalendarOpen = false;
        }
        if (target.classList.contains(this.selectorCalendarIcon)
            || this.checkElementAttribute(target, 'id', this.selectorInputSelectedDate)) {
            if (!this.isCalendarOpen) {
                this.calendarClick.emit({ calendarId: this.calendarId });
            }
            // toggle calendar on click
            this.isCalendarOpen = !this.isCalendarOpen;
        }
    };
    /** perform appropriate action on click event */
    Calendar.prototype.onClickHandlerClose = function (event) {
        var target = event.target ? event.composedPath()[0] : event.target;
        if (!target.closest('.overlay')
            && !target.classList.contains(this.selectorCalendarIcon)
            && !this.checkElementAttribute(target, 'id', this.selectorInputSelectedDate)) {
            this.isCalendarOpen = false;
        }
    };
    /** Listen date selected event from event emmiter */
    Calendar.prototype.onDateSelectedListen = function (event) {
        var detail = event.detail;
        this.selectedDate = this.getFormattedDate(detail.month, detail.date, detail.year);
    };
    /** Listener is responsible for calling */
    Calendar.prototype.onKeyUpHandler = function (event) {
        var target = event.target ? event.target.activeElement : event.target;
        this.onTabPressed(target, event.keyCode);
    };
    /** listen to option selected event of dxp-select */
    Calendar.prototype.onOptionSelected = function (event) {
        var selectEvent = event.detail.event;
        var target = selectEvent.target ? selectEvent.target.activeElement : selectEvent.target;
        if (target.classList.contains(this.selectorMonth)) {
            this.onMonthSelected(Number(selectEvent.target.value));
        }
        if (target.classList.contains(this.selectorYear)) {
            this.onYearSelected(Number(selectEvent.target.value));
        }
    };
    /** check element by attribute */
    Calendar.prototype.checkElementAttribute = function (target, attribute, id) {
        if (target.getAttribute(attribute) && target.getAttribute(attribute) === id) {
            return true;
        }
        return false;
    };
    /** get aria-label for month */
    Calendar.prototype.getAriaLabelMonth = function (month) {
        return dxp.i18n.t('Calendar:accessibilitySelectedMonthText', { selectedMonth: this.months[month] });
    };
    /** get aria-label for year */
    Calendar.prototype.getAriaLabelYear = function (year) {
        return dxp.i18n.t('Calendar:accessibilitySelectedYearText', { selectedYear: year });
    };
    /** get element by selector */
    Calendar.prototype.getElementBySelector = function (selector, index) {
        if (index === void 0) { index = 0; }
        var ele = this.element ? this.element : this.element;
        var eles = ele.querySelectorAll("." + selector);
        return eles && eles[index] ? eles[index] : undefined;
    };
    /** get elements by selector */
    Calendar.prototype.getElementsBySelector = function (selector) {
        var ele = this.element ? this.element : this.element;
        return ele.querySelectorAll("." + selector);
    };
    /** get formatted date */
    Calendar.prototype.getFormattedDate = function (m, d, y) {
        var date = new Date(y, m, d);
        return this.pad(date.getMonth() + 1, 2) + "/" + this.pad(date.getDate(), 2) + "/" + date.getFullYear();
    };
    /** handle close calendar for accessibility */
    Calendar.prototype.handleCalendarClose = function (target, keycode) {
        if (target.classList.contains(CLOSE_CALENDAR) && (keycode === KEY_CODES.ENTER || keycode === KEY_CODES.SPACE)) {
            this.isCalendarOpen = false;
            this.setFocusBySelector(this.selectorCalendarIcon);
        }
        if (target.classList.contains(CLOSE_CALENDAR) && keycode === KEY_CODES.TAB) {
            this.setFocusBySelector('dxp-dropdown-container');
        }
    };
    /** handle accessibility events */
    Calendar.prototype.handleKeyEvents = function (target, keycode) {
        // Overlay should be dismissed when esc key is pressed
        if (keycode === KEY_CODES.ESC) {
            this.isCalendarOpen = false;
            this.setFocusBySelector(this.selectorCalendarIcon);
        }
        // to handle close calendar
        this.handleCalendarClose(target, keycode);
        if (target.classList.contains('prev-icon') && (keycode === KEY_CODES.ENTER || keycode === KEY_CODES.SPACE)) {
            this.handlePrev();
        }
        if (target.classList.contains('next-icon') && (keycode === KEY_CODES.ENTER || keycode === KEY_CODES.SPACE)) {
            this.handleNext();
        }
        // for selector dates
        if (target.classList.contains(this.selectorDate) && (keycode === KEY_CODES.ENTER || keycode === KEY_CODES.SPACE)) {
            this.selectedDateFromCalendar = Number(target.innerText);
            this.selectedMonthFromCalendar = this.month;
            this.selectedYearFromCalendar = this.year;
            this.isCalendarOpen = false;
            this.setFocusBySelector(this.selectorCalendarIcon);
            if (this.dateSelected) {
                /** emit an event with the selected date for the consumer use */
                var dateObj = { 'date': target.innerText, 'month': this.month, 'year': this.year, 'target': this.element };
                this.dateSelected.emit(dateObj);
            }
        }
        // Manage year dropdown from keyboard
        if (target.classList.contains(this.selectorDate)) {
            this.moveFocusOnKeyPress(target, keycode);
        }
    };
    /** handle next */
    Calendar.prototype.handleNext = function () {
        if (this.index === 11 && this.year < this.throughYear) {
            this.index = 0;
            this.year = +this.year + 1;
            this.onYearSelected(this.year);
        }
        else if (this.index < 11) {
            this.index += 1;
        }
        this.onMonthSelected(this.index);
    };
    /** handle prev */
    Calendar.prototype.handlePrev = function () {
        if (this.index === 0 && this.year > this.fromYear) {
            this.index = 11;
            this.year = +this.year - 1;
            this.onYearSelected(this.year);
        }
        else if (this.index > 0) {
            this.index -= 1;
        }
        this.onMonthSelected(this.index);
    };
    /** function is responsible for preparing data to show calendar when calendar icon is clicked (function designed by gesso team) */
    Calendar.prototype.initCalendarData = function () {
        this.setDefaultYear();
        this.setDefaultMonth();
        this.index = this.month;
        this.renderDates(this.month, this.year);
        this.setFocusBySelector(this.selectorMonth);
    };
    /** check is current month */
    Calendar.prototype.isCurrentMonth = function () {
        return this.base.returnBooleanValue(this.month === this.now.getMonth() && this.year === this.now.getFullYear());
    };
    /** if the given date (dd/m-1/yyyy) is in the list of given disabled dates, return true */
    Calendar.prototype.isInDateList = function (currentDate, days) {
        var date = currentDate.split('-');
        var day = date[0];
        var month = date[1];
        var year = date[2];
        month = (parseInt(month, 10) + 1).toString();
        if (month.length === 1) {
            month = "0" + month;
        }
        var formattedDate = day + "-" + month + "-" + year;
        return days.indexOf(formattedDate) > -1;
    };
    /** used for handling arrow keys movement in calendar (Generally used for accessibility) */
    Calendar.prototype.moveFocusOnKeyPress = function (target, keycode) {
        // for left arrow key
        if (target.classList.contains(this.selectorDate) && (keycode === KEY_CODES.LEFT)) {
            this.pressLeftArrowKey(target);
        }
        // for up arrow key
        if (target.classList.contains(this.selectorDate) && (keycode === KEY_CODES.UP)) {
            this.pressUpArrowKey(target);
        }
        // for right arrow key
        if (target.classList.contains(this.selectorDate) && (keycode === KEY_CODES.RIGHT)) {
            this.pressRightArrowKey(target);
        }
        // for down arrow key
        if (target.classList.contains(this.selectorDate) && (keycode === KEY_CODES.DOWN)) {
            this.pressDownArrowKey(target);
        }
    };
    /** when month is clicked from the month's dropdown menu */
    Calendar.prototype.onMonthSelected = function (index) {
        this.month = index;
        this.setMonthDropdown(this.month);
        this.renderDates(this.month, this.year);
        this.index = this.month;
    };
    /** This code is responsible for handing the accessibility scenarios */
    Calendar.prototype.onTabPressed = function (target, keycode) {
        if ((target.classList.contains(this.selectorCalendarIcon) || this.checkElementAttribute(target, 'content-id', this.selectorInputSelectedDate))
            && (keycode === KEY_CODES.ENTER || keycode === KEY_CODES.SPACE)) {
            this.calendarClick.emit({ calendarId: this.calendarId });
            // toggle calendar
            this.isCalendarOpen = !this.isCalendarOpen;
        }
        else {
            this.handleKeyEvents(target, keycode);
        }
    };
    /** when year is clicked from the year's dropdown menu */
    Calendar.prototype.onYearSelected = function (index) {
        this.year = index;
        this.setYearDropdown(this.year);
        this.renderDates(this.month, this.year);
    };
    /** pad prefix to number */
    Calendar.prototype.pad = function (num, size, prefix) {
        if (prefix === void 0) { prefix = '0'; }
        var s = num.toString();
        while (s.length < size) {
            s = prefix + s;
        }
        return s;
    };
    /** for down arrow key */
    Calendar.prototype.pressDownArrowKey = function (target) {
        var previousMonthDate;
        var dates = this.getElementsBySelector(this.selectorDate);
        if (dates && dates.length > 0) {
            previousMonthDate = Number(dates[dates.length - 1].innerHTML);
        }
        var test = Number(target.innerText) + 7;
        if (dates && dates.length > 0) {
            if (test <= Number(dates[dates.length - 1].innerHTML)) {
                this.setFocusOnKeyPress(target);
            }
            else {
                this.handleNext();
                this.setFocusBySelector(this.selectorDate, (test - previousMonthDate) - 1);
            }
        }
    };
    /** for left arrow key */
    Calendar.prototype.pressLeftArrowKey = function (target) {
        var dates = this.getElementsBySelector(this.selectorDate);
        if (dates && dates.length > 0 && Number(target.innerText) === Number(dates[0].innerHTML)) {
            this.handlePrev();
            var date = this.getElementsBySelector(this.selectorDate);
            this.setFocusBySelector(this.selectorDate, date.length - 1);
        }
        if (dates && dates.length > 0) {
            for (var _i = 0, _a = Object.keys(dates); _i < _a.length; _i++) {
                var i = _a[_i];
                if (Number(target.innerText) - 1 === Number(dates[i].innerHTML)) {
                    this.setFocusBySelector(this.selectorDate, +i);
                }
            }
        }
    };
    /** for right arrow key */
    Calendar.prototype.pressRightArrowKey = function (target) {
        var dates = this.getElementsBySelector(this.selectorDate);
        if (dates && dates.length > 0 && Number(target.innerText) === Number(dates[dates.length - 1].innerHTML)) {
            this.handleNext();
            var date = this.getElementsBySelector(this.selectorDate);
            if (date && dates.length > 0) {
                this.setFocusBySelector(this.selectorDate, 0);
            }
        }
        if (dates && dates.length > 0) {
            for (var _i = 0, _a = Object.keys(dates); _i < _a.length; _i++) {
                var i = _a[_i];
                if (Number(target.innerText) + 1 === Number(dates[i].innerHTML)) {
                    this.setFocusBySelector(this.selectorDate, +i);
                }
            }
        }
    };
    /** up key pressed */
    Calendar.prototype.pressUpArrowKey = function (target) {
        var test = (Number(target.innerText) - 7);
        if (test > 0) {
            var dates = this.getElementsBySelector(this.selectorDate);
            if (dates && dates.length > 0) {
                for (var _i = 0, _a = Object.keys(dates); _i < _a.length; _i++) {
                    var i = _a[_i];
                    if (Number(target.innerText) - 7 === Number(dates[i].innerHTML)) {
                        this.setFocusBySelector(this.selectorDate, +i);
                    }
                }
            }
        }
        else {
            this.handlePrev();
            var dates = this.getElementsBySelector(this.selectorDate);
            if (dates && dates.length > 0) {
                this.setFocusBySelector(this.selectorDate, (dates.length - 1) + test);
            }
        }
    };
    /** Reflect dates relevant to month and year selected */
    Calendar.prototype.renderDates = function (month, year) {
        var startDay = new Date(year, month, 1).getDay();
        var days = new Date(year, month + 1, 0).getDate();
        var selectedDate = this.selectedDateFromCalendar + "-" + this.selectedMonthFromCalendar + "-" + this.selectedYearFromCalendar;
        var calendarView = this.getElementBySelector(this.selectorCalendarView);
        if (!calendarView) {
            return;
        }
        this.startDay = startDay + 7;
        for (var i = 0; i < 49; i += 1) {
            calendarView.childNodes[i].innerHTML = '&nbsp';
            calendarView.childNodes[i].setAttribute('data-index', i + 1);
        }
        // set days
        var daysCount = 7;
        for (var i = 0; i < daysCount; i += 1) {
            calendarView.childNodes[i].innerHTML = this.calDays[i];
            calendarView.childNodes[i].classList.add('date-header');
        }
        // set previous month dates
        this.setPreviousMonthDates(year, month, startDay, daysCount, calendarView);
        // set current month dates
        this.setCurrentMonthDates(days, month, year, selectedDate, calendarView);
        // set next month dates
        this.setNextMonthDates(daysCount, startDay, days, year, month, calendarView);
        // set next month future dates
        this.setNextMonthFutureDates(month, year, calendarView);
        this.setDateAttributes();
    };
    /** set current month dates */
    Calendar.prototype.setCurrentMonthDates = function (days, month, year, selectedDate, calendarView) {
        for (var j = 1; j <= days; j += 1) {
            var currentDate = j + "-" + month + "-" + year;
            var classSelectedDate = selectedDate === currentDate ? 'selected-date' : '';
            var tabIndex = -1;
            var ariaLabel = Number(j) + " " + this.months[this.month] + " " + this.year;
            var classDate = this.selectorDate;
            var classBold = '';
            // set class disabled-date
            if (((j > this.now.getDate() || this.month >= this.now.getMonth() + 1)
                && this.month >= this.now.getMonth() && this.year >= this.now.getFullYear() && this.futureDate === false)
                || (this.disabledDates && this.isInDateList(currentDate, this.disabledDates))
                || (this.enabledDates && !this.isInDateList(currentDate, this.enabledDates))) {
                classDate = DISABLED_DATES;
            }
            // set class bold
            if (j === this.now.getDate() && this.isCurrentMonth()) {
                classBold = 'bold';
            }
            calendarView.childNodes[this.startDay].innerHTML = "<span tabindex=" + tabIndex + " data-index=" + currentDate + "\n      class='sc-dxp-calendar " + classSelectedDate + " " + classDate + " " + classBold + "' aria-label='" + ariaLabel + "' > " + j + " </span>";
            this.startDay = this.startDay + 1;
        }
    };
    /** set date attributes - tabIndex, ariaLabel */
    Calendar.prototype.setDateAttributes = function () {
        var date = this.getElementBySelector('selected-date');
        if (!date) {
            date = this.getElementBySelector('bold');
        }
        if (!date) {
            date = this.getElementBySelector(this.selectorDate);
        }
        if (date) {
            var ariaLabel = dxp.i18n.t('Calendar:currentDate') + " " + Number(date.innerHTML) + " " + this.months[this.month] + " " + this.year + " " + dxp.i18n.t('Calendar:arrowKeysToMove');
            date.setAttribute('aria-label', ariaLabel);
            date.setAttribute('tabindex', 0);
        }
    };
    /** set default date */
    Calendar.prototype.setDefaultDate = function () {
        if (this.defaultDate) {
            var dates = this.defaultDate.split('/');
            if (dates && dates.length) {
                this.selectedDateFromCalendar = Number(dates[0]);
                this.selectedMonthFromCalendar = Number(dates[1]) - 1;
                this.selectedYearFromCalendar = Number(dates[2]);
                this.selectedDate = this.getFormattedDate(this.selectedMonthFromCalendar, this.selectedDateFromCalendar, this.selectedYearFromCalendar);
            }
            else {
                dxp.log.info(this.element.tagName, 'componentDidUpdate', 'Invalid default date format');
            }
        }
    };
    /** set default month on init/previously selected */
    Calendar.prototype.setDefaultMonth = function () {
        var defaultMonth = this.selectedMonthFromCalendar >= 0 ? this.selectedMonthFromCalendar : this.now.getMonth();
        if (!this.selectedMonthFromCalendar) {
            if (this.throughYear < this.now.getFullYear()) {
                defaultMonth = 0;
            }
        }
        this.month = defaultMonth;
        var label = this.getAriaLabelMonth(this.month);
        this.setSelectElementAriaLabel(label, this.selectorMonth);
        this.setSelectElementValue(defaultMonth, this.selectorMonth);
    };
    /** set default year on init/previously selected */
    Calendar.prototype.setDefaultYear = function () {
        var defaultYear = this.selectedYearFromCalendar >= 0 ? this.selectedYearFromCalendar : this.now.getFullYear();
        if (!this.selectedYearFromCalendar) {
            if (this.throughYear < this.now.getFullYear()) {
                defaultYear = this.fromYear;
            }
        }
        this.year = defaultYear;
        var label = this.getAriaLabelYear(this.year);
        this.setSelectElementAriaLabel(label, this.selectorYear);
        this.setSelectElementValue(defaultYear, this.selectorYear);
    };
    /** set focus by selector */
    Calendar.prototype.setFocusBySelector = function (selector, index) {
        if (index === void 0) { index = 0; }
        var eles = this.getElementsBySelector(selector);
        if (!eles || !(eles.length > 0) || !eles[index]) {
            return;
        }
        eles[index].focus();
    };
    /** set focus on down key press */
    Calendar.prototype.setFocusOnKeyPress = function (target) {
        var datesArray = this.getElementsBySelector(this.selectorDate);
        if (datesArray && datesArray.length > 0) {
            for (var _i = 0, _a = Object.keys(datesArray); _i < _a.length; _i++) {
                var i = _a[_i];
                if (Number(target.innerText) + 7 === Number(datesArray[i].innerHTML)) {
                    this.setFocusBySelector(this.selectorDate, +i);
                }
            }
        }
    };
    /** set month dropdown */
    Calendar.prototype.setMonthDropdown = function (month) {
        var label = this.getAriaLabelMonth(month);
        this.setSelectElementAriaLabel(label, this.selectorMonth);
        this.setSelectElementValue(month, this.selectorMonth);
    };
    /** set next month dates in the current calendar view */
    Calendar.prototype.setNextMonthDates = function (daysCount, startDay, days, year, month, calendarView) {
        var tdates = daysCount + startDay + days;
        var ndates = 49 - tdates;
        var lastDate = new Date(year, month, days);
        lastDate.setDate(lastDate.getDate() + ndates);
        var nmonth = lastDate.getMonth();
        var nyear = lastDate.getFullYear();
        var ndate = 1;
        for (var i = 0; i < ndates; i += 1) {
            var currentDate = ndate + "-" + nmonth + "-" + nyear;
            var tabIndex = -1;
            var ariaLabel = Number(ndate) + " " + this.months[nmonth] + " " + nyear;
            var classDate = DISABLED_DATES;
            calendarView.childNodes[tdates + i].innerHTML = "<span tabindex=" + tabIndex + " data-index=" + currentDate + "\n      class='sc-dxp-calendar " + classDate + "' aria-label='" + ariaLabel + "' > " + ndate + " </span>";
            ndate = ndate + 1;
        }
    };
    /** set next month future disabled dates */
    Calendar.prototype.setNextMonthFutureDates = function (month, year, calendarView) {
        if (this.throughYear > this.now.getFullYear() && year > this.now.getFullYear() && this.futureDate === false) {
            var days = new Date(year, month + 1, 0).getDate();
            var startDay = new Date(year, month, 1).getDay();
            startDay = startDay + 7;
            for (var j = 1; j <= days; j += 1) {
                var tabIndex = -1;
                var currentDate = j + "-" + month + "-" + year;
                var classSelectedDate = '';
                var ariaLabel = Number(j) + " " + this.months[this.month] + " " + this.year;
                var classDate = DISABLED_DATES;
                calendarView.childNodes[startDay].innerHTML = "<span tabindex=" + tabIndex + " data-index=" + currentDate + "\n        class='sc-dxp-calendar " + classSelectedDate + " " + classDate + "' aria-label='" + ariaLabel + "' > " + j + " </span>";
                startDay = startDay + 1;
            }
        }
    };
    /** to set previous month dates in the current calendar view */
    Calendar.prototype.setPreviousMonthDates = function (year, month, startDay, daysCount, calendarView) {
        var prevDate = new Date(year, month, 1);
        prevDate.setDate(prevDate.getDate() - startDay);
        var pmonth = prevDate.getMonth();
        var pyear = prevDate.getFullYear();
        var pdate = prevDate.getDate();
        for (var i = 0 + daysCount; i <= startDay + daysCount; i += 1) {
            var currentDate = pdate + "-" + pmonth + "-" + pyear;
            var tabIndex = -1;
            var ariaLabel = Number(pdate) + " " + this.months[pmonth] + " " + pyear;
            var classDate = DISABLED_DATES;
            calendarView.childNodes[i].innerHTML = "<span tabindex=" + tabIndex + " data-index=" + currentDate + "\n      class='sc-dxp-calendar " + classDate + "' aria-label='" + ariaLabel + "' > " + pdate + " </span>";
            pdate = pdate + 1;
        }
    };
    /** set aria-label of select dropdown by selector */
    Calendar.prototype.setSelectElementAriaLabel = function (label, selector) {
        var ele = this.getElementBySelector(selector);
        if (!ele) {
            return;
        }
        ele.setAttribute('aria-label', label);
    };
    /** set value of select dropdown by selector */
    Calendar.prototype.setSelectElementValue = function (value, selector) {
        var ele = this.getElementBySelector(selector);
        if (!ele) {
            return;
        }
        ele['value'] = value.toString();
    };
    /** set year dropdown */
    Calendar.prototype.setYearDropdown = function (year) {
        var label = this.getAriaLabelYear(year);
        this.setSelectElementAriaLabel(label, this.selectorYear);
        this.setSelectElementValue(year, this.selectorYear);
    };
    /** Render the calendar */
    Calendar.prototype.render = function () {
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-calendar render() : " + "DEVELOPMENT");
        /** localize months list according to locale (this assignment cannot be in componentWillLoad because on locale change componentWillLoad is not getting called) */
        this.months = dxp.i18n.t('Calendar:monthList', { returnObjects: true });
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, h("div", { class: "calendar-picker" }, h("div", { class: "input-box-container" }, h("dxp-input", { "content-id": this.selectorInputSelectedDate, type: "text", label: "" + (this.label ? this.label : ''), value: "" + (this.selectedDate ? this.selectedDate : ''), "is-required": this.required, "max-length": "100", "accessibility-text": dxp.i18n.t('Calendar:accessibilityDateInputText'), placeholder: "mm/dd/yyyy", readonly: true })), h("div", { class: this.selectorCalendarIcon, "aria-expanded": this.isCalendarOpen, "aria-label": dxp.i18n.t('Calendar:accessibilityIconText'), role: "button", tabindex: "-1" })), this.isCalendarOpen &&
            h("div", { class: "sc-dxp-calendar overlay", role: "application", tabindex: "-1" }, h("div", { class: "sc-dxp-calendar calendar-modal", tabindex: "-1" }, h("div", { class: "sc-dxp-calendar calendar-header", tabindex: "-1" }, h("div", { class: "sc-dxp-calendar action-container arrow-holder left", role: "none" }, h("span", { tabindex: "0", "aria-label": dxp.i18n.t('Calendar:accessibilityPrevIconText'), class: "sc-dxp-calendar prev-icon" })), h("div", { tabindex: "-1", class: "sc-dxp-calendar dxp-dropdown-container calendar-month-dropdown dxp-dropdown-md" }, h("div", { class: "sc-dxp-calendar action-container dxp-list-container-dropdown", id: "month-list-container-dropdown" }, h("dxp-select", { selector: "" + this.selectorMonth, useIndexAsValue: true, dataList: this.months }))), h("div", { class: "sc-dxp-calendar dxp-dropdown-container calendar-year-dropdown dxp-dropdown-md", tabindex: "-1" }, h("div", { class: "sc-dxp-calendar action-container dxp-list-container-dropdown", id: "year-list-container-dropdown", tabindex: "-1" }, h("dxp-select", { selector: "" + this.selectorYear, dataList: this.yearDropdownDataList }))), h("div", { class: "sc-dxp-calendar action-container arrow-holder right", role: "none" }, h("span", { tabindex: "0", "aria-label": dxp.i18n.t('Calendar:accessibilityNextIconText'), class: "sc-dxp-calendar next-icon" }))), h("div", { class: "sc-dxp-calendar dxp-row dxp-no-outline", tabindex: "-1" }, h("div", { class: "sc-dxp-calendar " + this.selectorCalendarView }, this.calDivList.map(function (_test) {
                return h("div", { class: "sc-dxp-calendar date-div dxp-no-outline", tabindex: "-1" });
            }))), this.message ?
                h("div", { class: "dxp-no-outline", tabindex: "-1" }, h("div", { class: "calendar-note dxp-col-12" }, h("p", null, h("span", { class: "info-icon", "aria-label": dxp.i18n.t('Calendar:informationIconLabel') }), h("span", { innerHTML: "" + this.message })))) : ''))));
    };
    Object.defineProperty(Calendar.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar, "style", {
        get: function () { return "div.dxp.dxp-calendar{position:relative}div.dxp.dxp-calendar .dxp-list-container{margin:0 2px;border:1px solid;top:auto}div.dxp.dxp-calendar .calendar-icon{width:32px;height:32px;cursor:pointer;display:block;position:relative;top:-37px;margin-right:3px;float:right;outline:0}div.dxp.dxp-calendar .info-icon{height:32px;width:32px;display:inline-block}div.dxp.dxp-calendar .calendar-modal{width:332px;border-radius:4px;position:absolute;z-index:2;left:0;margin:10px 0 0}div.dxp.dxp-calendar .calendar-modal>div:nth-child(2){padding:0;margin:0}div.dxp.dxp-calendar .calendar-modal .calendar-view{padding:5px 20px 10px}div.dxp.dxp-calendar .calendar-modal .date-div{width:14.2857142857%;display:inline-block;text-align:center}div.dxp.dxp-calendar .calendar-modal .date-div span{width:37px;display:inline-block;padding:5px;height:37px;line-height:24px;border-radius:18.5px;outline:0}div.dxp.dxp-calendar .calendar-modal .calendar-header{display:-ms-flexbox;display:flex;padding:10px;outline:none;background:none;border:none}div.dxp.dxp-calendar .calendar-modal .calendar-header .action-container{height:26px}div.dxp.dxp-calendar .calendar-modal .calendar-header .next-icon,div.dxp.dxp-calendar .calendar-modal .calendar-header .prev-icon{background-size:auto;cursor:pointer;width:26px;background-position:50%;outline:0}div.dxp.dxp-calendar .calendar-modal .calendar-header .calendar-month-dropdown{width:117px}div.dxp.dxp-calendar .calendar-modal .calendar-header .calendar-year-dropdown{width:76px}div.dxp.dxp-calendar .calendar-modal .calendar-header .dxp-dropdown-container{margin:0;margin-right:10px}div.dxp.dxp-calendar .calendar-modal .calendar-header .dxp-dropdown-container input{font-size:16px;background-color:transparent;background-position-y:15px;border:none;padding:5px 10px}div.dxp.dxp-calendar .calendar-modal .calendar-header .dxp-dropdown-container input:focus{border:1px solid;-webkit-box-shadow:none;box-shadow:none;caret-color:transparent}div.dxp.dxp-calendar .calendar-modal .calendar-header .dxp-dropdown-container input.hidden{display:none}div.dxp.dxp-calendar .calendar-modal .calendar-note p{padding:15px 10px 10px;display:table}div.dxp.dxp-calendar .calendar-modal .calendar-note span{display:table-cell}div.dxp.dxp-calendar .calendar-modal .calendar-note span:last-child{padding-left:10px}div.dxp.dxp-calendar .calendar-modal .disabled-date{pointer-events:none}div.dxp.dxp-calendar .calendar-modal .arrow-holder{display:inherit}div.dxp.dxp-calendar .calendar-modal .arrow-holder.left{margin-right:25px;margin-left:0}div.dxp.dxp-calendar .calendar-modal .arrow-holder.right{margin-left:15px;margin-right:0}div.dxp.dxp-calendar .calendar-modal .arrow-holder span:focus{border:1px solid}div.dxp.dxp-calendar img{width:auto}div.dxp.dxp-calendar[dir=rtl] .calendar-icon{float:left;margin-left:3px}div.dxp.dxp-calendar[dir=rtl] .calendar-modal{left:auto;right:0}div.dxp.dxp-calendar[dir=rtl] .calendar-modal .arrow-holder.left{margin-left:15px;margin-right:0}div.dxp.dxp-calendar[dir=rtl] .calendar-modal .arrow-holder.right{margin-right:25px;margin-left:0}div.dxp.dxp-calendar[dir=rtl] .calendar-modal .calendar-header .dxp-dropdown-container input{text-align:right}div.dxp.dxp-calendar[dir=rtl] .calendar-modal .calendar-header .next-icon,div.dxp.dxp-calendar[dir=rtl] .calendar-modal .calendar-header .prev-icon{margin:0}div.dxp.dxp-calendar[dir=rtl] .calendar-modal .calendar-note span:last-child{padding-right:10px}"; },
        enumerable: true,
        configurable: true
    });
    return Calendar;
}());
export { Calendar as dxp_calendar };
