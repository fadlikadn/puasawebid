import BasicCalendar from "@/components/BasicCalendar"
import Providers from "./providers"
import FullCalendar from "@/components/FullCalendar"

const Home = () => {
    return (
        <Providers>
            <div className="m-3">
                {/* <BasicCalendar /> */}
                <FullCalendar />
            </div>
        </Providers>
    )
}

export default Home
