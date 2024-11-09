import React from "react";
import NavBar from "../components/navbar";
import { NavLink } from "react-router-dom";
import WalletButton from "../components/walletButton";
const Home = () => {
    return (
        <div className="bg-[#212121] w-screen min-h-screen pt-4">
            <NavBar />
            <div className="bg-[#121212] text-white font-sans min-h-screen">
                <section className="relative pt-28 pb-20 px-8 text-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#2A2A2A] to-[#121212] opacity-50"></div>
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#7b3fe4] to-blue-600 mb-6 z-10 relative animate__animated animate__fadeInDown animate__delay-1s">
                        Take Control of Your Digital Identity
                    </h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto z-10 relative mb-8 animate__animated animate__fadeIn animate__delay-2s">
                        Discover a secure, decentralized solution to own and protect your personal data.
                        Join us in reshaping identity in the digital world.
                    </p>
                    <div className="flex justify-center items-center">
                        <WalletButton></WalletButton>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-[#121212] to-transparent"></div>
                </section>
                <section className="py-20 px-10 bg-[#1E1E1E] text-center rounded-3xl mx-4 md:mx-20 shadow-lg">
                    <h2 className="text-3xl font-semibold text-white mb-12 animate__animated animate__fadeIn">Why Decentralized Identity?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                        {[
                            { title: "Privacy Control", desc: "Your data, your choice. Manage and share your personal data securely." },
                            { title: "Seamless Access", desc: "Access essential documents across platforms with blockchain-backed security." },
                            { title: "Global Reach", desc: "A borderless, decentralized identity solution accessible anytime, anywhere." }
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="p-8 rounded-xl bg-[#2A2A2A] transform transition duration-500 hover:scale-105 hover:bg-[#333] shadow-lg animate__animated animate__fadeInUp"
                            >
                                <h3 className="text-xl font-bold text-blue-400 mb-4">{feature.title}</h3>
                                <p className="text-gray-400">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
                <section className="py-20 px-8 text-center">
                    <h2 className="text-3xl font-semibold mb-10 animate__animated animate__fadeIn">How It Works</h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {[
                            { title: "Secure Storage", desc: "Your documents are encrypted and stored on a decentralized network, ensuring they remain secure and tamper-proof." },
                            { title: "Instant Verification", desc: "Easily verify your identity and documents in real time, without delays or intermediaries." },
                            { title: "Complete Ownership", desc: "You control your data, deciding who can access it and under what conditions." },
                            { title: "Future Ready", desc: "Stay ahead with technology designed for the future of decentralized applications." }
                        ].map((benefit, index) => (
                            <div
                                key={index}
                                className="bg-[#2D2D2D] p-8 rounded-xl shadow-lg transition duration-300 transform hover:-translate-y-2 animate__animated animate__fadeInUp"
                            >
                                <h3 className="text-xl font-bold text-blue-400 mb-3">{benefit.title}</h3>
                                <p className="text-gray-400">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
                <section className="bg-gradient-to-r from-[#7b3fe4] to-blue-700 py-16 px-10 text-center rounded-lg mx-auto shadow-lg animate__animated animate__fadeIn">
                    <h2 className="text-xl font-semibold text-white mb-4">Join the Decentralized Identity Revolution</h2>
                    <p className="text-gray-100 mb-8 max-w-md mx-auto">
                        Take the first step towards a secure, decentralized identity. Secure your data, gain privacy, and experience a new level of freedom in the digital age.
                    </p>
                    <NavLink to="/apply" className="bg-white text-blue-700 font-semibold px-10 py-3 rounded-full hover:bg-gray-100 transition duration-300 shadow-md animate__animated animate__fadeIn">
                        Apply for Decentralized ID
                    </NavLink>
                </section>
                <footer className="bg-[#1C1C1C] py-10 text-center mt-12 text-gray-500">
                    <p className="text-sm animate__animated animate__fadeIn">© 2024 Decentralized U. All rights reserved.</p>
                    <div className="flex justify-center gap-x-[32px] mt-[16px]">
                        <NavLink to="/" className="hover:text-gray-300">Privacy Policy</NavLink>
                        <NavLink to="/" className="hover:text-gray-300">Terms of Service</NavLink>
                        <NavLink to="/" className="hover:text-gray-300">Contact Us</NavLink>
                    </div>
                </footer>

            </div>
        </div>
    )
}

export default Home;