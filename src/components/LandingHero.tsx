import { useNavigate } from "react-router-dom";
import { STORAGE_KEYS } from "../utils/storage";

const images = [
  "https://taskflier.com/main/images/todo-bg.jpg",
  "https://media.istockphoto.com/id/2111511069/vector/checklist-to-complete-project-task-accomplish-work-checkmark-todo-list-clipboard-or-project.jpg?s=612x612&w=0&k=20&c=iu7LC5Y-WUNCCwx5wlWgPl1_gutkID_mBEffINOERgQ=",
  "https://img.freepik.com/free-photo/notebook-with-list-desk-with-cup-coffee-beside_23-2148938738.jpg",
  "https://media.istockphoto.com/id/1435832173/vector/hands-holding-clipboard-with-checklist-with-green-check-marks-and-pen-human-filling-control.jpg?s=612x612&w=0&k=20&c=vH1XOePx4EcSWEjhNdsZjbANcBw6kMZBrpPgHFwuWJg=",
  "https://media.istockphoto.com/id/1311234485/vector/to-do-list-young-woman-puts-check-marks-in-front-of-completed-tasks.jpg?s=612x612&w=0&k=20&c=pSERBPUAN5BJbG2sbJHyDbo-XLEPU4wc0eTMvMRUjiM=",
  "https://media.istockphoto.com/id/2203585184/vector/businessman-plan-businesses-or-determine-business-activities-to-increase-work-efficiency.jpg?s=612x612&w=0&k=20&c=eV2Rop8BPL094ZAfQIu79SZkQPME-usx8tqlK5F61tM=",
  "https://img.freepik.com/premium-vector/event-planner-vector-illustration-featuring-party-decorations-scheduling-time-management-business-agenda-calendar-flat-style-background_2175-32711.jpg",
  "https://static.vecteezy.com/system/resources/thumbnails/007/158/401/small/teamwork-on-implementation-of-innovations-and-ideas-in-business-development-strategy-of-the-company-brainstorming-flat-illustration-isolated-on-white-background-free-vector.jpg",
  "https://static.vecteezy.com/system/resources/previews/007/981/486/non_2x/job-done-tasks-scheduling-planing-business-checklist-for-web-page-pencil-checklist-on-a-clipboard-paper-successful-completion-of-business-tasks-work-management-and-stack-resolve-flat-vector.jpg",
];

function LandingHero() {
  const navigate = useNavigate();
  const trackImages = [...images, ...images];
  const trackImagesAlt = [...images].reverse();
  const trackImagesAltLoop = [...trackImagesAlt, ...trackImagesAlt];

  const handleGetStarted = () => {
    const isAuthenticated = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/signin");
    }
  };

  return (
    <section className="flex h-screen flex-col overflow-hidden bg-gradient-to-br from-[#ffe6c7] via-[#cfe0ff] to-[#b6f3e3] md:flex-row">
      <div className="relative flex flex-1 flex-col justify-center px-8 py-14 md:px-[60px]">
        <a
          href="/"
          className="absolute left-8 top-6 flex items-center gap-3 md:left-8 md:top-5 cursor-pointer hover:opacity-80 transition"
        >
          <img
            alt="Hintro logo"
            className="h-12 w-12 rounded-lg object-cover"
            src="https://hintro-releases.s3.ap-south-1.amazonaws.com/images/hintroai.jpeg"
          />
          <span className="text-xl font-bold text-neutral-900 md:text-2xl">
            Hintro
          </span>
        </a>
        <h1 className="text-5xl font-bold md:text-6xl">
          Sort tasks, Sort Life
        </h1>
        <p className="mt-5 max-w-[500px] text-lg text-neutral-600">
          Take control of your day with intelligent task management. Organize,
          prioritize, and achieve more—one task at a time.
        </p>
        <button
          className="mt-7 w-fit rounded-md bg-black px-7 py-3.5 text-white hover:bg-gray-800 transition cursor-pointer"
          type="button"
          onClick={handleGetStarted}
        >
          Get Started
        </button>
      </div>

      <div className="relative h-[400px] w-full max-w-full overflow-hidden md:h-full md:w-[40%] md:max-w-[40%] md:pr-[60px]">
        <div className="flex flex-col gap-5 md:grid md:grid-cols-2 md:gap-5">
          <div className="image-track-down flex gap-5 md:flex-col">
            {trackImages.map((src, index) => (
              <img
                key={`${src}-${index}`}
                alt="Landing visual"
                className="h-[180px] w-[260px] rounded-xl border border-neutral-200 object-cover md:h-[260px] md:w-full"
                src={src}
              />
            ))}
          </div>
          <div className="image-track-up flex gap-5 md:flex md:flex-col">
            {trackImagesAltLoop.map((src, index) => (
              <img
                key={`${src}-${index}-alt`}
                alt="Landing visual"
                className="h-[180px] w-[260px] rounded-xl border border-neutral-200 object-cover md:h-[260px] md:w-full"
                src={src}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingHero;
