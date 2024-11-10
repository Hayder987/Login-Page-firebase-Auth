import { GithubAuthProvider, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Auth } from "../firebase/firebase.config";


const Home = () => {

  const [eye, setEye] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("")
  const emailref = useRef()
  
  const LoginHandler=(e)=>{
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;

    setSuccess("")
    setError("")
     
    if(!terms){
      setError("Agree with Terms And Condition")
      return
    }
    
    signInWithEmailAndPassword(Auth, email, password)
    .then(data=>{
      console.log(data.user)
      if(!data.user.emailVerified){
        setError("Frist Verified Your Eamil")
        return
      }
      else{
        setSuccess("Login SuccessFully")
      }
    })
    .catch(err=>{
      console.log(err)
      setError(err.message)
    })
  }


  const eyeController=()=>{
    setEye(!eye)
  }

  const forgetPassword=()=>{
    const email = emailref.current.value
    sendPasswordResetEmail(Auth, email)
    .then(()=>{
      console.log("Mail Send Successfully for Password Changed")
    })
    .catch(err=>{
      console.log(err)
    })
  }

  const signWithGoogle=()=>{
    const provider = new GoogleAuthProvider()
    signInWithPopup(Auth, provider)
    .then(result=>{
      console.log(result)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  const signWithGitHub=()=>{
    const provider = new GithubAuthProvider()
    signInWithPopup(Auth, provider)
    .then(result=> {
      console.log(result)
    })
    .catch(err=>{
      console.log(err)
    })
  }


    return (
        <div>
           <div className="hero bg-base-200 min-h-screen">
             <div className="hero-content flex-col lg:flex-row-reverse">
               <div className="text-center lg:text-left">
                 <h1 className="text-5xl font-bold">Login now!</h1>
                 <p className="py-6">
                   Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                   quasi. In deleniti eaque aut repudiandae et a id nisi.
                 </p>
               </div>
               <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                 <form onSubmit={LoginHandler} className="card-body">
                   <div className="form-control">
                     <label className="label">
                       <span className="label-text">Email</span>
                     </label>
                     <input ref={emailref} type="email" name="email" placeholder="email" className="input input-bordered" required />
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
                      eye?<FaEyeSlash />:<FaEye />
                    }
                  </button>
                     <label className="label">
                       <a onClick={forgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                     </label>
                     <div className="">
                       <div className="form-control">
                         <label className="label justify-start gap-4 cursor-pointer">
                         <input type="checkbox" name="terms" defaultChecked className="checkbox checkbox-primary" />
                           <span className="label-text">Using Terms And Conditions</span>
                           
                         </label>
                       </div>
                     </div>
                   </div>
                   <div className="form-control mt-6">
                     <button className="btn btn-primary">Login</button>
                   </div>
                   <div className="form-control mt-6">
                     <p className="">Do Not Have Account? <Link to="/signup"><span className="text-blue-600 underline">Register Here</span></Link></p>
                   </div>
                   <div className="form-control mt-6">
                     <button onClick={signWithGoogle} className=" border-2 p-3 rounded-xl">Sign With Google</button>
                   </div>
                   <div className="form-control mt-6">
                     <button onClick={signWithGitHub} className=" border-2 p-3 rounded-xl">Sign With Github</button>
                   </div>
                   <div className="form-control mt-6">
                     {
                      success && <p className="text-green-600">{success}</p>
                     }
                     {
                      error && <p className="text-red-600">{error}</p>
                     }
                </div>
                 </form>
               </div>
             </div>
           </div>
            
        </div>
    );
};

export default Home;