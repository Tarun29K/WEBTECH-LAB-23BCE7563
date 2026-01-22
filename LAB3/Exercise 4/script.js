
let activityLog = [];
let clickCount = 0;
const CLICK_THRESHOLD = 10;

const logList = document.getElementById('logList');
const warning = document.getElementById('warning');
const zone = document.getElementById('interactionZone');

function logActivity(type, target, phase) {
    const entry = {
        timestamp: new Date().toLocaleTimeString(),
        type: type,
        target: target,
        phase: phase
    };
    
    activityLog.push(entry);
    
    //activity log using DOM
    const li = document.createElement('li');
    li.textContent = `[${entry.timestamp}] ${entry.type.toUpperCase()} on <${entry.target}> (${entry.phase})`;
    logList.prepend(li);
    
    checkSecurity();
}

//suspicious activity
function checkSecurity() {
    if (clickCount > CLICK_THRESHOLD) {
        warning.textContent = "WARNING: Suspiciously high click rate detected!";
    }
}

zone.addEventListener('click', (e) => {
    console.log("Capturing phase");
}, true); 

zone.addEventListener('click', (e) => {
    clickCount++;
    logActivity('click', e.target.tagName, 'Bubbling');
});

zone.addEventListener('keydown', (e) => {
    logActivity('keypress', e.target.tagName, 'Bubbling');
});

zone.addEventListener('focus', (e) => {
    logActivity('focus', e.target.tagName, 'Capturing');
}, true);

document.getElementById('resetBtn').addEventListener('click', () => {
    activityLog = [];
    clickCount = 0;
    logList.innerHTML = "";
    warning.textContent = "";
    alert("Log Reset.");
});

document.getElementById('exportBtn').addEventListener('click', () => {
    let output = "USER ACTIVITY LOG\n";
    output += "Generated on: " + new Date().toString() + "\n";
    output += "=".repeat(40) + "\n\n";
    
    activityLog.forEach((entry, index) => {
        output += `${index + 1}. [${entry.timestamp}] `;
        output += `Event: ${entry.type.toUpperCase()} | `;
        output += `Target: ${entry.target} | `;
        output += `Phase: ${entry.phase}\n`;
    });

    //BLOB data for logs
    const blob = new Blob([output], { type: 'text/plain' });

    //anchor for downloading
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = "activity_log.txt";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
});