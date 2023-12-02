var courseName = document.querySelector('#courseName');
var courseCategory = document.querySelector('#courseCategory');
var coursePrice = document.querySelector('#coursePrice');
var courseDescription = document.querySelector('#courseDescription');
var courseCapacity = document.querySelector('#courseCapacity');
var inputs = document.querySelectorAll('.inputs');
var deleteAllBtn = document.querySelector('#deleteBtn');
var search = document.querySelector('#search');
var addbtn = document.querySelector('#click');
var courses = [];
var nameError = document.querySelector('.nameError');
var catigoryError = document.querySelector('.catigoryError');
var priceError = document.querySelector('.priceError');
var capacityError = document.querySelector('.capacityError');
var isNameTrue = false;
var isCatigoryTrue = false;
var isPriceTrue = false;
var isCapacityTrue = false;

if(JSON.parse(localStorage.getItem('courses'))==null){
    courses = [];

}else{
    courses = JSON.parse(localStorage.getItem('courses'));
    displayData();
}


addbtn.addEventListener('click', function (e) {
    e.preventDefault();
    addCourses();
    clearInputs();
    displayData();
    courseName.classList.remove("is-valid");
    courseCategory.classList.remove("is-valid");
    coursePrice.classList.remove("is-valid");
    courseCapacity.classList.remove("is-valid");
});

deleteAllBtn.addEventListener('click', function (e) {
    deleteAll();
});

function addCourses() {
    var course = {
        name: courseName.value.toLowerCase(),
        category: courseCategory.value.toLowerCase(),
        price: coursePrice.value,
        desc: courseDescription.value.toLowerCase(),
        capacity: courseCapacity.value
    }
    courses.push(course);
    localStorage.setItem('courses', JSON.stringify(courses));
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: 'courses added successfully'
    })
    //console.log(courses); 
}

function clearInputs() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}

function displayData() {
    var result = ``;
    for (var i = 0; i < courses.length; i++) {
        result += `
            <tr>
                <td>${i}</td>
                <td>${courses[i].name}</td>
                <td>${courses[i].category}</td>
                <td>${courses[i].price}</td>
                <td>${courses[i].desc}</td>
                <td>${courses[i].capacity}</td>
                <td><button class="btn btn-outline-info">Update</button></td>
                <td><buttton class="btn btn-outline-danger" onclick="deleteCourse(${i})">Delete</buttton></td>
            </tr>
        `;
    }
    document.getElementById("data").innerHTML = result;
}


function deleteCourse(id) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(id, 1);
            localStorage.setItem('courses', JSON.stringify(courses));
            displayData();
            swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
            )
        }
    })
    
}

function deleteAll() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            courses = [];
            localStorage.setItem('courses', JSON.stringify(courses));
            displayData();
            swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
            )
        }
    })
    
}



