  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyC-W2UdIHFfzI9w53ARtS1ZpZ4n_n1aHxI",
    authDomain: "alumni-web-cebf1.firebaseapp.com",
    databaseURL: "https://alumni-web-cebf1-default-rtdb.firebaseio.com",
    projectId: "alumni-web-cebf1",
    storageBucket: "alumni-web-cebf1.appspot.com",
    messagingSenderId: "484641197124",
    appId: "1:484641197124:web:ee06b0bbc6c73e33384011"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

let studentname, phone, batch, Jobtitle, organization;

function readData() {
    studentname = document.getElementById("name").value;
    email = document.getElementById("email").value;
    batch = document.getElementById("batch").value;
    Jobtitle = document.getElementById("Jobtitle").value;
    organization=document.getElementById("organization").value;
    phone= document.getElementById("phone").value;
}

let register = document.getElementById("register");
//Image uploading to firestore
var reader;
var imgName, imgUrl;

var files = [];
document.getElementById("select").onclick = function (e) {
    var input = document.createElement("input");
    input.type = "file";
    input.onchange = e => {
        files = e.target.files;
        reader = new FileReader();
        reader.onload = function () {
            document.getElementById("myimg").src = reader.result;
        }
        reader.readAsDataURL(files[0]);
    }
    input.click();
}

//inserting data into firebase real time database

register.addEventListener("click", () => {
    readData();
    imgName = phone;
    let dbRef = firebase.database().ref().child("Alumni");
    var uploadImg = firebase.storage().ref('images/' + imgName + ".png");
    uploadImg.put(files[0]).then(function (result) {
        uploadImg.getDownloadURL().then(function (result) {
            imgUrl = result;
            dbRef.child(batch).child(phone).set({
                studentname: studentname,
                email: email,
                batch:batch,
                Jobtitle:Jobtitle,
                organization:organization,
                phone: phone,
                imgLink: imgUrl
            }).then(() => {
                console.log("Registered Successfully");
            }).catch((error) => {
                console.log(error);
            });
        })
    })
})