let CommonFunction = {
    formatCompactNumber: (number) => {
        try {
            if (number < 0) {
                number = Math.abs(number); // Convert negative number to positive for formatting
                if (number < 1000) {
                    return "-" + number.toString();
                } else if (number >= 1000 && number < 1000000) {
                    return "-" + (number / 1000).toFixed(3) + "K";
                } else if (number >= 1000000 && number < 1000000000) {
                    return "-" + (number / 1000000).toFixed(3) + "M";
                } else if (number >= 1000000000 && number < 1000000000000) {
                    return "-" + (number / 1000000000).toFixed(3) + "B";
                } else if (number >= 1000000000000 && number < 1000000000000000) {
                    return "-" + (number / 1000000000000).toFixed(3) + "T";
                }
            } else if (number === 0) {
                return "0"; // Return "0" for zero value
            } else {
                if (number < 1000) {
                    return number.toString();
                } else if (number >= 1000 && number < 1000000) {
                    return (number / 1000).toFixed(3) + "K";
                } else if (number >= 1000000 && number < 1000000000) {
                    return (number / 1000000).toFixed(3) + "M";
                } else if (number >= 1000000000 && number < 1000000000000) {
                    return (number / 1000000000).toFixed(3) + "B";
                } else if (number >= 1000000000000 && number < 1000000000000000) {
                    return (number / 1000000000000).toFixed(3) + "T";
                }
            }
        } catch (e) {
            console.log(e);
        }
    },
}

export default CommonFunction;
