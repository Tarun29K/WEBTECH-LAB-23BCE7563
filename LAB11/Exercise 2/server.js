const fs = require('fs');
const fileName = 'file.txt';

console.log("--- File Operations ---");

fs.writeFile(fileName, 'Initial Content.', (err) => {
    //write
    if (err)
        return console.error(`Error creating file: ${err.message}`);
    console.log(`1. Success: ${fileName} created.`);

    fs.readFile(fileName, 'utf8', (err, data) => {
        //read
        if (err)
            return console.error(`Error reading file: ${err.message}`);
        console.log(`2. Read content: "${data}"`);

        //append
        const newText = '\nNew line appended later.';
        fs.appendFile(fileName, newText, (err) => {
            if (err)
                return console.error(`Error appending file: ${err.message}`);
            console.log('3. Success: Content appended.');

            //updated read
            fs.readFile(fileName, 'utf8', (err, updatedData) => {
                console.log(`4. Updated content:\n${updatedData}`);

                //delete
                fs.unlink(fileName, (err) => {
                    if (err)
                        return console.error(`Error deleting file: ${err.message}`);
                    console.log(`5. Success: ${fileName} deleted.`);
                    console.log("--- Operations Complete ---");
                });
            });
        });
    });
});