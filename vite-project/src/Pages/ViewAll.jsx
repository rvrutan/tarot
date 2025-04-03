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



const [readingData, setReadingData] = useState(null); // Store cards, reading, and isUprights

const handleNewReading = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/tarot-reading', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setReadingData(data);
  } catch (error) {
    console.error("Error fetching tarot reading:", error);
  }
};

