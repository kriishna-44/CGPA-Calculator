const semesterCount =
document.getElementById("semesterCount");

semesterCount.addEventListener(
"change",
generateInputs
);

generateInputs();

function generateInputs(){

    const count =
    semesterCount.value;

    const container =
    document.getElementById(
        "semesterInputs"
    );

    container.innerHTML = "";

    for(let i=1;i<=count;i++){

        container.innerHTML += `
        <input
        type="number"
        step="0.01"
        min="0"
        max="10"
        placeholder="Enter SGPA for Semester ${i}">
        `;
    }
    document.querySelectorAll("#semesterInputs input")
    .forEach(input => {

    input.addEventListener("input", () => {

        document.getElementById("errorMsg")
        .innerText = "";

    });

    });
}

function calculateCGPA(){

    const errorMsg = document.getElementById("errorMsg");
    errorMsg.innerText = "";

    const inputs =
    document.querySelectorAll(
        "#semesterInputs input"
    );

    const values = [];

    let total = 0;

    for(let input of inputs){

        let value = Number(input.value);

        if(input.value === ""){

            document.getElementById("errorMsg")
            .innerText =
            "Please fill all semester SGPA fields.";

            return;
        }

        if(value < 0 || value > 10){

            document.getElementById("errorMsg")
            .innerText =
            "SGPA must be between 0 and 10.";

            return;
        }

        values.push(value);
        total += value;
    }

    const cgpa =
    total / values.length;

    const result =
document.getElementById("result");

result.classList.remove("result-animation");

void result.offsetWidth;

result.innerHTML =
`CGPA: ${cgpa.toFixed(2)}`;

result.classList.add("result-animation");

    document.getElementById("highestSGPA")
    .innerText =
    Math.max(...values).toFixed(2);

    document.getElementById("lowestSGPA")
    .innerText =
    Math.min(...values).toFixed(2);

    document.getElementById("averageSGPA")
    .innerText =
    cgpa.toFixed(2);
}

function calculateTargetCGPA(){

    const resultText =
    document.getElementById("result").innerText;

    if(resultText === ""){
        alert("Please calculate CGPA first.");
        return;
    }

    const currentCGPA =
    parseFloat(
        resultText.replace("CGPA: ","")
    );

    const targetCGPA =
    parseFloat(
        document.getElementById("targetCGPA").value
    );

    const completedSemesters =
    Number(
        document.getElementById("semesterCount").value
    );

    const totalSemesters = 8;

    const remainingSemesters =
    totalSemesters - completedSemesters;

    if(isNaN(targetCGPA)){
        alert("Please enter a target CGPA.");
        return;
    }

    if(targetCGPA > 10){
        document.getElementById("targetResult")
        .innerText =
        "Target CGPA cannot exceed 10.";
        return;
    }

    if(remainingSemesters <= 0){
        document.getElementById("targetResult")
        .innerText =
        "No remaining semesters.";
        return;
    }

    const requiredSGPA =
    (
        (targetCGPA * totalSemesters)
        -
        (currentCGPA * completedSemesters)
    ) / remainingSemesters;

    if(requiredSGPA > 10){

       document.getElementById("targetResult").innerHTML =
`<span style="color:#ff8080">
<i class="fa-solid fa-circle-xmark"></i>
Target CGPA is not achievable.
</span>`;
        return;
    }

    if(requiredSGPA < 0){

        document.getElementById("targetResult").innerHTML =
`<span style="color:#22c55e">
<i class="fa-solid fa-circle-check"></i>
You have already achieved this target CGPA.
</span>`;

        return;
    }

    document.getElementById("targetResult").innerHTML =
`<span style="color:#22c55e">
<i class="fa-solid fa-circle-check"></i>
You need an average SGPA of
<strong>${requiredSGPA.toFixed(2)}</strong>
in the remaining semesters.
</span>`;
}