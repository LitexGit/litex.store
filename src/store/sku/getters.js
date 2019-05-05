/*
export function someGetter (state) {
}
*/

export const getSkuById = ({ skus }) => (id) => skus.find(sku => sku.id === id)
