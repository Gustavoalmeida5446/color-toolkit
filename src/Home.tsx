import "./css/index.css";
import Logo from "./components/Logo";

function Home() {
    return (
        <div className="container-home">
            <Logo />
            <p>This is the home page of our application.</p>
        </div>
    );
}
export default Home;