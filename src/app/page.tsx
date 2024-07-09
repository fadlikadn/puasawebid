import Providers from "./providers"
import FullCalendar from "@/components/FullCalendar"

const Home = () => {
    return (
        <Providers>
            <div className="bg-kale-100 flex justify-center">
                <FullCalendar />
            </div>
        </Providers>
    )
}

export default Home
