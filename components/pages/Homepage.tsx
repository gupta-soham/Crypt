import { Communities } from "@/components/pages/Communities";
import { Posts } from "@/components/pages/DummyPosts";

export function Homepage() {
  return (
    // <div className={`flex flex-col h-screen ${isDarkMode ? "dark" : ""}`}>
    <div className={`flex flex-col h-screen `}>
      <main className="flex-1 grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-6">
        <div className="md:sticky md:top-6 md:h-[calc(100vh-5rem)]">
          <div className="overflow-auto h-full pr-4 -mr-4">
            <Communities />
          </div>
        </div>
        <Posts />
      </main>
    </div>
  );
}
