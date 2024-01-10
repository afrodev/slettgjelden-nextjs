export default function FinalAmount({ amount, text, breakdown }) {
  return (
    <div className="bg-slate-200 text-black py-1 px-4 my-4 rounded-md w-full m-auto text-xl font-light">
      <div className="text-center">{text}</div>
      <div className="text-center underline">
        ${Math.floor(amount).toLocaleString()}
      </div>
      {breakdown && (
        <div>
          {breakdown.map((item, index) => (
            <div
              className=" text-center bg-slate-200 text-black py-1 px-4 my-4 rounded-md w-full m-auto text-xl font-light"
              key={index}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
