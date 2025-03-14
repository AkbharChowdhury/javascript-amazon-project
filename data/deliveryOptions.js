export const deliveryOptions = [{
    'id': 1,
    'deliveryDays': 7,
    'price': 0

},
{
    'id': 2,
    'deliveryDays': 3,
    'price': 4.99

},

{
    'id': 3,
    'deliveryDays': 1,
    'price': 9.99

},
]
export function getDeliveryOption(deliveryOptionId){
    const deliveryOption = deliveryOptions.filter(option => option.id === deliveryOptionId)
    return deliveryOption.length === 0 ? deliveryOptions[0] : deliveryOption[0];
}