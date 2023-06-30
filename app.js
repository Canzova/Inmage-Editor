const fileInput = document.querySelector(".file-input"),
    previewImage = document.querySelector(".preview-img img"),
    dropArea = document.querySelector(".drag-area"),
    previewImg = document.querySelector(".preview-img"),
    filtername = document.querySelector(".filter-info .name"),
    filterSlider = document.querySelector(".slider input"),
    filterValue = document.querySelector(".filter-info .value"),
    chooseimgBtn = document.querySelector(".choose-img");
const filterOptions = document.querySelectorAll(".filter button");
const rotateOptions = document.querySelectorAll(".rotate button");
const resetFiltersBtn = document.querySelector(".reset-filter");
const saveImgButton = document.querySelector(".save-img");

// Default values of the filters will be 100 and 0
let brightness = 100, saturation = 100, inversion = 0, graysacle = 0;

// Default values of flip/rotate buttons
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

//-------------------------------Apply Filter & Rotation----------------------------

// With the below function we are basically applying filters to the style of the uploaded image. Very Simple

const applyfilters = () => {
    previewImage.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImage.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${graysacle}%)`;
}

//------------Show the selected img on the the screen-------------------

// Overall, the use of the const variable in this code helps in encapsulating and referencing the loadimage function as an event listener, ensuring that its value remains constant and cannot be accidentally changed or reassigned.

function loadimage() {
    // The line let file = fileInput.files[0]; retrieves the first file object from the files property of the fileInput element. The files property contains an array-like list of files selected by the user.

    // Gettinh the selected image file
    let file = fileInput.files[0];

    if (!file)
    return; // Return if user has'nt selected any image

    //URL.createObjectURL()--> It creates an url of the passed file object, With that url we are basically changing the src of the image tag in preview img class
    previewImage.src = URL.createObjectURL(file);

    // In simpler terms, the code waits for the previewImage to finish loading. Once the image has loaded, the callback function is executed. It then selects the first element with the class "container" and removes the class "disable" from it.

    // In JavaScript, the load event is fired when a resource, such as an image, finishes loading. 

    // When the preview image will be loaded into the screen the disable class will be removed from the container class

    previewImage.addEventListener("load", () => {
        resetFiltersBtn.click(); // Clicking on the reset button so that the filters get reset when user upload any other image
        document.querySelector(".container").classList.remove("disable");
    })
}

// The change event is triggered when the user selects a file using the file input element.
fileInput.addEventListener("change", loadimage);

// -----------------Updating the filter Value---------------------
const updatefilter = () => {
    filterValue.innerText = `${filterSlider.value}%`;
    //filterValue.innerText = filterSlider.value + '%';

    const selectedFilter = document.querySelector(".filter .active");  // Getting the selected filter button

    // Storing the selected filter value

    if (selectedFilter.id == 'Brightness') {
        brightness = filterSlider.value;
    }
    else if (selectedFilter.id == 'Saturation') {
        saturation = filterSlider.value;
    }
    else if (selectedFilter.id == 'Inversion') {
        inversion = filterSlider.value;
    }
    else if (selectedFilter.id == 'Grayscale') {
        graysacle = filterSlider.value;
    }
    // Calling the apply filter function when user slide the filterslider
    applyfilters();
}

// As we will give any input to the slider it will call the update filter function
filterSlider.addEventListener("input", updatefilter)


//--------- Uploading file while clicking on the choose image button---------------

// In simpler terms, this code allows you to click a button with the class "choose-img" on a web page. When that button is clicked, it simulates a click event on a hidden file input element with the class "file-input". This is often used to trigger the file selection dialog when the button is clicked, allowing users to choose an image file to upload or perform other related actions.

// With the help of the below code the user can upload the image my clicking on the file input button or the chooseimgBtn(Which is hidden)

// It is baically liken you either click on the choos image button or file input button. It will work same for both the elements

// 
chooseimgBtn.addEventListener("click", () => fileInput.click());

//-----------------------------Filter Buttons and slider------------------------------

// By adding the click event listener to each element in filterOptions, the code ensures that when any filter button is clicked, it removes the "active" class from the previously active element and adds the "active" class to the clicked button. This allows for visual indication or styling to represent the active state of the filter button.

// The code will run only for the button that you have clicked.

// Here's how it works:

// The code adds a click event listener to each button in the filterOptions collection.

// When you click on a specific button, the event listener attached to that button will be triggered.

// Inside the event listener, the code will execute and perform the following actions:

// It will remove the "active" class from the previously active button by selecting the element with the class "active" that is a descendant of an element with the class "filter".

// Then, it will add the "active" class to the button that you clicked (option) by using the classList.add("active") method.

// // Adding click event lister to all filter buttons
filterOptions.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector('.filter .active').classList.remove("active");
        option.classList.add("active");
        // The selected option name will be displayed
        filtername.innerText = option.innerText;

        // Updating the selected particular filter value
        if (option.id === "Brightness") {
            // Max value of brighness will be 200%
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        }
        else if (option.id === "Saturation") {
            // Max value of saturation will be 200%
            filterSlider.max = "200";
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`
        }
        else if (option.id === "Inversion") {
            // Max value of inversion will be 100%
            filterSlider.max = "100";
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        }
        else if (option.id === "Grayscale") {
            // Max value of grayscale will be 100%
            filterSlider.max = "100";
            filterSlider.value = graysacle;
            filterValue.innerText = `${graysacle}%`;
        }
    });
});


