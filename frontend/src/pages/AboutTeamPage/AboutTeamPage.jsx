import { Link } from "react-router";
import AboutTeamTag from "./components/AboutTeamTag";
import NavBar from "../../components/NavBar";

export default function AboutTeamPage(){
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <NavBar/>

      {/* Hero Section */}
      <div className="hero bg-base-200 flex-grow">
        <div className="hero-content flex-col lg:flex-row-reverse gap-12">
          <img 
            src="https://img.freepik.com/free-photo/anime-moon-landscape_23-2151645918.jpg"
            className="rounded-lg shadow-2xl" />
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">
              Наша команда
            </h1>
            <p className="text-lg mb-8">
              За всеми нашими крутыми инновациями стоят люди, каждый из которых — эксперт в своем деле, любящий то, что делает.
            </p>
          </div>
        </div>
      </div>

      {/* Cards describing the participants */}
      <div className="carousel carousel-center rounded-box space-x-4 mt-10">
        <div className="carousel-item mb-15">
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img
                className="mask mask-squircle size-55 mt-5"
                src="https://i.pinimg.com/736x/a3/c1/26/a3c1268580fe864c4028db7af2e04884.jpg"/>
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Показеев Даниил</h2>
              <p>Frontend Developer</p>
              <div className="card-actions justify-center">
                <button className="btn btn-info">Telegram</button>
                <button className="btn btn-neutral">GitHub</button>
                <button className="btn btn-info">LinkedIn</button>
              </div>
            </div>
          </div>
        </div>

        <div className="carousel-item mb-15">
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img
                className="mask mask-squircle size-55 mt-5"
                src="https://i.pinimg.com/736x/c7/81/40/c78140d6f0b1d61282a33ac314bb8a85.jpg"/>
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Гуськов Алексей</h2>
              <p>Frontend Developer</p>
              <div className="card-actions justify-center">
                <button className="btn btn-info">Telegram</button>
                <button className="btn btn-neutral">GitHub</button>
                <button className="btn btn-info">LinkedIn</button>
              </div>
            </div>
          </div>
        </div>

        <div className="carousel-item mb-15">
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img
                className="mask mask-squircle size-55 mt-5"
                src="https://i.pinimg.com/736x/a6/62/9f/a6629fc21a02b33a6a59a53e9bd67ac4.jpg"/>
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Шитов Артём</h2>
              <p>Backend Developer</p>
              <div className="card-actions justify-center">
                <button className="btn btn-info">Telegram</button>
                <button className="btn btn-neutral">GitHub</button>
                <button className="btn btn-info">LinkedIn</button>
              </div>
            </div>
          </div>
        </div>

        <div className="carousel-item mb-15">
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
            <img
              className="mask mask-squircle size-55 mt-5"
              src="https://i.pinimg.com/736x/bb/50/0e/bb500e8deca4e8227dfd45b77d490414.jpg" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Иванов Иван</h2>
              <p>Backend Developer</p>
              <p></p>
              <div className="card-actions justify-center">
                <button className="btn btn-info">Telegram</button>
                <button className="btn btn-neutral">GitHub</button>
                <button className="btn btn-info">LinkedIn</button>
              </div>
            </div>
          </div>
        </div>

      </div>




      
      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-300 text-base-content">
        <div>
            <p className="font-bold text-lg">
              Проект разработан командой <AboutTeamTag/>
            </p>  
          <p>Московский авиационный институт, 2024</p>
        </div>
      </footer>
    </div>
  );
}