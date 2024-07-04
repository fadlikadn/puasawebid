import BasicCalendar from "@/components/BasicCalendar"
import Providers from "./providers"

const Home = () => {
    return (
        <Providers>
            <div>puasa.web.id</div>
            <div className="m-3">
                <BasicCalendar />
            </div>
        </Providers>
    )
}

export default Home
