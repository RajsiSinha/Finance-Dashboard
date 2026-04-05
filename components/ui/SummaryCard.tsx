type Props = {
  title: string;
  amount: string;
};

export default function SummaryCard({ title, amount }: Props) {
  return (
    <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-lg hover:scale-[1.02] transition">
  <p className="text-gray-500 text-sm">{title}</p>
  <h2 className="text-3xl font-bold mt-2 text-blue-600">
    {amount}
  </h2>
</div>
    
  );
}

