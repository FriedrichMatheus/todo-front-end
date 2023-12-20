interface TagProps {
  children: string;
}

const Tag = ({ children }: TagProps) =>
  children === "PENDING" ? (
    <div className="bg-gray-400 w-fit border rounded-md px-2 py-1 text-center font-semibold text-white">
      {children}
    </div>
  ) : (
    <div className="bg-green-400 w-fit border rounded-md px-2 py-1 text-center font-semibold text-white">
      {children}
    </div>
  );

export default Tag;
