const table_1 = document.querySelector('.table-1');
const table_2 = document.querySelector('.table-2');


function generate_grids(amount, className, table) {
    for (let i = 0; i < amount; i++) {
        let element = document.createElement('div');
        element.className = className;    //parameter we passed into the function
        table.appendChild(element);     //this line adds the element to our table and displaying it to
    }
}
let elements = document.querySelectorAll('element');

elements.forEach(element => {
    element.onclick = () => {
        console.log('clicked');
    }
})

// entire periodic table structuring
generate_grids(90, 'element element_one', table_1);  //the first table
generate_grids(30, 'element element_two', table_2);  //the second table


function makedata(dataArray) {
    var periodicTable = [];
    for (let index = 0; index < dataArray.length; index++) {
        periodicTable.push({
            "mass": dataArray[index].atomic_mass,
            "element-name": dataArray[index].element_name,
            "category": dataArray[index].category,
            "symbol": dataArray[index].symbol,
        });
    }


    //for displaying content
    const element_1 = document.querySelectorAll('.element_one');
    // "1" is referring to which table elements are found in

    const element_2 = document.querySelectorAll('.element_two');
    //  "2" represents the bottom table

    display(0, 56, element_1, periodicTable); //no offset since its going to be for elements 1-56
    display(57, 74, element_1, periodicTable, 14);
    display(75, 90, element_1, periodicTable, 28);
    display(0, 15, element_2, periodicTable, 56);
    display(15, 30, element_2, periodicTable, 73);



    element_1[56].innerHTML = '<span>57-71 <span><span class="bold">Lanthanides</span>';
    element_1[56].classList.add('Lanthanide');

    element_1[74].innerHTML = '<span>89-103<span> <span class="bold">Actinides</span>';
    element_1[74].classList.add('Actinide');

    let exceptions = [element_1[56], element_1[74]];
    exceptions.forEach(item => {
        let periodicTable = item.computedStyleMap
        periodicTable.textAlign = 'center'
        periodicTable.display = 'flex'
        periodicTable.justifyContent = 'center'
        periodicTable.alignItems = 'center'
    })


    //for color coding
    color_code(0, 56, element_1, periodicTable);
    color_code(57, 74, element_1, periodicTable, 14);
    color_code(75, 90, element_1, periodicTable, 28);

    for (let i = 0; i < 15; i++) {
        element_2[i].classList.add('Lanthanide');
    }

    for (let i = 15; i < 30; i++) {
        element_2[i].classList.add('Actinide');
    }

}

mainpagedata();

function display(min, max, table, periodicTable, offset = 0) {
    // offset=0 means that if no value is passed in for that parameter, it will be 0 by DEFAULT

    for (let i = min; i < max; i++) {
        let idx = i + offset;   //index for looping over the json data array
        let atomic_number = idx + 1;
        table[i].innerHTML = `
        <span class='atomic_number'>${atomic_number}</span>
        <span class='mass'>${periodicTable[idx]["mass"]}</span>
        <span class='symbol'>${periodicTable[idx]["symbol"]}</span>
        <span class='name'>${periodicTable[idx]["element-name"]}</span>
         ` ;
    }
}

function color_code(min, max, table, periodicTable, offset = 0) {

    for (let i = min; i < max; i++) {
        let curr = table[i];
        let idx = i + offset;
        let category = periodicTable[idx]["category"];


        switch (category) {
            //this statement will check for all possible types of element categories

            case "Nonmetal":    //1
                curr.classList.add("Nonmetal");
                break;
            case "Noble Gas":   //2
                curr.classList.add("Noble-gas");
                break;
            case "Alkali Metal":    //3
                curr.classList.add("Alkali-metal");
                break;
            case "Alkaline Earth Metal":    //4
                curr.classList.add("Alkaline-earth-metal");
                break;
            case "Metalloid":   //5
                curr.classList.add("Metalloid");
                break;
            case "Halogen": //6
                curr.classList.add("Halogen");
                break;
            case "Post Transition Metal":   //7
                curr.classList.add("Post-transition-metal");
                break;
            case "Transition Metal":    //8
                curr.classList.add("Transition-metal");
                break;
            case "Lanthanide":  //9
                curr.classList.add("Lanthanide");
                break;
            case "Actinide":    //10
                curr.classList.add("Actinide");
                break;
            case "Unknown":     //11
                curr.classList.add("Unknown");
                break;

        }
    }
}

// for database
function mainpagedata() {
    var data = [];
    fetch('periodictable.php')
        .then(response => {
            if (response.ok) {
                return response.json(); // Parse the response as JSON
            } else {
                throw new Error("Network response was not ok.");
            }
        })
        .then(data => {
            if (data.success) {
                var flag = data.flag;
                if (flag === 1) {
                    dataArray = data.data;
                    makedata(dataArray);
                } else {
                    alert("No new consumer Requests");
                }
            } else {
                alert("Server response indicates an error. Because there is no any consumers");
            }
        })
        .catch(error => {
            alert("An error occurred: " + error.message);
        });
}


function categories() {
    const catarray = new Array("Nonmetal", "Noble Gas", "Alkali-metal", "Alkaline-earth metal", "Metalloid", "Halogen", "Post Transition metal", "Transition metal", "Lanthanide", "Actinide", "Unknown");

    const catcolorarray = new Array("rgb(233,48,48)", "rgb(229,255,0)", "rgb(106,245,106)", "rgb(249,175,132)", "rgb(120,90,240)", "rgb(114,250,214)", "rgb(255,192,4)", "#392cc6", "rgb(45,46,49)", "rgb(0,255,251)", "rgb(210,210,210)");

    var categories = document.querySelector(".categories");
    for (let i = 1; i <= 11; i++) {
        var categorycolor = document.createElement("div");
        var catcolor = "categorycolor" + i;
        categorycolor.classList.add(catcolor);
        categorycolor.style.backgroundColor = catcolorarray[i - 1];

        categorycolor.classList.add("categorycolor");
        categories.appendChild(categorycolor);


        var category = document.createElement("div");
        var cat = "category" + i;
        category.classList.add(cat);
        category.innerHTML = catarray[i - 1];

        category.classList.add("category");
        categories.appendChild(category);
    }
}

categories();

function showelement() {
    var element = document.querySelector('.showelement');
    element.innerHTML = `
        <span class='el_atno'>1</span>
        <span class='el_mass'>1.008</span>
        <span class='el_symbol'>H</span>
        <span class='el_name'>Hydrogen</span>
         ` ;
}
showelement();