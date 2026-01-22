
const questions = [
    {
        id: "q1",
        label: "Which fruit do you prefer?",
        type: "radio",
        options: ["Apple", "Orange", "Other"],
        required: true
    },
    {
        id: "q1_other",
        label: "Please specify your favorite fruit:",
        type: "text",
        dependsOn: "q1",     
        conditionValue: "Other",
        required: true,
        limit: 20
    },
    {
        id: "q2",
        label: "Select your interests (Choose at least 2):",
        type: "checkbox",
        options: ["Coding", "Music", "Art", "Sports"],
        minSelection: 2
    }
];

const container = document.getElementById('surveyContainer');
const form = document.getElementById('surveyForm');

function generateSurvey() {
    questions.forEach(q => {
        //question wrappers
        const wrapper = document.createElement('div');
        wrapper.id = "container_" + q.id;
        wrapper.style.marginBottom = "20px";
        
        if (q.dependsOn) {
            wrapper.style.display = "none";
        }

        const mainLabel = document.createElement('label');
        mainLabel.innerHTML = `<strong>${q.label}</strong>`;
        wrapper.appendChild(mainLabel);
        wrapper.appendChild(document.createElement('br'));

        //text input
        if (q.type === 'text') {
            const input = document.createElement('input');
            input.id = q.id;
            wrapper.appendChild(input);
        } 
        //radio and checkbox input
        else if (q.type === 'radio' || q.type === 'checkbox') {
            q.options.forEach(opt => {
                const input = document.createElement('input');
                input.type = q.type;
                input.name = q.id;
                input.value = opt;
                input.id = q.id + "_" + opt;

                const lbl = document.createElement('label');
                lbl.setAttribute('for', input.id);
                lbl.textContent = opt;

                input.addEventListener('change', function() {
                    handleBranching(q.id, this.value);
                });

                wrapper.appendChild(input);
                wrapper.appendChild(lbl);
                wrapper.appendChild(document.createElement('br'));
            });
        }

        const error = document.createElement('span');
        error.id = q.id + "Error";
        error.style.color = "red";
        error.style.marginLeft = "10px";
        wrapper.appendChild(error);

        container.appendChild(wrapper);
    });
}

function handleBranching(parentId, selectedValue) {
    questions.forEach(q => {
        if (q.dependsOn === parentId) {
            const depWrapper = document.getElementById("container_" + q.id);
            if (selectedValue === q.conditionValue) {
                depWrapper.style.display = "block";
            } else {
                depWrapper.style.display = "none";
                const input = document.getElementById(q.id);
                if (input) input.value = "";
            }
        }
    });
}

form.addEventListener('submit', function(e) {
    let isValid = true;

    questions.forEach(q => {
        const wrapper = document.getElementById("container_" + q.id);
        const errorSpan = document.getElementById(q.id + "Error");
        errorSpan.textContent = ""; 

        if (wrapper.style.display !== "none") {
            if (q.type === 'text') {
                const val = document.getElementById(q.id).value.trim();
                if (q.required && val === "") {
                    errorSpan.textContent = "Required field.";
                    isValid = false;
                } else if (q.limit && val.length > q.limit) {
                    errorSpan.textContent = `Too long (Max ${q.limit}).`;
                    isValid = false;
                }
            } 
            else if (q.type === 'radio') {
                const checked = document.querySelector(`input[name="${q.id}"]:checked`);
                if (q.required && !checked) {
                    errorSpan.textContent = "Please select an option.";
                    isValid = false;
                }
            } 
            else if (q.type === 'checkbox') {
                const checkedCount = document.querySelectorAll(`input[name="${q.id}"]:checked`).length;
                if (q.minSelection && checkedCount < q.minSelection) {
                    errorSpan.textContent = `Select at least ${q.minSelection}.`;
                    isValid = false;
                }
            }
        }
    });

    if (!isValid) {
        e.preventDefault();
        alert("Please fill the form correctly.");
    } else {
        alert("Survey Submitted Successfully!");
    }
});

generateSurvey();