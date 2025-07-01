import { FEATURES } from "@/constants";

export const Features = () => {
  return (
    <section
      id="features"
      className="flex flex-col items-center justify-center py-20"
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-10">
        Features
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 max-w-5xl">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="p-6 border border-[#7042f88b] rounded-lg bg-white bg-opacity-50 backdrop-blur"
          >
            <h2 className="text-xl font-semibold mb-2 text-black">
              {feature.title}
            </h2>
            <p className="text-gray-800">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
