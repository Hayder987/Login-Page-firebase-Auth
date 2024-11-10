import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { Auth } from "../firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const SignUp = () => {
  const [Success, setSuccess]= useState("");
  const [error, setError] = useState("")
  const [eye, setEye] = useState(false)

    const registerHandler=(e)=>{
       e.preventDefault()
       const name = e.target.name.value;
       const imgUrl = e.target.imgurl.value;
       const email = e.target.email.value;
       const password = e.target.password.value;
       const terms = e.target.terms.checked;

      setError("")
      setSuccess('')

      if(password.length<6){
        setError("Password Must Have 6 Character")
        return
      }
      if(!terms){
        setError("Agree Terms And Policy")
        return
      }

      const checkValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
      if(!checkValid.test(password)){
        setError("password Must Have Special Character, one Capital letter, one Digit ")
        return
      }

       createUserWithEmailAndPassword(Auth, email, password)
       .then(data=>{
          console.log(data.user)
          setSuccess("Create Profile successfully")

          updateProfile(Auth.currentUser, {
            displayName: name,
            photoURL:imgUrl 
          })
          .then(()=>{
            alert("profile Updated successFully")
          })

           // email validation
           sendEmailVerification(Auth.currentUser)
           .then(()=>{
            console.log("verification mail send successfully")
           })
       })
     
       .catch(err=>{
         console.log(err)
         setError("Profile Not Created")
       })
       
    }

    const eyeController=()=>{
       setEye(!eye)
    }

    return (
        <div className="flex justify-center mt-12">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <form onSubmit={registerHandler} className="card-body">
              <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input type="text" name="name" placeholder="Name" className="input input-bordered" required />
              </div>
              <div className="form-control">
                  <label className="label">
                    <span className="label-text">Image Url</span>
                  </label>
                  <input type="text" name="imgurl" placeholder="Image Url" className="input input-bordered" required />
              </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control relative">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input 
                  type={eye?"text": "password"} 
                  name="password" placeholder="password" className="input input-bordered" required />
                  <button onClick={eyeController} className="absolute top-12 right-4 text-xl text-gray-600">
                    {
                      eye? <FaEyeSlash />: <FaEye />
                    }
                  </button>
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                  </label>
                  <div className="form-control">
                         <label className="label justify-start gap-4 cursor-pointer">
                         <input type="checkbox" name="terms" defaultChecked className="checkbox checkbox-primary" />
                           <span className="label-text">Using Terms And Conditions</span>
                           
                         </label>
                  </div>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
                </div>
                <div className="form-control mt-6">
                     <p className="">Already Have an Account? <Link to="/"><span className="text-blue-600 underline">Log-In</span></Link></p>
                </div>
                <div className="form-control mt-6">
                     {
                      Success && <p className="text-green-600">{Success}</p>
                     }
                     {
                      error && <p className="text-red-600">{error}</p>
                     }
                </div>
              </form>
            </div>
            
        </div>
    );
};

export default SignUp;