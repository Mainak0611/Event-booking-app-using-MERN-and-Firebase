import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div 
      className='flex justify-center items-center h-screen bg-cover bg-center animate-fadeIn' 
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      <div className="text-center mb-10 transform transition-all duration-700 ease-in-out animate-slideUp">
        <h1 className="text-6xl font-bold text-white text-shadow animate-fadeIn delay-500">FSD-Events</h1>
      </div>
      <div className="p-8 rounded-lg shadow-lg max-w-md w-full transform transition-all duration-700 ease-in-out animate-slideUp">
        <SignIn />
      </div>
    </div>
  );
}
