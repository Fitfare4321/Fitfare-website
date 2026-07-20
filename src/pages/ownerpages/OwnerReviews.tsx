import OwnerLayout from "./components/OwnerLayout";
import { reviews } from "./data/dummyData";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className={`w-4 h-4 ${i <= rating ? "text-yellow-400" : "text-gray-200"}`}
          fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
const dist = [5,4,3,2,1].map(s => ({ star: s, count: reviews.filter(r => r.rating === s).length }));

export default function OwnerReviews() {
  return (
    <OwnerLayout>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h1>

      {/* Summary */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6 flex items-center gap-8">
        <div className="text-center">
          <p className="text-5xl font-bold text-gray-800">{avgRating}</p>
          <Stars rating={Math.round(Number(avgRating))} />
          <p className="text-sm text-gray-400 mt-1">{reviews.length} reviews</p>
        </div>
        <div className="flex-1 space-y-2">
          {dist.map(d => (
            <div key={d.star} className="flex items-center gap-3">
              <span className="text-sm text-gray-500 w-4">{d.star}</span>
              <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <div className="flex-1 bg-gray-100 rounded-full h-2">
                <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${(d.count / reviews.length) * 100}%` }} />
              </div>
              <span className="text-sm text-gray-400 w-4">{d.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map(r => (
          <div key={r.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                  {r.name.split(" ").map(w => w[0]).join("")}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{r.name}</p>
                  <p className="text-xs text-gray-400">{r.service}</p>
                </div>
              </div>
              <Stars rating={r.rating} />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{r.comment}</p>
            <p className="text-xs text-gray-300 mt-3">{r.date}</p>
          </div>
        ))}
      </div>
    </OwnerLayout>
  );
}
