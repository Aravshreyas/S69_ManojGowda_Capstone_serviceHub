import React from "react";
import bgImg from '../assets/bg.jpeg';
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Login() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex justify-center items-center relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center brightness-75 contrast-95"
        style={{ backgroundImage: `url(${bgImg})` }}
      ></div>

      <div className="relative bg-white/50 backdrop-blur-md p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-3xl font-[Inknut-Antiqua] text-center text-black mb-6">Login</h2>
        <form className="space-y-4">
          <input type="email" placeholder="Email" className="w-full p-3 rounded-md border border-gray-300 bg-white text-black" />
          <input type="password" placeholder="Password" className="w-full p-3 rounded-md border border-gray-300 bg-white text-black" />
          <p className="text-center text-black">
            Don't have an account? <a href="#" className="text-blue-600">Signup</a>
          </p>
          <button className="w-full mb-0 bg-[#0574B9] text-white p-3 rounded-md font-semibold">
            Login
          </button>

          <div className="flex items-center my-4">
            <div className="w-full h-[1px] bg-gray-400"></div>
            <p className="px-3 text-black">or</p>
            <div className="w-full h-[1px] bg-gray-400"></div>
          </div>

          {/* Google Login Button (No extra wrapper) */}
          <div className="flex justify-center">
            <GoogleLogin  
              onSuccess={async (credentialResponse) => {
                try {
                  console.log("Google Credential:", credentialResponse);
                  const decoded = jwtDecode(credentialResponse.credential);
                  console.log("Decoded User Info:", decoded);

                  // Send token to backend
                  const res = await axios.post("http://localhost:3010/api/auth/google", {
                    token: credentialResponse.credential
                  }, { withCredentials: true });

                  console.log("Server Response:", res.data);
                  navigate("/dashboard");

                } catch (error) {
                  console.error("Error sending token to backend:", error.message);
                  alert("Login failed");
                }
              }}
              onError={() => console.log('Login Failed')}
              size="large" 
              ux_mode="popup"
              theme="outline"
            />
          </div>

        </form>
      </div>
    </div>
  );
}

export default Login;
