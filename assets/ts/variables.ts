/** 課題の状態をIDで表した値 */
export const STATE_ID = {
    NULL: 0,
    FUTURE: 1,
    TODO: 2,
    DOING: 3,
    DONE: 4,
};
export const CATEGORY_ID = {
    UNCATEGORIZED: 1,
};
/** ユーザーが削除できないカテゴリーのID */
export const CATEGORY_WHITE_LIST = [CATEGORY_ID.UNCATEGORIZED];
/** フォーカス可能な要素郡 */
export const FOCUSABLE_ELEMENTS =
    'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';
