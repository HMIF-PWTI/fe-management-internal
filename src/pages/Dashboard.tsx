import { MdOutlinePeopleAlt } from "react-icons/md";

const Dashboard = () => {
  return (
    <div className="animate-slide-in">
      <div className="p-3 grid grid-cols-3 gap-10">
        <div className="flex flex-col justify-center border border-gold p-3 rounded-lg space-y-3">
          <h1 className="text-text-secondary font-semibold text-lg">
            Jumlah Anggota
          </h1>
          <hr className="border-gold" />
          <div className="flex justify-between items-center">
            <h2 className="text-5xl font-semibold text-gold">10</h2>
            <MdOutlinePeopleAlt className="text-5xl text-gold" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
