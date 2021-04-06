/**
 * Update ngrok binary file.
 */
export = () => {
    const downloadNgrok = require("ngrok/download");
    downloadNgrok(
        () => {
            console.log("Ngrok binary updated.");
            process.exit();
        },
        { ignoreCache: true }
    );
};