//-------------------------------Image Rotation--------------------------------

rotateOptions.forEach(option => {
    option.addEventListener("click", () => {
        // Adding click event listner to all the rotate/flip buttons
        if (option.id == 'left') {
            rotate -= 90; //If the left roate button is clicked then decrement the rotate value by -90 
        }
        else if (option.id == 'right') {
            rotate += 90; //If the left roate button is clicked then decrement the rotate value by +90 
        }
        else if (option.id == 'horizontal') {
            // if the value of flipHorizontal is equals to 1 then change it to -1.
            // If the value of flipHorizontal is -1 then change it to 1
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        }
        else if (option.id == 'vertical') {
            // if the value of flipVertical is equals to 1 then change it to -1.
            // If the value of flipVertical is -1 then change it to 1
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        applyfilters();
    });
});

//---------------------------------Reset Button--------------------------------------

const resetFilter = () => {
    // Reseting all the filters, flip and roate values to the default values
    brightness = 100; saturation = 100; inversion = 0; graysacle = 0;
    rotate = 0; flipHorizontal = 1; flipVertical = 1;
    // Clicking on the brightness button so that after reseting the filters brighness button will be selected
    filterOptions[0].click();
    applyfilters();
}

resetFiltersBtn.addEventListener("click", resetFilter);

//----------------------------Save Image Button----------------------------------------

const saveImage = () => {

    // With the below code we are makin or creating a canvas tag in DOM
    // Canvas tag is basically used to draw and use graphics animation with help of js

    // With the help of the canvas we can also draw image


    const canvas = document.createElement("canvas");

    // .getContext('2d')---> It baiscally provides us a 2d rendering context that allow us to draw on canvas


    // When you use the getContext("2d") method on a canvas element, you obtain a "drawing context" that allows you to draw on the canvas. This context is represented by the ctx variable, which is commonly used to refer to it.

    // Think of the canvas as a blank canvas sheet and the context as a set of tools and instructions you can use to draw on that canvas.

    // With the context (ctx), you can perform various actions such as drawing shapes (like rectangles, circles, or lines), displaying images, adding text, and applying transformations (like scaling, rotating, or translating).

    // For example, you can use the context's methods to draw a rectangle, set the fill color, and then apply a transformation to rotate the rectangle. You can also use the context to load and display an image on the canvas, or to add text in a specific font and size.

    // In summary, the context (ctx) obtained through getContext("2d") provides you with the necessary tools and functions to draw and manipulate various elements on the canvas.

    const ctx = canvas.getContext("2d");


    // Calulating the roated height and width becuase the rotated image was not getting cropped after downloading. Don't think about formula it is copied from internet

    // Because size was to the original height and width

    const rotatedWidth = Math.abs(previewImage.naturalHeight * Math.sin(rotate * Math.PI / 180)) + Math.abs(previewImage.naturalWidth * Math.cos(rotate * Math.PI / 180));
    const rotatedHeight = Math.abs(previewImage.naturalWidth * Math.sin(rotate * Math.PI / 180)) + Math.abs(previewImage.naturalHeight * Math.cos(rotate * Math.PI / 180));


    // With the below code we are baisclly setting the width and height of the canvas element as per the image size

    canvas.width = rotatedWidth;
    canvas.height = rotatedHeight;

    // Applying user selected filters to the canvas filter

    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${graysacle}%)`;

    // The default origin of any canvas element is at the top/left corner of a page

    // With the below code we are basically trafserring the origin of the canvas from top/left corner to the center of the page

    ctx.translate(canvas.width / 2, canvas.height / 2);

    // With the below code if the user has rotated the image before downloading it then we will also rotate our canvas. 

    // Think of canvas a drawing sheet or a blank paper

    // ctx.rotate basically takes an input in radian so we are converting degree into radian 

    if (rotate != 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }

    // Setting up the horizontal flip and vertical flip on the canvas

    ctx.scale(flipHorizontal, flipVertical);


    // with the below line we are drawing the previousImage on the canva or drawing sheet

    // .drawImage take 5 argumnets.
    // 1. Image address or shap to draw etc
    // 2 and 3 : Where we want to place our drawing on the paper
    // with -canvas.width / 2,  -canvas.height / 2 we are basically putting our drwan image's center on the center of the drawing sheet
    // 4 and 5 it shows the height and width of the shape or image we want to draw

    ctx.drawImage(previewImage, -previewImage.naturalWidth / 2, -previewImage.naturalHeight / 2, previewImage.naturalWidth, previewImage.naturalHeight);

    const link = document.createElement("a");

    // Link is the name of the constant varible and .download attribute basically download the image when user click on it.

    // with link.dowmload = fileInput.files[0].name we are setting the name of the the image which is going to download as the name of the uploaded image

    // link.download = fileInput.files[0].name;
    //link.download = "Image.jpeg";

    if(!file){
        link.download = fileInput.files[0].name;
    }
    else
    {
        link.download = "Image.jpeg";
    }

    // With below code we are baiscally giving the link of the canvas image drwan to the anchor tag.

    // canvas.toDataURL()---> basicaly creates a link of the canvas drwaing or image
    link.href = canvas.toDataURL();

    // Due to this line (link.download = fileInput.files[0].name;) it is clear that the image will be downloaded when the use will click on the anchor tag.

    // So with link.click() we are manully clickig on the anchor tag so that the image will get downloaded automaticlly when this function is called 

    link.click();  // clicking a tag to download the image
}

saveImgButton.addEventListener("click", saveImage);

//-------------------------------BackGround Remover---------------------
function handleUpload() {

    let image;

    // Choosing the 1st file
    // const image = fileInput.files[0];
    if(!file){
        // If image has been uploaded through choose img button
        image = fileInput.files[0];
    }
    else
    {
        // If image has been uploaded through drag and drop
        image = file;
    }

    previewImage.style.width = '20%';
    previewImage.style.height = '20%';
    previewImage.src = ' images/pinwheel.gif';

    const key = 'LrL26zJGodQ9ChWyknd12pPd';

    // FormData is a built-in JavaScript object that allows you to create and manage data in the format of a form. It is commonly used when you want to send data, such as files or key-value pairs, to a server using an HTTP request.


    const formData = new FormData();

    // formData.append("image_file", image); adds the chosen image file to the form data object with the key "image_file". This allows the server to identify the image file when processing the request.

    // formData.append('size', 'auto'); adds a key-value pair to the form data object. The key is "size" and the value is 'auto'. This additional information could be used by the server to determine the desired size of the processed image.


    formData.append("image_file", image);
    formData.append('size', 'auto');


    // This code snippet performs an HTTP POST request to the URL 'https://api.remove.bg/v1.0/removebg' with some specific configuration. Let's go line by line:


    // The fetch function is used to make an HTTP request to the specified URL. In this case, it's an HTTP POST request to 'https://api.remove.bg/v1.0/removebg'.
    
    // The configuration object passed as the second argument contains the method ("POST"), headers (including the API key), and the body, which is the formData object containing the image and additional data.

    // This syntax is given on the webiste of remove bg

    fetch('https://api.remove.bg/v1.0/removebg', {
        method: "POST",
        headers: {
            'X-Api-Key': key,
        },
        body: formData
    })

    // In this code, the .then() block is used to handle the response of an HTTP request. The response object is passed as an argument to the callback function.

    // Baically we are converting the response we are getting from server into blob

        .then(function (response) {
            return response.blob();
        })

    // In the next then block, another function is called, which receives the blob object as an argument. Here, the blob object is logged to the console.

        .then(function (blob) {
            // console.log(blob);
            const url = URL.createObjectURL(blob);
            // const img = document.createElement('img');
            previewImage.style.width = '100%';
            previewImage.style.height = '100%';
            previewImage.src = url;
        })

    // If any error occurs during the process, it is caught and handled in the catch block, which is currently empty.

        .catch(function (error) {

        });
}
//---------------------------------Drag and Drop---------------------------------

//-------------------------ShowFile for drag and drop------------------------
function showfile()
{
    // On console we are getting an array named as file. In that file we will receive its type aslo. We are chosing the type key from that array and its value will we the file type user has uploaded.

    // Its not the file varible which we have declared above

    let fileType = file.type;


    // Adding some valid image extention types
    let validExtension = ["image/jpeg", "image/jpg", "image/png"];

    // The ".includes()" method is used to check whether a particular value exists within a string or an array. It returns a boolean value of true if the value is found, and false if it is not found.

    if (validExtension.includes(fileType)) {
        // Creating a new file reader object


        // In JavaScript, FileReader() is a built-in object that provides a way to read the contents of files stored on the user's computer. It allows you to access the contents of a file and perform various operations with it, such as reading its contents, manipulating the data, or displaying it on a webpage.

        // Here's a simplified explanation of how FileReader() works:

        // You create a new instance of the FileReader object using the new keyword, like this: const reader = new FileReader();

        // You can then use the reader object to handle file-related operations. The most common operation is to read the contents of a file.

        // To read a file, you need to call the readAsText() method of the FileReader object and pass it the file you want to read. For example: reader.readAsText(file);

        // Once the file is read, you can access its contents through the result property of the FileReader object. This property holds the data from the file.

        // You can then perform actions with the file data, such as displaying it on a webpage, processing it, or saving it to a database.

        let fileReader = new FileReader();

        // In JavaScript, the onload event is a built-in event that occurs when a resource, such as an image, script, or external file, finishes loading. It is commonly used to perform actions or execute code once the specified resource has been successfully loaded.

        fileReader.onload = () => {

            // Getting the upoaded file from the user using the result property
            let fileURL = fileReader.result;
            // console.log(fileURL);

            // Creating an image tag and passing user selected file source inside src attribute

            // Here, we create an image tag using a template string. The fileURL variable is used as the value of the src attribute of the <img> tag. This means that the image source will be set to the contents of the file.

            // let imgTag = `<img src = "${fileURL}" alt = "">`;
            // // Adding that created image tag inside the dropArea conatiner
            // dropArea.innerHTML = imgTag;

            previewImage.src = fileURL;
        }

        
        // Passing the user selected file source in fileURL varible using result property

            
        // The line fileReader.readAsDataURL(file); in JavaScript is used to read the contents of a file and convert it into a data URL format. This data URL can then be used to represent the file's contents, such as displaying an image on a webpage or performing further processing.

        // In simpler terms, this line allows us to take a file (which could be an image, audio, video, or any other type of file), read its contents, and convert them into a format that can be easily used within the web environment.

        // The resulting data URL is a string that includes a prefix indicating the data type (e.g., "data:image/jpeg;base64" for JPEG images) followed by the actual data of the file encoded in Base64 format. This URL can be assigned to the src attribute of an HTML <img> tag, used in CSS background images, or sent to a server for further processing.

        // By using readAsDataURL(), we can leverage the converted data URL to display the file's contents within the browser or utilize it for other purposes within the web application.

        // Ensure that the onload event handler is set before calling readAsDataURL(file). The correct order is to set the event handler first and then initiate the reading process.

        fileReader.readAsDataURL(file);
    }
    else {
        alert("This is not a valid file type");
        dropArea.classList.remove("active");
    }
}

let file; // Global Varibale we will use it in our various functions


// If user Drag File over the drop area
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();  // To prevent the default baheviour of the browser
    // console.log("File is over dropArea");
    dropArea.classList.add("border");
})


// If user leave File from the drop area
dropArea.addEventListener("dragleave", () => {
    // console.log("File is outside from dropArea");
    dropArea.classList.remove("border");

})


// If user drop the File on drop area
dropArea.addEventListener("drop", (event) => {
    event.preventDefault();  // To prevent the default baheviour of the browser
    // console.log("File is droppped on dropArea");

    dropArea.classList.remove("border");
    // Getting the user selected file and [0] basically means if user selects more than one file then we will choose the first file

    file = event.dataTransfer.files[0];

    // When the user will drop the image remove disable class
    document.querySelector(".container").classList.remove("disable");

    showfile();

});