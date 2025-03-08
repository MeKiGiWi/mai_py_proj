import React from "react";
import "./Registerform.css"

export default function Registerform(){
    return (
        <div className="flex min-h-screen bg-gray-100 p-4 items-center justify-center">
            <div className="w-full max-w-md">
                <form className="bg-white rounded-xl shadow-lg p-8 space-y-6">
                    <h1 className="font-sans text-3xl font-semibold text-gray-800 mb-8">Добро пожаловать!</h1>

                    <div className="space-y-4">
                        <div>
                            <label 
                            htmlFor="username"
                            className="mb-1 block text-sm font-normal text-gray-700 text-left">
                                Логин
                            </label>
                            <input
                            type="text"
                            placeholder="Введите логин"
                            className="px-4 py-2 border border-gray-700 rounded-lg w-full"
                            />
                        </div>

                        <div>
                            <label 
                            htmlFor="username"
                            className="mb-1 block text-sm font-normal text-gray-700 text-left">
                                Пароль
                            </label>
                        <input
                            type="text"
                            placeholder="Введите пароль"
                            className="px-4 py-2 border border-gray-700 rounded-lg w-full"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <button 
                            type="signin"
                            className="bg-blue-500 py-2 rounded-lg w-full
                             text-gray-100 font-semibold text-center text-lg hover:bg-blue-600 transition">
                                Войти
                            </button>

                            <label className="text-sm text-gray-600 block p-2">или</label>

                            <button className="btn py-2 flex items-center justify-center w-full gap-2 border border-gray-400
                            rounded-lg font-semibold text-gray-800 
                            hover:bg-gray-100 hover:border-gray-500">
                                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-7 h-7"/>
                                Войти через Google
                            </button>

                            <div className="flex-row py-2 w-full text-sm">
                                <label>
                                    {"Нет аккаунта? "}
                                </label>
                                <button className="font-semibold hover:underline">
                                    Зарегистрироваться       
                                    {/* Тут сокрее всего нужен тэг a с href */}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}