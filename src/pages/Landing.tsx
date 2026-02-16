import { useEffect } from "react";
import LandingHero from "../components/LandingHero";

function Landing() {
  useEffect(() => {
    document.title = "Hintro";
  }, []);

  return <LandingHero />;
}

export default Landing;
