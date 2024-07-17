import Providers from "./providers"
import FullCalendar from "@/components/FullCalendar"

const Home = () => {
    return (
        <Providers>
            {/* <div className="bg-white"> 
                <header className="absolute inset-x-0 top-0 z-50">
                    <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Puasa.web.id</span>
                        </a>
                    </div>
                    </nav>
                </header>
            </div> */}
            <div className="flex justify-center">
                <FullCalendar />
            </div>
        </Providers>
    )
}

export default Home
