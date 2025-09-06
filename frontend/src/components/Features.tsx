import Image from "next/image";
import React from "react";

export default function Features() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-[var(--text-primary)] mb-4">
            Features
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
            Explore the key features that make Thrive your ultimate meal
            planning companion.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-4">
            <div className="w-full relative aspect-video bg-cover rounded-lg shadow-lg overflow-hidden">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEZnyarvgiH97lyedO4cFopcp4mOT3yf1Vo6wbnfE0QSVf6HixcDxco4QYqXESqszXyJhG0xYd4_XDY2WrVyN-bEiEOHvhYiitnBxv3S72pYhbSHZmZAp9MLBGpqtkliTfxOX6uq8g8U____P62bd2Z_eP-euDB2Glmvq8vuIjozuF4mdyujCRWOOZSrl9eS4Ij9POB15ecdOs8ipjX439gLCAyCAnXrYCn4EiLMvSJjOeMzuFPTCXo6K-s0jBRwbbPwaJN-ztcus"
                alt="Recipe Discovery"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">
                Recipe Discovery
              </h3>
              <p className="text-[var(--text-secondary)] mt-1">
                Browse a vast library of recipes, filter by dietary needs, and
                save your favorites for later.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-full relative aspect-video bg-cover rounded-lg shadow-lg overflow-hidden">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnprTFLVqgtbS8ni0Bn-8dWaDDazTD5pKNk6nTUP3M0sH7o0V8s9yoMPTONsM7yRCf_KVxg91JJOe9GHdyE9ag_QauDFi7rSXGaqnUdCMVfE4m0v1tmEFbw2_TmvN3ZGz0-cCkfRLW2WdVcMeOTB27aVhSVuqPjBLaJYUCrgSiaTl9UxHQpbUzc3UW0it_V0K-x1Ps6r6hnE6hUjmyN9C6ZV8PpDkm_-0Lo951Bq81E5qr-P-sapV5hRijjpLfhESo_VLisyA72_Q"
                alt="Meal Plan Generator"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">
                Meal Plan Generator
              </h3>
              <p className="text-[var(--text-secondary)] mt-1">
                Create custom meal plans or let our AI generate one for you,
                complete with shopping lists and nutritional information.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-full relative aspect-video bg-cover rounded-lg shadow-lg overflow-hidden">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaShm_jSSX5A2VGiSXvim-N9sSYfqE3tT9Kq6T4b-Ylg0esLkVmI1s_LrwdYGuiTxaWHG0TicuNMZVBkgLcV7SckBeL5g9t5PWSUXe3sOaE1SvPg94mPpUCBlDRg2fokWAVWN_QMHp9JjfAmAdsGY7bPij0yC7BBegTMETLow-EM877KgEu-Lr4dqTNuUeaXkDlt3KiUPgEqUm3gcU8d-ZOVBB1THfGZCU4-k0Uj4Go2NcsGyEDQGOQLKcWJIti9Q0b9l_-Q4-ZVE"
                alt="Progress Tracking"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">
                Progress Tracking
              </h3>
              <p className="text-[var(--text-secondary)] mt-1">
                Monitor your meal adherence, discover new recipes, and maintain
                a healthy eating routine with our intuitive platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
