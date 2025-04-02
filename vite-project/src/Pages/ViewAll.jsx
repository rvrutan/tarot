import SmallCard from "../components/SmallCard";
import Card from "../components/Card";


export default function ViewAll() {
  return (
    <>
      {cards.map((card, index) => (
        <div key={index} className="flex-1 mx-2">
          <div className="badge badge-soft badge-lg p-4 flex items-center justify-center rounded-sm mb-4 w-full">
            <h3 className="text-center text-xl font-semibold m-0">
              {positions[index]}
            </h3>
            <SmallCard card={card} />
          </div>
        </div>
      ))}
    </>
  );
}
