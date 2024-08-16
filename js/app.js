
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
  import { getAuth , signInWithEmailAndPassword ,onAuthStateChanged , signOut} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
  import { getDatabase,set ,ref ,get} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDLZzFTWbWPsdMWkIBgGpK1K_2IkBlTwHg",
    authDomain: "fir-blog-web-cd215.firebaseapp.com",
    projectId: "fir-blog-web-cd215",
    storageBucket: "fir-blog-web-cd215.appspot.com",
    messagingSenderId: "584028880170",
    appId: "1:584028880170:web:b243737ef8713e9565f253"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app)
  const db = getDatabase(app)

  const myblog = document.querySelector('.myblog')
  const login = document.querySelector('.login')

  onAuthStateChanged(auth,(user)=>{
    if(user){
        myblog.classList.add('show')
        login.classList.add('hide')

    }else{

        myblog.classList.remove('show')
        login.classList.remove('hide')
    }
  })


  function singinUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signInWithEmailAndPassword(auth,email,password).then((userCredinals)=>{
        console.log(userCredinals.user.uid);
        
    }
    )
    }

    const singinbtn = document.getElementById('sing_in')
    singinbtn.addEventListener('click', singinUser)


    // sing out

    const singout = document.getElementById('log_out')
    singout.addEventListener('click',()=>{
        signOut(auth).then(()=>{
//
        }).catch((error)=>{
            console.log("error" + error)
        })
    } )



    // blog section code


    const notify = document.querySelector('.notify')

     
const add_post_btn = document.querySelector("#post_btn");

function Add_post() {
    
    const title = document.querySelector('#title').value;
    const post_content = document.querySelector('#Post_content').value
    const id = Math.floor(Math.random()*100)

    set(ref(db, 'post/' + id),{
        title: title,
        post_content: post_content
    })
    notify.innerHTML = "data added"
    document.querySelector('#title').value ="";
    document.querySelector('#Post_content').value =""

}

add_post_btn.addEventListener("click", Add_post)



// get data from firebase db

function getDatapost() {
    const user_ref = ref(db, "post/")
    get(user_ref).then((snapshot)=>{
   const data = snapshot.val()


   let html = "";
   const table = document.querySelector("table")
   for (const key in data) {
    const { title, post_content } = data[key]; // Destructure here


//    html+= `  
//     <tr>
//          <td> <span class="postNumber"> </span> </td>
//          <td> ${title}</td>
//          <td> <button class"Delete" onclick="Delete_data(${key})"> Delete </button> </td>
//          td> <button class"update" onclick="update_data(${key})"> update </button> </td>
//    </tr>`



   }

   table.innerHTML = html
   
    })
}
getDatapost()



