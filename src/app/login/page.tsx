import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
        <form className="flex flex-col w-1/4 justify-center items-center">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
            <button type="submit" className="mt-2 bg-blue-500 text-white rounded p-2">Login</button>
        </form>
        <span className="mt-4 bg-green-500 text-white p-2 rounded">
            <Link href="/signup">SignUp</Link>
        </span>
    </div>
  )
}

