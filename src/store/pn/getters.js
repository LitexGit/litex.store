/*
export function someGetter (state) {
}
*/

export const getPn = ({ supported }) => (symbol) => supported.find(pn => pn.symbol === symbol)
