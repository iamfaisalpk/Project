import React from 'react';


const Error = () => {
  return (
    <>
      
      <main className="min-h-screen bg-gradient-to-tr from-gray-900 via-red-800 to-red-600 flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-8 text-center transform transition-all hover:shadow-3xl duration-500">
          {/* Error Image Placeholder */}
          <div className="mb-8">
            <img
              src="sneakers.png"
              alt="Error Illustration"
              className="mx-auto rounded-lg shadow-md w-full max-w-xs object-cover transition-transform duration-300 hover:scale-105"
            />
            <p className="mt-2 text-sm text-gray-500 italic">
              (Placeholder - Would you like me to generate a custom error image?)
            </p>
          </div>

          {/* Error Message */}
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Oops! We Tripped Over Our Code
          </h1>
          <p className="text-gray-700 mb-6 text-lg leading-relaxed">
            Something broke, and we’re scrambling to fix it. In the meantime, imagine a cute robot tripping over wires!
          </p>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => window.location.href = '/'}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-300"
            >
              Back to Home
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300"
            >
              Retry
            </button>
          </div>

          {/* Fun Error Code */}
          <p className="text-sm text-gray-600">
            Error Code: <span className="font-mono text-red-600">OOPS-42</span> 
            <span className="ml-2"> (Totally made up, but sounds cool!)</span>
          </p>
        </div>
      </main>
    </>
  );
};

export default Error;