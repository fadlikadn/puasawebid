import BasicCalendar from "@/components/BasicCalendar"
import Providers from "./providers"

const Home = () => {
    return (
        <Providers>
            <div className="m-3">
                <BasicCalendar />
            </div>
        </Providers>
    )
}

export default Home
