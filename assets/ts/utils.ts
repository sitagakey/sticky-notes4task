import { FOCUSABLE_ELEMENTS } from '~/assets/ts/variables';
/** Dateオブジェクトを基に、指定された形式の文字列を生成する */
export const formatDate = (dateObject: Date, format: string): string => {
    const year = String(dateObject.getFullYear());
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const date = String(dateObject.getDate()).padStart(2, '0');
    const hour = String(dateObject.getHours()).padStart(2, '0');
    const minutes = String(dateObject.getMinutes()).padStart(2, '0');
    const seconds = String(dateObject.getSeconds()).padStart(2, '0');
    const milliseconds = String(dateObject.getMilliseconds());

    switch (format) {
        case 'yyyy/MM/dd':
            return `${year}/${month}/${date}`;
        case 'yyyy-MM-dd':
            return `${year}-${month}-${date}`;
        case 'yyyy-MM-ddTHH:mm':
            return `${year}/${month}/${date}T${hour}:${minutes}`;
        case 'yyyy/MM/dd HH:mm:ss.SSS':
            return `${year}/${month}/${date} ${hour}:${minutes}:${seconds}.${milliseconds}`;
        default:
            throw new Error('Does not exist format string');
    }
};
/** body要素に対してis-fixedクラスを付与し、現在のスクロール値をtopプロパティに設定する */
export const windowLock = () => {
    const doc = document.body;
    const scrollHeight = window.pageYOffset;

    doc.classList.add('is-fixed');
    doc.style.top = `-${scrollHeight}px`;
};
/** body要素のis-fixedクラスを削除し、topプロパティを初期化する */
export const windowUnLock = (scrollY: number) => {
    const doc = document.body;

    doc.classList.remove('is-fixed');
    doc.style.top = '';
    window.scrollTo(0, scrollY);
};
/** フォーカス管理クラス */
export class LockAt {
    wrapperElement: HTMLElement;
    focusableElements: NodeListOf<HTMLElement>; // eslint-disable-line
    firstElement: HTMLElement;
    lastElement: HTMLElement;
    private loopEvent: (e: KeyboardEvent) => void = this.focusLoop.bind(this);

    constructor(wrapperElement: HTMLElement) {
        this.wrapperElement = wrapperElement;
        this.focusableElements = wrapperElement.querySelectorAll(
            FOCUSABLE_ELEMENTS
        );
        this.firstElement = this.focusableElements[0];
        this.lastElement = this.focusableElements[
            this.focusableElements.length - 1
        ];

        this.addEvents();
    }

    resetFocusableElements() {
        this.removeEvents();

        this.focusableElements = this.wrapperElement.querySelectorAll(
            FOCUSABLE_ELEMENTS
        );
        this.firstElement = this.focusableElements[0];
        this.lastElement = this.focusableElements[
            this.focusableElements.length - 1
        ];

        this.addEvents();
    }

    /** 対象要素にイベントハンドラを追加する */
    addEvents() {
        this.firstElement.addEventListener('keydown', this.loopEvent);
        this.lastElement.addEventListener('keydown', this.loopEvent);
    }

    /** 対象要素のイベントハンドラを削除する */
    removeEvents() {
        this.firstElement.removeEventListener('keydown', this.loopEvent);
        this.lastElement.removeEventListener('keydown', this.loopEvent);
    }

    /** 対象要素間でフォーカスをループさせる */
    focusLoop(e: KeyboardEvent) {
        const key = e.key;
        const onTab = key === 'Tab';
        const onShift = e.shiftKey;
        const target = e.target;
        const isFirstElement = target === this.firstElement;
        const isLastElement = target === this.lastElement;

        if (onTab && onShift && isFirstElement) {
            e.preventDefault();
            this.lastElement.focus();
        } else if (onTab && !onShift && isLastElement) {
            e.preventDefault();
            this.firstElement.focus();
        }
    }
}
