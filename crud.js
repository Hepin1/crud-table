let array = JSON.parse(localStorage.getItem("curd")) || [];
let isEdit = -1;






function hello() {
    let userfname = document.getElementById("fname").value
    console.log(userfname);
    let userlname = document.getElementById("lname").value
    console.log(userlname);
    let userage = document.getElementById("age").value
    console.log(userage);

    const person = { fname: userfname, lname: userlname, age: userage };
    console.log(person);
    if (isEdit !== -1) {
        const updated = array.map((ite, index) => {

            if (isEdit === index) {
                return person
            }
            else return ite
        });

        array = updated
        localStorage.setItem("curd", JSON.stringify(updated))
    }

    else {
        array.push(person);
    }
    localStorage.setItem("curd", JSON.stringify(array))
    renderHTMLTable()
}

const renderHTMLTable = () => {
    document.getElementById("tablebody").innerHTML = array
        .map((row, index) => {
            return `<tr>
            <td><input onclick="checkMainCheckbox()" type="checkbox" class="subCheckbox" /></td>
            <td>${row.fname}</td>
            <td>${row.lname}</td>
            <td>${row.age}</td>
            <td>
            <button onclick="deletedata(${index})">Delete</button>
            <button onclick="Edit(${index})">Edit</button>
            </td>

            </tr>`
        })
        .join("")
}
renderHTMLTable()

const deletedata = (index) => {
    array.splice(index, 1)
    console.log(index);


    console.log(array);
    localStorage.setItem("curd", JSON.stringify(array))
    renderHTMLTable()
}

const handleSearch = () => {
    const searchvalue = document.getElementById('dd').value;
    const searchData = array?.filter((item) => {
        return (item?.fname.toLocaleLowerCase().includes(searchvalue.toLocaleLowerCase()) || item?.lname.toLocaleLowerCase().includes(searchvalue.toLocaleLowerCase()) || item?.age.toLocaleLowerCase().includes(searchvalue.toLocaleLowerCase()))
    })
    console.log(searchData);
    if (searchvalue !== '') {
        array = searchData;
    }
    else {
        array = JSON.parse(localStorage.getItem("curd"));
    }
    renderHTMLTable();

}
const Edit = (idx) => {
    console.log(idx);
    isEdit = idx;

    let recordEdit = array.find((item, index) => { return (index === idx) });
    console.log(recordEdit);

    document.getElementById("fname").value = recordEdit.fname;
    document.getElementById("lname").value = recordEdit.lname;
    document.getElementById("age").value = recordEdit.age;
}



function selectcheckboxes() {
    let mainCheckbox = document.getElementById("mainCheckbox");
    let subCheckboxes = document.getElementsByClassName("subCheckbox");
    for (let i = 0; i < subCheckboxes.length; i++) {
        subCheckboxes[i].checked = mainCheckbox.checked;
    }
}

function checkMainCheckbox() {
    let mainCheckbox = document.getElementById("mainCheckbox");
    let subCheckboxes = document.getElementsByClassName("subCheckbox");
    let allChecked = true;
    for (let i = 0; i < subCheckboxes.length; i++) {
        if (!subCheckboxes[i].checked) {
            allChecked = false;
            break;
        }
    }
    mainCheckbox.checked = allChecked;
}

const deleteSelected = () => {
    let subCheckboxes = document.getElementsByClassName("subCheckbox");
    let selectedIndexes = [];

    for (let i = 0; i < subCheckboxes.length; i++) {
        if (subCheckboxes[i].checked) {
            selectedIndexes.push(i);
        }
    }

    const updatedArray = array.filter((item, index) => !selectedIndexes.includes(index));
    array = updatedArray;

    localStorage.setItem("curd", JSON.stringify(updatedArray));
    renderHTMLTable()
};
