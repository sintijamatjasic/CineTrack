import about from "../assets/about.png";

function About() {
  return (
    <div className="flex items-center justify-between py-20 gap-20 max-w-7xl mx-auto w-full">
      <div className="flex-1 max-w-2xl">
        <h1 className="text-6xl font-bold mb-12 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] bg-clip-text text-transparent">
          About Us
        </h1>
        <p className="text-xl leading-relaxed text-gray-300 mb-8 text-justify">
          Hi! We're CineTrack. We started CineTrack because we constantly argued
          about which movie to watch and could never remember what we'd already
          seen.
        </p>
      </div>
      <div className="flex-1 flex justify-end">
        <img
          src={about}
          alt="FilmRoll image"
          className="w-full max-w-xl rounded-2xl shadow-2xl border-2 border-gray-700"
        />
      </div>
    </div>
  );
}

export default About;
