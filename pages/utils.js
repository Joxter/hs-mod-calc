
export function stringifyTerm(sec) {
    const secInMin = 60;
    const secInHour = 60 * secInMin;
    const secInDay = 24 * secInHour;

    const days = Math.floor(sec / secInDay);
    const hours = Math.floor((sec - days * secInDay) / secInHour);
    const mins = Math.floor((sec - days * secInDay - hours * secInHour) / secInMin);

    let result = [];

    if (days) {
        result.push(days + `d`);
    }

    if (hours) {
        result.push(hours + `h`);
    }

    if (mins) {
        result.push(mins + `m`);
    }

    return result.join(` `);
}

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
