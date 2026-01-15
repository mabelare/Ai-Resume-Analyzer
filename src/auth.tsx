import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bgSmall from "./assets/images/bg-small.svg";
import { usePuterStore } from "./lib/puter";

export const meta = () => ({
  title: "Resumind | Auth",
  name: "description",
  content: "Log into your account",
});

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[1] || "/dashboard";
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated && !isLoading) {
      navigate(next);
    }
  }, [auth.isAuthenticated, isLoading, navigate, next]);

  return (
    <main
      className="min-h-screen bg-cover bg-center px-10 py-6 flex items-center justify-center"
      style={{ backgroundImage: `url(${bgSmall})` }}
    >
      <div className="shadow-lg max-w-md mx-auto">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10 shadow-lg">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-4xl font-bold bg-linear-to-r from-red-300 via-gray-950 to-indigo-300 bg-clip-text text-transparent">
              Welcome
            </h1>
            <h2 className="text-xl text-gray-700">
              Log In to Continue Your Job
              <br />
              Journey
            </h2>
          </div>
          <div>
            {isLoading ? (
              <button className="w-full px-6 py-3 bg-indigo-500 text-white rounded-full font-medium animate-pulse">
                Signing you in...
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <button
                    className="w-full px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-medium transition-colors"
                    onClick={auth.signOut}
                  >
                    Log Out
                  </button>
                ) : (
                  <button
                    className="primary-gradient rounded-full py-2 px-8 cursor-pointer w-[300px] max-md:w-full text-xl font-semibold text-white bg-indigo-600"
                    onClick={auth.signIn}
                  >
                    Log In
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Auth;