search.addEventListener("keyup", function (e) {


    var result = ``;
    for (var i = 0; i < courses.length; i++) {
        if (courses[i].name.includes(e.target.value.toLowerCase())) {
            result += `
            <tr>
                <td>${i}</td>
                <td>${courses[i].name}</td>
                <td>${courses[i].category}</td>
                <td>${courses[i].price}</td>
                <td>${courses[i].desc}</td>
                <td>${courses[i].capacity}</td>
                <td><button class="btn btn-outline-info">Update</button></td>
                <td><buttton class="btn btn-outline-danger" onclick="deleteCourse(${i})">Delete</buttton></td>
            </tr>
        `;
        }
        else if (courses[i].category.includes(e.target.value.toLowerCase())) {
            result += `
            <tr>
                <td>${i}</td>
                <td>${courses[i].name}</td>
                <td>${courses[i].category}</td>
                <td>${courses[i].price}</td>
                <td>${courses[i].desc}</td>
                <td>${courses[i].capacity}</td>
                <td><button class="btn btn-outline-info">Update</button></td>
                <td><buttton class="btn btn-outline-danger" onclick="deleteCourse(${i})">Delete</buttton></td>
            </tr>
        `;
        }
        else if (courses[i].price.includes(e.target.value)) {
            result += `
            <tr>
                <td>${i}</td>
                <td>${courses[i].name}</td>
                <td>${courses[i].category}</td>
                <td>${courses[i].price}</td>
                <td>${courses[i].desc}</td>
                <td>${courses[i].capacity}</td>
                <td><button class="btn btn-outline-info">Update</button></td>
                <td><buttton class="btn btn-outline-danger" onclick="deleteCourse(${i})">Delete</buttton></td>
            </tr>
        `;
        }
        else if (courses[i].desc.includes(e.target.value.toLowerCase())) {
            result += `
            <tr>
                <td>${i}</td>
                <td>${courses[i].name}</td>
                <td>${courses[i].category}</td>
                <td>${courses[i].price}</td>
                <td>${courses[i].desc}</td>
                <td>${courses[i].capacity}</td>
                <td><button class="btn btn-outline-info">Update</button></td>
                <td><buttton class="btn btn-outline-danger" onclick="deleteCourse(${i})">Delete</buttton></td>
            </tr>
        `;
        }
        else if (courses[i].capacity.includes(e.target.value)) {
            result += `
            <tr>
                <td>${i}</td>
                <td>${courses[i].name}</td>
                <td>${courses[i].category}</td>
                <td>${courses[i].price}</td>
                <td>${courses[i].desc}</td>
                <td>${courses[i].capacity}</td>
                <td><button class="btn btn-outline-info">Update</button></td>
                <td><buttton class="btn btn-outline-danger" onclick="deleteCourse(${i})">Delete</buttton></td>
            </tr>
        `;
        }


        document.getElementById("data").innerHTML = result;
    }

});

courseName.addEventListener("keyup", function () {
    var Npattern = /^[A-Z][a-z]{2,10}$/;
    if (Npattern.test(courseName.value)) {
        courseName.classList.remove("is-invalid");
        courseName.classList.add("is-valid");
        nameError.classList.add("d-none");
        //nameError.style.cssText = "display: none !important";
        isNameTrue = true;
    } else {
        courseName.classList.remove("is-valid");
        courseName.classList.add("is-invalid");
        nameError.classList.remove("d-none");
        nameError.classList.add("d-block");
        //nameError.style.cssText = "display: block !important";
        isNameTrue = false;
    }


});

courseCategory.addEventListener("keyup", function () {
    var catpattern = /^[A-Z][a-z]{2,10}$/;
    if (catpattern.test(courseCategory.value)) {
        courseCategory.classList.remove("is-invalid");
        courseCategory.classList.add("is-valid");
        catigoryError.classList.add("d-none");
        isCatigoryTrue = true;
    } else {
        courseCategory.classList.remove("is-valid");
        courseCategory.classList.add("is-invalid");
        catigoryError.classList.remove("d-none");
        catigoryError.classList.add("d-block");
        isCatigoryTrue = false;
    }
});

coursePrice.addEventListener("keyup", function () {
    var Ppattern = /^([0-9]{3}|1000)$/;
    if (Ppattern.test(coursePrice.value)) {
        coursePrice.classList.remove("is-invalid");
        coursePrice.classList.add("is-valid");
        priceError.classList.add("d-none");
        isPriceTrue = true;
    } else {
        coursePrice.classList.remove("is-valid");
        coursePrice.classList.add("is-invalid");
        priceError.classList.remove("d-none");
        priceError.classList.add("d-block");
        isPriceTrue = false;
    }
});
courseCapacity.addEventListener("keyup", function () {
    var Ppattern = /^((([5-9][0-9])|([0-2][0-9][0-9]))|300)$/;
    if (Ppattern.test(courseCapacity.value)) {
        courseCapacity.classList.remove("is-invalid");
        courseCapacity.classList.add("is-valid");
        capacityError.classList.add("d-none");
        isCapacityTrue = true;
    } else {
        courseCapacity.classList.remove("is-valid");
        courseCapacity.classList.add("is-invalid");
        capacityError.classList.remove("d-none");
        capacityError.classList.add("d-block");
        isCapacityTrue = false;
    }
    if (isNameTrue && isCatigoryTrue && isPriceTrue && isCapacityTrue) {
        addbtn.removeAttribute("disabled");
    } else {
        addbtn.setAttribute("disabled", "disabled");
    }
});
