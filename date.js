exports.getDate = () => {
    const today = new Date();

    // Gets the day of the week in numerical format
    const currentDay = today.getDay();

    // Options for how a date should be represented
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    // Getting datestring with options applied using toLocaleDateString
    return today.toLocaleDateString("en-US", options);
}

exports.getDay = () => {
    const today = new Date();

    // Gets the day of the week in numerical format
    const currentDay = today.getDay();

    // Options for how a date should be represented
    const options = {
        weekday: "long"
    };

    // Getting datestring with options applied using toLocaleDateString
    return today.toLocaleDateString("en-US", options);
}