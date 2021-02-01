/**
 * Dateオブジェクトを基に、yyyy/MM/dd形式の文字列を生成する
 * @param dateObject Dateオブジェクト
 */
export const formatDate = (dateObject: Date): string => {
    const year = String(dateObject.getFullYear());
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const date = String(dateObject.getDate()).padStart(2, '0');

    return `${year}/${month}/${date}`;
};
