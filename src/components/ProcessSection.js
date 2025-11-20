"use client";

const steps = [
  {
    id: 1,
    title: "Premium Peanut Selection",
    desc: "Only the highest-quality groundnuts are chosen to ensure pure and rich oil.",
    img: "about6.jpg",
  },
  {
    id: 2,
    title: "Cleaning & Sorting",
    desc: "Advanced machines clean and remove dust, stones, and unwanted particles.",
    img: "about7.jpg",
  },
  {
    id: 3,
    title: "Roasting the Peanuts",
    desc: "Peanuts are roasted at controlled heat to protect nutrients and aroma.",
    img: "about5.jpg",
  },
  {
    id: 4,
    title: "Cold Press Extraction",
    desc: "Oil is extracted slowly using a wooden/metal ghani to maintain purity.",
    img: "about2.jpg",
  },
  {
    id: 5,
    title: "Natural Settling",
    desc: "Oil is naturally settled without chemicals, keeping nutrients intact.",
    img: "about1.jpg",
  },
  {
    id: 6,
    title: "Quality Testing",
    desc: "Each batch goes through strict quality checks for purity & freshness.",
    img: "about4.jpg",
  },
  {
    id: 7,
    title: "Packaging",
    desc: "Finally, the oil is packed securely to preserve flavor and nutrients.",
    img: "about3.jpg",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-20 bg-[#FFF8EA]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-center text-4xl md:text-5xl font-bold text-[#8B4513] mb-16">
          Our Pure Oil Making Process
        </h2>

        <div className="space-y-32">
          {steps.map((step, index) => {
            const isLeft = index % 2 === 0;
            console.log("step : ", step);
            console.log("index :", index);
            return (
              <div
                key={step.id}
                className={`relative flex flex-col md:flex-row items-center gap-16 ${
                  !isLeft ? "md:flex-row-reverse md:pr-25" : "md:pl-25"
                }`}
              >
                {/* BIG NUMBER */}
                <div
                  className={`absolute top-1/2 -translate-y-1/2 text-[85px] md:text-[110px] font-extrabold opacity-25 z-0 ${
                    isLeft
                      ? "-left-6 -bottom-30  md:-left-16 text-yellow-600"
                      : "-right-6 -bottom-30 md:-right-16 text-yellow-600"
                  }`}
                >
                  0{step.id}
                </div>

                {/* IMAGE - NOW SMALLER */}
                <div className="relative w-40 h-40 md:w-52 md:h-52 z-10">
                  <img
                    src={step.img}
                    className="w-full h-full object-cover rounded-xl shadow-lg border-2 border-yellow-600"
                    alt="Process Step"
                  />
                </div>

                {/* IMPROVED PREMIUM ARROW */}
                {step.id != steps.length && (
                  <div
                    className={`absolute ${
                      isLeft
                        ? "left-[38%] md:-bottom-20 md:left-[46%] -bottom-30"
                        : "right-[38%] md:right-[46%] -bottom-30 scale-x-[-1]"
                    }`}
                  >
                    <img
                      src="pngwing.com.png"
                      alt="Arrow"
                      className="w-30 h-30 md:w-34 md:h-34 scale-x-[-1]"
                    />
                  </div>
                )}

                {/* TEXT */}
                <div className="w-full md:w-1/2 z-10">
                  <h3 className="text-3xl font-bold text-[#6A3900] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
