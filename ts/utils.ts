import { configData } from "./types/configDataStructs.js";

// Read config files (in JSON)
export function readJSON(fileName: string, populator: (arg0: configData) => void) {
    console.log("Initialising first read");

    // Load the data of the passed file using `populator`
    fetch(fileName)
        .then((response) => {
            return response.json();
        })
        .then((configJSON) => {
            populator(configJSON as configData);
            localStorage.setItem("confData", JSON.stringify(configJSON));
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
