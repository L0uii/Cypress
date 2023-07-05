const safeReplace = (from = '', to = '') => src => String(src).replace(from, to);

export const removeWhitespace = safeReplace(/\s/g, '');
export const replaceCommaByDot = safeReplace(',', '.');

export default {
 removeWhitespace,
 replaceCommaByDot,
};