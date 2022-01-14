
export default function Home() {
  return (
    <div>

      <div className=" h-screen w-full relative">

        <img className="absolute w-full h-full object-cover"
          src="/foto1.png"
        />

        <div className="absolute bottom-[5vh]  w-full flex flex-col items-center">
          <h1 className="text-center text-white text-6xl md:text-9xl font-black mb-5 md:mb-12">Super Choice</h1>


          <div className="flex flex-col md:flex-row items-center gap-5 md:mb-3">
            <a href="#" className="bg-primary4 button">
              Bekijk ons assortiment
            </a>

            <a href="#" className="button">
              Lees over ons
            </a>
          </div>

          <img className="w-full max-w-2xl hidden md:block"
            src="/finestSelection.svg" />

        </div>
      </div>
    </div>
  )
}
