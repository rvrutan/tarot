export default function Card({ name, image }) {
    return (
        <div className="bg-yellow-200">
            <h1 className="bg-yellow-200 text-3xl ">{name}</h1>
            <img src={image}></img>
        </div>

    );
  }