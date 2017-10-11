module.exports = {
    /**
     * Takes a number and replaces it with the South African country code,
     * removing invalid characters
     * @param input
     * @returns {string} - parsed number
     */
    parseNumber: (input) => {
        // Process the cell number here

        let initialNumber = input;
        let newNumber = "";

        // console.log("SUBSTRING OF INITIAL: " + initialNumber.substring(0, 3));

        // replace all spaces
        if (initialNumber.indexOf(' ') >= 0) {

            // console.log("Spaces detected, replacing...");
            initialNumber = initialNumber.replace(/ /g, '');
        }

        // If the number begins with 0, replace with 27
        if (initialNumber.substring(0, 1) === "0") {

            // console.log("SUBSTRING: " + initialNumber.substring(0, 2) + "\n");
            newNumber = "27" + initialNumber.substring(1);
        }

        // If the number begins with a +27, remove the plus
        else if (initialNumber.substring(0, 3) === "+27") {
            // console.log("SUBSTRING: " + initialNumber.substring(1) + "\n");
            newNumber = initialNumber.substring(1);
        } else {
            newNumber = initialNumber;
        }

        return newNumber;
    }
};
