/**
 * Dateオブジェクトを基に、指定された形式の文字列を生成する
 * @param dateObject Dateオブジェクト
 */
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
        case 'yyyy/MM/dd HH:mm:ss.SSS':
            return `${year}/${month}/${date} ${hour}:${minutes}:${seconds}.${milliseconds}`;
        default:
            throw new Error('Does not exist format string');
    }
};
