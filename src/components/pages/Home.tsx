import {Link} from 'react-router-dom'

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
            <h1 className="text-6xl font-extrabold text-primary-500 mb-6 text-center">
                Добро пожаловать 👋
            </h1>

            <p className="text-xl text-gray-600 mb-10 text-center max-w-xl">
                Это ваш персональный новостной портал с авторизацией, оффлайн-доступом и свежими дайджестами каждый
                день.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    to="/digest"
                    className="px-6 py-3 rounded-2xl bg-primary-500 text-white font-semibold hover:bg-primary-600 transition duration-200 text-center"
                >
                    Перейти к дайджесту 📰
                </Link>
                <Link
                    to="/login"
                    className="px-6 py-3 rounded-2xl bg-white text-primary-500 border border-primary-500 font-semibold hover:bg-primary-50 transition duration-200 text-center"
                >
                    Войти 🔐
                </Link>
            </div>
        </div>
    )
}

export default Home;