export function formatDeliveryDate(numDay) {
    const today = dayjs();
    return today.add(numDay, 'days').format('dddd, MMMM, D');
}