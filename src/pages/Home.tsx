
const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="text-center p-8 max-w-md">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome to React</h1>
        <p className="text-lg text-gray-600 mb-8">
          Start building your application by editing <code className="bg-gray-100 px-1 py-0.5 rounded text-pink-600">src/pages/Home.tsx</code>
        </p>
        <div className="flex justify-center space-x-4">
          <a 
            href="https://react.dev/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            React Docs
          </a>
          <a 
            href="https://tailwindcss.com/docs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-colors"
          >
            Tailwind Docs
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
