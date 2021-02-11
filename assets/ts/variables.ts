/** 課題の状態をIDで表した値 */
export const STATE_ID = {
    NULL: 0,
    FUTURE: 1,
    TODO: 2,
    DOING: 3,
    DONE: 4,
};
/** ユーザーが削除できないカテゴリーのID */
export const CATEGORY_WHITE_LIST = [1];
/** フォーカス可能な要素郡 */
export const FOCUSABLE_ELEMENTS =
    'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';
